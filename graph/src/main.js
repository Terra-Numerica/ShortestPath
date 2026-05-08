import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { levels } from './levels.js';

// --- CONFIGURATION SCENE ---
const container = document.getElementById('app');
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 100);
camera.position.set(0, -2, 14);
camera.lookAt(0, 0, 0);

const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
container.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
scene.add(ambientLight);
const dirLight = new THREE.DirectionalLight(0xffffff, 0.9);
dirLight.position.set(5, 10, 8);
scene.add(dirLight);

const editorPlaneGeo = new THREE.PlaneGeometry(100, 100);
const editorPlaneMat = new THREE.MeshBasicMaterial({ visible: false });
const editorPlane = new THREE.Mesh(editorPlaneGeo, editorPlaneMat);
scene.add(editorPlane);

// --- VARIABLES DE JEU & HISTORIQUES ---
let currentLevelData = null;
let nodesMeshes = [];
let edgesMeshes = [];
let drawnLines = [];
let currentNode = null;
let visitedEdges = [];
let liftsCount = 0;
let solutionInterval = null;

let isEditorMode = false;
let customLevelData = { id: 'Custom', name: "Mon Niveau", nodes: [], edges: [] };

// Tableaux d'historique pour l'annulation (Undo)
let playHistory = [];
let editHistory = [];

// Matériaux
const nodeMatDefault = new THREE.MeshStandardMaterial({ color: 0x3498db, roughness: 0.4 }); 
const nodeMatActive = new THREE.MeshStandardMaterial({ color: 0xf1c40f, roughness: 0.2, emissive: 0x555500 });
const edgeMatDashed = new THREE.LineDashedMaterial({ color: 0x000000, dashSize: 0.2, gapSize: 0.2 });
const edgeMatSolid = new THREE.MeshStandardMaterial({ color: 0x2ecc71, roughness: 0.3 });

// --- LOGIQUE DU JEU ---
function loadLevel(levelIndex) {
    if(solutionInterval) clearInterval(solutionInterval);

    isEditorMode = false;
    document.getElementById('play-options').style.display = 'flex';
    document.getElementById('editor-options').style.display = 'none';
    document.getElementById('btn-editor-mode').classList.remove('active');

    [...nodesMeshes, ...edgesMeshes, ...drawnLines].forEach(mesh => scene.remove(mesh));
    nodesMeshes = []; edgesMeshes = []; drawnLines = [];
    currentNode = null;
    visitedEdges = [];
    liftsCount = 0;
    playHistory = []; // Réinitialise l'historique
    updateUI();

    if (levelIndex === -1) {
        currentLevelData = customLevelData;
        document.querySelectorAll('.level-btn').forEach(b => b.classList.remove('active'));
    } else {
        currentLevelData = levels[levelIndex];
        document.querySelectorAll('#level-grid .level-btn').forEach(b => b.classList.remove('active'));
        const btns = document.querySelectorAll('#level-grid .level-btn');
        if(btns[levelIndex]) btns[levelIndex].classList.add('active');
    }

    document.getElementById('level-name').innerText = currentLevelData.name;

    const sphereGeo = new THREE.SphereGeometry(0.35, 32, 32);
    currentLevelData.nodes.forEach(n => {
        const mesh = new THREE.Mesh(sphereGeo, nodeMatDefault.clone());
        mesh.position.set(n.x, n.y, n.z);
        mesh.userData = { id: n.id }; 
        scene.add(mesh);
        nodesMeshes.push(mesh);
    });

    currentLevelData.edges.forEach((edge, index) => {
        const n1 = currentLevelData.nodes.find(n => n.id === edge[0]);
        const n2 = currentLevelData.nodes.find(n => n.id === edge[1]);
        if(n1 && n2) {
            const points = [new THREE.Vector3(n1.x, n1.y, n1.z), new THREE.Vector3(n2.x, n2.y, n2.z)];
            const geo = new THREE.BufferGeometry().setFromPoints(points);
            const line = new THREE.Line(geo, edgeMatDashed);
            line.computeLineDistances(); 
            line.userData = { edgeIndex: index, nodes: edge };
            scene.add(line);
            edgesMeshes.push(line);
        }
    });
}

function drawThickLine(v1, v2) {
    const distance = v1.distanceTo(v2);
    const position = v2.clone().add(v1).divideScalar(2);
    const cylinder = new THREE.CylinderGeometry(0.08, 0.08, distance, 12);
    const mesh = new THREE.Mesh(cylinder, edgeMatSolid);
    mesh.position.copy(position);
    mesh.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), v2.clone().sub(v1).normalize());
    scene.add(mesh);
    drawnLines.push(mesh);
    return mesh; // On retourne le mesh pour pouvoir le supprimer via le Undo
}

function handleNodeClick(nodeId) {
    const clickedMesh = nodesMeshes.find(m => m.userData.id === nodeId);

    // Premier clic du niveau
    if (currentNode === null) {
        currentNode = nodeId;
        clickedMesh.material = nodeMatActive;
        playHistory.push({ type: 'start', node: nodeId }); // Sauvegarde pour annuler le start
        return;
    }

    if (currentNode === nodeId) return; 

    const edgeIndex = currentLevelData.edges.findIndex((e, i) => {
        const isMatch = (e[0] === currentNode && e[1] === nodeId) || (e[1] === currentNode && e[0] === nodeId);
        return isMatch && !visitedEdges.includes(i);
    });

    if (edgeIndex !== -1) {
        visitedEdges.push(edgeIndex);
        
        const n1 = currentLevelData.nodes.find(n => n.id === currentNode);
        const n2 = currentLevelData.nodes.find(n => n.id === nodeId);
        const vec1 = new THREE.Vector3(n1.x, n1.y, n1.z);
        const vec2 = new THREE.Vector3(n2.x, n2.y, n2.z);
        
        const solidLine = drawThickLine(vec1, vec2); 

        // Sauvegarde de l'action de dessin
        playHistory.push({ type: 'draw', edgeIndex: edgeIndex, fromNode: currentNode, lineMesh: solidLine });

        nodesMeshes.find(m => m.userData.id === currentNode).material = nodeMatDefault;
        currentNode = nodeId;
        clickedMesh.material = nodeMatActive;

        checkWinCondition();
    } else {
        liftsCount++;
        updateUI();
        
        // Sauvegarde du faux pas (levé de crayon)
        playHistory.push({ type: 'lift', fromNode: currentNode });
        
        nodesMeshes.find(m => m.userData.id === currentNode).material = nodeMatDefault;
        currentNode = nodeId;
        clickedMesh.material = nodeMatActive;
    }
}

// FONCTION UNDO EN JEU
function undoPlay() {
    if (playHistory.length === 0) return;
    const lastAction = playHistory.pop();

    if (currentNode !== null) {
        const currentMesh = nodesMeshes.find(m => m.userData.id === currentNode);
        if(currentMesh) currentMesh.material = nodeMatDefault;
    }

    if (lastAction.type === 'start') {
        currentNode = null;
    } else if (lastAction.type === 'draw') {
        visitedEdges = visitedEdges.filter(i => i !== lastAction.edgeIndex);
        scene.remove(lastAction.lineMesh); // Efface le trait 3D
        drawnLines = drawnLines.filter(m => m !== lastAction.lineMesh);
        currentNode = lastAction.fromNode; // Retour au noeud d'avant
    } else if (lastAction.type === 'lift') {
        liftsCount--;
        currentNode = lastAction.fromNode;
    }

    // Remet la couleur sur le noeud restauré
    if (currentNode !== null) {
        nodesMeshes.find(m => m.userData.id === currentNode).material = nodeMatActive;
    }
    
    updateUI();
}

function checkWinCondition() {
    if (visitedEdges.length === currentLevelData.edges.length && currentLevelData.edges.length > 0) {
        document.getElementById('message').innerText = `Bravo ! Niveau complété avec ${liftsCount} levé(s) de crayon ! 🎉`;
        document.getElementById('message').style.color = "#2ecc71";
    }
}

// --- LOGIQUE DE L'ÉDITEUR ---
function renderEditorScene() {
    [...nodesMeshes, ...edgesMeshes, ...drawnLines].forEach(mesh => scene.remove(mesh));
    nodesMeshes = []; edgesMeshes = []; drawnLines = [];

    const sphereGeo = new THREE.SphereGeometry(0.35, 32, 32);
    customLevelData.nodes.forEach(n => {
        const mesh = new THREE.Mesh(sphereGeo, n.id === currentNode ? nodeMatActive.clone() : nodeMatDefault.clone());
        mesh.position.set(n.x, n.y, n.z);
        mesh.userData = { id: n.id };
        scene.add(mesh);
        nodesMeshes.push(mesh);
    });

    customLevelData.edges.forEach((edge) => {
        const n1 = customLevelData.nodes.find(n => n.id === edge[0]);
        const n2 = customLevelData.nodes.find(n => n.id === edge[1]);
        if(n1 && n2) {
            const points = [new THREE.Vector3(n1.x, n1.y, n1.z), new THREE.Vector3(n2.x, n2.y, n2.z)];
            const geo = new THREE.BufferGeometry().setFromPoints(points);
            const line = new THREE.Line(geo, edgeMatDashed);
            line.computeLineDistances();
            scene.add(line);
            edgesMeshes.push(line);
        }
    });
}

// FONCTION UNDO EN ÉDITEUR
function undoEdit() {
    // Si on a un point sélectionné, on annule juste la sélection
    if (currentNode !== null) {
        currentNode = null;
        renderEditorScene();
        return;
    }

    if (editHistory.length === 0) return;
    const lastEdit = editHistory.pop();

    if (lastEdit.type === 'addNode') {
        customLevelData.nodes.pop();
    } else if (lastEdit.type === 'addEdge') {
        customLevelData.edges.pop();
    } else if (lastEdit.type === 'removeEdge') {
        customLevelData.edges.splice(lastEdit.index, 0, lastEdit.edge); // Remet le trait supprimé à sa place
    }
    renderEditorScene();
}

// --- ALGORITHME DE RÉSOLUTION ---
function findSolutionPath(levelData) {
    const { nodes, edges } = levelData;
    const adj = {};
    nodes.forEach(n => adj[n.id] = []);
    edges.forEach((e, i) => {
        adj[e[0]].push({ to: e[1], edgeIndex: i });
        adj[e[1]].push({ to: e[0], edgeIndex: i });
    });

    let oddNodes = nodes.filter(n => adj[n.id].length % 2 !== 0);
    let startNodes = oddNodes.length > 0 ? oddNodes.map(n => n.id) : nodes.map(n => n.id);

    for (let startNode of startNodes) {
        let visitedEdgesSet = new Set();
        let path = [startNode];

        function backtrack(currNode) {
            if (visitedEdgesSet.size === edges.length) return true;
            for (let neighbor of adj[currNode]) {
                if (!visitedEdgesSet.has(neighbor.edgeIndex)) {
                    visitedEdgesSet.add(neighbor.edgeIndex);
                    path.push(neighbor.to);
                    if (backtrack(neighbor.to)) return true;
                    path.pop(); 
                    visitedEdgesSet.delete(neighbor.edgeIndex);
                }
            }
            return false;
        }

        if (backtrack(startNode)) return path;
    }
    return null;
}

function playSolution() {
    const activeIndex = levels.findIndex(l => l.name === currentLevelData.name);
    loadLevel(activeIndex !== -1 ? activeIndex : -1); 

    const path = findSolutionPath(currentLevelData);
    if (!path) {
        document.getElementById('message').innerText = "Ce graphe n'a pas de solution parfaite !";
        return;
    }

    let step = 0;
    solutionInterval = setInterval(() => {
        if (step >= path.length) {
            clearInterval(solutionInterval);
            return;
        }
        handleNodeClick(path[step]);
        step++;
    }, 600);
}

// --- INTERACTION RAYCASTER ---
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

window.addEventListener('pointerdown', (event) => {
    if(event.target.closest('#ui-container') || event.target.closest('#rules-modal')) return;

    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    raycaster.setFromCamera(mouse, camera);

    if (isEditorMode) {
        const intersects = raycaster.intersectObjects([...nodesMeshes, editorPlane]);
        if (intersects.length > 0) {
            const hit = intersects[0];
            if (hit.object === editorPlane) {
                const newId = customLevelData.nodes.length > 0 ? Math.max(...customLevelData.nodes.map(n=>n.id)) + 1 : 0;
                const x = Math.round(hit.point.x * 2) / 2;
                const y = Math.round(hit.point.y * 2) / 2;
                customLevelData.nodes.push({ id: newId, x, y, z: 0 });
                editHistory.push({ type: 'addNode' });
                renderEditorScene();
            } else {
                const clickedId = hit.object.userData.id;
                if (currentNode === null) {
                    currentNode = clickedId;
                } else {
                    if (currentNode !== clickedId) {
                        const edgeIdx = customLevelData.edges.findIndex(e =>
                            (e[0]===currentNode && e[1]===clickedId) || (e[1]===currentNode && e[0]===clickedId)
                        );
                        if (edgeIdx > -1) {
                            const removedEdge = customLevelData.edges.splice(edgeIdx, 1)[0];
                            editHistory.push({ type: 'removeEdge', edge: removedEdge, index: edgeIdx });
                        } else {
                            customLevelData.edges.push([currentNode, clickedId]);
                            editHistory.push({ type: 'addEdge' });
                        }
                    }
                    currentNode = null;
                }
                renderEditorScene();
            }
        }
    } else {
        const intersects = raycaster.intersectObjects(nodesMeshes);
        if (intersects.length > 0) {
            if(solutionInterval) clearInterval(solutionInterval); 
            handleNodeClick(intersects[0].object.userData.id);
        }
    }
});

// --- GESTION UI ---
function updateUI() {
    document.getElementById('lift-count').innerText = `${liftsCount} levé(s) de crayon`;
    if(!isEditorMode) document.getElementById('message').innerText = "";
}

function initUI() {
    const grid = document.getElementById('level-grid');
    grid.innerHTML = ''; 
    
    levels.forEach((lvl, index) => {
        const btn = document.createElement('button');
        btn.className = 'level-btn';
        btn.innerText = lvl.id;
        btn.onclick = () => loadLevel(index);
        grid.appendChild(btn);
    });

    document.getElementById('btn-reset').onclick = () => {
        const activeIndex = levels.findIndex(l => l.name === currentLevelData.name);
        loadLevel(activeIndex !== -1 ? activeIndex : -1);
    };

    document.getElementById('btn-solution').onclick = playSolution;

    document.getElementById('btn-undo-play').onclick = undoPlay;
    document.getElementById('btn-undo-edit').onclick = undoEdit;

    document.getElementById('btn-lift').onclick = () => {
        if(currentNode !== null) {
            playHistory.push({ type: 'lift', fromNode: currentNode });
            nodesMeshes.find(m => m.userData.id === currentNode).material = nodeMatDefault;
            currentNode = null;
            liftsCount++;
            updateUI();
        }
    };

    // --- BOUTONS ÉDITEUR ---
    document.getElementById('btn-editor-mode').onclick = () => {
        isEditorMode = true;
        currentNode = null;
        editHistory = []; // Vide l'historique quand on rentre en mode éditeur
        document.getElementById('play-options').style.display = 'none';
        document.getElementById('editor-options').style.display = 'flex';
        document.getElementById('level-name').innerText = "Mode Éditeur";
        document.getElementById('lift-count').innerText = "Création en cours...";
        document.getElementById('message').innerText = "Clic dans le vide : Créer un point\nClic sur 2 points : Créer/Supprimer un trait";
        document.getElementById('message').style.color = "#8e44ad";

        document.querySelectorAll('.level-btn').forEach(b => b.classList.remove('active'));
        document.getElementById('btn-editor-mode').classList.add('active');

        renderEditorScene();
    };

    document.getElementById('btn-play-custom').onclick = () => {
        if(customLevelData.edges.length === 0) {
            document.getElementById('message').innerText = "Reliez au moins 2 points avant de jouer !";
            document.getElementById('message').style.color = "#e74c3c";
            return;
        }
        loadLevel(-1);
    };

    document.getElementById('btn-clear-custom').onclick = () => {
        customLevelData.nodes = [];
        customLevelData.edges = [];
        currentNode = null;
        editHistory = []; // Vide l'historique quand on efface tout
        renderEditorScene();
    };

    // --- BOUTONS REGLES ---
    document.getElementById('btn-rules').onclick = () => {
        document.getElementById('rules-modal').style.display = 'flex';
    };

    document.getElementById('btn-close-rules').onclick = () => {
        document.getElementById('rules-modal').style.display = 'none';
    };
}

// --- BOUCLE D'ANIMATION ---
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}

initUI();
loadLevel(0); 
animate();