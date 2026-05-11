(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ "+0pH":
/*!**********************************************************************************!*\
  !*** ./src/app/models/Strategy/EasyCollectorStrategy/easy-collector-strategy.ts ***!
  \**********************************************************************************/
/*! exports provided: EasyCollectorStrategy */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EasyCollectorStrategy", function() { return EasyCollectorStrategy; });
class EasyCollectorStrategy {
    constructor(harvestCapacity) {
        this.harvestCapacity = harvestCapacity;
    }
    turnAction(graph, goat_position_index, cabbage_positions_index) {
        let collectNumber = this.harvestCapacity;
        for (let i = 0; i < collectNumber && cabbage_positions_index.length > 0; i++) {
            const randomIndex = Math.floor(Math.random() * cabbage_positions_index.length);
            const cabbageToRemoveIndex = cabbage_positions_index[randomIndex];
            cabbage_positions_index = cabbage_positions_index.filter(cabbage_position_index => cabbage_position_index !== cabbageToRemoveIndex);
        }
        return cabbage_positions_index;
    }
}


/***/ }),

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! C:\Users\asm38\new\Master_1_uniCa\s2\Terra-Numerica\chevre-et-choux-le-bon-dossier\ChevreChoux\chevre-choux\src\main.ts */"zUnb");


/***/ }),

/***/ "0OyU":
/*!******************************************************************************!*\
  !*** ./src/app/models/Strategy/ExtremeGoatStrategy/extreme-goat-strategy.ts ***!
  \******************************************************************************/
/*! exports provided: ExtremeGoatStrategy */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ExtremeGoatStrategy", function() { return ExtremeGoatStrategy; });
class ExtremeGoatStrategy {
    constructor(harvestCapacity) {
        this.harvestCapacity = harvestCapacity;
    }
    turnAction(graph, goat_position_index, cabbage_positions_index) {
        const goatNode = graph.nodes.find(n => n.index === goat_position_index);
        if (!goatNode) {
            return goat_position_index;
        }
        const neighbors = graph.edges(goatNode);
        if (neighbors.length === 0) {
            return goat_position_index;
        }
        let bestNeighbor = neighbors[0].index;
        let bestScore = 99999;
        for (const neighborNode of neighbors) {
            if (cabbage_positions_index.includes(neighborNode.index)) {
                return neighborNode.index;
            }
            let cabbagesByDistance = [];
            const neighbor = neighborNode;
            for (const cabbageIndex of cabbage_positions_index) {
                const cabbageNode = graph.nodes.find(n => n.index === cabbageIndex);
                if (!cabbageNode) {
                    continue;
                }
                const distance = graph.distance(neighbor, cabbageNode);
                cabbagesByDistance.push({ distance, index: cabbageIndex });
            }
            cabbagesByDistance.sort((a, b) => a.distance - b.distance);
            if (cabbagesByDistance.length === 0) {
                continue;
            }
            const safeIndex = Math.min(this.harvestCapacity, cabbagesByDistance.length - 1);
            const score = cabbagesByDistance[safeIndex].distance;
            if (score === 1) {
                return neighbor.index;
            }
            if (score < bestScore) {
                bestScore = score;
                bestNeighbor = neighbor.index;
            }
        }
        return bestNeighbor;
    }
}


/***/ }),

/***/ "67dP":
/*!*************************************************!*\
  !*** ./src/app/services/graph/graph.service.ts ***!
  \*************************************************/
/*! exports provided: GraphService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GraphService", function() { return GraphService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var src_app_models_Graph_Tree_tree__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/models/Graph/Tree/tree */ "RYiN");
/* harmony import */ var src_app_models_Graph_Specific_hexagonal_grid__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/models/Graph/Specific/hexagonal-grid */ "eKDq");
/* harmony import */ var src_app_models_Graph_Specific_specific__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/models/Graph/Specific/specific */ "VK5U");





class GraphService {
    constructor() { }
    drawGraph(scene) {
        var _a;
        (_a = this.graph) === null || _a === void 0 ? void 0 : _a.draw(scene);
    }
    stop() {
        var _a;
        (_a = this.graph) === null || _a === void 0 ? void 0 : _a.stop();
    }
    generateGraph(type, args) {
        switch (type) {
            case 'tree':
                this.graph = this.generateTree(args[0], args[1]);
                break;
            case 'conf2':
                this.graph = this.generateTree(args[0], 2);
                break;
            case 'conf3':
                this.graph = this.generateTree(args[0], args[1]);
                break;
            case 'hexagonal':
                this.graph = this.generateHexagonalGrid(args[0], args[1]);
                break;
            case 'maze':
                this.graph = this.generateMaze(args[0], args[1]);
                break;
            case 'enriched_tree':
                this.graph = this.generateEnrichedTree(args[0], args[1]);
                break;
            case 'ring_branches':
                this.graph = this.generateRingBranches(args[0], args[1]);
                break;
        }
        return this.graph;
    }
    generateTreeLinks(size, arity) {
        const links = [];
        for (let i = 0; i < size; i++) {
            for (let j = 1; j <= arity; j++) {
                const child = i * arity + j;
                if (child < size) {
                    links.push({
                        source: i,
                        target: child
                    });
                }
            }
        }
        return links;
    }
    generateTreeNodes(size, arity) {
        const nodes = Array.from({ length: size }, (_, i) => ({
            index: i,
            x: 0,
            y: 0,
            z: 0
        }));
        const levels = [];
        let currentLevel = [0];
        let nextIndex = 1;
        let depth = 0;
        while (currentLevel.length > 0) {
            levels.push(currentLevel);
            const nextLevel = [];
            for (const _parent of currentLevel) {
                for (let j = 0; j < arity && nextIndex < size; j++) {
                    nextLevel.push(nextIndex);
                    nextIndex++;
                }
            }
            currentLevel = nextLevel;
            depth++;
        }
        const horizontalSpacing = 2.5;
        const verticalSpacing = 2.5;
        const depthSpacing = 2.5;
        levels.forEach((level, levelIndex) => {
            const count = level.length;
            const radius = levelIndex * horizontalSpacing;
            level.forEach((nodeIndex, i) => {
                if (levelIndex === 0) {
                    nodes[nodeIndex].x = 0;
                    nodes[nodeIndex].y = 0;
                    nodes[nodeIndex].z = 0;
                }
                else {
                    const angle = (i / count) * Math.PI * 2;
                    nodes[nodeIndex].x = Math.cos(angle) * radius;
                    nodes[nodeIndex].y = -levelIndex * verticalSpacing;
                    nodes[nodeIndex].z = Math.sin(angle) * radius;
                }
            });
        });
        return nodes;
    }
    generateTree(size, arity) {
        const nodes = this.generateTreeNodes(size, arity);
        const links = this.generateTreeLinks(size, arity);
        return new src_app_models_Graph_Tree_tree__WEBPACK_IMPORTED_MODULE_1__["Tree"](nodes, links);
    }
    generateHexagonalGrid(width, height) {
        const nodes = [];
        const links = [];
        const spacing = 2;
        for (let h = 0; h < height; h++) {
            for (let w = 0; w < width; w++) {
                const x = w * spacing * 1.5;
                const z = h * spacing * Math.sqrt(3) + (w % 2 === 0 ? 0 : spacing * Math.sqrt(3) / 2);
                nodes.push({ index: nodes.length, x, y: 0, z });
            }
        }
        for (let h = 0; h < height; h++) {
            for (let w = 0; w < width; w++) {
                const current = h * width + w;
                const neighbors = [];
                if (w + 1 < width)
                    neighbors.push(h * width + (w + 1));
                if (h + 1 < height)
                    neighbors.push((h + 1) * width + w);
                if (w % 2 === 0) {
                    if (w + 1 < width && h - 1 >= 0)
                        neighbors.push((h - 1) * width + (w + 1));
                }
                else {
                    if (w + 1 < width && h + 1 < height)
                        neighbors.push((h + 1) * width + (w + 1));
                }
                neighbors.forEach(neighbor => {
                    links.push({ source: current, target: neighbor });
                });
            }
        }
        return new src_app_models_Graph_Specific_hexagonal_grid__WEBPACK_IMPORTED_MODULE_2__["HexagonalGrid"](nodes, links);
    }
    generateMaze(width, height) {
        const nodes = [];
        const spacing = 2;
        for (let h = 0; h < height; h++) {
            for (let w = 0; w < width; w++) {
                nodes.push({ index: nodes.length, x: w * spacing, y: 0, z: h * spacing });
            }
        }
        const allLinks = [];
        for (let h = 0; h < height; h++) {
            for (let w = 0; w < width; w++) {
                const current = h * width + w;
                if (w + 1 < width)
                    allLinks.push({ source: current, target: h * width + (w + 1) });
                if (h + 1 < height)
                    allLinks.push({ source: current, target: (h + 1) * width + w });
            }
        }
        const parent = Array.from({ length: nodes.length }, (_, i) => i);
        const find = (i) => {
            if (parent[i] === i)
                return i;
            return parent[i] = find(parent[i]);
        };
        const union = (i, j) => {
            const rootI = find(i);
            const rootJ = find(j);
            if (rootI !== rootJ) {
                parent[rootI] = rootJ;
                return true;
            }
            return false;
        };
        const shuffled = allLinks.sort(() => Math.random() - 0.5);
        const resultLinks = [];
        const remainingLinks = [];
        shuffled.forEach(link => {
            if (union(link.source, link.target)) {
                resultLinks.push(link);
            }
            else {
                remainingLinks.push(link);
            }
        });
        const extraLinks = remainingLinks.slice(0, Math.floor(remainingLinks.length * 0.2));
        return new src_app_models_Graph_Specific_specific__WEBPACK_IMPORTED_MODULE_3__["Specific"](nodes, [...resultLinks, ...extraLinks]);
    }
    generateEnrichedTree(size, extraEdges) {
        const nodes = this.generateTreeNodes(size, 3);
        const links = this.generateTreeLinks(size, 3);
        const possibleExtras = [];
        for (let i = 0; i < size; i++) {
            for (let j = i + 1; j < size; j++) {
                if (!links.some(l => (l.source === i && l.target === j) || (l.source === j && l.target === i))) {
                    possibleExtras.push({ source: i, target: j });
                }
            }
        }
        const shuffled = possibleExtras.sort(() => Math.random() - 0.5);
        const resultLinks = [...links, ...shuffled.slice(0, extraEdges)];
        return new src_app_models_Graph_Specific_specific__WEBPACK_IMPORTED_MODULE_3__["Specific"](nodes, resultLinks);
    }
    generateRingBranches(cycleSize, numBranches) {
        const nodes = [];
        const links = [];
        const spacing = 3;
        for (let i = 0; i < cycleSize; i++) {
            const angle = (i / cycleSize) * Math.PI * 2;
            nodes.push({
                index: i,
                x: Math.cos(angle) * (cycleSize * spacing / (2 * Math.PI)),
                y: 0,
                z: Math.sin(angle) * (cycleSize * spacing / (2 * Math.PI))
            });
            links.push({ source: i, target: (i + 1) % cycleSize });
        }
        let nextIndex = cycleSize;
        const branchLength = 2;
        for (let i = 0; i < numBranches; i++) {
            let root = Math.floor(Math.random() * cycleSize);
            let currentRoot = root;
            const angle = (root / cycleSize) * Math.PI * 2;
            const dirX = Math.cos(angle);
            const dirZ = Math.sin(angle);
            for (let j = 0; j < branchLength; j++) {
                nodes.push({
                    index: nextIndex,
                    x: nodes[currentRoot].x + dirX * spacing,
                    y: 0,
                    z: nodes[currentRoot].z + dirZ * spacing
                });
                links.push({ source: currentRoot, target: nextIndex });
                currentRoot = nextIndex;
                nextIndex++;
            }
        }
        return new src_app_models_Graph_Specific_specific__WEBPACK_IMPORTED_MODULE_3__["Specific"](nodes, links);
    }
}
GraphService.ɵfac = function GraphService_Factory(t) { return new (t || GraphService)(); };
GraphService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({ token: GraphService, factory: GraphService.ɵfac, providedIn: 'root' });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](GraphService, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"],
        args: [{
                providedIn: 'root'
            }]
    }], function () { return []; }, null); })();


/***/ }),

/***/ "884q":
/*!************************************************************************!*\
  !*** ./src/app/models/Strategy/EasyGoatStrategy/easy-goat-strategy.ts ***!
  \************************************************************************/
/*! exports provided: EasyGoatStrategy */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EasyGoatStrategy", function() { return EasyGoatStrategy; });
class EasyGoatStrategy {
    turnAction(graph, goat_index, cabbage_indices) {
        const currentNode = graph.nodes.find(n => n.index === goat_index);
        if (!currentNode) {
            return goat_index;
        }
        const neighbors = graph.edges(currentNode);
        if (neighbors.length === 0) {
            return goat_index;
        }
        const randomNeighbor = Math.floor(Math.random() * neighbors.length);
        const targetNode = neighbors[randomNeighbor];
        return targetNode.index;
    }
}


/***/ }),

/***/ "8oIi":
/*!**************************************************************************************!*\
  !*** ./src/app/models/Strategy/NormalCollectorStrategy/normal-collector-strategy.ts ***!
  \**************************************************************************************/
/*! exports provided: NormalCollectorStrategy */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NormalCollectorStrategy", function() { return NormalCollectorStrategy; });
class NormalCollectorStrategy {
    constructor(harvestCapacity) {
        this.harvestCapacity = harvestCapacity;
    }
    turnAction(graph, goat_index, cabbage_indices) {
        const nodeGoat = graph.nodes.find(n => n.index === goat_index);
        if (!nodeGoat) {
            return cabbage_indices;
        }
        const distances = [];
        for (let cabbageIndex of cabbage_indices) {
            const nodeCabbage = graph.nodes.find(n => n.index === cabbageIndex);
            if (!nodeCabbage) {
                continue;
            }
            const distance = graph.distance(nodeGoat, nodeCabbage);
            distances.push({ distance, index: cabbageIndex });
        }
        distances.sort((a, b) => a.distance - b.distance);
        const nbCabbagesToCollect = Math.min(this.harvestCapacity, distances.length);
        distances.splice(0, nbCabbagesToCollect);
        return distances.map(d => d.index);
    }
}


/***/ }),

/***/ "AytR":
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/*! exports provided: environment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "environment", function() { return environment; });
/* harmony import */ var src_app_models_PawnState_PawnStateOnTurn_pawn_state_on_turn__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/app/models/PawnState/PawnStateOnTurn/pawn-state-on-turn */ "yRWK");
/* harmony import */ var src_app_models_PawnState_PawnStateWaitingTurn_pawn_state_waiting_turn__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/models/PawnState/PawnStateWaitingTurn/pawn-state-waiting-turn */ "oqWu");


const environment = {
    production: false,
    pawnWaitingTurn: new src_app_models_PawnState_PawnStateWaitingTurn_pawn_state_waiting_turn__WEBPACK_IMPORTED_MODULE_1__["PawnStateWaitingTurn"](),
    pawnOnTurn: new src_app_models_PawnState_PawnStateOnTurn_pawn_state_on_turn__WEBPACK_IMPORTED_MODULE_0__["PawnStateOnTurn"]()
};


/***/ }),

/***/ "Ks4N":
/*!***********************************************!*\
  !*** ./src/app/services/game/game.service.ts ***!
  \***********************************************/
/*! exports provided: GameService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GameService", function() { return GameService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var sweetalert2__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! sweetalert2 */ "PSD3");
/* harmony import */ var sweetalert2__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(sweetalert2__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var src_environments_environment__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/environments/environment */ "AytR");
/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! three */ "Womt");
/* harmony import */ var src_app_models_Strategy_EasyGoatStrategy_easy_goat_strategy__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/models/Strategy/EasyGoatStrategy/easy-goat-strategy */ "884q");
/* harmony import */ var src_app_models_Strategy_NormalGoatStrategy_normal_goat_strategy__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/models/Strategy/NormalGoatStrategy/normal-goat-strategy */ "bHuV");
/* harmony import */ var src_app_models_Strategy_DifficultStrategyGoat_difficult_goat_strategy__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/models/Strategy/DifficultStrategyGoat/difficult-goat-strategy */ "Q7j9");
/* harmony import */ var src_app_models_Strategy_ExtremeGoatStrategy_extreme_goat_strategy__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! src/app/models/Strategy/ExtremeGoatStrategy/extreme-goat-strategy */ "0OyU");
/* harmony import */ var src_app_models_Strategy_EasyCollectorStrategy_easy_collector_strategy__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! src/app/models/Strategy/EasyCollectorStrategy/easy-collector-strategy */ "+0pH");
/* harmony import */ var src_app_models_Strategy_NormalCollectorStrategy_normal_collector_strategy__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! src/app/models/Strategy/NormalCollectorStrategy/normal-collector-strategy */ "8oIi");
/* harmony import */ var src_app_models_Strategy_DifficultCollectorStrategy_difficult_collector_strategy__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! src/app/models/Strategy/DifficultCollectorStrategy/difficult-collector-strategy */ "jVQC");
/* harmony import */ var src_app_models_Strategy_ExtremeCollectorStrategy_extreme_collector_strategy__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! src/app/models/Strategy/ExtremeCollectorStrategy/extreme-collector-strategy */ "P+36");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/router */ "tyNb");














class GameService {
    constructor(router) {
        this.router = router;
        this._board_params = [];
        this._player_side = 'unknown';
        this._harvest_capacity = 1;
        this._selected_level = 'easy';
        this.raycaster = new three__WEBPACK_IMPORTED_MODULE_3__["Raycaster"]();
        this.mouse = new three__WEBPACK_IMPORTED_MODULE_3__["Vector2"]();
        this.cabbageObjects = [];
        this.selectedCabbageObjects = [];
        this.textureLoader = new three__WEBPACK_IMPORTED_MODULE_3__["TextureLoader"]();
        this.goat_turn = false;
        this.goat_win = false;
        this.goat_has_moved = false;
        this.goat_position = {
            index: -1,
            x: -1,
            y: -1,
            z: -1
        };
        this.cabbage_positions = [];
        this._turn_count = 0;
        this.collector_color = '#4dc738';
        this.goat_color = '#b56528';
        this.replayCallback = () => { };
        this.onCanvasClick = (event) => {
            if (!this.renderer3D || !this.camera || !this.scene) {
                return;
            }
            const canvas = this.renderer3D.domElement;
            const rect = canvas.getBoundingClientRect();
            this.mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
            this.mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
            this.raycaster.setFromCamera(this.mouse, this.camera);
            const intersects = this.raycaster.intersectObjects(this.scene.children, true);
            if (intersects.length === 0) {
                return;
            }
            const clickedObject = intersects[0].object;
            if (clickedObject.userData.type === 'cabbage') {
                if (this.goat_turn) {
                    this.moveGoatToNode(clickedObject.userData.node);
                }
                else {
                    this.handleClickOnCabbage(clickedObject);
                }
                return;
            }
            if (clickedObject.userData.type === 'node' && clickedObject.userData.node) {
                this.moveGoatToNode(clickedObject.userData.node);
                return;
            }
        };
    }
    startGame(scene, camera, renderer3D) {
        console.log('Starting game');
        if (!this._graph) {
            return;
        }
        this.scene = scene;
        this.camera = camera;
        this.renderer3D = renderer3D;
        const startPoint = this._graph.nodes[0];
        if (!startPoint) {
            return;
        }
        this.goat_turn = false;
        this.goat_win = false;
        this._turn_count = 0;
        this.cabbageObjects = [];
        this.selectedCabbageObjects = [];
        this.cabbage_positions = [];
        this.initAIStrategy();
        this.createCabbages(startPoint);
        this.createGoat(startPoint);
        this.initRaycasterClick();
        this.update();
        if (this.isAiOpponent()) {
            this.executeAiTurn();
        }
    }
    isAiOpponent() {
        var _a, _b;
        return ((_a = this._opponent_type) !== null && _a !== void 0 ? _a : '').toLowerCase().trim() === 'ai'
            || ((_b = this._opponent_type) !== null && _b !== void 0 ? _b : '').toLowerCase().trim() === 'ia';
    }
    normalizedPlayerSide() {
        var _a;
        const side = ((_a = this._player_side) !== null && _a !== void 0 ? _a : '').toLowerCase().trim();
        if (side === 'goat' || side === 'chevre' || side === 'chèvre') {
            return 'goat';
        }
        if (side === 'collector' || side === 'collecteur') {
            return 'collector';
        }
        return 'unknown';
    }
    initAIStrategy() {
        const side = this.normalizedPlayerSide();
        this.currentGoatStrategy = undefined;
        this.currentCollectorStrategy = undefined;
        if (side === 'collector') {
            if (this._selected_level === 'easy') {
                this.currentGoatStrategy = new src_app_models_Strategy_EasyGoatStrategy_easy_goat_strategy__WEBPACK_IMPORTED_MODULE_4__["EasyGoatStrategy"]();
            }
            else if (this._selected_level === 'medium') {
                this.currentGoatStrategy = new src_app_models_Strategy_NormalGoatStrategy_normal_goat_strategy__WEBPACK_IMPORTED_MODULE_5__["NormalGoatStrategy"]();
            }
            else if (this._selected_level === 'hard') {
                this.currentGoatStrategy = new src_app_models_Strategy_DifficultStrategyGoat_difficult_goat_strategy__WEBPACK_IMPORTED_MODULE_6__["DifficultGoatStrategy"](this._harvest_capacity);
            }
            else if (this._selected_level === 'extreme') {
                this.currentGoatStrategy = new src_app_models_Strategy_ExtremeGoatStrategy_extreme_goat_strategy__WEBPACK_IMPORTED_MODULE_7__["ExtremeGoatStrategy"](this._harvest_capacity);
            }
        }
        if (side === 'goat') {
            if (this._selected_level === 'easy') {
                this.currentCollectorStrategy = new src_app_models_Strategy_EasyCollectorStrategy_easy_collector_strategy__WEBPACK_IMPORTED_MODULE_8__["EasyCollectorStrategy"](this._harvest_capacity);
            }
            else if (this._selected_level === 'medium') {
                this.currentCollectorStrategy = new src_app_models_Strategy_NormalCollectorStrategy_normal_collector_strategy__WEBPACK_IMPORTED_MODULE_9__["NormalCollectorStrategy"](this._harvest_capacity);
            }
            else if (this._selected_level === 'hard') {
                this.currentCollectorStrategy = new src_app_models_Strategy_DifficultCollectorStrategy_difficult_collector_strategy__WEBPACK_IMPORTED_MODULE_10__["DifficultCollectorStrategy"](this._harvest_capacity);
            }
            else if (this._selected_level === 'extreme') {
                this.currentCollectorStrategy = new src_app_models_Strategy_ExtremeCollectorStrategy_extreme_collector_strategy__WEBPACK_IMPORTED_MODULE_11__["ExtremeCollectorStrategy"](this._harvest_capacity);
            }
        }
        console.log('[IA] init', {
            opponent_type: this._opponent_type,
            player_side: this._player_side,
            normalizedSide: side,
            level: this._selected_level,
            goatStrategy: !!this.currentGoatStrategy,
            collectorStrategy: !!this.currentCollectorStrategy
        });
    }
    getRandomInt(min, max) {
        const safeMin = Math.ceil(min);
        const safeMax = Math.floor(max);
        return Math.floor(Math.random() * (safeMax - safeMin + 1)) + safeMin;
    }
    createCabbages(startPoint) {
        var _a, _b, _c;
        if (!this._graph) {
            return;
        }
        const totalNodesCount = this._graph.nodes.length;
        const safeNodes = this._graph.nodes
            .map(node => {
            if (node.index === startPoint.index ||
                node.x === undefined ||
                node.z === undefined) {
                return null;
            }
            const distance = this._graph.distance(startPoint, node);
            return {
                node,
                distance
            };
        })
            .filter(item => {
            if (!item) {
                return false;
            }
            return item.distance >= 2;
        });
        if (safeNodes.length === 0) {
            console.warn('[Choux] Aucun sommet sûr disponible pour placer les choux');
            return;
        }
        const minCabbages = Math.min(safeNodes.length, Math.max(3, this.harvest_capacity + 1));
        const maxCabbages = Math.min(safeNodes.length, Math.max(minCabbages, Math.ceil(safeNodes.length * 0.75)));
        const cabbageCount = this.getRandomInt(minCabbages, maxCabbages);
        const sortedSafeNodes = [...safeNodes].sort((a, b) => {
            const scoreA = this.getCabbageDistanceScore(a.distance);
            const scoreB = this.getCabbageDistanceScore(b.distance);
            return scoreB - scoreA;
        });
        const shuffledSafeNodes = sortedSafeNodes.sort(() => Math.random() - 0.35);
        const selectedNodes = shuffledSafeNodes
            .slice(0, cabbageCount)
            .map(item => item.node);
        for (const node of selectedNodes) {
            const cabbage = this.createPawnSprite('assets/cabbageV2.png', 0x4dc738, 0.42);
            const x = (_a = node.x) !== null && _a !== void 0 ? _a : 0;
            const y = (_b = node.y) !== null && _b !== void 0 ? _b : 0;
            const z = (_c = node.z) !== null && _c !== void 0 ? _c : 0;
            cabbage.position.set(x, y + 0.25, z);
            cabbage.userData = {
                type: 'cabbage',
                index: node.index,
                node
            };
            this.scene.add(cabbage);
            this.cabbageObjects.push(cabbage);
            this.cabbage_positions.push({
                index: node.index,
                x,
                y,
                z
            });
        }
        console.log('[Choux] Distribution équilibrée générée', {
            totalNodes: totalNodesCount,
            safeNodes: safeNodes.length,
            cabbageCount,
            cabbagePositions: this.cabbage_positions.map(c => c.index),
            distances: selectedNodes.map(node => this._graph.distance(startPoint, node))
        });
    }
    getCabbageDistanceScore(distance) {
        if (distance === 2) {
            return 100;
        }
        if (distance === 3) {
            return 80;
        }
        if (distance === 4) {
            return 50;
        }
        return 30;
    }
    createGoat(startPoint) {
        var _a, _b, _c, _d, _e, _f;
        if (!this._graph) {
            return;
        }
        this.goatObject = this.createPawnSprite('assets/goat.png', 0xb56528, 0.58);
        this.goatObject.position.set((_a = startPoint.x) !== null && _a !== void 0 ? _a : 0, ((_b = startPoint.y) !== null && _b !== void 0 ? _b : 0) + 0.35, (_c = startPoint.z) !== null && _c !== void 0 ? _c : 0);
        this.goatObject.userData = {
            type: 'goat',
            index: startPoint.index,
            node: startPoint
        };
        this.scene.add(this.goatObject);
        this.goat_position = {
            index: startPoint.index,
            x: (_d = startPoint.x) !== null && _d !== void 0 ? _d : 0,
            y: (_e = startPoint.y) !== null && _e !== void 0 ? _e : 0,
            z: (_f = startPoint.z) !== null && _f !== void 0 ? _f : 0
        };
    }
    createPawnSprite(imagePath, fallbackColor, size) {
        const material = new three__WEBPACK_IMPORTED_MODULE_3__["SpriteMaterial"]({
            color: fallbackColor,
            transparent: true
        });
        this.textureLoader.load(imagePath, texture => {
            material.map = texture;
            material.color.set(0xffffff);
            material.needsUpdate = true;
        }, undefined, () => {
            material.color.set(fallbackColor);
            material.needsUpdate = true;
        });
        const sprite = new three__WEBPACK_IMPORTED_MODULE_3__["Sprite"](material);
        sprite.scale.set(size, size, 1);
        return sprite;
    }
    initRaycasterClick() {
        this.renderer3D.domElement.removeEventListener('click', this.onCanvasClick);
        this.renderer3D.domElement.addEventListener('click', this.onCanvasClick);
    }
    handleClickOnCabbage(cabbage) {
        if (this.goat_turn) {
            this.showTemporaryMessage("Ce n'est pas au tour du collecteur de choux", 'red');
            return;
        }
        const alreadySelectedIndex = this.selectedCabbageObjects.findIndex(selected => selected.userData.index === cabbage.userData.index);
        if (alreadySelectedIndex !== -1) {
            this.selectedCabbageObjects.splice(alreadySelectedIndex, 1);
            this.setObjectOpacity(cabbage, 1);
        }
        else {
            if (this.selectedCabbageObjects.length < this.harvest_capacity) {
                this.selectedCabbageObjects.push(cabbage);
                this.setObjectOpacity(cabbage, 0.6);
            }
            else {
                this.showTemporaryMessage('Vous avez atteint la limite de récolte pour ce tour', 'red');
            }
        }
        this.displayCollectCount();
    }
    collectCabbages() {
        for (const cabbage of this.selectedCabbageObjects) {
            const index = cabbage.userData.index;
            const positionIndex = this.cabbage_positions.findIndex(cabbagePosition => cabbagePosition.index === index);
            if (positionIndex !== -1) {
                this.cabbage_positions.splice(positionIndex, 1);
            }
            const objectIndex = this.cabbageObjects.findIndex(object => object.userData.index === index);
            if (objectIndex !== -1) {
                this.cabbageObjects.splice(objectIndex, 1);
            }
            this.scene.remove(cabbage);
            this.disposeObject(cabbage);
        }
        this.selectedCabbageObjects = [];
    }
    setObjectOpacity(object, opacity) {
        const material = object.material;
        if (!material) {
            return;
        }
        material.transparent = opacity < 1;
        material.opacity = opacity;
        material.needsUpdate = true;
    }
    moveGoatToNode(node) {
        var _a, _b, _c;
        if (!this.goatObject || !this._graph) {
            return;
        }
        if (!this.goat_turn) {
            this.showTemporaryMessage("Ce n'est pas au tour de la chèvre", 'red');
            return;
        }
        if (this.goat_has_moved) {
            this.showTemporaryMessage("La chèvre a déjà bougé ce tour-ci", 'red');
            return;
        }
        const currentNode = this.goatObject.userData.node;
        if (!currentNode) {
            return;
        }
        const accessibleNodes = this._graph.edges(currentNode);
        const isAccessible = accessibleNodes.some(accessibleNode => accessibleNode.index === node.index);
        if (!isAccessible) {
            this.showTemporaryMessage('La chèvre ne peut se déplacer que sur un sommet adjacent', 'red');
            return;
        }
        this.previous_goat_position = {
            index: currentNode.index,
            x: currentNode.x,
            y: currentNode.y,
            z: currentNode.z,
            node: currentNode
        };
        this.goatObject.position.set((_a = node.x) !== null && _a !== void 0 ? _a : 0, ((_b = node.y) !== null && _b !== void 0 ? _b : 0) + 0.35, (_c = node.z) !== null && _c !== void 0 ? _c : 0);
        this.goatObject.userData.index = node.index;
        this.goatObject.userData.node = node;
        this.goat_has_moved = true;
        this.updateGoatPosition(node);
    }
    updateGoatPosition(newGoatPosition) {
        var _a, _b, _c;
        this.goat_position = {
            index: newGoatPosition.index,
            x: (_a = newGoatPosition.x) !== null && _a !== void 0 ? _a : 0,
            y: (_b = newGoatPosition.y) !== null && _b !== void 0 ? _b : 0,
            z: (_c = newGoatPosition.z) !== null && _c !== void 0 ? _c : 0
        };
        const cabbageIndex = this.cabbage_positions.findIndex(cabbage => cabbage.index === newGoatPosition.index);
        if (cabbageIndex !== -1) {
            this.goat_win = true;
        }
    }
    cancelMove() {
        var _a, _b, _c;
        if (!this.goat_turn) {
            for (const obj of this.selectedCabbageObjects) {
                this.setObjectOpacity(obj, 1);
            }
            this.selectedCabbageObjects = [];
            this.displayCollectCount();
            return;
        }
        if (this.goat_has_moved && this.previous_goat_position && this.goatObject) {
            const prev = this.previous_goat_position;
            this.goatObject.position.set((_a = prev.x) !== null && _a !== void 0 ? _a : 0, ((_b = prev.y) !== null && _b !== void 0 ? _b : 0) + 0.35, (_c = prev.z) !== null && _c !== void 0 ? _c : 0);
            this.goatObject.userData.index = prev.index;
            this.goatObject.userData.node = prev.node;
            this.goat_position = {
                index: prev.index,
                x: prev.x,
                y: prev.y,
                z: prev.z
            };
            this.goat_has_moved = false;
            this.goat_win = false;
            this.previous_goat_position = undefined;
            this.update();
            const limitMsg = document.getElementById('collect-limit');
            if (limitMsg) {
                limitMsg.remove();
            }
        }
    }
    validateTurn() {
        var _a, _b, _c;
        if (this.goat_turn === true) {
            if (!this.goat_has_moved) {
                this.showTemporaryMessage("La chèvre doit bouger avant de finir son tour", 'red');
                return;
            }
            if ((_a = this.goatObject) === null || _a === void 0 ? void 0 : _a.userData.node) {
                this.updateGoatPosition(this.goatObject.userData.node);
            }
            (_b = this.goat_token) === null || _b === void 0 ? void 0 : _b.setState(src_environments_environment__WEBPACK_IMPORTED_MODULE_2__["environment"].pawnWaitingTurn);
            this.goat_has_moved = false;
            this.previous_goat_position = undefined;
        }
        else {
            this.collectCabbages();
            (_c = this.goat_token) === null || _c === void 0 ? void 0 : _c.setState(src_environments_environment__WEBPACK_IMPORTED_MODULE_2__["environment"].pawnOnTurn);
        }
        if (this.checkEnd()) {
            this.handleGameOver();
            return;
        }
        this._turn_count++;
        this.goat_turn = !this.goat_turn;
        this.update();
        if (this.isAiOpponent()) {
            this.executeAiTurn();
        }
    }
    executeAiGoatTurn() {
        var _a;
        if (!this._graph || !this.currentGoatStrategy) {
            console.warn('[IA chèvre] stratégie ou graphe manquant', {
                graph: !!this._graph,
                strategy: !!this.currentGoatStrategy
            });
            return;
        }
        const nextNodeIndex = this.currentGoatStrategy.turnAction(this._graph, this.goat_position.index, this.cabbage_positions.map(c => c.index));
        let nextNode = this._graph.nodes.find(n => n.index === nextNodeIndex);
        if (!nextNode && ((_a = this.goatObject) === null || _a === void 0 ? void 0 : _a.userData.node)) {
            const accessibleNodes = this._graph.edges(this.goatObject.userData.node);
            nextNode = accessibleNodes[0];
        }
        console.log('[IA chèvre] move', {
            from: this.goat_position.index,
            wanted: nextNodeIndex,
            selected: nextNode === null || nextNode === void 0 ? void 0 : nextNode.index
        });
        setTimeout(() => {
            if (nextNode) {
                this.moveGoatToNode(nextNode);
                this.validateTurn();
            }
            else {
                console.warn('[IA chèvre] aucun déplacement possible');
            }
        }, 1000);
    }
    executeAiCollectorTurn() {
        if (!this._graph || !this.currentCollectorStrategy) {
            return;
        }
        const currentCabbageIndices = this.cabbage_positions.map(c => c.index);
        const remainingCabbages = this.currentCollectorStrategy.turnAction(this._graph, this.goat_position.index, currentCabbageIndices);
        const cabbagesToCollectIndices = currentCabbageIndices.filter(index => !remainingCabbages.includes(index));
        this.selectedCabbageObjects = this.cabbageObjects.filter(obj => cabbagesToCollectIndices.includes(obj.userData.index));
        for (const obj of this.selectedCabbageObjects) {
            this.setObjectOpacity(obj, 0.6);
        }
        setTimeout(() => {
            this.validateTurn();
        }, 1000);
    }
    executeAiTurn() {
        const side = this.normalizedPlayerSide();
        console.log('[IA] executeAiTurn', {
            opponent_type: this._opponent_type,
            player_side: this._player_side,
            normalizedSide: side,
            goat_turn: this.goat_turn
        });
        if (!this.isAiOpponent()) {
            return;
        }
        if (side === 'collector' && this.goat_turn) {
            this.executeAiGoatTurn();
            return;
        }
        if (side === 'goat' && !this.goat_turn) {
            this.executeAiCollectorTurn();
            return;
        }
    }
    handleGameOver() {
        const message = this.goat_win
            ? 'La chèvre a gagnée !'
            : 'Le collecteur de choux a gagné !';
        const imgUrl = this.goat_win
            ? 'assets/goat.png'
            : 'assets/harvest.png';
        sweetalert2__WEBPACK_IMPORTED_MODULE_1___default.a.fire({
            title: 'Fin de partie',
            icon: 'success',
            text: message,
            showDenyButton: true,
            denyButtonText: 'Retour au menu',
            confirmButtonText: 'Rejouer',
            imageUrl: imgUrl,
            imageHeight: '10em'
        }).then((result) => {
            if (result.isDenied) {
                this.router.navigate(['/configuration']);
            }
            else if (result.isConfirmed) {
                this.replayCallback();
            }
        });
    }
    checkEnd() {
        return this.goat_win || this.cabbage_positions.length === 0;
    }
    update() {
        if (this.goat_turn === true) {
            this.setDetailsText("C'est au tour de la chèvre", this.goat_color);
        }
        else {
            this.setDetailsText("C'est au tour du collecteur de choux", this.collector_color);
            this.displayCollectCount();
        }
    }
    setDetailsText(message, color) {
        const details = document.getElementById('details-informations');
        if (!details) {
            return;
        }
        details.style.color = color;
        details.textContent = message;
    }
    displayCollectCount() {
        const details = document.getElementById('details-informations');
        if (!details) {
            return;
        }
        const oldInfo = document.getElementById('collect-informations');
        if (oldInfo) {
            oldInfo.remove();
        }
        const paragraph = document.createElement('p');
        paragraph.id = 'collect-informations';
        paragraph.textContent =
            `Nombre de choux restant à collecter : ${this.harvest_capacity - this.selectedCabbageObjects.length}`;
        details.appendChild(paragraph);
    }
    showTemporaryMessage(message, color) {
        const details = document.getElementById('details-informations');
        if (!details) {
            return;
        }
        const oldMessage = document.getElementById('collect-limit');
        if (oldMessage) {
            oldMessage.remove();
        }
        const paragraph = document.createElement('p');
        paragraph.id = 'collect-limit';
        paragraph.style.color = color;
        paragraph.textContent = message;
        details.appendChild(paragraph);
    }
    disposeObject(object) {
        const mesh = object;
        if (mesh.geometry) {
            mesh.geometry.dispose();
        }
        if (Array.isArray(mesh.material)) {
            mesh.material.forEach((material) => material.dispose());
        }
        else if (mesh.material) {
            mesh.material.dispose();
        }
    }
    clearThreeObjects() {
        var _a, _b;
        if (this.renderer3D) {
            this.renderer3D.domElement.removeEventListener('click', this.onCanvasClick);
        }
        for (const cabbage of this.cabbageObjects) {
            (_a = this.scene) === null || _a === void 0 ? void 0 : _a.remove(cabbage);
            this.disposeObject(cabbage);
        }
        if (this.goatObject) {
            (_b = this.scene) === null || _b === void 0 ? void 0 : _b.remove(this.goatObject);
            this.disposeObject(this.goatObject);
            this.goatObject = undefined;
        }
        this.cabbageObjects = [];
        this.selectedCabbageObjects = [];
    }
    getRulesHtml() {
        return `<p>Dans ce jeu, deux camps s'affrontent : <span style='color: ${this.goat_color}'>la chèvre</span> et <span style='color: ${this.collector_color}'>le collecteur de choux</span>.</p>
      <p>Le but de <span style='color: ${this.goat_color}'>la chèvre</span> est de manger un des choux présent sur le plateau de jeu.</p>
      <p>Le but du <span style='color: ${this.collector_color}'>collecteur de choux</span> est de récolter tous les choux présent sur le plateau de jeu avant que la chèvre ne puisse en manger un.</p>
      <br/>
      <p>Le jeu se déroule au tout par tour. Après que <span style='color: ${this.goat_color}'>la chèvre</span> est placée sur le point de départ, <span style='color: ${this.collector_color}'>le collecteur de choux</span> commence à récolter les choux.</p>
      <p><span style='color: ${this.goat_color}'>La chèvre</span> peut se déplacer d'un sommet par tour en suivant les arêtes.</p>
      <p><span style='color: ${this.collector_color}'>Le collecteur de choux</span> peut récolter, par tour, un nombre de choux égal à sa capacité de récolte.</p>`;
    }
    displayRules() {
        sweetalert2__WEBPACK_IMPORTED_MODULE_1___default.a.fire({
            icon: 'info',
            html: this.getRulesHtml()
        });
    }
    get board_conf() {
        if (this._board_configuration === undefined) {
            return 'unknown';
        }
        return this._board_configuration;
    }
    get board_params() {
        return this._board_params;
    }
    get opponent_type() {
        if (this._opponent_type === undefined) {
            return 'unknown';
        }
        return this._opponent_type;
    }
    get player_side() {
        return this._player_side;
    }
    get graph() {
        return this._graph;
    }
    get harvest_capacity() {
        return this._harvest_capacity;
    }
    get selected_level() {
        return this._selected_level;
    }
    get turn_count() {
        return this._turn_count;
    }
    get cabbage_count() {
        return this.cabbage_positions.length;
    }
    set board_conf(conf) {
        this._board_configuration = conf;
    }
    set board_params(params) {
        this._board_params = params;
    }
    set opponent_type(type) {
        this._opponent_type = type;
    }
    set player_side(side) {
        this._player_side = side;
    }
    set graph(graph) {
        this._graph = graph;
    }
    set harvest_capacity(capacity) {
        this._harvest_capacity = capacity;
    }
    set selected_level(level) {
        this._selected_level = level;
    }
    setReplayCallback(callback) {
        this.replayCallback = callback;
    }
    reset() {
        this.clearThreeObjects();
        this.goat_win = false;
        this.goat_turn = false;
        this.goat_has_moved = false;
        this.goat_token = undefined;
        this.goat_position = {
            index: -1,
            x: -1,
            y: -1,
            z: -1
        };
        this.previous_goat_position = undefined;
        this.cabbage_positions = [];
        this.cabbageObjects = [];
        this.selectedCabbageObjects = [];
        this._turn_count = 0;
    }
}
GameService.ɵfac = function GameService_Factory(t) { return new (t || GameService)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_angular_router__WEBPACK_IMPORTED_MODULE_12__["Router"])); };
GameService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({ token: GameService, factory: GameService.ɵfac, providedIn: 'root' });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](GameService, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"],
        args: [{
                providedIn: 'root'
            }]
    }], function () { return [{ type: _angular_router__WEBPACK_IMPORTED_MODULE_12__["Router"] }]; }, null); })();


/***/ }),

/***/ "P+36":
/*!****************************************************************************************!*\
  !*** ./src/app/models/Strategy/ExtremeCollectorStrategy/extreme-collector-strategy.ts ***!
  \****************************************************************************************/
/*! exports provided: ExtremeCollectorStrategy */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ExtremeCollectorStrategy", function() { return ExtremeCollectorStrategy; });
class ExtremeCollectorStrategy {
    constructor(harvestCapacity) {
        this.harvestCapacity = harvestCapacity;
    }
    turnAction(graph, goat_position_index, cabbage_positions_index) {
        const goatNode = graph.nodes.find(n => n.index === goat_position_index);
        if (!goatNode) {
            return cabbage_positions_index;
        }
        const neighborsNode = graph.edges(goatNode);
        if (!neighborsNode || neighborsNode.length === 0) {
            return cabbage_positions_index;
        }
        let results = [];
        let selection = [];
        let bestScore = -1;
        let bestGroupe = [];
        this.formerGroupesDeChoux(selection, results, cabbage_positions_index, 0);
        for (const choice of results) {
            let goatChoice = [];
            let plateauRestant = cabbage_positions_index.filter(c => !choice.includes(c));
            if (plateauRestant.length === 0) {
                bestGroupe = choice;
                break;
            }
            for (const neighbor of neighborsNode) {
                let cabbageByDistance = [];
                for (const cabbageIndex of plateauRestant) {
                    const cabbageNode = graph.nodes.find(n => n.index === cabbageIndex);
                    if (!cabbageNode) {
                        continue;
                    }
                    let distance = graph.distance(neighbor, cabbageNode);
                    cabbageByDistance.push({ distance, cabbageNodeIndex: cabbageNode.index });
                }
                if (cabbageByDistance.length === 0) {
                    continue;
                }
                let minDistanceNeighbor = Math.min(...cabbageByDistance.map(c => c.distance));
                goatChoice.push({ neighbor: neighbor.index, minDistanceNeighbor });
            }
            if (goatChoice.length === 0) {
                continue;
            }
            let score = Math.min(...goatChoice.map(c => c.minDistanceNeighbor));
            if (score > bestScore) {
                bestScore = score;
                bestGroupe = choice;
            }
        }
        if (bestGroupe.length === 0) {
            return cabbage_positions_index;
        }
        return cabbage_positions_index.filter(c => !bestGroupe.includes(c));
    }
    formerGroupesDeChoux(currentSelection, results, sourceArray, startIndex) {
        if (currentSelection.length === this.harvestCapacity) {
            results.push([...currentSelection]);
            return;
        }
        else if (this.harvestCapacity >= sourceArray.length) {
            results.push([...sourceArray]);
            return;
        }
        else {
            for (let i = startIndex; i < sourceArray.length; i++) {
                currentSelection.push(sourceArray[i]);
                this.formerGroupesDeChoux(currentSelection, results, sourceArray, i + 1);
                currentSelection.pop();
            }
        }
    }
}


/***/ }),

/***/ "Q7j9":
/*!**********************************************************************************!*\
  !*** ./src/app/models/Strategy/DifficultStrategyGoat/difficult-goat-strategy.ts ***!
  \**********************************************************************************/
/*! exports provided: DifficultGoatStrategy */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DifficultGoatStrategy", function() { return DifficultGoatStrategy; });
class DifficultGoatStrategy {
    constructor(harvestCapacity) {
        this.harvestCapacity = harvestCapacity;
    }
    turnAction(graph, goat_position_index, cabbage_positions_index) {
        const goatNode = graph.nodes.find(n => n.index === goat_position_index);
        if (!goatNode) {
            return goat_position_index;
        }
        let cabbagesByDistance = [];
        for (const cabbageIndex of cabbage_positions_index) {
            const cabbageNode = graph.nodes.find(n => n.index === cabbageIndex);
            if (!cabbageNode) {
                continue;
            }
            const distance = graph.distance(goatNode, cabbageNode);
            if (distance === 1) {
                return cabbageNode.index;
            }
            cabbagesByDistance.push({ distance, index: cabbageIndex });
        }
        cabbagesByDistance.sort((a, b) => a.distance - b.distance);
        if (cabbagesByDistance.length === 0) {
            return goat_position_index;
        }
        const targetIndex = Math.min(this.harvestCapacity, cabbagesByDistance.length - 1);
        const targetCabbageIndex = cabbagesByDistance[targetIndex].index;
        const targetNode = graph.nodes.find(n => n.index === targetCabbageIndex);
        if (!targetNode) {
            return goat_position_index;
        }
        const neighbors = graph.edges(goatNode);
        let bestNeighborIndex = goat_position_index;
        let minDistance = -1;
        for (const neighbor of neighbors) {
            const d = graph.distance(neighbor, targetNode);
            if (d !== -1 && (minDistance === -1 || d < minDistance)) {
                minDistance = d;
                bestNeighborIndex = neighbor.index;
            }
        }
        return bestNeighborIndex;
    }
}


/***/ }),

/***/ "RYiN":
/*!*******************************************!*\
  !*** ./src/app/models/Graph/Tree/tree.ts ***!
  \*******************************************/
/*! exports provided: Tree */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Tree", function() { return Tree; });
/* harmony import */ var _graph__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../graph */ "Z/gq");
/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! three */ "Womt");


class Tree extends _graph__WEBPACK_IMPORTED_MODULE_0__["Graph"] {
    constructor(nodes, links) {
        super(nodes, links, 'tree');
        this.nodeObjects = [];
        this.linkObjects = [];
    }
    draw(scene) {
        this.clear();
        this.drawLinks(scene);
        this.drawNodes(scene);
    }
    clear() {
        this.nodeObjects = [];
        this.linkObjects = [];
    }
    drawNodes(scene) {
        const geometry = new three__WEBPACK_IMPORTED_MODULE_1__["SphereGeometry"](0.18, 32, 32);
        const material = new three__WEBPACK_IMPORTED_MODULE_1__["MeshPhongMaterial"]({
            color: 0x4caf50,
            shininess: 100,
            specular: 0x111111
        });
        this.nodes.forEach((node) => {
            var _a, _b, _c;
            const sphere = new three__WEBPACK_IMPORTED_MODULE_1__["Mesh"](geometry, material);
            sphere.position.set((_a = node.x) !== null && _a !== void 0 ? _a : 0, (_b = node.y) !== null && _b !== void 0 ? _b : 0, (_c = node.z) !== null && _c !== void 0 ? _c : 0);
            sphere.castShadow = true;
            sphere.receiveShadow = true;
            sphere.userData = {
                index: node.index,
                type: 'node',
                node
            };
            scene.add(sphere);
            this.nodeObjects.push(sphere);
        });
    }
    drawLinks(scene) {
        this.links.forEach((link) => {
            const source = this.getNodeByIndex(link.source);
            const target = this.getNodeByIndex(link.target);
            if (!source || !target) {
                return;
            }
            const edge = this.createEdgeMesh(source, target);
            scene.add(edge);
            this.linkObjects.push(edge);
        });
    }
    createEdgeMesh(source, target) {
        var _a, _b, _c, _d, _e, _f;
        const start = new three__WEBPACK_IMPORTED_MODULE_1__["Vector3"]((_a = source.x) !== null && _a !== void 0 ? _a : 0, (_b = source.y) !== null && _b !== void 0 ? _b : 0, (_c = source.z) !== null && _c !== void 0 ? _c : 0);
        const end = new three__WEBPACK_IMPORTED_MODULE_1__["Vector3"]((_d = target.x) !== null && _d !== void 0 ? _d : 0, (_e = target.y) !== null && _e !== void 0 ? _e : 0, (_f = target.z) !== null && _f !== void 0 ? _f : 0);
        const direction = new three__WEBPACK_IMPORTED_MODULE_1__["Vector3"]().subVectors(end, start);
        const length = direction.length();
        const geometry = new three__WEBPACK_IMPORTED_MODULE_1__["CylinderGeometry"](0.04, 0.04, length, 12);
        const material = new three__WEBPACK_IMPORTED_MODULE_1__["MeshPhongMaterial"]({
            color: 0xaaaaaa,
            shininess: 30
        });
        const cylinder = new three__WEBPACK_IMPORTED_MODULE_1__["Mesh"](geometry, material);
        const midpoint = new three__WEBPACK_IMPORTED_MODULE_1__["Vector3"]().addVectors(start, end).multiplyScalar(0.5);
        cylinder.position.copy(midpoint);
        const axis = new three__WEBPACK_IMPORTED_MODULE_1__["Vector3"](0, 1, 0);
        cylinder.quaternion.setFromUnitVectors(axis, direction.clone().normalize());
        cylinder.castShadow = true;
        cylinder.receiveShadow = true;
        return cylinder;
    }
    getNodeByIndex(index) {
        return this.nodes.find((node) => node.index === index);
    }
    simulate(scene) {
    }
    stop() {
    }
}


/***/ }),

/***/ "Sy1n":
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/*! exports provided: AppComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppComponent", function() { return AppComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "tyNb");



class AppComponent {
    constructor() {
        this.title = 'WebSurfeur';
    }
}
AppComponent.ɵfac = function AppComponent_Factory(t) { return new (t || AppComponent)(); };
AppComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: AppComponent, selectors: [["app-root"]], decls: 1, vars: 0, template: function AppComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "router-outlet");
    } }, directives: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterOutlet"]], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJhcHAuY29tcG9uZW50LnNjc3MifQ== */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](AppComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-root',
                templateUrl: './app.component.html',
                styleUrls: ['./app.component.scss']
            }]
    }], null, null); })();


/***/ }),

/***/ "VK5U":
/*!***************************************************!*\
  !*** ./src/app/models/Graph/Specific/specific.ts ***!
  \***************************************************/
/*! exports provided: Specific */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Specific", function() { return Specific; });
/* harmony import */ var _graph__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../graph */ "Z/gq");
/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! three */ "Womt");


class Specific extends _graph__WEBPACK_IMPORTED_MODULE_0__["Graph"] {
    constructor(nodes, links, typology = 'specific') {
        super(nodes, links, typology);
        this.nodeObjects = [];
        this.linkObjects = [];
    }
    draw(scene) {
        this.clear();
        this.drawLinks(scene);
        this.drawNodes(scene);
    }
    clear() {
        this.nodeObjects = [];
        this.linkObjects = [];
    }
    drawNodes(scene) {
        const geometry = new three__WEBPACK_IMPORTED_MODULE_1__["SphereGeometry"](0.18, 32, 32);
        const material = new three__WEBPACK_IMPORTED_MODULE_1__["MeshPhongMaterial"]({
            color: 0x4caf50,
            shininess: 100,
            specular: 0x111111
        });
        this.nodes.forEach((node) => {
            var _a, _b, _c;
            const sphere = new three__WEBPACK_IMPORTED_MODULE_1__["Mesh"](geometry, material);
            sphere.position.set((_a = node.x) !== null && _a !== void 0 ? _a : 0, (_b = node.y) !== null && _b !== void 0 ? _b : 0, (_c = node.z) !== null && _c !== void 0 ? _c : 0);
            sphere.castShadow = true;
            sphere.receiveShadow = true;
            sphere.userData = {
                index: node.index,
                type: 'node',
                node: node
            };
            scene.add(sphere);
            this.nodeObjects.push(sphere);
        });
    }
    drawLinks(scene) {
        this.links.forEach((link) => {
            const source = this.nodes.find(n => n.index === link.source);
            const target = this.nodes.find(n => n.index === link.target);
            if (!source || !target) {
                return;
            }
            const edge = this.createEdgeMesh(source, target);
            scene.add(edge);
            this.linkObjects.push(edge);
        });
    }
    createEdgeMesh(source, target) {
        var _a, _b, _c, _d, _e, _f;
        const start = new three__WEBPACK_IMPORTED_MODULE_1__["Vector3"]((_a = source.x) !== null && _a !== void 0 ? _a : 0, (_b = source.y) !== null && _b !== void 0 ? _b : 0, (_c = source.z) !== null && _c !== void 0 ? _c : 0);
        const end = new three__WEBPACK_IMPORTED_MODULE_1__["Vector3"]((_d = target.x) !== null && _d !== void 0 ? _d : 0, (_e = target.y) !== null && _e !== void 0 ? _e : 0, (_f = target.z) !== null && _f !== void 0 ? _f : 0);
        const direction = new three__WEBPACK_IMPORTED_MODULE_1__["Vector3"]().subVectors(end, start);
        const length = direction.length();
        const geometry = new three__WEBPACK_IMPORTED_MODULE_1__["CylinderGeometry"](0.04, 0.04, length, 12);
        const material = new three__WEBPACK_IMPORTED_MODULE_1__["MeshPhongMaterial"]({
            color: 0xaaaaaa,
            shininess: 30
        });
        const cylinder = new three__WEBPACK_IMPORTED_MODULE_1__["Mesh"](geometry, material);
        const midpoint = new three__WEBPACK_IMPORTED_MODULE_1__["Vector3"]().addVectors(start, end).multiplyScalar(0.5);
        cylinder.position.copy(midpoint);
        const axis = new three__WEBPACK_IMPORTED_MODULE_1__["Vector3"](0, 1, 0);
        cylinder.quaternion.setFromUnitVectors(axis, direction.clone().normalize());
        cylinder.castShadow = true;
        cylinder.receiveShadow = true;
        return cylinder;
    }
    simulate(scene) {
    }
    stop() {
    }
}


/***/ }),

/***/ "Z/gq":
/*!***************************************!*\
  !*** ./src/app/models/Graph/graph.ts ***!
  \***************************************/
/*! exports provided: Graph */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Graph", function() { return Graph; });
class Graph {
    constructor(nodes, links, typology) {
        this.allowedToMove = false;
        this._nodes = [...nodes];
        this._links = [...links];
        this._typology = typology;
    }
    setAllowedToMove(allowedToMove) {
        this.allowedToMove = allowedToMove;
    }
    getRandomEdge() {
        return Object.assign({}, this._nodes[this.getRandomInt(this._nodes.length - 1)]);
    }
    edges(node, speed = 1, exclude = []) {
        const edges = [];
        if (node.index === undefined) {
            node = node.__data__;
        }
        for (const l of this.links) {
            if (l.source.index === node.index) {
                edges.push(this._nodes.find((n) => n.index === l.target.index));
            }
            else if (l.target.index === node.index) {
                edges.push(this._nodes.find((n) => n.index === l.source.index));
            }
            else if (l.source === node.index) {
                edges.push(this._nodes.find((n) => n.index === l.target));
            }
            else if (l.target === node.index) {
                edges.push(this._nodes.find((n) => n.index === l.source));
            }
        }
        if (speed > 1) {
            return this.globalEdges(edges, --speed, exclude);
        }
        return edges;
    }
    globalEdges(edges, speed, exclude = []) {
        let result = edges;
        let newEdges = [...edges];
        while (speed !== 0) {
            const tmp = [];
            for (const e of newEdges) {
                if (!exclude.includes(e)) {
                    this.edges(e).forEach(n => {
                        if (!result.find(el => el.index === n.index) &&
                            !exclude.some((el) => el.index === n.index)) {
                            result.push(n);
                            tmp.push(n);
                        }
                    });
                }
            }
            newEdges = tmp;
            speed--;
        }
        return result;
    }
    getRandomAccessibleEdges(n, speed) {
        const edges = this.edges(n, speed);
        return edges[this.getRandomInt(edges.length)];
    }
    distance(n1, n2) {
        let distance = 0;
        const marked = [];
        marked.push(n1.index);
        if (n1.index === n2.index) {
            return distance;
        }
        let edges = this.edges(n1).filter(e => !(marked.includes(e.index)));
        while (edges.length > 0) {
            distance++;
            for (const e of edges) {
                if (e.index === n2.index) {
                    return distance;
                }
            }
            const save = edges;
            edges = [];
            for (const e of save) {
                this.edges(e)
                    .filter(i => !(marked.includes(i.index)))
                    .forEach(edge => {
                    let isIn = false;
                    for (const i of edges) {
                        if (i.index === edge.index) {
                            isIn = true;
                        }
                    }
                    if (!isIn) {
                        edges.push(edge);
                    }
                });
                marked.push(e.index);
            }
        }
        return -1;
    }
    get nodes() {
        return this._nodes;
    }
    get links() {
        return this._links;
    }
    get typology() {
        return this._typology;
    }
    set nodes(n) {
        this._nodes = n;
    }
    set links(l) {
        this._links = l;
    }
    set typology(type) {
        this._typology = type;
    }
    getRandomInt(max) {
        return Math.floor(Math.random() * Math.floor(max));
    }
}


/***/ }),

/***/ "Z8kk":
/*!*******************************************************!*\
  !*** ./src/app/components/credit/credit.component.ts ***!
  \*******************************************************/
/*! exports provided: CreditComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CreditComponent", function() { return CreditComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "tyNb");



class CreditComponent {
    constructor() { }
    ngOnInit() {
    }
}
CreditComponent.ɵfac = function CreditComponent_Factory(t) { return new (t || CreditComponent)(); };
CreditComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: CreditComponent, selectors: [["app-credit"]], decls: 69, vars: 0, consts: [[1, "credits-page"], ["aria-label", "En-t\u00EAte des cr\u00E9dits", 1, "credits-header", "card"], ["routerLink", "/game-mode-selection", "aria-label", "Retour au menu", 1, "back-button"], ["src", "assets/arrow.svg", "alt", ""], [1, "title-block"], [1, "eyebrow"], ["aria-hidden", "true", 1, "header-decoration"], ["src", "assets/goat.svg", "alt", ""], ["src", "assets/cabbageV2.svg", "alt", ""], [1, "credit"], [1, "credit-card", "graphist", "card"], ["aria-hidden", "true", 1, "card-icon"], [1, "message"], ["href", "https://www.flaticon.com/fr/", "title", "Flaticon"], [1, "links"], ["href", "https://www.flaticon.com/fr/auteurs/freepik", "title", "Freepik"], ["href", "https://www.freepik.com", "title", "Freepik"], ["href", "https://www.flaticon.com/authors/srip", "title", "srip"], ["href", "https://www.flaticon.com/authors/flat-icons", "title", "Flat Icons"], ["href", "https://www.flaticon.com/authors/photo3idea-studio", "title", "photo3idea_studio"], ["href", "https://www.flaticon.com/authors/pixel-perfect", "title", "Pixel perfect"], ["href", "https://www.flaticon.com/authors/kirill-kazachek", "title", "Kirill Kazachek"], [1, "credit-card", "devs", "card"], [1, "team-list"]], template: function CreditComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "section", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "header", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "button", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](3, "img", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "span");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](5, "Retour");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](7, "span", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](8, "Merci aux contributeurs");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](9, "h1");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](10, "Cr\u00E9dits");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](11, "div", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](12, "img", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](13, "img", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](14, "main", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](15, "section", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](16, "div", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](17, "\uD83C\uDF3F");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](18, "div", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](19, "h2");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](20, "Ressources graphiques");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](21, "p");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](22, " Cette application utilise des ic\u00F4nes et images trouv\u00E9es sur le site ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](23, "a", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](24, "www.flaticon.com");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](25, ". Les images pr\u00E9sentes dans cette application ont \u00E9t\u00E9 con\u00E7ues par les artistes suivants : ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](26, "div", 14);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](27, "ul");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](28, "li");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](29, "a", 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](30, "Freepik");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](31, "span");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](32, "avec le site de");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](33, "a", 16);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](34, "Freepik");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](35, "li");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](36, "a", 17);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](37, "srip");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](38, "li");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](39, "a", 18);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](40, "Flat Icons");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](41, "li");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](42, "a", 19);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](43, "photo3idea_studio");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](44, "li");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](45, "a", 20);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](46, "Pixel perfect");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](47, "li");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](48, "a", 21);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](49, "Kirill Kazachek");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](50, "section", 22);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](51, "div", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](52, "\uD83D\uDC10");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](53, "div", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](54, "h2");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](55, "D\u00E9veloppement & supervision");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](56, "p");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](57, "L'application a \u00E9t\u00E9 d\u00E9velopp\u00E9e et supervis\u00E9e par :");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](58, "ul", 23);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](59, "li");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](60, "Fr\u00E9d\u00E9ric HAVET");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](61, "li");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](62, "Gr\u00E9gory HOAREAU");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](63, "li");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](64, "Dorian MAZAURIC");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](65, "li");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](66, "Nicolas NISSE");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](67, "li");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](68, "Michel SYSKA");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } }, directives: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterLink"]], styles: ["@charset \"UTF-8\";\n[_nghost-%COMP%] {\n  display: block;\n  min-height: 100vh;\n  color: #335126;\n  background: radial-gradient(circle at 8% 12%, rgba(255, 236, 166, 0.6), transparent 28%), radial-gradient(circle at 92% 18%, rgba(179, 222, 121, 0.42), transparent 30%), linear-gradient(135deg, #fff8dc 0%, #eef8d7 48%, #dff0b8 100%);\n}\n.credits-page[_ngcontent-%COMP%] {\n  position: relative;\n  overflow: hidden;\n  min-height: 100vh;\n  padding: clamp(1rem, 3vw, 2rem);\n}\n.credits-page[_ngcontent-%COMP%]::before, .credits-page[_ngcontent-%COMP%]::after {\n  position: fixed;\n  z-index: 0;\n  width: 18rem;\n  height: 18rem;\n  border-radius: 999px;\n  content: \"\";\n  pointer-events: none;\n  filter: blur(3px);\n}\n.credits-page[_ngcontent-%COMP%]::before {\n  right: -6rem;\n  bottom: 6rem;\n  background: rgba(139, 184, 77, 0.18);\n}\n.credits-page[_ngcontent-%COMP%]::after {\n  left: -7rem;\n  bottom: -4rem;\n  background: rgba(222, 174, 87, 0.2);\n}\n.card[_ngcontent-%COMP%] {\n  position: relative;\n  z-index: 1;\n  border: 1px solid rgba(111, 145, 69, 0.22);\n  border-radius: 28px;\n  background: rgba(255, 253, 239, 0.88);\n  box-shadow: 0 18px 45px rgba(83, 105, 43, 0.16);\n  backdrop-filter: blur(12px);\n}\n.credits-header[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: auto 1fr auto;\n  gap: 1.2rem;\n  align-items: center;\n  max-width: 1120px;\n  margin: 0 auto 1.5rem;\n  padding: clamp(1rem, 2.6vw, 1.4rem);\n}\n.back-button[_ngcontent-%COMP%] {\n  display: inline-flex;\n  gap: 0.65rem;\n  align-items: center;\n  justify-content: center;\n  min-height: 3.2rem;\n  padding: 0.75rem 1.1rem;\n  border: 0;\n  border-radius: 999px;\n  color: #3d5a2a;\n  font-weight: 800;\n  letter-spacing: 0.01em;\n  background: linear-gradient(180deg, #fff9d8 0%, #f2dc91 100%);\n  box-shadow: inset 0 -2px 0 rgba(121, 91, 25, 0.12), 0 8px 18px rgba(115, 122, 47, 0.14);\n  cursor: pointer;\n  transition: transform 180ms ease, box-shadow 180ms ease, filter 180ms ease;\n}\n.back-button[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n  width: 1.45rem;\n  height: 1.45rem;\n  object-fit: contain;\n}\n.back-button[_ngcontent-%COMP%]:hover {\n  transform: translateY(-2px);\n  filter: saturate(1.05);\n  box-shadow: inset 0 -2px 0 rgba(121, 91, 25, 0.12), 0 12px 24px rgba(115, 122, 47, 0.2);\n}\n.back-button[_ngcontent-%COMP%]:active {\n  transform: translateY(0);\n}\n.title-block[_ngcontent-%COMP%] {\n  text-align: center;\n}\n.title-block[_ngcontent-%COMP%]   .eyebrow[_ngcontent-%COMP%] {\n  display: inline-block;\n  margin-bottom: 0.2rem;\n  color: #7a8f2f;\n  font-size: 0.82rem;\n  font-weight: 900;\n  letter-spacing: 0.14em;\n  text-transform: uppercase;\n}\n.title-block[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n  margin: 0;\n  color: #38582a;\n  font-size: clamp(2rem, 5vw, 3.4rem);\n  line-height: 1;\n  text-shadow: 0 2px 0 rgba(255, 255, 255, 0.8);\n}\n.header-decoration[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 0.55rem;\n  align-items: center;\n  padding: 0.55rem 0.75rem;\n  border-radius: 999px;\n  background: rgba(232, 245, 202, 0.9);\n}\n.header-decoration[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n  width: 2.4rem;\n  height: 2.4rem;\n  object-fit: contain;\n  filter: drop-shadow(0 4px 5px rgba(63, 83, 34, 0.16));\n}\n.credit[_ngcontent-%COMP%] {\n  position: relative;\n  z-index: 1;\n  display: grid;\n  grid-template-columns: minmax(0, 1.25fr) minmax(280px, 0.75fr);\n  gap: clamp(1rem, 2.5vw, 1.5rem);\n  max-width: 1120px;\n  margin: 0 auto;\n}\n.credit-card[_ngcontent-%COMP%] {\n  overflow: hidden;\n  padding: clamp(1.3rem, 3vw, 2rem);\n}\n.credit-card[_ngcontent-%COMP%]::before {\n  position: absolute;\n  top: 0;\n  right: 0;\n  left: 0;\n  height: 0.45rem;\n  background: linear-gradient(90deg, #9ac75d, #f0d06f, #7fb855);\n  content: \"\";\n}\n.credit-card[_ngcontent-%COMP%]::after {\n  position: absolute;\n  right: -2.5rem;\n  bottom: -2.5rem;\n  width: 9rem;\n  height: 9rem;\n  border-radius: 999px;\n  background: rgba(157, 195, 86, 0.12);\n  content: \"\";\n}\n.card-icon[_ngcontent-%COMP%] {\n  display: inline-grid;\n  place-items: center;\n  width: 3.15rem;\n  height: 3.15rem;\n  margin-bottom: 1rem;\n  border: 1px solid rgba(111, 145, 69, 0.18);\n  border-radius: 18px;\n  font-size: 1.65rem;\n  background: linear-gradient(180deg, #f7fbdc, #e6f2c3);\n  box-shadow: inset 0 -2px 0 rgba(97, 128, 49, 0.08);\n}\n.message[_ngcontent-%COMP%] {\n  position: relative;\n  z-index: 1;\n}\n.message[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  margin: 0 0 0.7rem;\n  color: #42642d;\n  font-size: clamp(1.25rem, 2.4vw, 1.65rem);\n}\n.message[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 0;\n  color: #526844;\n  font-size: 1rem;\n  line-height: 1.65;\n}\na[_ngcontent-%COMP%] {\n  color: #5f8128;\n  font-weight: 800;\n  text-decoration: none;\n  box-shadow: inset 0 -0.12em 0 rgba(174, 207, 91, 0.45);\n  transition: color 160ms ease, box-shadow 160ms ease;\n}\na[_ngcontent-%COMP%]:hover {\n  color: #3f671f;\n  box-shadow: inset 0 -0.5em 0 rgba(174, 207, 91, 0.35);\n}\n.links[_ngcontent-%COMP%] {\n  position: relative;\n  z-index: 1;\n  margin-top: 1.4rem;\n}\n.links[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(2, minmax(0, 1fr));\n  gap: 0.75rem;\n  padding: 0;\n  margin: 0;\n  list-style: none;\n}\n.links[_ngcontent-%COMP%]   li[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 0.35rem;\n  align-items: center;\n  min-height: 3rem;\n  padding: 0.78rem 0.9rem;\n  border: 1px solid rgba(121, 154, 72, 0.18);\n  border-radius: 18px;\n  color: #60704a;\n  background: rgba(246, 250, 225, 0.78);\n  transition: transform 160ms ease, background 160ms ease, box-shadow 160ms ease;\n}\n.links[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]::before {\n  content: \"\uD83E\uDD6C\";\n  font-size: 1rem;\n}\n.links[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]:hover {\n  transform: translateY(-2px);\n  background: rgba(255, 252, 226, 0.95);\n  box-shadow: 0 10px 20px rgba(85, 111, 45, 0.12);\n}\n.team-list[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 0.75rem;\n  padding: 0;\n  margin: 1.35rem 0 0;\n  list-style: none;\n}\n.team-list[_ngcontent-%COMP%]   li[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 0.65rem;\n  align-items: center;\n  padding: 0.82rem 0.95rem;\n  border: 1px solid rgba(121, 154, 72, 0.18);\n  border-radius: 18px;\n  color: #465e35;\n  font-weight: 800;\n  background: rgba(246, 250, 225, 0.78);\n  transition: transform 160ms ease, box-shadow 160ms ease;\n}\n.team-list[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]::before {\n  display: inline-grid;\n  place-items: center;\n  width: 1.65rem;\n  height: 1.65rem;\n  border-radius: 50%;\n  color: #496b25;\n  background: #e3f0bf;\n  content: \"\u2713\";\n}\n.team-list[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]:hover {\n  transform: translateX(3px);\n  box-shadow: 0 8px 16px rgba(85, 111, 45, 0.1);\n}\n@media (max-width: 820px) {\n  .credits-header[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n    text-align: center;\n  }\n\n  .back-button[_ngcontent-%COMP%], .header-decoration[_ngcontent-%COMP%] {\n    justify-self: center;\n  }\n\n  .credit[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n\n  .links[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n}\n@media (max-width: 520px) {\n  .credits-page[_ngcontent-%COMP%] {\n    padding: 0.8rem;\n  }\n\n  .card[_ngcontent-%COMP%] {\n    border-radius: 22px;\n  }\n\n  .back-button[_ngcontent-%COMP%] {\n    width: 100%;\n  }\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uXFwuLlxcLi5cXC4uXFxjcmVkaXQuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsZ0JBQWdCO0FBQWhCO0VBQ0ksY0FBQTtFQUNBLGlCQUFBO0VBQ0EsY0FBQTtFQUNBLHdPQUNJO0FBQ1I7QUFJQTtFQUNJLGtCQUFBO0VBQ0EsZ0JBQUE7RUFDQSxpQkFBQTtFQUNBLCtCQUFBO0FBREo7QUFHSTtFQUVJLGVBQUE7RUFDQSxVQUFBO0VBQ0EsWUFBQTtFQUNBLGFBQUE7RUFDQSxvQkFBQTtFQUNBLFdBQUE7RUFDQSxvQkFBQTtFQUNBLGlCQUFBO0FBRlI7QUFLSTtFQUNJLFlBQUE7RUFDQSxZQUFBO0VBQ0Esb0NBQUE7QUFIUjtBQU1JO0VBQ0ksV0FBQTtFQUNBLGFBQUE7RUFDQSxtQ0FBQTtBQUpSO0FBUUE7RUFDSSxrQkFBQTtFQUNBLFVBQUE7RUFDQSwwQ0FBQTtFQUNBLG1CQUFBO0VBQ0EscUNBQUE7RUFDQSwrQ0FBQTtFQUNBLDJCQUFBO0FBTEo7QUFRQTtFQUNJLGFBQUE7RUFDQSxvQ0FBQTtFQUNBLFdBQUE7RUFDQSxtQkFBQTtFQUNBLGlCQUFBO0VBQ0EscUJBQUE7RUFDQSxtQ0FBQTtBQUxKO0FBUUE7RUFDSSxvQkFBQTtFQUNBLFlBQUE7RUFDQSxtQkFBQTtFQUNBLHVCQUFBO0VBQ0Esa0JBQUE7RUFDQSx1QkFBQTtFQUNBLFNBQUE7RUFDQSxvQkFBQTtFQUNBLGNBQUE7RUFDQSxnQkFBQTtFQUNBLHNCQUFBO0VBQ0EsNkRBQUE7RUFDQSx1RkFBQTtFQUNBLGVBQUE7RUFDQSwwRUFBQTtBQUxKO0FBT0k7RUFDSSxjQUFBO0VBQ0EsZUFBQTtFQUNBLG1CQUFBO0FBTFI7QUFRSTtFQUNJLDJCQUFBO0VBQ0Esc0JBQUE7RUFDQSx1RkFBQTtBQU5SO0FBU0k7RUFDSSx3QkFBQTtBQVBSO0FBV0E7RUFDSSxrQkFBQTtBQVJKO0FBVUk7RUFDSSxxQkFBQTtFQUNBLHFCQUFBO0VBQ0EsY0FBQTtFQUNBLGtCQUFBO0VBQ0EsZ0JBQUE7RUFDQSxzQkFBQTtFQUNBLHlCQUFBO0FBUlI7QUFXSTtFQUNJLFNBQUE7RUFDQSxjQUFBO0VBQ0EsbUNBQUE7RUFDQSxjQUFBO0VBQ0EsNkNBQUE7QUFUUjtBQWFBO0VBQ0ksYUFBQTtFQUNBLFlBQUE7RUFDQSxtQkFBQTtFQUNBLHdCQUFBO0VBQ0Esb0JBQUE7RUFDQSxvQ0FBQTtBQVZKO0FBWUk7RUFDSSxhQUFBO0VBQ0EsY0FBQTtFQUNBLG1CQUFBO0VBQ0EscURBQUE7QUFWUjtBQWNBO0VBQ0ksa0JBQUE7RUFDQSxVQUFBO0VBQ0EsYUFBQTtFQUNBLDhEQUFBO0VBQ0EsK0JBQUE7RUFDQSxpQkFBQTtFQUNBLGNBQUE7QUFYSjtBQWNBO0VBQ0ksZ0JBQUE7RUFDQSxpQ0FBQTtBQVhKO0FBYUk7RUFDSSxrQkFBQTtFQUNBLE1BQUE7RUFDQSxRQUFBO0VBQ0EsT0FBQTtFQUNBLGVBQUE7RUFDQSw2REFBQTtFQUNBLFdBQUE7QUFYUjtBQWNJO0VBQ0ksa0JBQUE7RUFDQSxjQUFBO0VBQ0EsZUFBQTtFQUNBLFdBQUE7RUFDQSxZQUFBO0VBQ0Esb0JBQUE7RUFDQSxvQ0FBQTtFQUNBLFdBQUE7QUFaUjtBQWdCQTtFQUNJLG9CQUFBO0VBQ0EsbUJBQUE7RUFDQSxjQUFBO0VBQ0EsZUFBQTtFQUNBLG1CQUFBO0VBQ0EsMENBQUE7RUFDQSxtQkFBQTtFQUNBLGtCQUFBO0VBQ0EscURBQUE7RUFDQSxrREFBQTtBQWJKO0FBZ0JBO0VBQ0ksa0JBQUE7RUFDQSxVQUFBO0FBYko7QUFlSTtFQUNJLGtCQUFBO0VBQ0EsY0FBQTtFQUNBLHlDQUFBO0FBYlI7QUFnQkk7RUFDSSxTQUFBO0VBQ0EsY0FBQTtFQUNBLGVBQUE7RUFDQSxpQkFBQTtBQWRSO0FBa0JBO0VBQ0ksY0FBQTtFQUNBLGdCQUFBO0VBQ0EscUJBQUE7RUFDQSxzREFBQTtFQUNBLG1EQUFBO0FBZko7QUFpQkk7RUFDSSxjQUFBO0VBQ0EscURBQUE7QUFmUjtBQW1CQTtFQUNJLGtCQUFBO0VBQ0EsVUFBQTtFQUNBLGtCQUFBO0FBaEJKO0FBa0JJO0VBQ0ksYUFBQTtFQUNBLGdEQUFBO0VBQ0EsWUFBQTtFQUNBLFVBQUE7RUFDQSxTQUFBO0VBQ0EsZ0JBQUE7QUFoQlI7QUFtQkk7RUFDSSxhQUFBO0VBQ0EsZUFBQTtFQUNBLFlBQUE7RUFDQSxtQkFBQTtFQUNBLGdCQUFBO0VBQ0EsdUJBQUE7RUFDQSwwQ0FBQTtFQUNBLG1CQUFBO0VBQ0EsY0FBQTtFQUNBLHFDQUFBO0VBQ0EsOEVBQUE7QUFqQlI7QUFtQlE7RUFDSSxhQUFBO0VBQ0EsZUFBQTtBQWpCWjtBQW9CUTtFQUNJLDJCQUFBO0VBQ0EscUNBQUE7RUFDQSwrQ0FBQTtBQWxCWjtBQXVCQTtFQUNJLGFBQUE7RUFDQSxZQUFBO0VBQ0EsVUFBQTtFQUNBLG1CQUFBO0VBQ0EsZ0JBQUE7QUFwQko7QUFzQkk7RUFDSSxhQUFBO0VBQ0EsWUFBQTtFQUNBLG1CQUFBO0VBQ0Esd0JBQUE7RUFDQSwwQ0FBQTtFQUNBLG1CQUFBO0VBQ0EsY0FBQTtFQUNBLGdCQUFBO0VBQ0EscUNBQUE7RUFDQSx1REFBQTtBQXBCUjtBQXNCUTtFQUNJLG9CQUFBO0VBQ0EsbUJBQUE7RUFDQSxjQUFBO0VBQ0EsZUFBQTtFQUNBLGtCQUFBO0VBQ0EsY0FBQTtFQUNBLG1CQUFBO0VBQ0EsWUFBQTtBQXBCWjtBQXVCUTtFQUNJLDBCQUFBO0VBQ0EsNkNBQUE7QUFyQlo7QUEwQkE7RUFDSTtJQUNJLDBCQUFBO0lBQ0Esa0JBQUE7RUF2Qk47O0VBMEJFOztJQUVJLG9CQUFBO0VBdkJOOztFQTBCRTtJQUNJLDBCQUFBO0VBdkJOOztFQTBCRTtJQUNJLDBCQUFBO0VBdkJOO0FBQ0Y7QUEwQkE7RUFDSTtJQUNJLGVBQUE7RUF4Qk47O0VBMkJFO0lBQ0ksbUJBQUE7RUF4Qk47O0VBMkJFO0lBQ0ksV0FBQTtFQXhCTjtBQUNGIiwiZmlsZSI6ImNyZWRpdC5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIkBjaGFyc2V0IFwiVVRGLThcIjtcbjpob3N0IHtcbiAgZGlzcGxheTogYmxvY2s7XG4gIG1pbi1oZWlnaHQ6IDEwMHZoO1xuICBjb2xvcjogIzMzNTEyNjtcbiAgYmFja2dyb3VuZDogcmFkaWFsLWdyYWRpZW50KGNpcmNsZSBhdCA4JSAxMiUsIHJnYmEoMjU1LCAyMzYsIDE2NiwgMC42KSwgdHJhbnNwYXJlbnQgMjglKSwgcmFkaWFsLWdyYWRpZW50KGNpcmNsZSBhdCA5MiUgMTglLCByZ2JhKDE3OSwgMjIyLCAxMjEsIDAuNDIpLCB0cmFuc3BhcmVudCAzMCUpLCBsaW5lYXItZ3JhZGllbnQoMTM1ZGVnLCAjZmZmOGRjIDAlLCAjZWVmOGQ3IDQ4JSwgI2RmZjBiOCAxMDAlKTtcbn1cblxuLmNyZWRpdHMtcGFnZSB7XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgbWluLWhlaWdodDogMTAwdmg7XG4gIHBhZGRpbmc6IGNsYW1wKDFyZW0sIDN2dywgMnJlbSk7XG59XG4uY3JlZGl0cy1wYWdlOjpiZWZvcmUsIC5jcmVkaXRzLXBhZ2U6OmFmdGVyIHtcbiAgcG9zaXRpb246IGZpeGVkO1xuICB6LWluZGV4OiAwO1xuICB3aWR0aDogMThyZW07XG4gIGhlaWdodDogMThyZW07XG4gIGJvcmRlci1yYWRpdXM6IDk5OXB4O1xuICBjb250ZW50OiBcIlwiO1xuICBwb2ludGVyLWV2ZW50czogbm9uZTtcbiAgZmlsdGVyOiBibHVyKDNweCk7XG59XG4uY3JlZGl0cy1wYWdlOjpiZWZvcmUge1xuICByaWdodDogLTZyZW07XG4gIGJvdHRvbTogNnJlbTtcbiAgYmFja2dyb3VuZDogcmdiYSgxMzksIDE4NCwgNzcsIDAuMTgpO1xufVxuLmNyZWRpdHMtcGFnZTo6YWZ0ZXIge1xuICBsZWZ0OiAtN3JlbTtcbiAgYm90dG9tOiAtNHJlbTtcbiAgYmFja2dyb3VuZDogcmdiYSgyMjIsIDE3NCwgODcsIDAuMik7XG59XG5cbi5jYXJkIHtcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xuICB6LWluZGV4OiAxO1xuICBib3JkZXI6IDFweCBzb2xpZCByZ2JhKDExMSwgMTQ1LCA2OSwgMC4yMik7XG4gIGJvcmRlci1yYWRpdXM6IDI4cHg7XG4gIGJhY2tncm91bmQ6IHJnYmEoMjU1LCAyNTMsIDIzOSwgMC44OCk7XG4gIGJveC1zaGFkb3c6IDAgMThweCA0NXB4IHJnYmEoODMsIDEwNSwgNDMsIDAuMTYpO1xuICBiYWNrZHJvcC1maWx0ZXI6IGJsdXIoMTJweCk7XG59XG5cbi5jcmVkaXRzLWhlYWRlciB7XG4gIGRpc3BsYXk6IGdyaWQ7XG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogYXV0byAxZnIgYXV0bztcbiAgZ2FwOiAxLjJyZW07XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIG1heC13aWR0aDogMTEyMHB4O1xuICBtYXJnaW46IDAgYXV0byAxLjVyZW07XG4gIHBhZGRpbmc6IGNsYW1wKDFyZW0sIDIuNnZ3LCAxLjRyZW0pO1xufVxuXG4uYmFjay1idXR0b24ge1xuICBkaXNwbGF5OiBpbmxpbmUtZmxleDtcbiAgZ2FwOiAwLjY1cmVtO1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgbWluLWhlaWdodDogMy4ycmVtO1xuICBwYWRkaW5nOiAwLjc1cmVtIDEuMXJlbTtcbiAgYm9yZGVyOiAwO1xuICBib3JkZXItcmFkaXVzOiA5OTlweDtcbiAgY29sb3I6ICMzZDVhMmE7XG4gIGZvbnQtd2VpZ2h0OiA4MDA7XG4gIGxldHRlci1zcGFjaW5nOiAwLjAxZW07XG4gIGJhY2tncm91bmQ6IGxpbmVhci1ncmFkaWVudCgxODBkZWcsICNmZmY5ZDggMCUsICNmMmRjOTEgMTAwJSk7XG4gIGJveC1zaGFkb3c6IGluc2V0IDAgLTJweCAwIHJnYmEoMTIxLCA5MSwgMjUsIDAuMTIpLCAwIDhweCAxOHB4IHJnYmEoMTE1LCAxMjIsIDQ3LCAwLjE0KTtcbiAgY3Vyc29yOiBwb2ludGVyO1xuICB0cmFuc2l0aW9uOiB0cmFuc2Zvcm0gMTgwbXMgZWFzZSwgYm94LXNoYWRvdyAxODBtcyBlYXNlLCBmaWx0ZXIgMTgwbXMgZWFzZTtcbn1cbi5iYWNrLWJ1dHRvbiBpbWcge1xuICB3aWR0aDogMS40NXJlbTtcbiAgaGVpZ2h0OiAxLjQ1cmVtO1xuICBvYmplY3QtZml0OiBjb250YWluO1xufVxuLmJhY2stYnV0dG9uOmhvdmVyIHtcbiAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC0ycHgpO1xuICBmaWx0ZXI6IHNhdHVyYXRlKDEuMDUpO1xuICBib3gtc2hhZG93OiBpbnNldCAwIC0ycHggMCByZ2JhKDEyMSwgOTEsIDI1LCAwLjEyKSwgMCAxMnB4IDI0cHggcmdiYSgxMTUsIDEyMiwgNDcsIDAuMik7XG59XG4uYmFjay1idXR0b246YWN0aXZlIHtcbiAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKDApO1xufVxuXG4udGl0bGUtYmxvY2sge1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG59XG4udGl0bGUtYmxvY2sgLmV5ZWJyb3cge1xuICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XG4gIG1hcmdpbi1ib3R0b206IDAuMnJlbTtcbiAgY29sb3I6ICM3YThmMmY7XG4gIGZvbnQtc2l6ZTogMC44MnJlbTtcbiAgZm9udC13ZWlnaHQ6IDkwMDtcbiAgbGV0dGVyLXNwYWNpbmc6IDAuMTRlbTtcbiAgdGV4dC10cmFuc2Zvcm06IHVwcGVyY2FzZTtcbn1cbi50aXRsZS1ibG9jayBoMSB7XG4gIG1hcmdpbjogMDtcbiAgY29sb3I6ICMzODU4MmE7XG4gIGZvbnQtc2l6ZTogY2xhbXAoMnJlbSwgNXZ3LCAzLjRyZW0pO1xuICBsaW5lLWhlaWdodDogMTtcbiAgdGV4dC1zaGFkb3c6IDAgMnB4IDAgcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjgpO1xufVxuXG4uaGVhZGVyLWRlY29yYXRpb24ge1xuICBkaXNwbGF5OiBmbGV4O1xuICBnYXA6IDAuNTVyZW07XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIHBhZGRpbmc6IDAuNTVyZW0gMC43NXJlbTtcbiAgYm9yZGVyLXJhZGl1czogOTk5cHg7XG4gIGJhY2tncm91bmQ6IHJnYmEoMjMyLCAyNDUsIDIwMiwgMC45KTtcbn1cbi5oZWFkZXItZGVjb3JhdGlvbiBpbWcge1xuICB3aWR0aDogMi40cmVtO1xuICBoZWlnaHQ6IDIuNHJlbTtcbiAgb2JqZWN0LWZpdDogY29udGFpbjtcbiAgZmlsdGVyOiBkcm9wLXNoYWRvdygwIDRweCA1cHggcmdiYSg2MywgODMsIDM0LCAwLjE2KSk7XG59XG5cbi5jcmVkaXQge1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gIHotaW5kZXg6IDE7XG4gIGRpc3BsYXk6IGdyaWQ7XG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogbWlubWF4KDAsIDEuMjVmcikgbWlubWF4KDI4MHB4LCAwLjc1ZnIpO1xuICBnYXA6IGNsYW1wKDFyZW0sIDIuNXZ3LCAxLjVyZW0pO1xuICBtYXgtd2lkdGg6IDExMjBweDtcbiAgbWFyZ2luOiAwIGF1dG87XG59XG5cbi5jcmVkaXQtY2FyZCB7XG4gIG92ZXJmbG93OiBoaWRkZW47XG4gIHBhZGRpbmc6IGNsYW1wKDEuM3JlbSwgM3Z3LCAycmVtKTtcbn1cbi5jcmVkaXQtY2FyZDo6YmVmb3JlIHtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICB0b3A6IDA7XG4gIHJpZ2h0OiAwO1xuICBsZWZ0OiAwO1xuICBoZWlnaHQ6IDAuNDVyZW07XG4gIGJhY2tncm91bmQ6IGxpbmVhci1ncmFkaWVudCg5MGRlZywgIzlhYzc1ZCwgI2YwZDA2ZiwgIzdmYjg1NSk7XG4gIGNvbnRlbnQ6IFwiXCI7XG59XG4uY3JlZGl0LWNhcmQ6OmFmdGVyIHtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICByaWdodDogLTIuNXJlbTtcbiAgYm90dG9tOiAtMi41cmVtO1xuICB3aWR0aDogOXJlbTtcbiAgaGVpZ2h0OiA5cmVtO1xuICBib3JkZXItcmFkaXVzOiA5OTlweDtcbiAgYmFja2dyb3VuZDogcmdiYSgxNTcsIDE5NSwgODYsIDAuMTIpO1xuICBjb250ZW50OiBcIlwiO1xufVxuXG4uY2FyZC1pY29uIHtcbiAgZGlzcGxheTogaW5saW5lLWdyaWQ7XG4gIHBsYWNlLWl0ZW1zOiBjZW50ZXI7XG4gIHdpZHRoOiAzLjE1cmVtO1xuICBoZWlnaHQ6IDMuMTVyZW07XG4gIG1hcmdpbi1ib3R0b206IDFyZW07XG4gIGJvcmRlcjogMXB4IHNvbGlkIHJnYmEoMTExLCAxNDUsIDY5LCAwLjE4KTtcbiAgYm9yZGVyLXJhZGl1czogMThweDtcbiAgZm9udC1zaXplOiAxLjY1cmVtO1xuICBiYWNrZ3JvdW5kOiBsaW5lYXItZ3JhZGllbnQoMTgwZGVnLCAjZjdmYmRjLCAjZTZmMmMzKTtcbiAgYm94LXNoYWRvdzogaW5zZXQgMCAtMnB4IDAgcmdiYSg5NywgMTI4LCA0OSwgMC4wOCk7XG59XG5cbi5tZXNzYWdlIHtcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xuICB6LWluZGV4OiAxO1xufVxuLm1lc3NhZ2UgaDIge1xuICBtYXJnaW46IDAgMCAwLjdyZW07XG4gIGNvbG9yOiAjNDI2NDJkO1xuICBmb250LXNpemU6IGNsYW1wKDEuMjVyZW0sIDIuNHZ3LCAxLjY1cmVtKTtcbn1cbi5tZXNzYWdlIHAge1xuICBtYXJnaW46IDA7XG4gIGNvbG9yOiAjNTI2ODQ0O1xuICBmb250LXNpemU6IDFyZW07XG4gIGxpbmUtaGVpZ2h0OiAxLjY1O1xufVxuXG5hIHtcbiAgY29sb3I6ICM1ZjgxMjg7XG4gIGZvbnQtd2VpZ2h0OiA4MDA7XG4gIHRleHQtZGVjb3JhdGlvbjogbm9uZTtcbiAgYm94LXNoYWRvdzogaW5zZXQgMCAtMC4xMmVtIDAgcmdiYSgxNzQsIDIwNywgOTEsIDAuNDUpO1xuICB0cmFuc2l0aW9uOiBjb2xvciAxNjBtcyBlYXNlLCBib3gtc2hhZG93IDE2MG1zIGVhc2U7XG59XG5hOmhvdmVyIHtcbiAgY29sb3I6ICMzZjY3MWY7XG4gIGJveC1zaGFkb3c6IGluc2V0IDAgLTAuNWVtIDAgcmdiYSgxNzQsIDIwNywgOTEsIDAuMzUpO1xufVxuXG4ubGlua3Mge1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gIHotaW5kZXg6IDE7XG4gIG1hcmdpbi10b3A6IDEuNHJlbTtcbn1cbi5saW5rcyB1bCB7XG4gIGRpc3BsYXk6IGdyaWQ7XG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KDIsIG1pbm1heCgwLCAxZnIpKTtcbiAgZ2FwOiAwLjc1cmVtO1xuICBwYWRkaW5nOiAwO1xuICBtYXJnaW46IDA7XG4gIGxpc3Qtc3R5bGU6IG5vbmU7XG59XG4ubGlua3MgbGkge1xuICBkaXNwbGF5OiBmbGV4O1xuICBmbGV4LXdyYXA6IHdyYXA7XG4gIGdhcDogMC4zNXJlbTtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgbWluLWhlaWdodDogM3JlbTtcbiAgcGFkZGluZzogMC43OHJlbSAwLjlyZW07XG4gIGJvcmRlcjogMXB4IHNvbGlkIHJnYmEoMTIxLCAxNTQsIDcyLCAwLjE4KTtcbiAgYm9yZGVyLXJhZGl1czogMThweDtcbiAgY29sb3I6ICM2MDcwNGE7XG4gIGJhY2tncm91bmQ6IHJnYmEoMjQ2LCAyNTAsIDIyNSwgMC43OCk7XG4gIHRyYW5zaXRpb246IHRyYW5zZm9ybSAxNjBtcyBlYXNlLCBiYWNrZ3JvdW5kIDE2MG1zIGVhc2UsIGJveC1zaGFkb3cgMTYwbXMgZWFzZTtcbn1cbi5saW5rcyBsaTo6YmVmb3JlIHtcbiAgY29udGVudDogXCLwn6WsXCI7XG4gIGZvbnQtc2l6ZTogMXJlbTtcbn1cbi5saW5rcyBsaTpob3ZlciB7XG4gIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgtMnB4KTtcbiAgYmFja2dyb3VuZDogcmdiYSgyNTUsIDI1MiwgMjI2LCAwLjk1KTtcbiAgYm94LXNoYWRvdzogMCAxMHB4IDIwcHggcmdiYSg4NSwgMTExLCA0NSwgMC4xMik7XG59XG5cbi50ZWFtLWxpc3Qge1xuICBkaXNwbGF5OiBncmlkO1xuICBnYXA6IDAuNzVyZW07XG4gIHBhZGRpbmc6IDA7XG4gIG1hcmdpbjogMS4zNXJlbSAwIDA7XG4gIGxpc3Qtc3R5bGU6IG5vbmU7XG59XG4udGVhbS1saXN0IGxpIHtcbiAgZGlzcGxheTogZmxleDtcbiAgZ2FwOiAwLjY1cmVtO1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBwYWRkaW5nOiAwLjgycmVtIDAuOTVyZW07XG4gIGJvcmRlcjogMXB4IHNvbGlkIHJnYmEoMTIxLCAxNTQsIDcyLCAwLjE4KTtcbiAgYm9yZGVyLXJhZGl1czogMThweDtcbiAgY29sb3I6ICM0NjVlMzU7XG4gIGZvbnQtd2VpZ2h0OiA4MDA7XG4gIGJhY2tncm91bmQ6IHJnYmEoMjQ2LCAyNTAsIDIyNSwgMC43OCk7XG4gIHRyYW5zaXRpb246IHRyYW5zZm9ybSAxNjBtcyBlYXNlLCBib3gtc2hhZG93IDE2MG1zIGVhc2U7XG59XG4udGVhbS1saXN0IGxpOjpiZWZvcmUge1xuICBkaXNwbGF5OiBpbmxpbmUtZ3JpZDtcbiAgcGxhY2UtaXRlbXM6IGNlbnRlcjtcbiAgd2lkdGg6IDEuNjVyZW07XG4gIGhlaWdodDogMS42NXJlbTtcbiAgYm9yZGVyLXJhZGl1czogNTAlO1xuICBjb2xvcjogIzQ5NmIyNTtcbiAgYmFja2dyb3VuZDogI2UzZjBiZjtcbiAgY29udGVudDogXCLinJNcIjtcbn1cbi50ZWFtLWxpc3QgbGk6aG92ZXIge1xuICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVgoM3B4KTtcbiAgYm94LXNoYWRvdzogMCA4cHggMTZweCByZ2JhKDg1LCAxMTEsIDQ1LCAwLjEpO1xufVxuXG5AbWVkaWEgKG1heC13aWR0aDogODIwcHgpIHtcbiAgLmNyZWRpdHMtaGVhZGVyIHtcbiAgICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IDFmcjtcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gIH1cblxuICAuYmFjay1idXR0b24sXG4uaGVhZGVyLWRlY29yYXRpb24ge1xuICAgIGp1c3RpZnktc2VsZjogY2VudGVyO1xuICB9XG5cbiAgLmNyZWRpdCB7XG4gICAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiAxZnI7XG4gIH1cblxuICAubGlua3MgdWwge1xuICAgIGdyaWQtdGVtcGxhdGUtY29sdW1uczogMWZyO1xuICB9XG59XG5AbWVkaWEgKG1heC13aWR0aDogNTIwcHgpIHtcbiAgLmNyZWRpdHMtcGFnZSB7XG4gICAgcGFkZGluZzogMC44cmVtO1xuICB9XG5cbiAgLmNhcmQge1xuICAgIGJvcmRlci1yYWRpdXM6IDIycHg7XG4gIH1cblxuICAuYmFjay1idXR0b24ge1xuICAgIHdpZHRoOiAxMDAlO1xuICB9XG59Il19 */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](CreditComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-credit',
                templateUrl: './credit.component.html',
                styleUrls: ['./credit.component.scss']
            }]
    }], function () { return []; }, null); })();


/***/ }),

/***/ "ZAI4":
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/*! exports provided: AppModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/platform-browser */ "jhN1");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _app_routing_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app-routing.module */ "vY5A");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app.component */ "Sy1n");
/* harmony import */ var _components_configuration_menu_configuration_menu_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./components/configuration-menu/configuration-menu.component */ "z01l");
/* harmony import */ var _components_game_mode_menu_game_mode_menu_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./components/game-mode-menu/game-mode-menu.component */ "mzHN");
/* harmony import */ var _services_game_game_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./services/game/game.service */ "Ks4N");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/forms */ "3Pt+");
/* harmony import */ var _components_credit_credit_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./components/credit/credit.component */ "Z8kk");
/* harmony import */ var _components_board_board_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./components/board/board.component */ "qtDB");











class AppModule {
}
AppModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineNgModule"]({ type: AppModule, bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_3__["AppComponent"]] });
AppModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjector"]({ factory: function AppModule_Factory(t) { return new (t || AppModule)(); }, providers: [
        _services_game_game_service__WEBPACK_IMPORTED_MODULE_6__["GameService"],
    ], imports: [[
            _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"],
            _app_routing_module__WEBPACK_IMPORTED_MODULE_2__["AppRoutingModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_7__["FormsModule"]
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵsetNgModuleScope"](AppModule, { declarations: [_app_component__WEBPACK_IMPORTED_MODULE_3__["AppComponent"],
        _components_configuration_menu_configuration_menu_component__WEBPACK_IMPORTED_MODULE_4__["ConfigurationMenuComponent"],
        _components_game_mode_menu_game_mode_menu_component__WEBPACK_IMPORTED_MODULE_5__["GameModeMenuComponent"],
        _components_board_board_component__WEBPACK_IMPORTED_MODULE_9__["BoardComponent"],
        _components_credit_credit_component__WEBPACK_IMPORTED_MODULE_8__["CreditComponent"]], imports: [_angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"],
        _app_routing_module__WEBPACK_IMPORTED_MODULE_2__["AppRoutingModule"],
        _angular_forms__WEBPACK_IMPORTED_MODULE_7__["FormsModule"]] }); })();
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵsetClassMetadata"](AppModule, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"],
        args: [{
                declarations: [
                    _app_component__WEBPACK_IMPORTED_MODULE_3__["AppComponent"],
                    _components_configuration_menu_configuration_menu_component__WEBPACK_IMPORTED_MODULE_4__["ConfigurationMenuComponent"],
                    _components_game_mode_menu_game_mode_menu_component__WEBPACK_IMPORTED_MODULE_5__["GameModeMenuComponent"],
                    _components_board_board_component__WEBPACK_IMPORTED_MODULE_9__["BoardComponent"],
                    _components_credit_credit_component__WEBPACK_IMPORTED_MODULE_8__["CreditComponent"]
                ],
                imports: [
                    _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"],
                    _app_routing_module__WEBPACK_IMPORTED_MODULE_2__["AppRoutingModule"],
                    _angular_forms__WEBPACK_IMPORTED_MODULE_7__["FormsModule"]
                ],
                providers: [
                    _services_game_game_service__WEBPACK_IMPORTED_MODULE_6__["GameService"],
                ],
                bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_3__["AppComponent"]]
            }]
    }], null, null); })();


/***/ }),

/***/ "bHuV":
/*!****************************************************************************!*\
  !*** ./src/app/models/Strategy/NormalGoatStrategy/normal-goat-strategy.ts ***!
  \****************************************************************************/
/*! exports provided: NormalGoatStrategy */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NormalGoatStrategy", function() { return NormalGoatStrategy; });
class NormalGoatStrategy {
    turnAction(graph, goat_index, cabbage_indices) {
        if (cabbage_indices.length === 0) {
            return goat_index;
        }
        const goatNode = graph.nodes.find(n => n.index === goat_index);
        if (!goatNode) {
            return goat_index;
        }
        const firstCabbageNode = graph.nodes.find(n => n.index === cabbage_indices[0]);
        if (!firstCabbageNode) {
            return goat_index;
        }
        let minDistance = graph.distance(goatNode, firstCabbageNode);
        let targetCabbageIndex = cabbage_indices[0];
        for (const cabbageIndex of cabbage_indices) {
            const cabbageNode = graph.nodes.find(n => n.index === cabbageIndex);
            if (!cabbageNode) {
                continue;
            }
            const distance = graph.distance(goatNode, cabbageNode);
            if (distance !== -1 && (minDistance === -1 || distance < minDistance)) {
                minDistance = distance;
                targetCabbageIndex = cabbageIndex;
            }
        }
        if (minDistance === -1) {
            return goat_index;
        }
        const neighbors = graph.edges(goatNode);
        const targetNode = graph.nodes.find(n => n.index === targetCabbageIndex);
        if (!targetNode) {
            return goat_index;
        }
        let bestNeighborIndex = goat_index;
        let minNeighborDistance = -1;
        for (const neighbor of neighbors) {
            const distance = graph.distance(neighbor, targetNode);
            if (distance !== -1 && (minNeighborDistance === -1 || distance < minNeighborDistance)) {
                minNeighborDistance = distance;
                bestNeighborIndex = neighbor.index;
            }
        }
        return bestNeighborIndex;
    }
}


/***/ }),

/***/ "eKDq":
/*!*********************************************************!*\
  !*** ./src/app/models/Graph/Specific/hexagonal-grid.ts ***!
  \*********************************************************/
/*! exports provided: HexagonalGrid */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HexagonalGrid", function() { return HexagonalGrid; });
/* harmony import */ var _graph__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../graph */ "Z/gq");
/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! three */ "Womt");


class HexagonalGrid extends _graph__WEBPACK_IMPORTED_MODULE_0__["Graph"] {
    constructor(nodes, links) {
        super(nodes, links, 'hexagonal-grid');
        this.nodeObjects = [];
        this.linkObjects = [];
    }
    clear() {
        this.nodeObjects = [];
        this.linkObjects = [];
    }
    draw(scene) {
        this.clear();
        this.drawLinks(scene);
        this.drawNodes(scene);
    }
    drawNodes(scene) {
        const geometry = new three__WEBPACK_IMPORTED_MODULE_1__["SphereGeometry"](0.18, 32, 32);
        const material = new three__WEBPACK_IMPORTED_MODULE_1__["MeshPhongMaterial"]({
            color: 0x4caf50,
            shininess: 100,
            specular: 0x111111
        });
        this.nodes.forEach(n => {
            const mesh = new three__WEBPACK_IMPORTED_MODULE_1__["Mesh"](geometry, material);
            mesh.position.set(n.x, n.y, n.z);
            mesh.userData = { type: 'node', index: n.index, node: n };
            mesh.castShadow = true;
            mesh.receiveShadow = true;
            scene.add(mesh);
            this.nodeObjects.push(mesh);
        });
    }
    drawLinks(scene) {
        this.links.forEach(l => {
            const sourceNode = this.nodes.find(n => n.index === l.source);
            const targetNode = this.nodes.find(n => n.index === l.target);
            if (sourceNode && targetNode) {
                const mesh = this.createEdgeMesh(sourceNode, targetNode);
                scene.add(mesh);
                this.linkObjects.push(mesh);
            }
        });
    }
    createEdgeMesh(source, target) {
        var _a, _b, _c, _d, _e, _f;
        const start = new three__WEBPACK_IMPORTED_MODULE_1__["Vector3"]((_a = source.x) !== null && _a !== void 0 ? _a : 0, (_b = source.y) !== null && _b !== void 0 ? _b : 0, (_c = source.z) !== null && _c !== void 0 ? _c : 0);
        const end = new three__WEBPACK_IMPORTED_MODULE_1__["Vector3"]((_d = target.x) !== null && _d !== void 0 ? _d : 0, (_e = target.y) !== null && _e !== void 0 ? _e : 0, (_f = target.z) !== null && _f !== void 0 ? _f : 0);
        const direction = new three__WEBPACK_IMPORTED_MODULE_1__["Vector3"]().subVectors(end, start);
        const length = direction.length();
        const geometry = new three__WEBPACK_IMPORTED_MODULE_1__["CylinderGeometry"](0.04, 0.04, length, 12);
        const material = new three__WEBPACK_IMPORTED_MODULE_1__["MeshPhongMaterial"]({
            color: 0xaaaaaa,
            shininess: 30
        });
        const cylinder = new three__WEBPACK_IMPORTED_MODULE_1__["Mesh"](geometry, material);
        const midpoint = new three__WEBPACK_IMPORTED_MODULE_1__["Vector3"]().addVectors(start, end).multiplyScalar(0.5);
        cylinder.position.copy(midpoint);
        const axis = new three__WEBPACK_IMPORTED_MODULE_1__["Vector3"](0, 1, 0);
        cylinder.quaternion.setFromUnitVectors(axis, direction.clone().normalize());
        cylinder.castShadow = true;
        cylinder.receiveShadow = true;
        return cylinder;
    }
    simulate(scene) { }
    stop() { }
}


/***/ }),

/***/ "jVQC":
/*!********************************************************************************************!*\
  !*** ./src/app/models/Strategy/DifficultCollectorStrategy/difficult-collector-strategy.ts ***!
  \********************************************************************************************/
/*! exports provided: DifficultCollectorStrategy */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DifficultCollectorStrategy", function() { return DifficultCollectorStrategy; });
class DifficultCollectorStrategy {
    constructor(harvestCapacity) {
        this.harvestCapacity = harvestCapacity;
    }
    turnAction(graph, goat_index, cabbage_indices) {
        const nodeGoat = graph.nodes.find(n => n.index === goat_index);
        if (!nodeGoat) {
            return cabbage_indices;
        }
        let cabbageDistances = [];
        const neighborNodes = graph.edges(nodeGoat);
        if (neighborNodes.length === 0) {
            return cabbage_indices;
        }
        for (let cabbageIndex of cabbage_indices) {
            let minDistance = 99999;
            for (let neighbor of neighborNodes) {
                const nodeCabbage = graph.nodes.find(n => n.index === cabbageIndex);
                if (!nodeCabbage) {
                    continue;
                }
                const distance = graph.distance(neighbor, nodeCabbage);
                if (distance < minDistance) {
                    minDistance = distance;
                }
            }
            cabbageDistances.push({ distance: minDistance, index: cabbageIndex });
        }
        cabbageDistances.sort((a, b) => a.distance - b.distance);
        const cabbagesToCollect = Math.min(this.harvestCapacity, cabbageDistances.length);
        cabbageDistances.splice(0, cabbagesToCollect);
        return cabbageDistances.map(c => c.index);
    }
}


/***/ }),

/***/ "mzHN":
/*!***********************************************************************!*\
  !*** ./src/app/components/game-mode-menu/game-mode-menu.component.ts ***!
  \***********************************************************************/
/*! exports provided: GameModeMenuComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GameModeMenuComponent", function() { return GameModeMenuComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var src_app_services_game_game_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/services/game/game.service */ "Ks4N");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "tyNb");




class GameModeMenuComponent {
    constructor(gameService) {
        this.gameService = gameService;
    }
    ngOnInit() {
    }
    displayRules() {
        this.gameService.displayRules();
    }
}
GameModeMenuComponent.ɵfac = function GameModeMenuComponent_Factory(t) { return new (t || GameModeMenuComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](src_app_services_game_game_service__WEBPACK_IMPORTED_MODULE_1__["GameService"])); };
GameModeMenuComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: GameModeMenuComponent, selectors: [["app-game-mode-menu"]], decls: 78, vars: 0, consts: [[1, "selection"], ["aria-hidden", "true", 1, "bg-graph"], ["viewBox", "0 0 1200 700", "preserveAspectRatio", "xMidYMid slice", "xmlns", "http://www.w3.org/2000/svg", 1, "bg-graph__svg"], ["stroke", "rgba(255,255,255,0.06)", "stroke-width", "1.5", "fill", "none", 1, "bg-edges"], ["x1", "120", "y1", "140", "x2", "380", "y2", "260"], ["x1", "380", "y1", "260", "x2", "600", "y2", "120"], ["x1", "600", "y1", "120", "x2", "820", "y2", "280"], ["x1", "820", "y1", "280", "x2", "1080", "y2", "160"], ["x1", "380", "y1", "260", "x2", "480", "y2", "480"], ["x1", "600", "y1", "120", "x2", "480", "y2", "480"], ["x1", "820", "y1", "280", "x2", "700", "y2", "520"], ["x1", "480", "y1", "480", "x2", "700", "y2", "520"], ["x1", "700", "y1", "520", "x2", "950", "y2", "580"], ["x1", "1080", "y1", "160", "x2", "950", "y2", "580"], ["x1", "120", "y1", "140", "x2", "480", "y2", "480"], ["x1", "240", "y1", "580", "x2", "480", "y2", "480"], ["x1", "240", "y1", "580", "x2", "700", "y2", "520"], ["fill", "rgba(255,255,255,0.12)", 1, "bg-nodes"], ["cx", "120", "cy", "140", "r", "7"], ["cx", "380", "cy", "260", "r", "9"], ["cx", "600", "cy", "120", "r", "8"], ["cx", "820", "cy", "280", "r", "10"], ["cx", "1080", "cy", "160", "r", "7"], ["cx", "480", "cy", "480", "r", "11"], ["cx", "700", "cy", "520", "r", "9"], ["cx", "950", "cy", "580", "r", "7"], ["cx", "240", "cy", "580", "r", "8"], [1, "ms-header"], [1, "ms-header__logo"], ["src", "assets/logo-TN.png", "alt", "Logo Terra Numerica", 1, "ms-header__logo-img"], [1, "ms-header__text"], [1, "ms-header__eyebrow"], [1, "ms-header__title"], [1, "ms-grid"], ["routerLink", "/configuration", "tabindex", "0", "role", "button", 1, "ms-card", "ms-card--play"], [1, "ms-card__glow"], [1, "ms-card__icon-wrap"], ["src", "assets/free-game.svg", "alt", "", 1, "ms-card__icon"], [1, "ms-card__body"], [1, "ms-card__tag"], [1, "ms-card__name"], [1, "ms-card__desc"], [1, "ms-card__arrow"], ["tabindex", "0", "role", "button", 1, "ms-card", "ms-card--rules", 3, "click"], ["src", "assets/rules.svg", "alt", "", 1, "ms-card__icon"], ["routerLink", "/credit", "tabindex", "0", "role", "button", 1, "ms-card", "ms-card--credits"], ["src", "assets/hand-shake.svg", "alt", "", 1, "ms-card__icon"]], template: function GameModeMenuComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceSVG"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "svg", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "g", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](4, "line", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](5, "line", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](6, "line", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](7, "line", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](8, "line", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](9, "line", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](10, "line", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](11, "line", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](12, "line", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](13, "line", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](14, "line", 14);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](15, "line", 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](16, "line", 16);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](17, "g", 17);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](18, "circle", 18);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](19, "circle", 19);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](20, "circle", 20);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](21, "circle", 21);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](22, "circle", 22);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](23, "circle", 23);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](24, "circle", 24);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](25, "circle", 25);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](26, "circle", 26);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceHTML"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](27, "header", 27);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](28, "div", 28);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](29, "img", 29);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](30, "div", 30);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](31, "span", 31);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](32, "Terra Numerica");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](33, "h1", 32);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](34, "Jeu de la ch\u00E8vre");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](35, "br");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](36, "em");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](37, "et des choux");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](38, "main", 33);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](39, "div", 34);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](40, "div", 35);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](41, "div", 36);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](42, "img", 37);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](43, "div", 38);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](44, "span", 39);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](45, "Jouer");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](46, "h2", 40);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](47, "Jeu libre");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](48, "p", 41);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](49, "Configurez votre plateau, vos adversaires et lancez la partie.");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](50, "span", 42);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](51, "\u2192");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](52, "div", 43);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function GameModeMenuComponent_Template_div_click_52_listener() { return ctx.displayRules(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](53, "div", 35);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](54, "div", 36);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](55, "img", 44);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](56, "div", 38);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](57, "span", 39);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](58, "Info");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](59, "h2", 40);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](60, "Voir les r\u00E8gles");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](61, "p", 41);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](62, "Comprenez les m\u00E9caniques du jeu avant de vous lancer.");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](63, "span", 42);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](64, "\u2192");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](65, "div", 45);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](66, "div", 35);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](67, "div", 36);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](68, "img", 46);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](69, "div", 38);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](70, "span", 39);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](71, "\u00C9quipe");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](72, "h2", 40);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](73, "Cr\u00E9dits");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](74, "p", 41);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](75, "D\u00E9couvrez les contributeurs du projet Terra Numerica.");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](76, "span", 42);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](77, "\u2192");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } }, directives: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterLink"]], styles: ["@import url(\"https://fonts.googleapis.com/css2?family=Syne:wght@600;700;800&family=DM+Sans:ital,wght@0,400;0,500;1,400&display=swap\");\n  body {\n  margin: 0;\n  padding: 0;\n  background: linear-gradient(180deg, #f8faff 0%, #eef3f9 100%);\n  font-family: \"DM Sans\", sans-serif;\n}\n*[_ngcontent-%COMP%] {\n  box-sizing: border-box;\n}\n.selection[_ngcontent-%COMP%] {\n  position: relative;\n  min-height: 100vh;\n  padding: 48px 24px 56px;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  gap: 48px;\n  overflow: hidden;\n  color: #18212f;\n  background: radial-gradient(circle at top left, rgba(96, 165, 250, 0.08), transparent 30%), radial-gradient(circle at bottom right, rgba(167, 139, 250, 0.08), transparent 28%), linear-gradient(180deg, #f8faff 0%, #eef3f9 100%);\n}\n.bg-graph[_ngcontent-%COMP%] {\n  position: absolute;\n  inset: 0;\n  pointer-events: none;\n  overflow: hidden;\n}\n.bg-graph__svg[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 100%;\n  opacity: 0.5;\n  animation: bgDrift 24s ease-in-out infinite alternate;\n}\n.bg-nodes[_ngcontent-%COMP%]   circle[_ngcontent-%COMP%] {\n  animation: nodePulse 5s ease-in-out infinite;\n}\n.bg-nodes[_ngcontent-%COMP%]   circle[_ngcontent-%COMP%]:nth-child(2) {\n  animation-delay: 0.8s;\n}\n.bg-nodes[_ngcontent-%COMP%]   circle[_ngcontent-%COMP%]:nth-child(3) {\n  animation-delay: 1.4s;\n}\n.bg-nodes[_ngcontent-%COMP%]   circle[_ngcontent-%COMP%]:nth-child(4) {\n  animation-delay: 2s;\n}\n.bg-nodes[_ngcontent-%COMP%]   circle[_ngcontent-%COMP%]:nth-child(5) {\n  animation-delay: 0.4s;\n}\n.bg-nodes[_ngcontent-%COMP%]   circle[_ngcontent-%COMP%]:nth-child(6) {\n  animation-delay: 2.4s;\n}\n.bg-nodes[_ngcontent-%COMP%]   circle[_ngcontent-%COMP%]:nth-child(7) {\n  animation-delay: 1.1s;\n}\n.bg-nodes[_ngcontent-%COMP%]   circle[_ngcontent-%COMP%]:nth-child(8) {\n  animation-delay: 3s;\n}\n.bg-nodes[_ngcontent-%COMP%]   circle[_ngcontent-%COMP%]:nth-child(9) {\n  animation-delay: 1.8s;\n}\n.ms-header[_ngcontent-%COMP%] {\n  position: relative;\n  z-index: 2;\n  display: flex;\n  align-items: center;\n  gap: 24px;\n  text-align: left;\n  animation: fadeUp 0.7s ease;\n}\n.ms-header__logo-img[_ngcontent-%COMP%] {\n  width: auto;\n  height: 72px;\n  object-fit: contain;\n  filter: drop-shadow(0 8px 16px rgba(52, 211, 153, 0.16));\n}\n.ms-header__eyebrow[_ngcontent-%COMP%] {\n  display: block;\n  margin-bottom: 6px;\n  font-size: 0.72rem;\n  font-weight: 700;\n  letter-spacing: 0.18em;\n  text-transform: uppercase;\n  color: #98a3b3;\n}\n.ms-header__title[_ngcontent-%COMP%] {\n  margin: 0;\n  font-family: \"Syne\", sans-serif;\n  font-size: clamp(1.8rem, 3vw, 2.7rem);\n  font-weight: 800;\n  line-height: 1.1;\n  letter-spacing: -0.03em;\n  color: #18212f;\n}\n.ms-header__title[_ngcontent-%COMP%]   em[_ngcontent-%COMP%] {\n  font-style: italic;\n  font-weight: 600;\n  color: #6f7c8f;\n}\n.ms-grid[_ngcontent-%COMP%] {\n  position: relative;\n  z-index: 2;\n  width: 100%;\n  max-width: 1100px;\n  display: flex;\n  flex-wrap: wrap;\n  justify-content: center;\n  gap: 16px;\n}\n.ms-card[_ngcontent-%COMP%] {\n  position: relative;\n  width: 200px;\n  min-height: 230px;\n  padding: 22px 20px;\n  display: flex;\n  flex-direction: column;\n  gap: 14px;\n  border-radius: 18px;\n  background: rgba(255, 255, 255, 0.78);\n  border: 1px solid rgba(20, 40, 80, 0.08);\n  box-shadow: 0 10px 30px rgba(22, 34, 51, 0.08);\n  backdrop-filter: blur(10px);\n  -webkit-backdrop-filter: blur(10px);\n  cursor: pointer;\n  transition: transform 0.22s ease, box-shadow 0.22s ease, border-color 0.22s ease, background 0.22s ease;\n  overflow: hidden;\n  outline: none;\n  animation: fadeUp 0.55s ease both;\n}\n.ms-card[_ngcontent-%COMP%]:nth-child(1) {\n  animation-delay: 0.08s;\n}\n.ms-card[_ngcontent-%COMP%]:nth-child(2) {\n  animation-delay: 0.16s;\n}\n.ms-card[_ngcontent-%COMP%]:nth-child(3) {\n  animation-delay: 0.24s;\n}\n.ms-card[_ngcontent-%COMP%]:nth-child(4) {\n  animation-delay: 0.32s;\n}\n.ms-card[_ngcontent-%COMP%]:nth-child(5) {\n  animation-delay: 0.4s;\n}\n.ms-card[_ngcontent-%COMP%]:hover, .ms-card[_ngcontent-%COMP%]:focus {\n  transform: translateY(-6px);\n  border-color: var(--accent-border);\n  box-shadow: 0 14px 34px rgba(22, 34, 51, 0.12), 0 0 0 1px var(--accent-border);\n}\n.ms-card[_ngcontent-%COMP%]:hover   .ms-card__glow[_ngcontent-%COMP%], .ms-card[_ngcontent-%COMP%]:focus   .ms-card__glow[_ngcontent-%COMP%] {\n  opacity: 1;\n}\n.ms-card[_ngcontent-%COMP%]:hover   .ms-card__icon-wrap[_ngcontent-%COMP%], .ms-card[_ngcontent-%COMP%]:focus   .ms-card__icon-wrap[_ngcontent-%COMP%] {\n  background: var(--accent-soft);\n  border-color: var(--accent-border);\n}\n.ms-card[_ngcontent-%COMP%]:hover   .ms-card__icon[_ngcontent-%COMP%], .ms-card[_ngcontent-%COMP%]:focus   .ms-card__icon[_ngcontent-%COMP%] {\n  transform: scale(1.06);\n}\n.ms-card[_ngcontent-%COMP%]:hover   .ms-card__arrow[_ngcontent-%COMP%], .ms-card[_ngcontent-%COMP%]:focus   .ms-card__arrow[_ngcontent-%COMP%] {\n  opacity: 1;\n  transform: translateX(0);\n}\n.ms-card--play[_ngcontent-%COMP%] {\n  --accent: #34d399;\n  --accent-soft: rgba(52, 211, 153, 0.12);\n  --accent-border: rgba(52, 211, 153, 0.3);\n}\n.ms-card--adventure[_ngcontent-%COMP%] {\n  --accent: #f59e0b;\n  --accent-soft: rgba(245, 158, 11, 0.12);\n  --accent-border: rgba(245, 158, 11, 0.3);\n}\n.ms-card--editor[_ngcontent-%COMP%] {\n  --accent: #60a5fa;\n  --accent-soft: rgba(96, 165, 250, 0.12);\n  --accent-border: rgba(96, 165, 250, 0.3);\n}\n.ms-card--rules[_ngcontent-%COMP%] {\n  --accent: #a78bfa;\n  --accent-soft: rgba(167, 139, 250, 0.12);\n  --accent-border: rgba(167, 139, 250, 0.3);\n}\n.ms-card--credits[_ngcontent-%COMP%] {\n  --accent: #f472b6;\n  --accent-soft: rgba(244, 114, 182, 0.12);\n  --accent-border: rgba(244, 114, 182, 0.3);\n}\n.ms-card__glow[_ngcontent-%COMP%] {\n  position: absolute;\n  inset: 0;\n  border-radius: inherit;\n  background: radial-gradient(circle at top, var(--accent-soft) 0%, transparent 70%);\n  opacity: 0;\n  transition: opacity 0.25s ease;\n  pointer-events: none;\n}\n.ms-card__icon-wrap[_ngcontent-%COMP%] {\n  width: 56px;\n  height: 56px;\n  border-radius: 14px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  background: rgba(255, 255, 255, 0.92);\n  border: 1px solid rgba(20, 40, 80, 0.08);\n  transition: background 0.22s ease, border-color 0.22s ease;\n}\n.ms-card__icon[_ngcontent-%COMP%] {\n  width: 30px;\n  height: 30px;\n  object-fit: contain;\n  filter: opacity(0.72);\n  transition: transform 0.22s ease;\n}\n.ms-card__body[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 6px;\n  flex: 1;\n}\n.ms-card__tag[_ngcontent-%COMP%] {\n  font-family: \"Syne\", sans-serif;\n  font-size: 0.65rem;\n  font-weight: 700;\n  letter-spacing: 0.14em;\n  text-transform: uppercase;\n  color: var(--accent);\n}\n.ms-card__name[_ngcontent-%COMP%] {\n  margin: 0;\n  font-family: \"Syne\", sans-serif;\n  font-size: 1.02rem;\n  font-weight: 700;\n  line-height: 1.2;\n  color: #18212f;\n}\n.ms-card__desc[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 0.78rem;\n  line-height: 1.5;\n  color: #6f7c8f;\n}\n.ms-card__arrow[_ngcontent-%COMP%] {\n  align-self: flex-end;\n  margin-top: auto;\n  font-size: 1.15rem;\n  color: var(--accent);\n  opacity: 0;\n  transform: translateX(-6px);\n  transition: opacity 0.22s ease, transform 0.22s ease;\n}\n@keyframes fadeUp {\n  from {\n    opacity: 0;\n    transform: translateY(18px);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0);\n  }\n}\n@keyframes nodePulse {\n  0%, 100% {\n    opacity: 0.35;\n    r: 6;\n  }\n  50% {\n    opacity: 0.8;\n    r: 9;\n  }\n}\n@keyframes bgDrift {\n  from {\n    transform: translate(0, 0) scale(1);\n  }\n  to {\n    transform: translate(-12px, 10px) scale(1.02);\n  }\n}\n@media (max-width: 900px) {\n  .selection[_ngcontent-%COMP%] {\n    padding: 36px 18px 48px;\n    gap: 36px;\n  }\n\n  .ms-header[_ngcontent-%COMP%] {\n    flex-direction: column;\n    text-align: center;\n    gap: 14px;\n  }\n\n  .ms-grid[_ngcontent-%COMP%] {\n    gap: 12px;\n  }\n\n  .ms-card[_ngcontent-%COMP%] {\n    width: calc(50% - 12px);\n    min-width: 150px;\n    min-height: 210px;\n  }\n}\n@media (max-width: 560px) {\n  .selection[_ngcontent-%COMP%] {\n    justify-content: flex-start;\n    overflow-y: auto;\n  }\n\n  .ms-card[_ngcontent-%COMP%] {\n    width: 100%;\n    min-height: auto;\n    flex-direction: row;\n    align-items: center;\n    gap: 16px;\n    padding: 18px;\n  }\n\n  .ms-card__body[_ngcontent-%COMP%] {\n    gap: 4px;\n  }\n\n  .ms-card__desc[_ngcontent-%COMP%] {\n    display: none;\n  }\n\n  .ms-card__arrow[_ngcontent-%COMP%] {\n    display: none;\n  }\n\n  .editor[_ngcontent-%COMP%] {\n    display: none !important;\n  }\n\n    body {\n    overflow: auto;\n  }\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uXFwuLlxcLi5cXC4uXFxnYW1lLW1vZGUtbWVudS5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBUSxxSUFBQTtBQWtDUjtFQUNFLFNBQUE7RUFDQSxVQUFBO0VBQ0EsNkRBQUE7RUFDQSxrQ0F0QlU7QUFWWjtBQW1DQTtFQUNFLHNCQUFBO0FBaENGO0FBc0NBO0VBQ0Usa0JBQUE7RUFDQSxpQkFBQTtFQUNBLHVCQUFBO0VBQ0EsYUFBQTtFQUNBLHNCQUFBO0VBQ0EsbUJBQUE7RUFDQSx1QkFBQTtFQUNBLFNBQUE7RUFDQSxnQkFBQTtFQUNBLGNBL0NLO0VBZ0RMLGtPQUNFO0FBcENKO0FBNENBO0VBQ0Usa0JBQUE7RUFDQSxRQUFBO0VBQ0Esb0JBQUE7RUFDQSxnQkFBQTtBQXpDRjtBQTJDRTtFQUNFLFdBQUE7RUFDQSxZQUFBO0VBQ0EsWUFBQTtFQUNBLHFEQUFBO0FBekNKO0FBNkNBO0VBQ0UsNENBQUE7QUExQ0Y7QUE0Q0U7RUFBaUIscUJBQUE7QUF6Q25CO0FBMENFO0VBQWlCLHFCQUFBO0FBdkNuQjtBQXdDRTtFQUFpQixtQkFBQTtBQXJDbkI7QUFzQ0U7RUFBaUIscUJBQUE7QUFuQ25CO0FBb0NFO0VBQWlCLHFCQUFBO0FBakNuQjtBQWtDRTtFQUFpQixxQkFBQTtBQS9CbkI7QUFnQ0U7RUFBaUIsbUJBQUE7QUE3Qm5CO0FBOEJFO0VBQWlCLHFCQUFBO0FBM0JuQjtBQWlDQTtFQUNFLGtCQUFBO0VBQ0EsVUFBQTtFQUNBLGFBQUE7RUFDQSxtQkFBQTtFQUNBLFNBQUE7RUFDQSxnQkFBQTtFQUNBLDJCQUFBO0FBOUJGO0FBZ0NFO0VBQ0UsV0FBQTtFQUNBLFlBQUE7RUFDQSxtQkFBQTtFQUNBLHdEQUFBO0FBOUJKO0FBaUNFO0VBQ0UsY0FBQTtFQUNBLGtCQUFBO0VBQ0Esa0JBQUE7RUFDQSxnQkFBQTtFQUNBLHNCQUFBO0VBQ0EseUJBQUE7RUFDQSxjQTVHUztBQTZFYjtBQWtDRTtFQUNFLFNBQUE7RUFDQSwrQkEvR1M7RUFnSFQscUNBQUE7RUFDQSxnQkFBQTtFQUNBLGdCQUFBO0VBQ0EsdUJBQUE7RUFDQSxjQXhIRztBQXdGUDtBQWtDSTtFQUNFLGtCQUFBO0VBQ0EsZ0JBQUE7RUFDQSxjQTVISztBQTRGWDtBQXdDQTtFQUNFLGtCQUFBO0VBQ0EsVUFBQTtFQUNBLFdBQUE7RUFDQSxpQkFBQTtFQUNBLGFBQUE7RUFDQSxlQUFBO0VBQ0EsdUJBQUE7RUFDQSxTQUFBO0FBckNGO0FBMkNBO0VBQ0Usa0JBQUE7RUFDQSxZQUFBO0VBQ0EsaUJBQUE7RUFDQSxrQkFBQTtFQUNBLGFBQUE7RUFDQSxzQkFBQTtFQUNBLFNBQUE7RUFDQSxtQkFBQTtFQUNBLHFDQWpLUTtFQWtLUix3Q0FBQTtFQUNBLDhDQWhLTztFQWlLUCwyQkFBQTtFQUNBLG1DQUFBO0VBQ0EsZUFBQTtFQUNBLHVHQUNFO0VBSUYsZ0JBQUE7RUFDQSxhQUFBO0VBQ0EsaUNBQUE7QUE1Q0Y7QUErQ0k7RUFDRSxzQkFBQTtBQTdDTjtBQTRDSTtFQUNFLHNCQUFBO0FBMUNOO0FBeUNJO0VBQ0Usc0JBQUE7QUF2Q047QUFzQ0k7RUFDRSxzQkFBQTtBQXBDTjtBQW1DSTtFQUNFLHFCQUFBO0FBakNOO0FBcUNFO0VBRUUsMkJBQUE7RUFDQSxrQ0FBQTtFQUNBLDhFQUNFO0FBckNOO0FBd0NJO0VBQ0UsVUFBQTtBQXRDTjtBQXlDSTtFQUNFLDhCQUFBO0VBQ0Esa0NBQUE7QUF2Q047QUEwQ0k7RUFDRSxzQkFBQTtBQXhDTjtBQTJDSTtFQUNFLFVBQUE7RUFDQSx3QkFBQTtBQXpDTjtBQTZDRTtFQTdMQSxpQkFBQTtFQUNBLHVDQUFBO0VBQ0Esd0NBQUE7QUFtSkY7QUF5Q0U7RUE5TEEsaUJBQUE7RUFDQSx1Q0FBQTtFQUNBLHdDQUFBO0FBd0pGO0FBcUNFO0VBL0xBLGlCQUFBO0VBQ0EsdUNBQUE7RUFDQSx3Q0FBQTtBQTZKRjtBQWlDRTtFQWhNQSxpQkFBQTtFQUNBLHdDQUFBO0VBQ0EseUNBQUE7QUFrS0Y7QUE2QkU7RUFqTUEsaUJBQUE7RUFDQSx3Q0FBQTtFQUNBLHlDQUFBO0FBdUtGO0FBMEJFO0VBQ0Usa0JBQUE7RUFDQSxRQUFBO0VBQ0Esc0JBQUE7RUFDQSxrRkFBQTtFQUNBLFVBQUE7RUFDQSw4QkFBQTtFQUNBLG9CQUFBO0FBeEJKO0FBMkJFO0VBQ0UsV0FBQTtFQUNBLFlBQUE7RUFDQSxtQkFBQTtFQUNBLGFBQUE7RUFDQSxtQkFBQTtFQUNBLHVCQUFBO0VBQ0EscUNBdk9hO0VBd09iLHdDQUFBO0VBQ0EsMERBQUE7QUF6Qko7QUE0QkU7RUFDRSxXQUFBO0VBQ0EsWUFBQTtFQUNBLG1CQUFBO0VBQ0EscUJBQUE7RUFDQSxnQ0FBQTtBQTFCSjtBQTZCRTtFQUNFLGFBQUE7RUFDQSxzQkFBQTtFQUNBLFFBQUE7RUFDQSxPQUFBO0FBM0JKO0FBOEJFO0VBQ0UsK0JBcFBTO0VBcVBULGtCQUFBO0VBQ0EsZ0JBQUE7RUFDQSxzQkFBQTtFQUNBLHlCQUFBO0VBQ0Esb0JBQUE7QUE1Qko7QUErQkU7RUFDRSxTQUFBO0VBQ0EsK0JBOVBTO0VBK1BULGtCQUFBO0VBQ0EsZ0JBQUE7RUFDQSxnQkFBQTtFQUNBLGNBdFFHO0FBeU9QO0FBZ0NFO0VBQ0UsU0FBQTtFQUNBLGtCQUFBO0VBQ0EsZ0JBQUE7RUFDQSxjQTVRTztBQThPWDtBQWlDRTtFQUNFLG9CQUFBO0VBQ0EsZ0JBQUE7RUFDQSxrQkFBQTtFQUNBLG9CQUFBO0VBQ0EsVUFBQTtFQUNBLDJCQUFBO0VBQ0Esb0RBQUE7QUEvQko7QUFzQ0E7RUFDRTtJQUNFLFVBQUE7SUFDQSwyQkFBQTtFQW5DRjtFQXFDQTtJQUNFLFVBQUE7SUFDQSx3QkFBQTtFQW5DRjtBQUNGO0FBc0NBO0VBQ0U7SUFDRSxhQUFBO0lBQ0EsSUFBQTtFQXBDRjtFQXNDQTtJQUNFLFlBQUE7SUFDQSxJQUFBO0VBcENGO0FBQ0Y7QUF1Q0E7RUFDRTtJQUNFLG1DQUFBO0VBckNGO0VBdUNBO0lBQ0UsNkNBQUE7RUFyQ0Y7QUFDRjtBQTJDQTtFQUNFO0lBQ0UsdUJBQUE7SUFDQSxTQUFBO0VBekNGOztFQTRDQTtJQUNFLHNCQUFBO0lBQ0Esa0JBQUE7SUFDQSxTQUFBO0VBekNGOztFQTRDQTtJQUNFLFNBQUE7RUF6Q0Y7O0VBNENBO0lBQ0UsdUJBQUE7SUFDQSxnQkFBQTtJQUNBLGlCQUFBO0VBekNGO0FBQ0Y7QUE0Q0E7RUFDRTtJQUNFLDJCQUFBO0lBQ0EsZ0JBQUE7RUExQ0Y7O0VBNkNBO0lBQ0UsV0FBQTtJQUNBLGdCQUFBO0lBQ0EsbUJBQUE7SUFDQSxtQkFBQTtJQUNBLFNBQUE7SUFDQSxhQUFBO0VBMUNGOztFQTZDQTtJQUNFLFFBQUE7RUExQ0Y7O0VBNkNBO0lBQ0UsYUFBQTtFQTFDRjs7RUE2Q0E7SUFDRSxhQUFBO0VBMUNGOztFQTZDQTtJQUNFLHdCQUFBO0VBMUNGOztFQTZDQTtJQUNFLGNBQUE7RUExQ0Y7QUFDRiIsImZpbGUiOiJnYW1lLW1vZGUtbWVudS5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIkBpbXBvcnQgdXJsKCdodHRwczovL2ZvbnRzLmdvb2dsZWFwaXMuY29tL2NzczI/ZmFtaWx5PVN5bmU6d2dodEA2MDA7NzAwOzgwMCZmYW1pbHk9RE0rU2FuczppdGFsLHdnaHRAMCw0MDA7MCw1MDA7MSw0MDAmZGlzcGxheT1zd2FwJyk7XHJcblxyXG5cclxuXHJcblxyXG4kYmc6ICNmNWY3ZmI7XHJcbiRzdXJmYWNlOiByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuNzgpO1xyXG4kc3VyZmFjZS1zdHJvbmc6IHJnYmEoMjU1LCAyNTUsIDI1NSwgMC45Mik7XHJcbiRib3JkZXI6IHJnYmEoMjAsIDQwLCA4MCwgMC4wOCk7XHJcbiRzaGFkb3c6IDAgMTBweCAzMHB4IHJnYmEoMjIsIDM0LCA1MSwgMC4wOCk7XHJcblxyXG4kdGV4dDogIzE4MjEyZjtcclxuJHRleHQtbWlkOiAjNmY3YzhmO1xyXG4kdGV4dC1saWdodDogIzk4YTNiMztcclxuXHJcbiRmb250LXRpdGxlOiAnU3luZScsIHNhbnMtc2VyaWY7XHJcbiRmb250LWJvZHk6ICdETSBTYW5zJywgc2Fucy1zZXJpZjtcclxuXHJcblxyXG4kYy1wbGF5OiAjMzRkMzk5O1xyXG4kYy1hZHZlbnR1cmU6ICNmNTllMGI7XHJcbiRjLWVkaXRvcjogIzYwYTVmYTtcclxuJGMtcnVsZXM6ICNhNzhiZmE7XHJcbiRjLWNyZWRpdHM6ICNmNDcyYjY7XHJcblxyXG5AbWl4aW4gY2FyZC1hY2NlbnQoJGNvbG9yKSB7XHJcbiAgLS1hY2NlbnQ6ICN7JGNvbG9yfTtcclxuICAtLWFjY2VudC1zb2Z0OiAje3JnYmEoJGNvbG9yLCAwLjEyKX07XHJcbiAgLS1hY2NlbnQtYm9yZGVyOiAje3JnYmEoJGNvbG9yLCAwLjMpfTtcclxufVxyXG5cclxuXHJcblxyXG5cclxuOjpuZy1kZWVwIGJvZHkge1xyXG4gIG1hcmdpbjogMDtcclxuICBwYWRkaW5nOiAwO1xyXG4gIGJhY2tncm91bmQ6IGxpbmVhci1ncmFkaWVudCgxODBkZWcsICNmOGZhZmYgMCUsICNlZWYzZjkgMTAwJSk7XHJcbiAgZm9udC1mYW1pbHk6ICRmb250LWJvZHk7XHJcbn1cclxuXHJcbioge1xyXG4gIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XHJcbn1cclxuXHJcblxyXG5cclxuXHJcbi5zZWxlY3Rpb24ge1xyXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcclxuICBtaW4taGVpZ2h0OiAxMDB2aDtcclxuICBwYWRkaW5nOiA0OHB4IDI0cHggNTZweDtcclxuICBkaXNwbGF5OiBmbGV4O1xyXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XHJcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcclxuICBnYXA6IDQ4cHg7XHJcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcclxuICBjb2xvcjogJHRleHQ7XHJcbiAgYmFja2dyb3VuZDpcclxuICAgIHJhZGlhbC1ncmFkaWVudChjaXJjbGUgYXQgdG9wIGxlZnQsIHJnYmEoOTYsIDE2NSwgMjUwLCAwLjA4KSwgdHJhbnNwYXJlbnQgMzAlKSxcclxuICAgIHJhZGlhbC1ncmFkaWVudChjaXJjbGUgYXQgYm90dG9tIHJpZ2h0LCByZ2JhKDE2NywgMTM5LCAyNTAsIDAuMDgpLCB0cmFuc3BhcmVudCAyOCUpLFxyXG4gICAgbGluZWFyLWdyYWRpZW50KDE4MGRlZywgI2Y4ZmFmZiAwJSwgI2VlZjNmOSAxMDAlKTtcclxufVxyXG5cclxuXHJcblxyXG5cclxuLmJnLWdyYXBoIHtcclxuICBwb3NpdGlvbjogYWJzb2x1dGU7XHJcbiAgaW5zZXQ6IDA7XHJcbiAgcG9pbnRlci1ldmVudHM6IG5vbmU7XHJcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcclxuXHJcbiAgJl9fc3ZnIHtcclxuICAgIHdpZHRoOiAxMDAlO1xyXG4gICAgaGVpZ2h0OiAxMDAlO1xyXG4gICAgb3BhY2l0eTogMC41O1xyXG4gICAgYW5pbWF0aW9uOiBiZ0RyaWZ0IDI0cyBlYXNlLWluLW91dCBpbmZpbml0ZSBhbHRlcm5hdGU7XHJcbiAgfVxyXG59XHJcblxyXG4uYmctbm9kZXMgY2lyY2xlIHtcclxuICBhbmltYXRpb246IG5vZGVQdWxzZSA1cyBlYXNlLWluLW91dCBpbmZpbml0ZTtcclxuXHJcbiAgJjpudGgtY2hpbGQoMikgeyBhbmltYXRpb24tZGVsYXk6IDAuOHM7IH1cclxuICAmOm50aC1jaGlsZCgzKSB7IGFuaW1hdGlvbi1kZWxheTogMS40czsgfVxyXG4gICY6bnRoLWNoaWxkKDQpIHsgYW5pbWF0aW9uLWRlbGF5OiAyczsgfVxyXG4gICY6bnRoLWNoaWxkKDUpIHsgYW5pbWF0aW9uLWRlbGF5OiAwLjRzOyB9XHJcbiAgJjpudGgtY2hpbGQoNikgeyBhbmltYXRpb24tZGVsYXk6IDIuNHM7IH1cclxuICAmOm50aC1jaGlsZCg3KSB7IGFuaW1hdGlvbi1kZWxheTogMS4xczsgfVxyXG4gICY6bnRoLWNoaWxkKDgpIHsgYW5pbWF0aW9uLWRlbGF5OiAzczsgfVxyXG4gICY6bnRoLWNoaWxkKDkpIHsgYW5pbWF0aW9uLWRlbGF5OiAxLjhzOyB9XHJcbn1cclxuXHJcblxyXG5cclxuXHJcbi5tcy1oZWFkZXIge1xyXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcclxuICB6LWluZGV4OiAyO1xyXG4gIGRpc3BsYXk6IGZsZXg7XHJcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICBnYXA6IDI0cHg7XHJcbiAgdGV4dC1hbGlnbjogbGVmdDtcclxuICBhbmltYXRpb246IGZhZGVVcCAwLjdzIGVhc2U7XHJcblxyXG4gICZfX2xvZ28taW1nIHtcclxuICAgIHdpZHRoOiBhdXRvO1xyXG4gICAgaGVpZ2h0OiA3MnB4O1xyXG4gICAgb2JqZWN0LWZpdDogY29udGFpbjtcclxuICAgIGZpbHRlcjogZHJvcC1zaGFkb3coMCA4cHggMTZweCByZ2JhKDUyLCAyMTEsIDE1MywgMC4xNikpO1xyXG4gIH1cclxuXHJcbiAgJl9fZXllYnJvdyB7XHJcbiAgICBkaXNwbGF5OiBibG9jaztcclxuICAgIG1hcmdpbi1ib3R0b206IDZweDtcclxuICAgIGZvbnQtc2l6ZTogMC43MnJlbTtcclxuICAgIGZvbnQtd2VpZ2h0OiA3MDA7XHJcbiAgICBsZXR0ZXItc3BhY2luZzogMC4xOGVtO1xyXG4gICAgdGV4dC10cmFuc2Zvcm06IHVwcGVyY2FzZTtcclxuICAgIGNvbG9yOiAkdGV4dC1saWdodDtcclxuICB9XHJcblxyXG4gICZfX3RpdGxlIHtcclxuICAgIG1hcmdpbjogMDtcclxuICAgIGZvbnQtZmFtaWx5OiAkZm9udC10aXRsZTtcclxuICAgIGZvbnQtc2l6ZTogY2xhbXAoMS44cmVtLCAzdncsIDIuN3JlbSk7XHJcbiAgICBmb250LXdlaWdodDogODAwO1xyXG4gICAgbGluZS1oZWlnaHQ6IDEuMTtcclxuICAgIGxldHRlci1zcGFjaW5nOiAtMC4wM2VtO1xyXG4gICAgY29sb3I6ICR0ZXh0O1xyXG5cclxuICAgIGVtIHtcclxuICAgICAgZm9udC1zdHlsZTogaXRhbGljO1xyXG4gICAgICBmb250LXdlaWdodDogNjAwO1xyXG4gICAgICBjb2xvcjogJHRleHQtbWlkO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG5cclxuXHJcblxyXG5cclxuLm1zLWdyaWQge1xyXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcclxuICB6LWluZGV4OiAyO1xyXG4gIHdpZHRoOiAxMDAlO1xyXG4gIG1heC13aWR0aDogMTEwMHB4O1xyXG4gIGRpc3BsYXk6IGZsZXg7XHJcbiAgZmxleC13cmFwOiB3cmFwO1xyXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xyXG4gIGdhcDogMTZweDtcclxufVxyXG5cclxuXHJcblxyXG5cclxuLm1zLWNhcmQge1xyXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcclxuICB3aWR0aDogMjAwcHg7XHJcbiAgbWluLWhlaWdodDogMjMwcHg7XHJcbiAgcGFkZGluZzogMjJweCAyMHB4O1xyXG4gIGRpc3BsYXk6IGZsZXg7XHJcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcclxuICBnYXA6IDE0cHg7XHJcbiAgYm9yZGVyLXJhZGl1czogMThweDtcclxuICBiYWNrZ3JvdW5kOiAkc3VyZmFjZTtcclxuICBib3JkZXI6IDFweCBzb2xpZCAkYm9yZGVyO1xyXG4gIGJveC1zaGFkb3c6ICRzaGFkb3c7XHJcbiAgYmFja2Ryb3AtZmlsdGVyOiBibHVyKDEwcHgpO1xyXG4gIC13ZWJraXQtYmFja2Ryb3AtZmlsdGVyOiBibHVyKDEwcHgpO1xyXG4gIGN1cnNvcjogcG9pbnRlcjtcclxuICB0cmFuc2l0aW9uOlxyXG4gICAgdHJhbnNmb3JtIDAuMjJzIGVhc2UsXHJcbiAgICBib3gtc2hhZG93IDAuMjJzIGVhc2UsXHJcbiAgICBib3JkZXItY29sb3IgMC4yMnMgZWFzZSxcclxuICAgIGJhY2tncm91bmQgMC4yMnMgZWFzZTtcclxuICBvdmVyZmxvdzogaGlkZGVuO1xyXG4gIG91dGxpbmU6IG5vbmU7XHJcbiAgYW5pbWF0aW9uOiBmYWRlVXAgMC41NXMgZWFzZSBib3RoO1xyXG5cclxuICBAZm9yICRpIGZyb20gMSB0aHJvdWdoIDUge1xyXG4gICAgJjpudGgtY2hpbGQoI3skaX0pIHtcclxuICAgICAgYW5pbWF0aW9uLWRlbGF5OiAjezAuMDggKiAkaX1zO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgJjpob3ZlcixcclxuICAmOmZvY3VzIHtcclxuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgtNnB4KTtcclxuICAgIGJvcmRlci1jb2xvcjogdmFyKC0tYWNjZW50LWJvcmRlcik7XHJcbiAgICBib3gtc2hhZG93OlxyXG4gICAgICAwIDE0cHggMzRweCByZ2JhKDIyLCAzNCwgNTEsIDAuMTIpLFxyXG4gICAgICAwIDAgMCAxcHggdmFyKC0tYWNjZW50LWJvcmRlcik7XHJcblxyXG4gICAgLm1zLWNhcmRfX2dsb3cge1xyXG4gICAgICBvcGFjaXR5OiAxO1xyXG4gICAgfVxyXG5cclxuICAgIC5tcy1jYXJkX19pY29uLXdyYXAge1xyXG4gICAgICBiYWNrZ3JvdW5kOiB2YXIoLS1hY2NlbnQtc29mdCk7XHJcbiAgICAgIGJvcmRlci1jb2xvcjogdmFyKC0tYWNjZW50LWJvcmRlcik7XHJcbiAgICB9XHJcblxyXG4gICAgLm1zLWNhcmRfX2ljb24ge1xyXG4gICAgICB0cmFuc2Zvcm06IHNjYWxlKDEuMDYpO1xyXG4gICAgfVxyXG5cclxuICAgIC5tcy1jYXJkX19hcnJvdyB7XHJcbiAgICAgIG9wYWNpdHk6IDE7XHJcbiAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWCgwKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gICYtLXBsYXkgICAgICB7IEBpbmNsdWRlIGNhcmQtYWNjZW50KCRjLXBsYXkpOyB9XHJcbiAgJi0tYWR2ZW50dXJlIHsgQGluY2x1ZGUgY2FyZC1hY2NlbnQoJGMtYWR2ZW50dXJlKTsgfVxyXG4gICYtLWVkaXRvciAgICB7IEBpbmNsdWRlIGNhcmQtYWNjZW50KCRjLWVkaXRvcik7IH1cclxuICAmLS1ydWxlcyAgICAgeyBAaW5jbHVkZSBjYXJkLWFjY2VudCgkYy1ydWxlcyk7IH1cclxuICAmLS1jcmVkaXRzICAgeyBAaW5jbHVkZSBjYXJkLWFjY2VudCgkYy1jcmVkaXRzKTsgfVxyXG5cclxuICAmX19nbG93IHtcclxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuICAgIGluc2V0OiAwO1xyXG4gICAgYm9yZGVyLXJhZGl1czogaW5oZXJpdDtcclxuICAgIGJhY2tncm91bmQ6IHJhZGlhbC1ncmFkaWVudChjaXJjbGUgYXQgdG9wLCB2YXIoLS1hY2NlbnQtc29mdCkgMCUsIHRyYW5zcGFyZW50IDcwJSk7XHJcbiAgICBvcGFjaXR5OiAwO1xyXG4gICAgdHJhbnNpdGlvbjogb3BhY2l0eSAwLjI1cyBlYXNlO1xyXG4gICAgcG9pbnRlci1ldmVudHM6IG5vbmU7XHJcbiAgfVxyXG5cclxuICAmX19pY29uLXdyYXAge1xyXG4gICAgd2lkdGg6IDU2cHg7XHJcbiAgICBoZWlnaHQ6IDU2cHg7XHJcbiAgICBib3JkZXItcmFkaXVzOiAxNHB4O1xyXG4gICAgZGlzcGxheTogZmxleDtcclxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcclxuICAgIGJhY2tncm91bmQ6ICRzdXJmYWNlLXN0cm9uZztcclxuICAgIGJvcmRlcjogMXB4IHNvbGlkICRib3JkZXI7XHJcbiAgICB0cmFuc2l0aW9uOiBiYWNrZ3JvdW5kIDAuMjJzIGVhc2UsIGJvcmRlci1jb2xvciAwLjIycyBlYXNlO1xyXG4gIH1cclxuXHJcbiAgJl9faWNvbiB7XHJcbiAgICB3aWR0aDogMzBweDtcclxuICAgIGhlaWdodDogMzBweDtcclxuICAgIG9iamVjdC1maXQ6IGNvbnRhaW47XHJcbiAgICBmaWx0ZXI6IG9wYWNpdHkoMC43Mik7XHJcbiAgICB0cmFuc2l0aW9uOiB0cmFuc2Zvcm0gMC4yMnMgZWFzZTtcclxuICB9XHJcblxyXG4gICZfX2JvZHkge1xyXG4gICAgZGlzcGxheTogZmxleDtcclxuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XHJcbiAgICBnYXA6IDZweDtcclxuICAgIGZsZXg6IDE7XHJcbiAgfVxyXG5cclxuICAmX190YWcge1xyXG4gICAgZm9udC1mYW1pbHk6ICRmb250LXRpdGxlO1xyXG4gICAgZm9udC1zaXplOiAwLjY1cmVtO1xyXG4gICAgZm9udC13ZWlnaHQ6IDcwMDtcclxuICAgIGxldHRlci1zcGFjaW5nOiAwLjE0ZW07XHJcbiAgICB0ZXh0LXRyYW5zZm9ybTogdXBwZXJjYXNlO1xyXG4gICAgY29sb3I6IHZhcigtLWFjY2VudCk7XHJcbiAgfVxyXG5cclxuICAmX19uYW1lIHtcclxuICAgIG1hcmdpbjogMDtcclxuICAgIGZvbnQtZmFtaWx5OiAkZm9udC10aXRsZTtcclxuICAgIGZvbnQtc2l6ZTogMS4wMnJlbTtcclxuICAgIGZvbnQtd2VpZ2h0OiA3MDA7XHJcbiAgICBsaW5lLWhlaWdodDogMS4yO1xyXG4gICAgY29sb3I6ICR0ZXh0O1xyXG4gIH1cclxuXHJcbiAgJl9fZGVzYyB7XHJcbiAgICBtYXJnaW46IDA7XHJcbiAgICBmb250LXNpemU6IDAuNzhyZW07XHJcbiAgICBsaW5lLWhlaWdodDogMS41O1xyXG4gICAgY29sb3I6ICR0ZXh0LW1pZDtcclxuICB9XHJcblxyXG4gICZfX2Fycm93IHtcclxuICAgIGFsaWduLXNlbGY6IGZsZXgtZW5kO1xyXG4gICAgbWFyZ2luLXRvcDogYXV0bztcclxuICAgIGZvbnQtc2l6ZTogMS4xNXJlbTtcclxuICAgIGNvbG9yOiB2YXIoLS1hY2NlbnQpO1xyXG4gICAgb3BhY2l0eTogMDtcclxuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWCgtNnB4KTtcclxuICAgIHRyYW5zaXRpb246IG9wYWNpdHkgMC4yMnMgZWFzZSwgdHJhbnNmb3JtIDAuMjJzIGVhc2U7XHJcbiAgfVxyXG59XHJcblxyXG5cclxuXHJcblxyXG5Aa2V5ZnJhbWVzIGZhZGVVcCB7XHJcbiAgZnJvbSB7XHJcbiAgICBvcGFjaXR5OiAwO1xyXG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKDE4cHgpO1xyXG4gIH1cclxuICB0byB7XHJcbiAgICBvcGFjaXR5OiAxO1xyXG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKDApO1xyXG4gIH1cclxufVxyXG5cclxuQGtleWZyYW1lcyBub2RlUHVsc2Uge1xyXG4gIDAlLCAxMDAlIHtcclxuICAgIG9wYWNpdHk6IDAuMzU7XHJcbiAgICByOiA2O1xyXG4gIH1cclxuICA1MCUge1xyXG4gICAgb3BhY2l0eTogMC44O1xyXG4gICAgcjogOTtcclxuICB9XHJcbn1cclxuXHJcbkBrZXlmcmFtZXMgYmdEcmlmdCB7XHJcbiAgZnJvbSB7XHJcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZSgwLCAwKSBzY2FsZSgxKTtcclxuICB9XHJcbiAgdG8ge1xyXG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGUoLTEycHgsIDEwcHgpIHNjYWxlKDEuMDIpO1xyXG4gIH1cclxufVxyXG5cclxuXHJcblxyXG5cclxuQG1lZGlhIChtYXgtd2lkdGg6IDkwMHB4KSB7XHJcbiAgLnNlbGVjdGlvbiB7XHJcbiAgICBwYWRkaW5nOiAzNnB4IDE4cHggNDhweDtcclxuICAgIGdhcDogMzZweDtcclxuICB9XHJcblxyXG4gIC5tcy1oZWFkZXIge1xyXG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcclxuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcclxuICAgIGdhcDogMTRweDtcclxuICB9XHJcblxyXG4gIC5tcy1ncmlkIHtcclxuICAgIGdhcDogMTJweDtcclxuICB9XHJcblxyXG4gIC5tcy1jYXJkIHtcclxuICAgIHdpZHRoOiBjYWxjKDUwJSAtIDEycHgpO1xyXG4gICAgbWluLXdpZHRoOiAxNTBweDtcclxuICAgIG1pbi1oZWlnaHQ6IDIxMHB4O1xyXG4gIH1cclxufVxyXG5cclxuQG1lZGlhIChtYXgtd2lkdGg6IDU2MHB4KSB7XHJcbiAgLnNlbGVjdGlvbiB7XHJcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGZsZXgtc3RhcnQ7XHJcbiAgICBvdmVyZmxvdy15OiBhdXRvO1xyXG4gIH1cclxuXHJcbiAgLm1zLWNhcmQge1xyXG4gICAgd2lkdGg6IDEwMCU7XHJcbiAgICBtaW4taGVpZ2h0OiBhdXRvO1xyXG4gICAgZmxleC1kaXJlY3Rpb246IHJvdztcclxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbiAgICBnYXA6IDE2cHg7XHJcbiAgICBwYWRkaW5nOiAxOHB4O1xyXG4gIH1cclxuXHJcbiAgLm1zLWNhcmRfX2JvZHkge1xyXG4gICAgZ2FwOiA0cHg7XHJcbiAgfVxyXG5cclxuICAubXMtY2FyZF9fZGVzYyB7XHJcbiAgICBkaXNwbGF5OiBub25lO1xyXG4gIH1cclxuXHJcbiAgLm1zLWNhcmRfX2Fycm93IHtcclxuICAgIGRpc3BsYXk6IG5vbmU7XHJcbiAgfVxyXG5cclxuICAuZWRpdG9yIHtcclxuICAgIGRpc3BsYXk6IG5vbmUgIWltcG9ydGFudDtcclxuICB9XHJcblxyXG4gIDo6bmctZGVlcCBib2R5IHtcclxuICAgIG92ZXJmbG93OiBhdXRvO1xyXG4gIH1cclxufSJdfQ== */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](GameModeMenuComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-game-mode-menu',
                templateUrl: './game-mode-menu.component.html',
                styleUrls: ['./game-mode-menu.component.scss']
            }]
    }], function () { return [{ type: src_app_services_game_game_service__WEBPACK_IMPORTED_MODULE_1__["GameService"] }]; }, null); })();


/***/ }),

/***/ "oqWu":
/*!**********************************************************************************!*\
  !*** ./src/app/models/PawnState/PawnStateWaitingTurn/pawn-state-waiting-turn.ts ***!
  \**********************************************************************************/
/*! exports provided: PawnStateWaitingTurn */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PawnStateWaitingTurn", function() { return PawnStateWaitingTurn; });
/* harmony import */ var d3__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! d3 */ "VphZ");

class PawnStateWaitingTurn {
    constructor() {
        this.details_id = '#details-informations';
    }
    dragstarted(event, d) {
        d3__WEBPACK_IMPORTED_MODULE_0__["select"](this.details_id)
            .append('p')
            .attr('id', 'turn-info')
            .text(() => 'Le chèvre ne peut pas être déplacée.');
        d3__WEBPACK_IMPORTED_MODULE_0__["select"](event.sourceEvent.target).raise().attr('stroke', 'black');
    }
    dragged(event, d) {
    }
    dragended(event, d) {
        d3__WEBPACK_IMPORTED_MODULE_0__["select"]('#turn-info').remove();
        return this;
    }
}


/***/ }),

/***/ "qtDB":
/*!*****************************************************!*\
  !*** ./src/app/components/board/board.component.ts ***!
  \*****************************************************/
/*! exports provided: BoardComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BoardComponent", function() { return BoardComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! three */ "Womt");
/* harmony import */ var three_examples_jsm_controls_OrbitControls__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! three/examples/jsm/controls/OrbitControls */ "RyHr");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var src_app_services_game_game_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/services/game/game.service */ "Ks4N");
/* harmony import */ var src_app_services_graph_graph_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/services/graph/graph.service */ "67dP");







const _c0 = ["visualiser"];
class BoardComponent {
    constructor(router, gameService, graphService, renderer) {
        this.router = router;
        this.gameService = gameService;
        this.graphService = graphService;
        this.renderer = renderer;
    }
    ngOnInit() {
        var _a;
        this.renderer.setStyle((_a = this.canvasContainer) === null || _a === void 0 ? void 0 : _a.nativeElement, 'visibility', 'hidden');
        this.gameService.reset();
        this.initThreeScene();
        this.graphService.drawGraph(this.scene);
        this.animate();
        setTimeout(() => {
            var _a;
            this.gameService.startGame(this.scene, this.camera, this.renderer3D);
            this.renderer.setStyle((_a = this.canvasContainer) === null || _a === void 0 ? void 0 : _a.nativeElement, 'visibility', 'visible');
            this.gameService.setReplayCallback(this.replay.bind(this));
        }, 3000);
    }
    initThreeScene() {
        const width = this.canvasContainer.nativeElement.clientWidth;
        const height = this.canvasContainer.nativeElement.clientHeight;
        this.scene = new three__WEBPACK_IMPORTED_MODULE_1__["Scene"]();
        this.scene.background = new three__WEBPACK_IMPORTED_MODULE_1__["Color"](0xf5f6fa);
        this.camera = new three__WEBPACK_IMPORTED_MODULE_1__["PerspectiveCamera"](45, width / height, 0.1, 1000);
        this.camera.position.set(0, 5, 15);
        this.renderer3D = new three__WEBPACK_IMPORTED_MODULE_1__["WebGLRenderer"]({
            antialias: true
        });
        this.renderer3D.setSize(width, height);
        this.renderer3D.setPixelRatio(window.devicePixelRatio);
        this.canvasContainer.nativeElement.appendChild(this.renderer3D.domElement);
        this.controls = new three_examples_jsm_controls_OrbitControls__WEBPACK_IMPORTED_MODULE_2__["OrbitControls"](this.camera, this.renderer3D.domElement);
        this.controls.enableDamping = true;
        this.controls.dampingFactor = 0.05;
        this.controls.screenSpacePanning = false;
        this.controls.minDistance = 5;
        this.controls.maxDistance = 50;
        const ambientLight = new three__WEBPACK_IMPORTED_MODULE_1__["AmbientLight"](0xffffff, 0.6);
        this.scene.add(ambientLight);
        const directionalLight = new three__WEBPACK_IMPORTED_MODULE_1__["DirectionalLight"](0xffffff, 0.8);
        directionalLight.position.set(10, 20, 10);
        directionalLight.castShadow = true;
        this.scene.add(directionalLight);
        const pointLight = new three__WEBPACK_IMPORTED_MODULE_1__["PointLight"](0xffffff, 0.5);
        pointLight.position.set(-10, -10, -10);
        this.scene.add(pointLight);
        const gridHelper = new three__WEBPACK_IMPORTED_MODULE_1__["GridHelper"](100, 100, 0xcccccc, 0xeeeeee);
        gridHelper.position.y = -15;
        this.scene.add(gridHelper);
    }
    animate() {
        this.animationFrameId = requestAnimationFrame(() => this.animate());
        if (this.controls) {
            this.controls.update();
        }
        this.renderer3D.render(this.scene, this.camera);
    }
    replay() {
        const details = document.getElementById('details-informations');
        if (details) {
            details.style.color = 'black';
            details.textContent = 'Chargement du plateau de jeu...';
        }
        this.clearScene();
        setTimeout(() => {
            this.ngOnInit();
        }, 5);
    }
    clearScene() {
        var _a;
        this.renderer.setStyle((_a = this.canvasContainer) === null || _a === void 0 ? void 0 : _a.nativeElement, 'visibility', 'hidden');
        cancelAnimationFrame(this.animationFrameId);
        if (this.renderer3D) {
            if (this.canvasContainer.nativeElement.contains(this.renderer3D.domElement)) {
                this.canvasContainer.nativeElement.removeChild(this.renderer3D.domElement);
            }
            this.renderer3D.dispose();
        }
        if (this.scene) {
            this.scene.clear();
        }
    }
    goBackToMenu() {
        this.router.navigate(['/configuration']);
    }
    validateTurn() {
        this.gameService.validateTurn();
    }
    cancelMove() {
        this.gameService.cancelMove();
    }
    getTurnCount() {
        return this.gameService.turn_count;
    }
    getCabbageCount() {
        return this.gameService.cabbage_count;
    }
}
BoardComponent.ɵfac = function BoardComponent_Factory(t) { return new (t || BoardComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](src_app_services_game_game_service__WEBPACK_IMPORTED_MODULE_4__["GameService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](src_app_services_graph_graph_service__WEBPACK_IMPORTED_MODULE_5__["GraphService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__["Renderer2"])); };
BoardComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: BoardComponent, selectors: [["app-board"]], viewQuery: function BoardComponent_Query(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵstaticViewQuery"](_c0, true);
    } if (rf & 2) {
        let _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵloadQuery"]()) && (ctx.canvasContainer = _t.first);
    } }, decls: 52, vars: 2, consts: [[1, "board-shell"], ["aria-label", "Interface du plateau de jeu Ch\u00E8vre et Collecteur", 1, "game-window"], [1, "top-interface"], ["aria-label", "Actions principales", 1, "menu-card"], ["type", "button", 1, "menu-action", 3, "click"], ["aria-hidden", "true", 1, "menu-icon"], ["type", "button", 1, "menu-action"], ["aria-live", "polite", 1, "status-card"], [1, "turn-box"], ["id", "details-informations", 1, "status-text"], [1, "board-area"], ["id", "visualiser", "aria-label", "Plateau de jeu", 1, "game-board"], ["visualiser", ""], [1, "bottom-interface"], ["type", "button", 1, "game-action", "action-valid", 3, "click"], ["aria-hidden", "true", 1, "action-icon"], ["type", "button", 1, "game-action", "action-cancel", 3, "click"], ["aria-hidden", "true", "focusable", "false", 1, "svg-patterns"], ["id", "goat", "x", "0", "y", "0", "width", "1", "height", "1"], ["x", "0", "y", "0", "href", "assets/goat.svg", "width", "60", "height", "60"], ["id", "cabbage", "x", "0", "y", "0", "width", "1", "height", "1"], ["x", "0", "y", "0", "href", "assets/cabbageV2.svg", "width", "60", "height", "60"]], template: function BoardComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "section", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "header", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "nav", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "button", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function BoardComponent_Template_button_click_4_listener() { return ctx.goBackToMenu(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "span", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](6, "\u2302");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](7, "span");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](8, "Menu");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](9, "button", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function BoardComponent_Template_button_click_9_listener() { return ctx.replay(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](10, "span", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](11, "\u21BB");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](12, "span");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](13, "Replay");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](14, "button", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](15, "span", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](16, "?");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](17, "span");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](18, "R\u00E8gles");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](19, "aside", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](20, "div", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](21, "span");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](22, "Tours");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](23, "strong");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](24);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](25, "div", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](26, "span");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](27, "Choux");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](28, "strong");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](29);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](30, "div", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](31, " Le collecteur doit se placer. ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](32, "main", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](33, "div", 11, 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](35, "footer", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](36, "button", 14);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function BoardComponent_Template_button_click_36_listener() { return ctx.validateTurn(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](37, "span", 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](38, "\u2713");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](39, "span");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](40, "Finir le tour");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](41, "button", 16);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function BoardComponent_Template_button_click_41_listener() { return ctx.cancelMove(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](42, "span", 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](43, "\u21B6");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](44, "span");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](45, "Annuler");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceSVG"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](46, "svg", 17);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](47, "defs");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](48, "pattern", 18);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](49, "image", 19);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](50, "pattern", 20);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](51, "image", 21);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](24);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx.getTurnCount());
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx.getCabbageCount());
    } }, styles: ["[_nghost-%COMP%] {\n  display: block;\n  min-height: 100vh;\n  overflow: hidden;\n  font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, \"Segoe UI\", sans-serif;\n  color: #253322;\n}\n\n*[_ngcontent-%COMP%] {\n  box-sizing: border-box;\n}\n\n.board-shell[_ngcontent-%COMP%] {\n  --grass: #7fbf58;\n  --grass-dark: #356b35;\n  --grass-soft: #e6f5df;\n  --leaf: #b7dc74;\n  --soil: #8a6843;\n  --soil-dark: #5c432b;\n  --cream: #fffaf0;\n  --paper: #fbfff7;\n  --danger: #d84f52;\n  --danger-soft: #fff0f0;\n  --sky: #8fd3dc;\n  --text: #253322;\n  --muted: #73806f;\n  --border: rgba(53, 107, 53, 0.18);\n  --shadow-soft: 0 10px 26px rgba(45, 72, 37, 0.12);\n  --shadow-button: 0 8px 0 rgba(53, 107, 53, 0.18);\n  width: 100vw;\n  height: 100vh;\n  padding: clamp(0.5rem, 1.4vw, 1rem);\n  background: radial-gradient(circle at 12% 10%, rgba(183, 220, 116, 0.36), transparent 25rem), radial-gradient(circle at 90% 82%, rgba(143, 211, 220, 0.24), transparent 28rem), linear-gradient(135deg, #edf8e8 0%, #fbfff7 50%, #e2f3dc 100%);\n}\n\n.game-window[_ngcontent-%COMP%] {\n  position: relative;\n  width: 100%;\n  height: 100%;\n  overflow: hidden;\n  border: 2px solid rgba(127, 191, 88, 0.42);\n  border-radius: 18px;\n  background: linear-gradient(90deg, rgba(53, 107, 53, 0.035) 1px, transparent 1px), linear-gradient(0deg, rgba(53, 107, 53, 0.035) 1px, transparent 1px), linear-gradient(180deg, #fcfff8 0%, #f6fbef 100%);\n  background-size: 34px 34px, 34px 34px, auto;\n  box-shadow: 0 20px 50px rgba(45, 72, 37, 0.16), inset 0 0 0 1px rgba(255, 255, 255, 0.82);\n}\n\n.top-interface[_ngcontent-%COMP%] {\n  position: absolute;\n  z-index: 5;\n  top: clamp(0.7rem, 1.5vw, 1.2rem);\n  left: clamp(0.7rem, 1.8vw, 1.7rem);\n  right: clamp(0.7rem, 1.8vw, 1.7rem);\n  display: flex;\n  align-items: flex-start;\n  justify-content: space-between;\n  gap: 1rem;\n  pointer-events: none;\n}\n\n.menu-card[_ngcontent-%COMP%], .status-card[_ngcontent-%COMP%] {\n  pointer-events: auto;\n  border: 1px solid var(--border);\n  background: rgba(255, 255, 255, 0.92);\n  box-shadow: var(--shadow-soft);\n}\n\n.menu-card[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.65rem;\n  padding: 0.7rem;\n  border-radius: 18px;\n}\n\n.menu-action[_ngcontent-%COMP%] {\n  appearance: none;\n  border: 2px solid transparent;\n  min-width: 6rem;\n  min-height: 3.8rem;\n  display: grid;\n  place-items: center;\n  align-content: center;\n  gap: 0.2rem;\n  padding: 0.65rem 0.9rem;\n  border-radius: 15px;\n  color: var(--grass-dark);\n  background: linear-gradient(180deg, #ffffff 0%, var(--grass-soft) 100%);\n  font: inherit;\n  font-size: 0.74rem;\n  font-weight: 900;\n  letter-spacing: 0.12em;\n  text-transform: uppercase;\n  cursor: pointer;\n  box-shadow: inset 0 -3px 0 rgba(53, 107, 53, 0.1), 0 7px 0 rgba(53, 107, 53, 0.13);\n  transition: transform 150ms ease, box-shadow 150ms ease, border-color 150ms ease, background 150ms ease;\n}\n\n.menu-action[_ngcontent-%COMP%]:hover {\n  border-color: rgba(127, 191, 88, 0.42);\n  background: linear-gradient(180deg, #ffffff 0%, #dff4d8 100%);\n  transform: translateY(-2px);\n  box-shadow: inset 0 -3px 0 rgba(53, 107, 53, 0.12), 0 9px 0 rgba(53, 107, 53, 0.16);\n}\n\n.menu-action[_ngcontent-%COMP%]:active {\n  transform: translateY(4px);\n  box-shadow: inset 0 -2px 0 rgba(53, 107, 53, 0.12), 0 3px 0 rgba(53, 107, 53, 0.13);\n}\n\n.menu-icon[_ngcontent-%COMP%] {\n  width: 1.55rem;\n  height: 1.55rem;\n  display: grid;\n  place-items: center;\n  border-radius: 999px;\n  color: #ffffff;\n  background: var(--grass);\n  font-size: 1rem;\n  font-weight: 900;\n  line-height: 1;\n}\n\n.status-card[_ngcontent-%COMP%] {\n  min-width: min(35rem, 48vw);\n  min-height: 5rem;\n  display: grid;\n  grid-template-columns: 7.5rem 7.5rem 1fr;\n  align-items: center;\n  overflow: hidden;\n  border-radius: 18px;\n}\n\n.turn-box[_ngcontent-%COMP%] {\n  height: 100%;\n  display: grid;\n  place-items: center;\n  gap: 0.2rem;\n  background: linear-gradient(180deg, #ffffff 0%, var(--grass-soft) 100%);\n  border-right: 1px solid var(--border);\n}\n\n.turn-box[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  color: var(--muted);\n  font-size: 0.66rem;\n  font-weight: 900;\n  letter-spacing: 0.28em;\n  text-transform: uppercase;\n}\n\n.turn-box[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  color: var(--soil-dark);\n  font-size: 1.45rem;\n  font-weight: 950;\n}\n\n.status-text[_ngcontent-%COMP%] {\n  padding: 0.6rem 1.3rem;\n  color: var(--grass-dark);\n  font-size: clamp(1rem, 1.5vw, 1.42rem);\n  font-weight: 900;\n  letter-spacing: 0.02em;\n  text-align: center;\n}\n\n.board-area[_ngcontent-%COMP%] {\n  position: absolute;\n  inset: 0;\n  z-index: 1;\n}\n\n.game-board[_ngcontent-%COMP%] {\n  position: absolute;\n  inset: 0;\n  overflow: hidden;\n  background: radial-gradient(circle at 50% 18%, rgba(183, 220, 116, 0.18), transparent 18rem), radial-gradient(circle at 65% 60%, rgba(143, 211, 220, 0.1), transparent 22rem);\n}\n\n.game-board[_ngcontent-%COMP%]::before, .game-board[_ngcontent-%COMP%]::after {\n  display: none;\n}\n\n.bottom-interface[_ngcontent-%COMP%] {\n  position: absolute;\n  z-index: 5;\n  left: 50%;\n  bottom: clamp(0.9rem, 2vw, 1.6rem);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: clamp(0.55rem, 1vw, 0.9rem);\n  width: min(62rem, calc(100% - 2rem));\n  transform: translateX(-50%);\n  pointer-events: none;\n}\n\n.game-action[_ngcontent-%COMP%] {\n  pointer-events: auto;\n  appearance: none;\n  border: 2px solid transparent;\n  min-height: 4.2rem;\n  min-width: 11rem;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  gap: 0.65rem;\n  padding: 0.75rem 1.3rem;\n  border-radius: 18px;\n  background: #ffffff;\n  color: var(--text);\n  font: inherit;\n  font-size: clamp(0.82rem, 1.15vw, 1rem);\n  font-weight: 950;\n  letter-spacing: 0.1em;\n  line-height: 1.1;\n  text-transform: uppercase;\n  cursor: pointer;\n  box-shadow: inset 0 -4px 0 rgba(0, 0, 0, 0.06), var(--shadow-button);\n  transition: transform 150ms ease, box-shadow 150ms ease, border-color 150ms ease, background 150ms ease, color 150ms ease;\n}\n\n.game-action[_ngcontent-%COMP%]:hover {\n  transform: translateY(-3px);\n  box-shadow: inset 0 -4px 0 rgba(0, 0, 0, 0.06), 0 11px 0 rgba(53, 107, 53, 0.18), 0 16px 28px rgba(45, 72, 37, 0.13);\n}\n\n.game-action[_ngcontent-%COMP%]:active {\n  transform: translateY(5px);\n  box-shadow: inset 0 -2px 0 rgba(0, 0, 0, 0.06), 0 3px 0 rgba(53, 107, 53, 0.16);\n}\n\n.action-icon[_ngcontent-%COMP%] {\n  width: 2rem;\n  height: 2rem;\n  display: grid;\n  place-items: center;\n  flex: 0 0 auto;\n  border-radius: 50%;\n  color: #ffffff;\n  font-size: 1rem;\n  font-weight: 950;\n  line-height: 1;\n}\n\n.action-valid[_ngcontent-%COMP%] {\n  color: var(--grass-dark);\n  background: linear-gradient(180deg, #ffffff 0%, #e5f8dd 100%);\n}\n\n.action-valid[_ngcontent-%COMP%]   .action-icon[_ngcontent-%COMP%] {\n  background: var(--grass);\n}\n\n.action-valid[_ngcontent-%COMP%]:hover {\n  border-color: rgba(127, 191, 88, 0.5);\n  background: linear-gradient(180deg, #ffffff 0%, #d9f2ce 100%);\n}\n\n.action-cancel[_ngcontent-%COMP%] {\n  color: #6f7870;\n  background: linear-gradient(180deg, #ffffff 0%, #eef2ec 100%);\n}\n\n.action-cancel[_ngcontent-%COMP%]   .action-icon[_ngcontent-%COMP%] {\n  background: #9aa39a;\n}\n\n.action-cancel[_ngcontent-%COMP%]:hover {\n  border-color: rgba(154, 163, 154, 0.42);\n  background: linear-gradient(180deg, #ffffff 0%, #e6ebe4 100%);\n}\n\n.menu-action[_ngcontent-%COMP%]:focus-visible, .game-action[_ngcontent-%COMP%]:focus-visible {\n  outline: 3px solid rgba(127, 191, 88, 0.35);\n  outline-offset: 4px;\n}\n\n.svg-patterns[_ngcontent-%COMP%] {\n  position: absolute;\n  width: 0;\n  height: 0;\n  overflow: hidden;\n}\n\n@media (max-width: 980px) {\n  .top-interface[_ngcontent-%COMP%] {\n    align-items: stretch;\n    flex-direction: column;\n  }\n\n  .menu-card[_ngcontent-%COMP%] {\n    width: -moz-fit-content;\n    width: fit-content;\n  }\n\n  .status-card[_ngcontent-%COMP%] {\n    width: min(100%, 34rem);\n    min-width: 0;\n    align-self: flex-end;\n  }\n\n  .bottom-interface[_ngcontent-%COMP%] {\n    display: grid;\n    grid-template-columns: repeat(2, minmax(0, 1fr));\n  }\n\n  .game-action[_ngcontent-%COMP%] {\n    min-width: 0;\n    width: 100%;\n  }\n}\n\n@media (max-width: 640px) {\n  .board-shell[_ngcontent-%COMP%] {\n    padding: 0.4rem;\n  }\n\n  .game-window[_ngcontent-%COMP%] {\n    border-radius: 12px;\n  }\n\n  .top-interface[_ngcontent-%COMP%] {\n    top: 0.6rem;\n    left: 0.6rem;\n    right: 0.6rem;\n  }\n\n  .menu-card[_ngcontent-%COMP%] {\n    width: 100%;\n    display: grid;\n    grid-template-columns: repeat(3, 1fr);\n    gap: 0.45rem;\n    padding: 0.45rem;\n  }\n\n  .menu-action[_ngcontent-%COMP%] {\n    min-width: 0;\n    min-height: 3.4rem;\n    padding: 0.45rem 0.35rem;\n    font-size: 0.62rem;\n    letter-spacing: 0.1em;\n    border-radius: 12px;\n  }\n\n  .menu-icon[_ngcontent-%COMP%] {\n    width: 1.35rem;\n    height: 1.35rem;\n    font-size: 0.85rem;\n  }\n\n  .status-card[_ngcontent-%COMP%] {\n    width: 100%;\n    min-height: 4rem;\n    grid-template-columns: 5.2rem 5.2rem 1fr;\n    border-radius: 14px;\n  }\n\n  .turn-box[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n    font-size: 0.56rem;\n    letter-spacing: 0.18em;\n  }\n\n  .turn-box[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n    font-size: 1.1rem;\n  }\n\n  .status-text[_ngcontent-%COMP%] {\n    padding: 0.45rem 0.75rem;\n    font-size: 0.9rem;\n  }\n\n  .bottom-interface[_ngcontent-%COMP%] {\n    width: calc(100% - 1rem);\n    bottom: 0.6rem;\n    gap: 0.45rem;\n  }\n\n  .game-action[_ngcontent-%COMP%] {\n    min-height: 3.5rem;\n    padding: 0.55rem 0.55rem;\n    border-radius: 14px;\n    font-size: 0.68rem;\n    letter-spacing: 0.075em;\n  }\n\n  .action-icon[_ngcontent-%COMP%] {\n    width: 1.55rem;\n    height: 1.55rem;\n    font-size: 0.8rem;\n  }\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uXFwuLlxcLi5cXC4uXFxib2FyZC5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNJLGNBQUE7RUFDQSxpQkFBQTtFQUNBLGdCQUFBO0VBQ0EsdUdBQUE7RUFDQSxjQUFBO0FBQ0o7O0FBRUE7RUFDSSxzQkFBQTtBQUNKOztBQUVBO0VBQ0ksZ0JBQUE7RUFDQSxxQkFBQTtFQUNBLHFCQUFBO0VBQ0EsZUFBQTtFQUNBLGVBQUE7RUFDQSxvQkFBQTtFQUNBLGdCQUFBO0VBQ0EsZ0JBQUE7RUFDQSxpQkFBQTtFQUNBLHNCQUFBO0VBQ0EsY0FBQTtFQUNBLGVBQUE7RUFDQSxnQkFBQTtFQUNBLGlDQUFBO0VBQ0EsaURBQUE7RUFDQSxnREFBQTtFQUVBLFlBQUE7RUFDQSxhQUFBO0VBQ0EsbUNBQUE7RUFDQSw4T0FDSTtBQURSOztBQU1BO0VBQ0ksa0JBQUE7RUFDQSxXQUFBO0VBQ0EsWUFBQTtFQUNBLGdCQUFBO0VBQ0EsMENBQUE7RUFDQSxtQkFBQTtFQUNBLDBNQUNJO0VBR0osMkNBQUE7RUFDQSx5RkFDSTtBQVBSOztBQVdBO0VBQ0ksa0JBQUE7RUFDQSxVQUFBO0VBQ0EsaUNBQUE7RUFDQSxrQ0FBQTtFQUNBLG1DQUFBO0VBQ0EsYUFBQTtFQUNBLHVCQUFBO0VBQ0EsOEJBQUE7RUFDQSxTQUFBO0VBQ0Esb0JBQUE7QUFSSjs7QUFXQTs7RUFFSSxvQkFBQTtFQUNBLCtCQUFBO0VBQ0EscUNBQUE7RUFDQSw4QkFBQTtBQVJKOztBQVdBO0VBQ0ksYUFBQTtFQUNBLG1CQUFBO0VBQ0EsWUFBQTtFQUNBLGVBQUE7RUFDQSxtQkFBQTtBQVJKOztBQVdBO0VBQ0ksZ0JBQUE7RUFDQSw2QkFBQTtFQUNBLGVBQUE7RUFDQSxrQkFBQTtFQUNBLGFBQUE7RUFDQSxtQkFBQTtFQUNBLHFCQUFBO0VBQ0EsV0FBQTtFQUNBLHVCQUFBO0VBQ0EsbUJBQUE7RUFDQSx3QkFBQTtFQUNBLHVFQUNJO0VBQ0osYUFBQTtFQUNBLGtCQUFBO0VBQ0EsZ0JBQUE7RUFDQSxzQkFBQTtFQUNBLHlCQUFBO0VBQ0EsZUFBQTtFQUNBLGtGQUNJO0VBRUosdUdBQ0k7QUFaUjs7QUFrQkE7RUFDSSxzQ0FBQTtFQUNBLDZEQUNJO0VBQ0osMkJBQUE7RUFDQSxtRkFDSTtBQWpCUjs7QUFxQkE7RUFDSSwwQkFBQTtFQUNBLG1GQUNJO0FBbkJSOztBQXVCQTtFQUNJLGNBQUE7RUFDQSxlQUFBO0VBQ0EsYUFBQTtFQUNBLG1CQUFBO0VBQ0Esb0JBQUE7RUFDQSxjQUFBO0VBQ0Esd0JBQUE7RUFDQSxlQUFBO0VBQ0EsZ0JBQUE7RUFDQSxjQUFBO0FBcEJKOztBQXVCQTtFQUNJLDJCQUFBO0VBQ0EsZ0JBQUE7RUFDQSxhQUFBO0VBQ0Esd0NBQUE7RUFDQSxtQkFBQTtFQUNBLGdCQUFBO0VBQ0EsbUJBQUE7QUFwQko7O0FBdUJBO0VBQ0ksWUFBQTtFQUNBLGFBQUE7RUFDQSxtQkFBQTtFQUNBLFdBQUE7RUFDQSx1RUFDSTtFQUNKLHFDQUFBO0FBckJKOztBQXdCQTtFQUNJLG1CQUFBO0VBQ0Esa0JBQUE7RUFDQSxnQkFBQTtFQUNBLHNCQUFBO0VBQ0EseUJBQUE7QUFyQko7O0FBd0JBO0VBQ0ksdUJBQUE7RUFDQSxrQkFBQTtFQUNBLGdCQUFBO0FBckJKOztBQXdCQTtFQUNJLHNCQUFBO0VBQ0Esd0JBQUE7RUFDQSxzQ0FBQTtFQUNBLGdCQUFBO0VBQ0Esc0JBQUE7RUFDQSxrQkFBQTtBQXJCSjs7QUF3QkE7RUFDSSxrQkFBQTtFQUNBLFFBQUE7RUFDQSxVQUFBO0FBckJKOztBQXdCQTtFQUNJLGtCQUFBO0VBQ0EsUUFBQTtFQUNBLGdCQUFBO0VBQ0EsNktBQ0k7QUF0QlI7O0FBMEJBOztFQUVJLGFBQUE7QUF2Qko7O0FBMEJBO0VBQ0ksa0JBQUE7RUFDQSxVQUFBO0VBQ0EsU0FBQTtFQUNBLGtDQUFBO0VBQ0EsYUFBQTtFQUNBLG1CQUFBO0VBQ0EsdUJBQUE7RUFDQSxnQ0FBQTtFQUNBLG9DQUFBO0VBQ0EsMkJBQUE7RUFDQSxvQkFBQTtBQXZCSjs7QUEwQkE7RUFDSSxvQkFBQTtFQUNBLGdCQUFBO0VBQ0EsNkJBQUE7RUFDQSxrQkFBQTtFQUNBLGdCQUFBO0VBQ0Esb0JBQUE7RUFDQSxtQkFBQTtFQUNBLHVCQUFBO0VBQ0EsWUFBQTtFQUNBLHVCQUFBO0VBQ0EsbUJBQUE7RUFDQSxtQkFBQTtFQUNBLGtCQUFBO0VBQ0EsYUFBQTtFQUNBLHVDQUFBO0VBQ0EsZ0JBQUE7RUFDQSxxQkFBQTtFQUNBLGdCQUFBO0VBQ0EseUJBQUE7RUFDQSxlQUFBO0VBQ0Esb0VBQ0k7RUFFSix5SEFDSTtBQTFCUjs7QUFpQ0E7RUFDSSwyQkFBQTtFQUNBLG9IQUNJO0FBL0JSOztBQW9DQTtFQUNJLDBCQUFBO0VBQ0EsK0VBQ0k7QUFsQ1I7O0FBc0NBO0VBQ0ksV0FBQTtFQUNBLFlBQUE7RUFDQSxhQUFBO0VBQ0EsbUJBQUE7RUFDQSxjQUFBO0VBQ0Esa0JBQUE7RUFDQSxjQUFBO0VBQ0EsZUFBQTtFQUNBLGdCQUFBO0VBQ0EsY0FBQTtBQW5DSjs7QUFzQ0E7RUFDSSx3QkFBQTtFQUNBLDZEQUNJO0FBcENSOztBQXVDQTtFQUNJLHdCQUFBO0FBcENKOztBQXVDQTtFQUNJLHFDQUFBO0VBQ0EsNkRBQ0k7QUFyQ1I7O0FBd0NBO0VBQ0ksY0FBQTtFQUNBLDZEQUNJO0FBdENSOztBQXlDQTtFQUNJLG1CQUFBO0FBdENKOztBQXlDQTtFQUNJLHVDQUFBO0VBQ0EsNkRBQ0k7QUF2Q1I7O0FBMENBOztFQUVJLDJDQUFBO0VBQ0EsbUJBQUE7QUF2Q0o7O0FBMENBO0VBQ0ksa0JBQUE7RUFDQSxRQUFBO0VBQ0EsU0FBQTtFQUNBLGdCQUFBO0FBdkNKOztBQTBDQTtFQUNJO0lBQ0ksb0JBQUE7SUFDQSxzQkFBQTtFQXZDTjs7RUEwQ0U7SUFDSSx1QkFBQTtJQUFBLGtCQUFBO0VBdkNOOztFQTBDRTtJQUNJLHVCQUFBO0lBQ0EsWUFBQTtJQUNBLG9CQUFBO0VBdkNOOztFQTBDRTtJQUNJLGFBQUE7SUFDQSxnREFBQTtFQXZDTjs7RUEwQ0U7SUFDSSxZQUFBO0lBQ0EsV0FBQTtFQXZDTjtBQUNGOztBQTBDQTtFQUNJO0lBQ0ksZUFBQTtFQXhDTjs7RUEyQ0U7SUFDSSxtQkFBQTtFQXhDTjs7RUEyQ0U7SUFDSSxXQUFBO0lBQ0EsWUFBQTtJQUNBLGFBQUE7RUF4Q047O0VBMkNFO0lBQ0ksV0FBQTtJQUNBLGFBQUE7SUFDQSxxQ0FBQTtJQUNBLFlBQUE7SUFDQSxnQkFBQTtFQXhDTjs7RUEyQ0U7SUFDSSxZQUFBO0lBQ0Esa0JBQUE7SUFDQSx3QkFBQTtJQUNBLGtCQUFBO0lBQ0EscUJBQUE7SUFDQSxtQkFBQTtFQXhDTjs7RUEyQ0U7SUFDSSxjQUFBO0lBQ0EsZUFBQTtJQUNBLGtCQUFBO0VBeENOOztFQTJDRTtJQUNJLFdBQUE7SUFDQSxnQkFBQTtJQUNBLHdDQUFBO0lBQ0EsbUJBQUE7RUF4Q047O0VBMkNFO0lBQ0ksa0JBQUE7SUFDQSxzQkFBQTtFQXhDTjs7RUEyQ0U7SUFDSSxpQkFBQTtFQXhDTjs7RUEyQ0U7SUFDSSx3QkFBQTtJQUNBLGlCQUFBO0VBeENOOztFQTJDRTtJQUNJLHdCQUFBO0lBQ0EsY0FBQTtJQUNBLFlBQUE7RUF4Q047O0VBMkNFO0lBQ0ksa0JBQUE7SUFDQSx3QkFBQTtJQUNBLG1CQUFBO0lBQ0Esa0JBQUE7SUFDQSx1QkFBQTtFQXhDTjs7RUEyQ0U7SUFDSSxjQUFBO0lBQ0EsZUFBQTtJQUNBLGlCQUFBO0VBeENOO0FBQ0YiLCJmaWxlIjoiYm9hcmQuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyI6aG9zdCB7XHJcbiAgICBkaXNwbGF5OiBibG9jaztcclxuICAgIG1pbi1oZWlnaHQ6IDEwMHZoO1xyXG4gICAgb3ZlcmZsb3c6IGhpZGRlbjtcclxuICAgIGZvbnQtZmFtaWx5OiBJbnRlciwgdWktc2Fucy1zZXJpZiwgc3lzdGVtLXVpLCAtYXBwbGUtc3lzdGVtLCBCbGlua01hY1N5c3RlbUZvbnQsIFwiU2Vnb2UgVUlcIiwgc2Fucy1zZXJpZjtcclxuICAgIGNvbG9yOiAjMjUzMzIyO1xyXG59XHJcblxyXG4qIHtcclxuICAgIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XHJcbn1cclxuXHJcbi5ib2FyZC1zaGVsbCB7XHJcbiAgICAtLWdyYXNzOiAjN2ZiZjU4O1xyXG4gICAgLS1ncmFzcy1kYXJrOiAjMzU2YjM1O1xyXG4gICAgLS1ncmFzcy1zb2Z0OiAjZTZmNWRmO1xyXG4gICAgLS1sZWFmOiAjYjdkYzc0O1xyXG4gICAgLS1zb2lsOiAjOGE2ODQzO1xyXG4gICAgLS1zb2lsLWRhcms6ICM1YzQzMmI7XHJcbiAgICAtLWNyZWFtOiAjZmZmYWYwO1xyXG4gICAgLS1wYXBlcjogI2ZiZmZmNztcclxuICAgIC0tZGFuZ2VyOiAjZDg0ZjUyO1xyXG4gICAgLS1kYW5nZXItc29mdDogI2ZmZjBmMDtcclxuICAgIC0tc2t5OiAjOGZkM2RjO1xyXG4gICAgLS10ZXh0OiAjMjUzMzIyO1xyXG4gICAgLS1tdXRlZDogIzczODA2ZjtcclxuICAgIC0tYm9yZGVyOiByZ2JhKDUzLCAxMDcsIDUzLCAwLjE4KTtcclxuICAgIC0tc2hhZG93LXNvZnQ6IDAgMTBweCAyNnB4IHJnYmEoNDUsIDcyLCAzNywgMC4xMik7XHJcbiAgICAtLXNoYWRvdy1idXR0b246IDAgOHB4IDAgcmdiYSg1MywgMTA3LCA1MywgMC4xOCk7XHJcblxyXG4gICAgd2lkdGg6IDEwMHZ3O1xyXG4gICAgaGVpZ2h0OiAxMDB2aDtcclxuICAgIHBhZGRpbmc6IGNsYW1wKDAuNXJlbSwgMS40dncsIDFyZW0pO1xyXG4gICAgYmFja2dyb3VuZDpcclxuICAgICAgICByYWRpYWwtZ3JhZGllbnQoY2lyY2xlIGF0IDEyJSAxMCUsIHJnYmEoMTgzLCAyMjAsIDExNiwgMC4zNiksIHRyYW5zcGFyZW50IDI1cmVtKSxcclxuICAgICAgICByYWRpYWwtZ3JhZGllbnQoY2lyY2xlIGF0IDkwJSA4MiUsIHJnYmEoMTQzLCAyMTEsIDIyMCwgMC4yNCksIHRyYW5zcGFyZW50IDI4cmVtKSxcclxuICAgICAgICBsaW5lYXItZ3JhZGllbnQoMTM1ZGVnLCAjZWRmOGU4IDAlLCAjZmJmZmY3IDUwJSwgI2UyZjNkYyAxMDAlKTtcclxufVxyXG5cclxuLmdhbWUtd2luZG93IHtcclxuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcclxuICAgIHdpZHRoOiAxMDAlO1xyXG4gICAgaGVpZ2h0OiAxMDAlO1xyXG4gICAgb3ZlcmZsb3c6IGhpZGRlbjtcclxuICAgIGJvcmRlcjogMnB4IHNvbGlkIHJnYmEoMTI3LCAxOTEsIDg4LCAwLjQyKTtcclxuICAgIGJvcmRlci1yYWRpdXM6IDE4cHg7XHJcbiAgICBiYWNrZ3JvdW5kOlxyXG4gICAgICAgIGxpbmVhci1ncmFkaWVudCg5MGRlZywgcmdiYSg1MywgMTA3LCA1MywgMC4wMzUpIDFweCwgdHJhbnNwYXJlbnQgMXB4KSxcclxuICAgICAgICBsaW5lYXItZ3JhZGllbnQoMGRlZywgcmdiYSg1MywgMTA3LCA1MywgMC4wMzUpIDFweCwgdHJhbnNwYXJlbnQgMXB4KSxcclxuICAgICAgICBsaW5lYXItZ3JhZGllbnQoMTgwZGVnLCAjZmNmZmY4IDAlLCAjZjZmYmVmIDEwMCUpO1xyXG4gICAgYmFja2dyb3VuZC1zaXplOiAzNHB4IDM0cHgsIDM0cHggMzRweCwgYXV0bztcclxuICAgIGJveC1zaGFkb3c6XHJcbiAgICAgICAgMCAyMHB4IDUwcHggcmdiYSg0NSwgNzIsIDM3LCAwLjE2KSxcclxuICAgICAgICBpbnNldCAwIDAgMCAxcHggcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjgyKTtcclxufVxyXG5cclxuLnRvcC1pbnRlcmZhY2Uge1xyXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xyXG4gICAgei1pbmRleDogNTtcclxuICAgIHRvcDogY2xhbXAoMC43cmVtLCAxLjV2dywgMS4ycmVtKTtcclxuICAgIGxlZnQ6IGNsYW1wKDAuN3JlbSwgMS44dncsIDEuN3JlbSk7XHJcbiAgICByaWdodDogY2xhbXAoMC43cmVtLCAxLjh2dywgMS43cmVtKTtcclxuICAgIGRpc3BsYXk6IGZsZXg7XHJcbiAgICBhbGlnbi1pdGVtczogZmxleC1zdGFydDtcclxuICAgIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcclxuICAgIGdhcDogMXJlbTtcclxuICAgIHBvaW50ZXItZXZlbnRzOiBub25lO1xyXG59XHJcblxyXG4ubWVudS1jYXJkLFxyXG4uc3RhdHVzLWNhcmQge1xyXG4gICAgcG9pbnRlci1ldmVudHM6IGF1dG87XHJcbiAgICBib3JkZXI6IDFweCBzb2xpZCB2YXIoLS1ib3JkZXIpO1xyXG4gICAgYmFja2dyb3VuZDogcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjkyKTtcclxuICAgIGJveC1zaGFkb3c6IHZhcigtLXNoYWRvdy1zb2Z0KTtcclxufVxyXG5cclxuLm1lbnUtY2FyZCB7XHJcbiAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICAgIGdhcDogMC42NXJlbTtcclxuICAgIHBhZGRpbmc6IDAuN3JlbTtcclxuICAgIGJvcmRlci1yYWRpdXM6IDE4cHg7XHJcbn1cclxuXHJcbi5tZW51LWFjdGlvbiB7XHJcbiAgICBhcHBlYXJhbmNlOiBub25lO1xyXG4gICAgYm9yZGVyOiAycHggc29saWQgdHJhbnNwYXJlbnQ7XHJcbiAgICBtaW4td2lkdGg6IDZyZW07XHJcbiAgICBtaW4taGVpZ2h0OiAzLjhyZW07XHJcbiAgICBkaXNwbGF5OiBncmlkO1xyXG4gICAgcGxhY2UtaXRlbXM6IGNlbnRlcjtcclxuICAgIGFsaWduLWNvbnRlbnQ6IGNlbnRlcjtcclxuICAgIGdhcDogMC4ycmVtO1xyXG4gICAgcGFkZGluZzogMC42NXJlbSAwLjlyZW07XHJcbiAgICBib3JkZXItcmFkaXVzOiAxNXB4O1xyXG4gICAgY29sb3I6IHZhcigtLWdyYXNzLWRhcmspO1xyXG4gICAgYmFja2dyb3VuZDpcclxuICAgICAgICBsaW5lYXItZ3JhZGllbnQoMTgwZGVnLCAjZmZmZmZmIDAlLCB2YXIoLS1ncmFzcy1zb2Z0KSAxMDAlKTtcclxuICAgIGZvbnQ6IGluaGVyaXQ7XHJcbiAgICBmb250LXNpemU6IDAuNzRyZW07XHJcbiAgICBmb250LXdlaWdodDogOTAwO1xyXG4gICAgbGV0dGVyLXNwYWNpbmc6IDAuMTJlbTtcclxuICAgIHRleHQtdHJhbnNmb3JtOiB1cHBlcmNhc2U7XHJcbiAgICBjdXJzb3I6IHBvaW50ZXI7XHJcbiAgICBib3gtc2hhZG93OlxyXG4gICAgICAgIGluc2V0IDAgLTNweCAwIHJnYmEoNTMsIDEwNywgNTMsIDAuMSksXHJcbiAgICAgICAgMCA3cHggMCByZ2JhKDUzLCAxMDcsIDUzLCAwLjEzKTtcclxuICAgIHRyYW5zaXRpb246XHJcbiAgICAgICAgdHJhbnNmb3JtIDE1MG1zIGVhc2UsXHJcbiAgICAgICAgYm94LXNoYWRvdyAxNTBtcyBlYXNlLFxyXG4gICAgICAgIGJvcmRlci1jb2xvciAxNTBtcyBlYXNlLFxyXG4gICAgICAgIGJhY2tncm91bmQgMTUwbXMgZWFzZTtcclxufVxyXG5cclxuLm1lbnUtYWN0aW9uOmhvdmVyIHtcclxuICAgIGJvcmRlci1jb2xvcjogcmdiYSgxMjcsIDE5MSwgODgsIDAuNDIpO1xyXG4gICAgYmFja2dyb3VuZDpcclxuICAgICAgICBsaW5lYXItZ3JhZGllbnQoMTgwZGVnLCAjZmZmZmZmIDAlLCAjZGZmNGQ4IDEwMCUpO1xyXG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC0ycHgpO1xyXG4gICAgYm94LXNoYWRvdzpcclxuICAgICAgICBpbnNldCAwIC0zcHggMCByZ2JhKDUzLCAxMDcsIDUzLCAwLjEyKSxcclxuICAgICAgICAwIDlweCAwIHJnYmEoNTMsIDEwNywgNTMsIDAuMTYpO1xyXG59XHJcblxyXG4ubWVudS1hY3Rpb246YWN0aXZlIHtcclxuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWSg0cHgpO1xyXG4gICAgYm94LXNoYWRvdzpcclxuICAgICAgICBpbnNldCAwIC0ycHggMCByZ2JhKDUzLCAxMDcsIDUzLCAwLjEyKSxcclxuICAgICAgICAwIDNweCAwIHJnYmEoNTMsIDEwNywgNTMsIDAuMTMpO1xyXG59XHJcblxyXG4ubWVudS1pY29uIHtcclxuICAgIHdpZHRoOiAxLjU1cmVtO1xyXG4gICAgaGVpZ2h0OiAxLjU1cmVtO1xyXG4gICAgZGlzcGxheTogZ3JpZDtcclxuICAgIHBsYWNlLWl0ZW1zOiBjZW50ZXI7XHJcbiAgICBib3JkZXItcmFkaXVzOiA5OTlweDtcclxuICAgIGNvbG9yOiAjZmZmZmZmO1xyXG4gICAgYmFja2dyb3VuZDogdmFyKC0tZ3Jhc3MpO1xyXG4gICAgZm9udC1zaXplOiAxcmVtO1xyXG4gICAgZm9udC13ZWlnaHQ6IDkwMDtcclxuICAgIGxpbmUtaGVpZ2h0OiAxO1xyXG59XHJcblxyXG4uc3RhdHVzLWNhcmQge1xyXG4gICAgbWluLXdpZHRoOiBtaW4oMzVyZW0sIDQ4dncpO1xyXG4gICAgbWluLWhlaWdodDogNXJlbTtcclxuICAgIGRpc3BsYXk6IGdyaWQ7XHJcbiAgICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IDcuNXJlbSA3LjVyZW0gMWZyO1xyXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICAgIG92ZXJmbG93OiBoaWRkZW47XHJcbiAgICBib3JkZXItcmFkaXVzOiAxOHB4O1xyXG59XHJcblxyXG4udHVybi1ib3gge1xyXG4gICAgaGVpZ2h0OiAxMDAlO1xyXG4gICAgZGlzcGxheTogZ3JpZDtcclxuICAgIHBsYWNlLWl0ZW1zOiBjZW50ZXI7XHJcbiAgICBnYXA6IDAuMnJlbTtcclxuICAgIGJhY2tncm91bmQ6XHJcbiAgICAgICAgbGluZWFyLWdyYWRpZW50KDE4MGRlZywgI2ZmZmZmZiAwJSwgdmFyKC0tZ3Jhc3Mtc29mdCkgMTAwJSk7XHJcbiAgICBib3JkZXItcmlnaHQ6IDFweCBzb2xpZCB2YXIoLS1ib3JkZXIpO1xyXG59XHJcblxyXG4udHVybi1ib3ggc3BhbiB7XHJcbiAgICBjb2xvcjogdmFyKC0tbXV0ZWQpO1xyXG4gICAgZm9udC1zaXplOiAwLjY2cmVtO1xyXG4gICAgZm9udC13ZWlnaHQ6IDkwMDtcclxuICAgIGxldHRlci1zcGFjaW5nOiAwLjI4ZW07XHJcbiAgICB0ZXh0LXRyYW5zZm9ybTogdXBwZXJjYXNlO1xyXG59XHJcblxyXG4udHVybi1ib3ggc3Ryb25nIHtcclxuICAgIGNvbG9yOiB2YXIoLS1zb2lsLWRhcmspO1xyXG4gICAgZm9udC1zaXplOiAxLjQ1cmVtO1xyXG4gICAgZm9udC13ZWlnaHQ6IDk1MDtcclxufVxyXG5cclxuLnN0YXR1cy10ZXh0IHtcclxuICAgIHBhZGRpbmc6IDAuNnJlbSAxLjNyZW07XHJcbiAgICBjb2xvcjogdmFyKC0tZ3Jhc3MtZGFyayk7XHJcbiAgICBmb250LXNpemU6IGNsYW1wKDFyZW0sIDEuNXZ3LCAxLjQycmVtKTtcclxuICAgIGZvbnQtd2VpZ2h0OiA5MDA7XHJcbiAgICBsZXR0ZXItc3BhY2luZzogMC4wMmVtO1xyXG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG59XHJcblxyXG4uYm9hcmQtYXJlYSB7XHJcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XHJcbiAgICBpbnNldDogMDtcclxuICAgIHotaW5kZXg6IDE7XHJcbn1cclxuXHJcbi5nYW1lLWJvYXJkIHtcclxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuICAgIGluc2V0OiAwO1xyXG4gICAgb3ZlcmZsb3c6IGhpZGRlbjtcclxuICAgIGJhY2tncm91bmQ6XHJcbiAgICAgICAgcmFkaWFsLWdyYWRpZW50KGNpcmNsZSBhdCA1MCUgMTglLCByZ2JhKDE4MywgMjIwLCAxMTYsIDAuMTgpLCB0cmFuc3BhcmVudCAxOHJlbSksXHJcbiAgICAgICAgcmFkaWFsLWdyYWRpZW50KGNpcmNsZSBhdCA2NSUgNjAlLCByZ2JhKDE0MywgMjExLCAyMjAsIDAuMSksIHRyYW5zcGFyZW50IDIycmVtKTtcclxufVxyXG5cclxuLmdhbWUtYm9hcmQ6OmJlZm9yZSxcclxuLmdhbWUtYm9hcmQ6OmFmdGVyIHtcclxuICAgIGRpc3BsYXk6IG5vbmU7XHJcbn1cclxuXHJcbi5ib3R0b20taW50ZXJmYWNlIHtcclxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuICAgIHotaW5kZXg6IDU7XHJcbiAgICBsZWZ0OiA1MCU7XHJcbiAgICBib3R0b206IGNsYW1wKDAuOXJlbSwgMnZ3LCAxLjZyZW0pO1xyXG4gICAgZGlzcGxheTogZmxleDtcclxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcclxuICAgIGdhcDogY2xhbXAoMC41NXJlbSwgMXZ3LCAwLjlyZW0pO1xyXG4gICAgd2lkdGg6IG1pbig2MnJlbSwgY2FsYygxMDAlIC0gMnJlbSkpO1xyXG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVYKC01MCUpO1xyXG4gICAgcG9pbnRlci1ldmVudHM6IG5vbmU7XHJcbn1cclxuXHJcbi5nYW1lLWFjdGlvbiB7XHJcbiAgICBwb2ludGVyLWV2ZW50czogYXV0bztcclxuICAgIGFwcGVhcmFuY2U6IG5vbmU7XHJcbiAgICBib3JkZXI6IDJweCBzb2xpZCB0cmFuc3BhcmVudDtcclxuICAgIG1pbi1oZWlnaHQ6IDQuMnJlbTtcclxuICAgIG1pbi13aWR0aDogMTFyZW07XHJcbiAgICBkaXNwbGF5OiBpbmxpbmUtZmxleDtcclxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcclxuICAgIGdhcDogMC42NXJlbTtcclxuICAgIHBhZGRpbmc6IDAuNzVyZW0gMS4zcmVtO1xyXG4gICAgYm9yZGVyLXJhZGl1czogMThweDtcclxuICAgIGJhY2tncm91bmQ6ICNmZmZmZmY7XHJcbiAgICBjb2xvcjogdmFyKC0tdGV4dCk7XHJcbiAgICBmb250OiBpbmhlcml0O1xyXG4gICAgZm9udC1zaXplOiBjbGFtcCgwLjgycmVtLCAxLjE1dncsIDFyZW0pO1xyXG4gICAgZm9udC13ZWlnaHQ6IDk1MDtcclxuICAgIGxldHRlci1zcGFjaW5nOiAwLjFlbTtcclxuICAgIGxpbmUtaGVpZ2h0OiAxLjE7XHJcbiAgICB0ZXh0LXRyYW5zZm9ybTogdXBwZXJjYXNlO1xyXG4gICAgY3Vyc29yOiBwb2ludGVyO1xyXG4gICAgYm94LXNoYWRvdzpcclxuICAgICAgICBpbnNldCAwIC00cHggMCByZ2JhKDAsIDAsIDAsIDAuMDYpLFxyXG4gICAgICAgIHZhcigtLXNoYWRvdy1idXR0b24pO1xyXG4gICAgdHJhbnNpdGlvbjpcclxuICAgICAgICB0cmFuc2Zvcm0gMTUwbXMgZWFzZSxcclxuICAgICAgICBib3gtc2hhZG93IDE1MG1zIGVhc2UsXHJcbiAgICAgICAgYm9yZGVyLWNvbG9yIDE1MG1zIGVhc2UsXHJcbiAgICAgICAgYmFja2dyb3VuZCAxNTBtcyBlYXNlLFxyXG4gICAgICAgIGNvbG9yIDE1MG1zIGVhc2U7XHJcbn1cclxuXHJcbi5nYW1lLWFjdGlvbjpob3ZlciB7XHJcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoLTNweCk7XHJcbiAgICBib3gtc2hhZG93OlxyXG4gICAgICAgIGluc2V0IDAgLTRweCAwIHJnYmEoMCwgMCwgMCwgMC4wNiksXHJcbiAgICAgICAgMCAxMXB4IDAgcmdiYSg1MywgMTA3LCA1MywgMC4xOCksXHJcbiAgICAgICAgMCAxNnB4IDI4cHggcmdiYSg0NSwgNzIsIDM3LCAwLjEzKTtcclxufVxyXG5cclxuLmdhbWUtYWN0aW9uOmFjdGl2ZSB7XHJcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoNXB4KTtcclxuICAgIGJveC1zaGFkb3c6XHJcbiAgICAgICAgaW5zZXQgMCAtMnB4IDAgcmdiYSgwLCAwLCAwLCAwLjA2KSxcclxuICAgICAgICAwIDNweCAwIHJnYmEoNTMsIDEwNywgNTMsIDAuMTYpO1xyXG59XHJcblxyXG4uYWN0aW9uLWljb24ge1xyXG4gICAgd2lkdGg6IDJyZW07XHJcbiAgICBoZWlnaHQ6IDJyZW07XHJcbiAgICBkaXNwbGF5OiBncmlkO1xyXG4gICAgcGxhY2UtaXRlbXM6IGNlbnRlcjtcclxuICAgIGZsZXg6IDAgMCBhdXRvO1xyXG4gICAgYm9yZGVyLXJhZGl1czogNTAlO1xyXG4gICAgY29sb3I6ICNmZmZmZmY7XHJcbiAgICBmb250LXNpemU6IDFyZW07XHJcbiAgICBmb250LXdlaWdodDogOTUwO1xyXG4gICAgbGluZS1oZWlnaHQ6IDE7XHJcbn1cclxuXHJcbi5hY3Rpb24tdmFsaWQge1xyXG4gICAgY29sb3I6IHZhcigtLWdyYXNzLWRhcmspO1xyXG4gICAgYmFja2dyb3VuZDpcclxuICAgICAgICBsaW5lYXItZ3JhZGllbnQoMTgwZGVnLCAjZmZmZmZmIDAlLCAjZTVmOGRkIDEwMCUpO1xyXG59XHJcblxyXG4uYWN0aW9uLXZhbGlkIC5hY3Rpb24taWNvbiB7XHJcbiAgICBiYWNrZ3JvdW5kOiB2YXIoLS1ncmFzcyk7XHJcbn1cclxuXHJcbi5hY3Rpb24tdmFsaWQ6aG92ZXIge1xyXG4gICAgYm9yZGVyLWNvbG9yOiByZ2JhKDEyNywgMTkxLCA4OCwgMC41KTtcclxuICAgIGJhY2tncm91bmQ6XHJcbiAgICAgICAgbGluZWFyLWdyYWRpZW50KDE4MGRlZywgI2ZmZmZmZiAwJSwgI2Q5ZjJjZSAxMDAlKTtcclxufVxyXG5cclxuLmFjdGlvbi1jYW5jZWwge1xyXG4gICAgY29sb3I6ICM2Zjc4NzA7XHJcbiAgICBiYWNrZ3JvdW5kOlxyXG4gICAgICAgIGxpbmVhci1ncmFkaWVudCgxODBkZWcsICNmZmZmZmYgMCUsICNlZWYyZWMgMTAwJSk7XHJcbn1cclxuXHJcbi5hY3Rpb24tY2FuY2VsIC5hY3Rpb24taWNvbiB7XHJcbiAgICBiYWNrZ3JvdW5kOiAjOWFhMzlhO1xyXG59XHJcblxyXG4uYWN0aW9uLWNhbmNlbDpob3ZlciB7XHJcbiAgICBib3JkZXItY29sb3I6IHJnYmEoMTU0LCAxNjMsIDE1NCwgMC40Mik7XHJcbiAgICBiYWNrZ3JvdW5kOlxyXG4gICAgICAgIGxpbmVhci1ncmFkaWVudCgxODBkZWcsICNmZmZmZmYgMCUsICNlNmViZTQgMTAwJSk7XHJcbn1cclxuXHJcbi5tZW51LWFjdGlvbjpmb2N1cy12aXNpYmxlLFxyXG4uZ2FtZS1hY3Rpb246Zm9jdXMtdmlzaWJsZSB7XHJcbiAgICBvdXRsaW5lOiAzcHggc29saWQgcmdiYSgxMjcsIDE5MSwgODgsIDAuMzUpO1xyXG4gICAgb3V0bGluZS1vZmZzZXQ6IDRweDtcclxufVxyXG5cclxuLnN2Zy1wYXR0ZXJucyB7XHJcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XHJcbiAgICB3aWR0aDogMDtcclxuICAgIGhlaWdodDogMDtcclxuICAgIG92ZXJmbG93OiBoaWRkZW47XHJcbn1cclxuXHJcbkBtZWRpYSAobWF4LXdpZHRoOiA5ODBweCkge1xyXG4gICAgLnRvcC1pbnRlcmZhY2Uge1xyXG4gICAgICAgIGFsaWduLWl0ZW1zOiBzdHJldGNoO1xyXG4gICAgICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XHJcbiAgICB9XHJcblxyXG4gICAgLm1lbnUtY2FyZCB7XHJcbiAgICAgICAgd2lkdGg6IGZpdC1jb250ZW50O1xyXG4gICAgfVxyXG5cclxuICAgIC5zdGF0dXMtY2FyZCB7XHJcbiAgICAgICAgd2lkdGg6IG1pbigxMDAlLCAzNHJlbSk7XHJcbiAgICAgICAgbWluLXdpZHRoOiAwO1xyXG4gICAgICAgIGFsaWduLXNlbGY6IGZsZXgtZW5kO1xyXG4gICAgfVxyXG5cclxuICAgIC5ib3R0b20taW50ZXJmYWNlIHtcclxuICAgICAgICBkaXNwbGF5OiBncmlkO1xyXG4gICAgICAgIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KDIsIG1pbm1heCgwLCAxZnIpKTtcclxuICAgIH1cclxuXHJcbiAgICAuZ2FtZS1hY3Rpb24ge1xyXG4gICAgICAgIG1pbi13aWR0aDogMDtcclxuICAgICAgICB3aWR0aDogMTAwJTtcclxuICAgIH1cclxufVxyXG5cclxuQG1lZGlhIChtYXgtd2lkdGg6IDY0MHB4KSB7XHJcbiAgICAuYm9hcmQtc2hlbGwge1xyXG4gICAgICAgIHBhZGRpbmc6IDAuNHJlbTtcclxuICAgIH1cclxuXHJcbiAgICAuZ2FtZS13aW5kb3cge1xyXG4gICAgICAgIGJvcmRlci1yYWRpdXM6IDEycHg7XHJcbiAgICB9XHJcblxyXG4gICAgLnRvcC1pbnRlcmZhY2Uge1xyXG4gICAgICAgIHRvcDogMC42cmVtO1xyXG4gICAgICAgIGxlZnQ6IDAuNnJlbTtcclxuICAgICAgICByaWdodDogMC42cmVtO1xyXG4gICAgfVxyXG5cclxuICAgIC5tZW51LWNhcmQge1xyXG4gICAgICAgIHdpZHRoOiAxMDAlO1xyXG4gICAgICAgIGRpc3BsYXk6IGdyaWQ7XHJcbiAgICAgICAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoMywgMWZyKTtcclxuICAgICAgICBnYXA6IDAuNDVyZW07XHJcbiAgICAgICAgcGFkZGluZzogMC40NXJlbTtcclxuICAgIH1cclxuXHJcbiAgICAubWVudS1hY3Rpb24ge1xyXG4gICAgICAgIG1pbi13aWR0aDogMDtcclxuICAgICAgICBtaW4taGVpZ2h0OiAzLjRyZW07XHJcbiAgICAgICAgcGFkZGluZzogMC40NXJlbSAwLjM1cmVtO1xyXG4gICAgICAgIGZvbnQtc2l6ZTogMC42MnJlbTtcclxuICAgICAgICBsZXR0ZXItc3BhY2luZzogMC4xZW07XHJcbiAgICAgICAgYm9yZGVyLXJhZGl1czogMTJweDtcclxuICAgIH1cclxuXHJcbiAgICAubWVudS1pY29uIHtcclxuICAgICAgICB3aWR0aDogMS4zNXJlbTtcclxuICAgICAgICBoZWlnaHQ6IDEuMzVyZW07XHJcbiAgICAgICAgZm9udC1zaXplOiAwLjg1cmVtO1xyXG4gICAgfVxyXG5cclxuICAgIC5zdGF0dXMtY2FyZCB7XHJcbiAgICAgICAgd2lkdGg6IDEwMCU7XHJcbiAgICAgICAgbWluLWhlaWdodDogNHJlbTtcclxuICAgICAgICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IDUuMnJlbSA1LjJyZW0gMWZyO1xyXG4gICAgICAgIGJvcmRlci1yYWRpdXM6IDE0cHg7XHJcbiAgICB9XHJcblxyXG4gICAgLnR1cm4tYm94IHNwYW4ge1xyXG4gICAgICAgIGZvbnQtc2l6ZTogMC41NnJlbTtcclxuICAgICAgICBsZXR0ZXItc3BhY2luZzogMC4xOGVtO1xyXG4gICAgfVxyXG5cclxuICAgIC50dXJuLWJveCBzdHJvbmcge1xyXG4gICAgICAgIGZvbnQtc2l6ZTogMS4xcmVtO1xyXG4gICAgfVxyXG5cclxuICAgIC5zdGF0dXMtdGV4dCB7XHJcbiAgICAgICAgcGFkZGluZzogMC40NXJlbSAwLjc1cmVtO1xyXG4gICAgICAgIGZvbnQtc2l6ZTogMC45cmVtO1xyXG4gICAgfVxyXG5cclxuICAgIC5ib3R0b20taW50ZXJmYWNlIHtcclxuICAgICAgICB3aWR0aDogY2FsYygxMDAlIC0gMXJlbSk7XHJcbiAgICAgICAgYm90dG9tOiAwLjZyZW07XHJcbiAgICAgICAgZ2FwOiAwLjQ1cmVtO1xyXG4gICAgfVxyXG5cclxuICAgIC5nYW1lLWFjdGlvbiB7XHJcbiAgICAgICAgbWluLWhlaWdodDogMy41cmVtO1xyXG4gICAgICAgIHBhZGRpbmc6IDAuNTVyZW0gMC41NXJlbTtcclxuICAgICAgICBib3JkZXItcmFkaXVzOiAxNHB4O1xyXG4gICAgICAgIGZvbnQtc2l6ZTogMC42OHJlbTtcclxuICAgICAgICBsZXR0ZXItc3BhY2luZzogMC4wNzVlbTtcclxuICAgIH1cclxuXHJcbiAgICAuYWN0aW9uLWljb24ge1xyXG4gICAgICAgIHdpZHRoOiAxLjU1cmVtO1xyXG4gICAgICAgIGhlaWdodDogMS41NXJlbTtcclxuICAgICAgICBmb250LXNpemU6IDAuOHJlbTtcclxuICAgIH1cclxufSJdfQ== */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](BoardComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-board',
                templateUrl: './board.component.html',
                styleUrls: ['./board.component.scss']
            }]
    }], function () { return [{ type: _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"] }, { type: src_app_services_game_game_service__WEBPACK_IMPORTED_MODULE_4__["GameService"] }, { type: src_app_services_graph_graph_service__WEBPACK_IMPORTED_MODULE_5__["GraphService"] }, { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Renderer2"] }]; }, { canvasContainer: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"],
            args: ['visualiser', { static: true }]
        }] }); })();


/***/ }),

/***/ "vY5A":
/*!***************************************!*\
  !*** ./src/app/app-routing.module.ts ***!
  \***************************************/
/*! exports provided: AppRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppRoutingModule", function() { return AppRoutingModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _components_board_board_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/board/board.component */ "qtDB");
/* harmony import */ var _components_configuration_menu_configuration_menu_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./components/configuration-menu/configuration-menu.component */ "z01l");
/* harmony import */ var _components_credit_credit_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./components/credit/credit.component */ "Z8kk");
/* harmony import */ var _components_game_mode_menu_game_mode_menu_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./components/game-mode-menu/game-mode-menu.component */ "mzHN");








const routes = [
    { path: '', pathMatch: 'full', redirectTo: 'game-mode-selection' },
    { path: 'configuration', component: _components_configuration_menu_configuration_menu_component__WEBPACK_IMPORTED_MODULE_3__["ConfigurationMenuComponent"] },
    { path: 'game-mode-selection', component: _components_game_mode_menu_game_mode_menu_component__WEBPACK_IMPORTED_MODULE_5__["GameModeMenuComponent"] },
    { path: 'board', component: _components_board_board_component__WEBPACK_IMPORTED_MODULE_2__["BoardComponent"] },
    { path: 'credit', component: _components_credit_credit_component__WEBPACK_IMPORTED_MODULE_4__["CreditComponent"] },
];
class AppRoutingModule {
}
AppRoutingModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineNgModule"]({ type: AppRoutingModule });
AppRoutingModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjector"]({ factory: function AppRoutingModule_Factory(t) { return new (t || AppRoutingModule)(); }, imports: [[_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forRoot(routes, { useHash: true })], _angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsetNgModuleScope"](AppRoutingModule, { imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]], exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]] }); })();
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](AppRoutingModule, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"],
        args: [{
                imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forRoot(routes, { useHash: true })],
                exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]]
            }]
    }], null, null); })();


/***/ }),

/***/ "yRWK":
/*!************************************************************************!*\
  !*** ./src/app/models/PawnState/PawnStateOnTurn/pawn-state-on-turn.ts ***!
  \************************************************************************/
/*! exports provided: PawnStateOnTurn */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PawnStateOnTurn", function() { return PawnStateOnTurn; });
/* harmony import */ var src_environments_environment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/environments/environment */ "AytR");
/* harmony import */ var d3__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! d3 */ "VphZ");


class PawnStateOnTurn {
    constructor() {
        this.edges = [];
    }
    dragstarted(event, d) {
        d.setted_position = false;
        for (const node of d.graph.nodes) {
            if (node.x === d.last_position.x && node.y === d.last_position.y) {
                this.edges = d.graph.edges({ index: node.index });
                break;
            }
        }
        d3__WEBPACK_IMPORTED_MODULE_1__["select"](event.sourceEvent.target).raise().attr('stroke', 'black');
    }
    dragged(event, d) {
        d3__WEBPACK_IMPORTED_MODULE_1__["select"](`#${d.id}`).attr('cx', event.x).attr('cy', event.y);
    }
    dragended(event, d) {
        d3__WEBPACK_IMPORTED_MODULE_1__["select"](`#${d.id}`).raise().attr('stroke', null);
        for (const node of this.edges) {
            if (d.detect_radius >= this.getDistance({ x: event.x, y: event.y }, { x: node.x, y: node.y })) {
                d3__WEBPACK_IMPORTED_MODULE_1__["select"](`#${d.id}`).attr('cx', node.x).attr('cy', node.y);
                d.setted_position = true;
                d.last_position = node;
                d.gameService.updateGoatPosition(node);
            }
        }
        if (!d.setted_position) {
            d3__WEBPACK_IMPORTED_MODULE_1__["select"](`#${d.id}`).attr('cx', d.last_position.x).attr('cy', d.last_position.y);
            return this;
        }
        else {
            return src_environments_environment__WEBPACK_IMPORTED_MODULE_0__["environment"].pawnWaitingTurn;
        }
    }
    getDistance(pos1, pos2) {
        return Math.sqrt(Math.pow(pos1.x - pos2.x, 2) + Math.pow(pos1.y - pos2.y, 2));
    }
}


/***/ }),

/***/ "z01l":
/*!*******************************************************************************!*\
  !*** ./src/app/components/configuration-menu/configuration-menu.component.ts ***!
  \*******************************************************************************/
/*! exports provided: ConfigurationMenuComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ConfigurationMenuComponent", function() { return ConfigurationMenuComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var src_app_services_game_game_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/services/game/game.service */ "Ks4N");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var src_app_services_graph_graph_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/services/graph/graph.service */ "67dP");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/forms */ "3Pt+");







function ConfigurationMenuComponent_button_21_Template(rf, ctx) { if (rf & 1) {
    const _r6 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "button", 41);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function ConfigurationMenuComponent_button_21_Template_button_click_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r6); const conf_r4 = ctx.$implicit; const ctx_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r5.selectConfiguration(conf_r4); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "span", 42);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](2, "img", 43);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const conf_r4 = ctx.$implicit;
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngClass", ctx_r0.isSelectedConfiguration(conf_r4));
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵclassMap"]("icon-" + conf_r4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("src", ctx_r0.getConfigurationIcon(conf_r4), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsanitizeUrl"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx_r0.getConfigurationName(conf_r4));
} }
function ConfigurationMenuComponent_div_30_Template(rf, ctx) { if (rf & 1) {
    const _r8 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "label", 44);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "input", 45);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("ngModelChange", function ConfigurationMenuComponent_div_30_Template_input_ngModelChange_3_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r8); const ctx_r7 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r7.param2 = $event; })("blur", function ConfigurationMenuComponent_div_30_Template_input_blur_3_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r8); const ctx_r9 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r9.checkValueRightness($event); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx_r1.getParam2Name());
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("min", ctx_r1.configuration_param_boundaries[ctx_r1.selected_configuration].param2.min)("max", ctx_r1.configuration_param_boundaries[ctx_r1.selected_configuration].param2.max)("ngModel", ctx_r1.param2);
} }
function ConfigurationMenuComponent_button_39_Template(rf, ctx) { if (rf & 1) {
    const _r12 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "button", 46);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function ConfigurationMenuComponent_button_39_Template_button_click_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r12); const type_r10 = ctx.$implicit; const ctx_r11 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r11.selectOpponentType(type_r10); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "span", 47);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](2, "img", 43);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const type_r10 = ctx.$implicit;
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngClass", ctx_r2.isSelectedOpponentType(type_r10));
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpropertyInterpolate1"]("src", "assets/vs_", type_r10, ".svg", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsanitizeUrl"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx_r2.getOpponentTypeMessage(type_r10));
} }
function ConfigurationMenuComponent_div_40_button_5_Template(rf, ctx) { if (rf & 1) {
    const _r16 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "button", 50);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function ConfigurationMenuComponent_div_40_button_5_Template_button_click_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r16); const side_r14 = ctx.$implicit; const ctx_r15 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2); return ctx_r15.selectSide(side_r14); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "span", 51);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](2, "img", 43);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const side_r14 = ctx.$implicit;
    const ctx_r13 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngClass", ctx_r13.isSelectedSide(side_r14));
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpropertyInterpolate1"]("src", "assets/", side_r14 === "collector" ? "harvest" : side_r14, ".svg", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsanitizeUrl"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx_r13.getSideName(side_r14));
} }
function ConfigurationMenuComponent_div_40_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 48);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "div", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "h3");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](3, "Votre camp");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "div", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](5, ConfigurationMenuComponent_div_40_button_5_Template, 5, 3, "button", 49);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", ctx_r3.sides);
} }
class ConfigurationMenuComponent {
    constructor(gameService, router, graphService) {
        this.gameService = gameService;
        this.router = router;
        this.graphService = graphService;
        this.configurations = ['tree', 'conf2', 'conf3', 'hexagonal', 'maze', 'enriched_tree', 'ring_branches'];
        this.selected_configuration = 'tree';
        this.configuration_param_boundaries = {
            tree: {
                param1: { min: 2, max: 25 },
                param2: { min: 1, max: 10 }
            },
            conf2: {
                param1: { min: 2, max: 20 },
                param2: undefined
            },
            conf3: {
                param1: { min: 2, max: 15 },
                param2: { min: 1, max: 10 }
            },
            hexagonal: {
                param1: { min: 2, max: 10 },
                param2: { min: 2, max: 10 }
            },
            maze: {
                param1: { min: 2, max: 10 },
                param2: { min: 2, max: 10 }
            },
            enriched_tree: {
                param1: { min: 10, max: 30 },
                param2: { min: 1, max: 5 }
            },
            ring_branches: {
                param1: { min: 5, max: 20 },
                param2: { min: 2, max: 8 }
            }
        };
        this.param1 = 0;
        this.param2 = 0;
        this.opponent_types = ['ai', 'player'];
        this.selected_opponent_type = 'player';
        this.sides = ['goat', 'collector'];
        this.player_side = 'goat';
        this.harvest_capacity = 1;
        this.selected_level = 'easy';
    }
    startGame() {
        this.gameService.board_conf = this.selected_configuration;
        this.gameService.opponent_type = this.selected_opponent_type;
        this.gameService.player_side = this.player_side;
        const params = [this.param1, this.param2];
        this.gameService.board_params = params;
        this.gameService.graph = this.graphService.generateGraph(this.selected_configuration, params);
        this.gameService.harvest_capacity = this.harvest_capacity;
        this.router.navigate(['/board']);
    }
    ngOnInit() {
        this.initParams();
    }
    initParams() {
        this.param1 = this.configuration_param_boundaries[this.selected_configuration].param1.min;
        if (this.configuration_param_boundaries[this.selected_configuration].param2 !== undefined) {
            this.param2 = this.configuration_param_boundaries[this.selected_configuration].param2.min;
        }
        else {
            this.param2 = -1;
        }
    }
    displayRules() {
        this.gameService.displayRules();
    }
    goBack() {
        this.router.navigate(['/game-mode-selection']);
    }
    getConfigurationName(configuration) {
        switch (configuration) {
            case 'tree':
                return 'Arbre Standard';
            case 'conf2':
                return 'Arbre Binaire';
            case 'conf3':
                return 'Arbre Restreint';
            case 'hexagonal':
                return 'Grille hexagonale';
            case 'maze':
                return 'Labyrinthe léger';
            case 'enriched_tree':
                return 'Arbre enrichi';
            case 'ring_branches':
                return 'Anneau avec branches';
            default:
                return 'Configuration inconnue';
        }
    }
    getConfigurationIcon(configuration) {
        switch (configuration) {
            case 'tree':
                return 'assets/simple_lavender_organizational_tree_icon.png';
            case 'conf2':
                return 'assets/simple_purple_binary_tree_icon.png';
            case 'conf3':
                return 'assets/minimalist_purple_tree_diagram.png';
            case 'hexagonal':
                return 'assets/pastel_hexagonal_network_diagram.png';
            case 'maze':
                return 'assets/lavender_network_maze_diagram.png';
            case 'enriched_tree':
                return 'assets/abstract_purple_network_diagram.png';
            case 'ring_branches':
                return 'assets/lavender_molecule_network_icon_design.png';
            default:
                return 'assets/tree.svg';
        }
    }
    selectConfiguration(configuration) {
        this.selected_configuration = configuration;
        this.initParams();
    }
    isSelectedConfiguration(configuration) {
        let classes = this.selected_configuration === configuration ? 'selected' : '';
        return classes;
    }
    checkValueRightness(event) {
        const target = event.target;
        if (target.value !== '') {
            if (+target.value < target.min) {
                target.value = target.min;
            }
            else if (target.max !== '' && +target.value > target.max) {
                target.value = target.max;
            }
        }
        else {
            target.value = target.min;
        }
    }
    getParam1Name() {
        switch (this.selected_configuration) {
            case 'tree':
            case 'conf2':
            case 'conf3':
                return 'Nombre de noeuds :';
            case 'hexagonal':
            case 'maze':
                return 'Largeur :';
            case 'enriched_tree':
                return 'Nombre de noeuds :';
            case 'ring_branches':
                return 'Taille de l\'anneau :';
            default:
                return 'Paramètre 1 :';
        }
    }
    getParam2Name() {
        switch (this.selected_configuration) {
            case 'tree':
            case 'conf2':
            case 'conf3':
                return 'Arité :';
            case 'hexagonal':
            case 'maze':
                return 'Hauteur :';
            case 'enriched_tree':
                return 'Connexions bonus :';
            case 'ring_branches':
                return 'Nombre de branches :';
            default:
                return 'Paramètre 2 :';
        }
    }
    getOpponentTypeMessage(type) {
        switch (type) {
            case 'ai':
                return 'Jouer contre un ordinateur';
            case 'player':
                return 'Jouer à 2 joueurs';
            default:
                return 'Adversaire inconnue';
        }
    }
    selectOpponentType(type) {
        this.selected_opponent_type = type;
    }
    isSelectedOpponentType(type) {
        return this.selected_opponent_type === type ? `selected ${type}` : type;
    }
    isOnePlayerGame() {
        return this.selected_opponent_type === 'ai';
    }
    getSideName(side) {
        switch (side) {
            case 'goat':
                return 'Chèvre';
            case 'collector':
                return 'Collecteur de choux';
            default:
                return 'Camp inconnue';
        }
    }
    selectSide(side) {
        this.player_side = side;
    }
    isSelectedSide(side) {
        return this.player_side === side ? 'selected' : '';
    }
    isSelectedLevel(level) {
        return this.selected_level === level ? 'selected' : '';
    }
}
ConfigurationMenuComponent.ɵfac = function ConfigurationMenuComponent_Factory(t) { return new (t || ConfigurationMenuComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](src_app_services_game_game_service__WEBPACK_IMPORTED_MODULE_1__["GameService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](src_app_services_graph_graph_service__WEBPACK_IMPORTED_MODULE_3__["GraphService"])); };
ConfigurationMenuComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: ConfigurationMenuComponent, selectors: [["app-configuration-menu"]], decls: 78, vars: 17, consts: [[1, "config-shell"], ["aria-label", "Configuration de partie Ch\u00E8vre et Collecteur", 1, "config-page"], [1, "page-header"], ["type", "button", "aria-label", "Retour", 1, "header-button", "back-button", 3, "click"], ["aria-hidden", "true"], [1, "title-block"], ["type", "button", 1, "header-button", "rules-button", 3, "click"], [1, "config-layout"], ["aria-labelledby", "board-title", 1, "config-card", "board-card"], [1, "section-title"], [1, "section-number"], ["id", "board-title"], [1, "board-options-list"], ["type", "button", "class", "choice-card board-choice", 3, "ngClass", "click", 4, "ngFor", "ngForOf"], [1, "divider"], [1, "params-block"], [1, "param-row"], ["for", "param1"], ["id", "param1", "type", "number", "name", "param1", 3, "min", "max", "ngModel", "ngModelChange", "blur"], ["class", "param-row", 4, "ngIf"], [1, "right-column"], [1, "config-card", "opponent-card"], [1, "choice-grid", "two-columns"], ["type", "button", "class", "choice-card opponent-type", 3, "ngClass", "click", 4, "ngFor", "ngForOf"], ["class", "camp-block", 4, "ngIf"], [1, "config-card", "inline-settings-card", "speed-only-card"], [1, "inline-setting"], [1, "section-title", "centered-title"], [1, "number-control"], ["id", "speed", "min", "1", "type", "number", "name", "speed", 3, "ngModel", "ngModelChange", "blur"], [1, "config-card", "difficulty-card"], ["role", "radiogroup", "aria-label", "Niveau de difficult\u00E9", 1, "level-selection-list"], ["for", "mode1", 1, "level-selection-list-item", 3, "ngClass"], ["type", "radio", "id", "mode1", "name", "mode", "value", "easy", 3, "ngModel", "ngModelChange"], ["for", "mode2", 1, "level-selection-list-item", 3, "ngClass"], ["type", "radio", "id", "mode2", "name", "mode", "value", "medium", 3, "ngModel", "ngModelChange"], ["for", "mode3", 1, "level-selection-list-item", 3, "ngClass"], ["type", "radio", "id", "mode3", "name", "mode", "value", "hard", 3, "ngModel", "ngModelChange"], ["for", "mode4", 1, "level-selection-list-item", 3, "ngClass"], ["type", "radio", "id", "mode4", "name", "mode", "value", "extreme", 3, "ngModel", "ngModelChange"], ["type", "button", 1, "start-button", 3, "click"], ["type", "button", 1, "choice-card", "board-choice", 3, "ngClass", "click"], [1, "choice-visual", "graph-visual"], ["alt", "", "aria-hidden", "true", 3, "src"], ["for", "param2"], ["id", "param2", "type", "number", "name", "param2", 3, "min", "max", "ngModel", "ngModelChange", "blur"], ["type", "button", 1, "choice-card", "opponent-type", 3, "ngClass", "click"], [1, "choice-visual", "opponent-visual"], [1, "camp-block"], ["type", "button", "class", "choice-card side-choice", 3, "ngClass", "click", 4, "ngFor", "ngForOf"], ["type", "button", 1, "choice-card", "side-choice", 3, "ngClass", "click"], [1, "choice-visual", "player-visual"]], template: function ConfigurationMenuComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "section", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "header", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "button", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function ConfigurationMenuComponent_Template_button_click_3_listener() { return ctx.goBack(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "span", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](5, "\u2190");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "div", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](7, "p");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](8, "Ch\u00E8vre & Choux");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](9, "h1");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](10, "Jeu libre");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](11, "button", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function ConfigurationMenuComponent_Template_button_click_11_listener() { return ctx.displayRules(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](12, " R\u00E8gles ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](13, "main", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](14, "section", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](15, "div", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](16, "span", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](17, "01");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](18, "h2", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](19, "Plateau de jeu");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](20, "div", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](21, ConfigurationMenuComponent_button_21_Template, 5, 5, "button", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](22, "div", 14);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](23, "div", 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](24, "h3");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](25, "Param\u00E8tres");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](26, "div", 16);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](27, "label", 17);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](28);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](29, "input", 18);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("ngModelChange", function ConfigurationMenuComponent_Template_input_ngModelChange_29_listener($event) { return ctx.param1 = $event; })("blur", function ConfigurationMenuComponent_Template_input_blur_29_listener($event) { return ctx.checkValueRightness($event); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](30, ConfigurationMenuComponent_div_30_Template, 4, 4, "div", 19);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](31, "section", 20);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](32, "section", 21);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](33, "div", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](34, "span", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](35, "02");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](36, "h2");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](37, "Adversaire");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](38, "div", 22);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](39, ConfigurationMenuComponent_button_39_Template, 5, 3, "button", 23);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](40, ConfigurationMenuComponent_div_40_Template, 6, 1, "div", 24);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](41, "section", 25);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](42, "div", 26);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](43, "div", 27);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](44, "span", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](45, "03");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](46, "h2");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](47, "Capacit\u00E9 de r\u00E9colte");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](48, "div", 28);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](49, "input", 29);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("ngModelChange", function ConfigurationMenuComponent_Template_input_ngModelChange_49_listener($event) { return ctx.harvest_capacity = $event; })("blur", function ConfigurationMenuComponent_Template_input_blur_49_listener($event) { return ctx.checkValueRightness($event); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](50, "section", 30);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](51, "div", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](52, "span", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](53, "04");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](54, "h2");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](55, "Difficult\u00E9");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](56, "div", 31);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](57, "label", 32);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](58, "span");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](59, "Facile");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](60, "input", 33);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("ngModelChange", function ConfigurationMenuComponent_Template_input_ngModelChange_60_listener($event) { return ctx.selected_level = $event; });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](61, "label", 34);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](62, "span");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](63, "Normal");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](64, "input", 35);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("ngModelChange", function ConfigurationMenuComponent_Template_input_ngModelChange_64_listener($event) { return ctx.selected_level = $event; });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](65, "label", 36);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](66, "span");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](67, "Difficile");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](68, "input", 37);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("ngModelChange", function ConfigurationMenuComponent_Template_input_ngModelChange_68_listener($event) { return ctx.selected_level = $event; });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](69, "label", 38);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](70, "span");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](71, "Extr\u00EAme");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](72, "input", 39);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("ngModelChange", function ConfigurationMenuComponent_Template_input_ngModelChange_72_listener($event) { return ctx.selected_level = $event; });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](73, "button", 40);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function ConfigurationMenuComponent_Template_button_click_73_listener() { return ctx.startGame(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](74, "span");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](75, "Lancer la partie");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](76, "span", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](77, "\u279C");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](21);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", ctx.configurations);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx.getParam1Name());
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("min", ctx.configuration_param_boundaries[ctx.selected_configuration].param1.min)("max", ctx.configuration_param_boundaries[ctx.selected_configuration].param1.max)("ngModel", ctx.param1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.param2 !== -1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](9);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", ctx.opponent_types);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.isOnePlayerGame());
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](9);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngModel", ctx.harvest_capacity);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](8);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngClass", ctx.isSelectedLevel("easy"));
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngModel", ctx.selected_level);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngClass", ctx.isSelectedLevel("medium"));
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngModel", ctx.selected_level);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngClass", ctx.isSelectedLevel("hard"));
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngModel", ctx.selected_level);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngClass", ctx.isSelectedLevel("extreme"));
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngModel", ctx.selected_level);
    } }, directives: [_angular_common__WEBPACK_IMPORTED_MODULE_4__["NgForOf"], _angular_forms__WEBPACK_IMPORTED_MODULE_5__["NumberValueAccessor"], _angular_forms__WEBPACK_IMPORTED_MODULE_5__["DefaultValueAccessor"], _angular_forms__WEBPACK_IMPORTED_MODULE_5__["NgControlStatus"], _angular_forms__WEBPACK_IMPORTED_MODULE_5__["NgModel"], _angular_common__WEBPACK_IMPORTED_MODULE_4__["NgIf"], _angular_common__WEBPACK_IMPORTED_MODULE_4__["NgClass"], _angular_forms__WEBPACK_IMPORTED_MODULE_5__["RadioControlValueAccessor"]], styles: ["@charset \"UTF-8\";\n[_nghost-%COMP%] {\n  display: block;\n  min-height: 100dvh;\n  color: #253322;\n  font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, \"Segoe UI\", sans-serif;\n  background: radial-gradient(circle at 12% 10%, rgba(183, 220, 116, 0.32), transparent 25rem), radial-gradient(circle at 90% 82%, rgba(143, 211, 220, 0.22), transparent 28rem), linear-gradient(135deg, #edf8e8 0%, #fbfff7 50%, #e2f3dc 100%);\n}\n*[_ngcontent-%COMP%] {\n  box-sizing: border-box;\n}\n.config-shell[_ngcontent-%COMP%] {\n  --grass: #7fbf58;\n  --grass-dark: #356b35;\n  --grass-soft: #e6f5df;\n  --leaf: #b7dc74;\n  --cream: #fffaf0;\n  --paper: #fbfff7;\n  --soil: #8a6843;\n  --soil-dark: #5c432b;\n  --danger: #d84f52;\n  --sky: #8fd3dc;\n  --text: #253322;\n  --muted: #73806f;\n  --border: rgba(53, 107, 53, 0.18);\n  --shadow-soft: 0 8px 22px rgba(45, 72, 37, 0.1);\n  --shadow-card: 0 14px 34px rgba(45, 72, 37, 0.12);\n  width: 100%;\n  min-height: 100dvh;\n  display: flex;\n  justify-content: center;\n  padding: clamp(1rem, 2vw, 2rem);\n}\n.config-page[_ngcontent-%COMP%] {\n  width: 100%;\n  max-width: 1280px;\n  display: flex;\n  flex-direction: column;\n  gap: clamp(1rem, 2vw, 2rem);\n}\n.page-header[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 4rem 1fr 6.2rem;\n  align-items: center;\n  gap: 1rem;\n  padding-bottom: 0.5rem;\n}\n.title-block[_ngcontent-%COMP%] {\n  text-align: center;\n}\n.title-block[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 0 0 0.25rem;\n  color: var(--grass-dark);\n  font-size: clamp(0.7rem, 1.2vw, 0.9rem);\n  font-weight: 800;\n  letter-spacing: 0.2em;\n  text-transform: uppercase;\n}\nh1[_ngcontent-%COMP%], h2[_ngcontent-%COMP%], h3[_ngcontent-%COMP%], p[_ngcontent-%COMP%] {\n  margin: 0;\n}\nh1[_ngcontent-%COMP%] {\n  font-family: Georgia, \"Times New Roman\", serif;\n  font-size: clamp(2rem, 5vw, 3.5rem);\n  line-height: 1.1;\n  color: var(--text);\n}\nh2[_ngcontent-%COMP%] {\n  font-size: clamp(1.2rem, 2vw, 1.6rem);\n  font-weight: 800;\n  color: var(--text);\n}\nh3[_ngcontent-%COMP%] {\n  font-size: 1.1rem;\n  font-weight: 700;\n  color: var(--muted);\n  margin-bottom: 0.5rem;\n}\n.config-layout[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1.1fr 0.9fr;\n  gap: clamp(1rem, 2vw, 2rem);\n  align-items: start;\n}\n.right-column[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: clamp(1rem, 2vw, 2rem);\n}\n.config-card[_ngcontent-%COMP%] {\n  border: 1px solid var(--border);\n  border-radius: 24px;\n  background: rgba(255, 255, 255, 0.8);\n  backdrop-filter: blur(10px);\n  box-shadow: var(--shadow-card);\n  padding: clamp(1.2rem, 2vw, 2rem);\n}\n.board-card[_ngcontent-%COMP%] {\n  min-height: 0;\n  display: grid;\n  grid-template-rows: auto auto auto minmax(0, 1fr);\n  overflow: hidden;\n}\n.section-title[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: baseline;\n  gap: 0.65rem;\n  margin-bottom: clamp(0.7rem, 1.1vw, 1rem);\n}\n.section-number[_ngcontent-%COMP%] {\n  color: var(--grass);\n  font-size: 0.85rem;\n  font-weight: 950;\n  letter-spacing: 0.14em;\n}\n.board-options-list[_ngcontent-%COMP%], .choice-grid[_ngcontent-%COMP%], .level-selection-list[_ngcontent-%COMP%] {\n  display: grid;\n  gap: clamp(0.55rem, 0.9vw, 0.8rem);\n}\n.board-options-list[_ngcontent-%COMP%] {\n  grid-template-columns: repeat(3, minmax(0, 1fr));\n}\n.two-columns[_ngcontent-%COMP%] {\n  grid-template-columns: repeat(2, minmax(0, 1fr));\n}\n.speed-only-card[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 2rem;\n  min-height: 7rem;\n  padding: clamp(1.4rem, 2vw, 1.8rem) clamp(2rem, 3vw, 3rem);\n}\n.speed-only-card[_ngcontent-%COMP%]   .inline-setting[_ngcontent-%COMP%] {\n  width: 100%;\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 2rem;\n}\n.speed-only-card[_ngcontent-%COMP%]   .centered-title[_ngcontent-%COMP%] {\n  justify-content: flex-start;\n  margin-bottom: 0;\n  text-align: left;\n}\n.speed-only-card[_ngcontent-%COMP%]   .centered-title[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  font-size: clamp(1.6rem, 2.3vw, 2rem);\n}\n.speed-only-card[_ngcontent-%COMP%]   .section-number[_ngcontent-%COMP%] {\n  font-size: 1rem;\n}\n.speed-only-card[_ngcontent-%COMP%]   .number-control[_ngcontent-%COMP%] {\n  width: clamp(8rem, 14vw, 11rem);\n}\n.speed-only-card[_ngcontent-%COMP%]   input[type=number][_ngcontent-%COMP%] {\n  height: clamp(3.2rem, 6vh, 4rem);\n  border-radius: 18px;\n  font-size: clamp(1.3rem, 2vw, 1.7rem);\n}\n.choice-card[_ngcontent-%COMP%] {\n  appearance: none;\n  position: relative;\n  border: 2px solid rgba(53, 107, 53, 0.14);\n  min-height: clamp(5.5rem, 11vh, 7rem);\n  display: grid;\n  place-items: center;\n  align-content: center;\n  gap: 0.45rem;\n  padding: 0.75rem;\n  border-radius: 16px;\n  color: var(--text);\n  background: linear-gradient(180deg, #ffffff 0%, #fbfff7 100%);\n  box-shadow: inset 0 -3px 0 rgba(53, 107, 53, 0.06), 0 5px 14px rgba(45, 72, 37, 0.06);\n  font: inherit;\n  font-size: clamp(0.78rem, 1.1vw, 1rem);\n  font-weight: 950;\n  text-align: center;\n  cursor: pointer;\n  transition: transform 140ms ease, box-shadow 140ms ease, border-color 140ms ease, background 140ms ease;\n}\n.choice-card[_ngcontent-%COMP%]:hover {\n  transform: translateY(-2px);\n  border-color: rgba(127, 191, 88, 0.48);\n  background: linear-gradient(180deg, #ffffff 0%, var(--grass-soft) 100%);\n  box-shadow: inset 0 -3px 0 rgba(53, 107, 53, 0.08), 0 10px 20px rgba(45, 72, 37, 0.1);\n}\n.choice-card[_ngcontent-%COMP%]:active {\n  transform: translateY(1px);\n}\n.choice-visual[_ngcontent-%COMP%] {\n  width: clamp(2.5rem, 4.5vw, 3.4rem);\n  height: clamp(2.5rem, 4.5vw, 3.4rem);\n  display: grid;\n  place-items: center;\n}\n.back-button[_ngcontent-%COMP%] {\n  height: 3.5rem;\n}\n.rules-button[_ngcontent-%COMP%] {\n  height: 3.5rem;\n}\n.choice-visual[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n  max-width: 100%;\n  max-height: 100%;\n  object-fit: contain;\n}\n.graph-visual[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n  opacity: 0.9;\n}\n.opponent-visual[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n  filter: saturate(0.95);\n}\n.player-visual[_ngcontent-%COMP%] {\n  width: clamp(2.8rem, 4.8vw, 3.7rem);\n  height: clamp(2.8rem, 4.8vw, 3.7rem);\n}\n.selected[_ngcontent-%COMP%], .ai[_ngcontent-%COMP%], .human[_ngcontent-%COMP%], .goat[_ngcontent-%COMP%], .cabbage[_ngcontent-%COMP%], .easy[_ngcontent-%COMP%], .medium[_ngcontent-%COMP%], .hard[_ngcontent-%COMP%], .extreme[_ngcontent-%COMP%] {\n  border-color: var(--grass);\n  color: var(--grass-dark);\n  background: radial-gradient(circle at 28% 18%, rgba(255, 255, 255, 0.8), transparent 35%), linear-gradient(180deg, #ffffff 0%, #dff4d8 100%);\n  box-shadow: inset 0 -4px 0 rgba(53, 107, 53, 0.1), 0 9px 22px rgba(53, 107, 53, 0.16);\n}\n.selected[_ngcontent-%COMP%]::after, .ai[_ngcontent-%COMP%]::after, .human[_ngcontent-%COMP%]::after, .goat[_ngcontent-%COMP%]::after, .cabbage[_ngcontent-%COMP%]::after, .easy[_ngcontent-%COMP%]::after, .medium[_ngcontent-%COMP%]::after, .hard[_ngcontent-%COMP%]::after, .extreme[_ngcontent-%COMP%]::after {\n  content: \"\u2713\";\n  position: absolute;\n  top: 0.5rem;\n  right: 0.5rem;\n  width: 1.35rem;\n  height: 1.35rem;\n  display: grid;\n  place-items: center;\n  border-radius: 999px;\n  color: #ffffff;\n  background: var(--grass-dark);\n  font-size: 0.75rem;\n  font-weight: 950;\n  box-shadow: 0 5px 12px rgba(53, 107, 53, 0.2);\n}\n.divider[_ngcontent-%COMP%] {\n  height: 1px;\n  margin: clamp(0.8rem, 1.4vw, 1.15rem) 0;\n  background: var(--border);\n}\n.params-block[_ngcontent-%COMP%] {\n  min-height: 0;\n  display: grid;\n  gap: clamp(0.65rem, 1vw, 0.85rem);\n  align-content: start;\n}\n.param-row[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: minmax(0, 1fr) clamp(5.4rem, 9vw, 7rem);\n  align-items: center;\n  gap: 0.85rem;\n}\nlabel[_ngcontent-%COMP%] {\n  color: var(--muted);\n  font-size: clamp(0.82rem, 1.1vw, 1rem);\n  font-weight: 900;\n}\ninput[type=number][_ngcontent-%COMP%] {\n  width: 100%;\n  height: clamp(2.6rem, 5vh, 3rem);\n  border: 2px solid rgba(53, 107, 53, 0.14);\n  border-radius: 14px;\n  color: var(--text);\n  background: #ffffff;\n  box-shadow: inset 0 2px 5px rgba(45, 72, 37, 0.06), 0 4px 0 rgba(53, 107, 53, 0.08);\n  font: inherit;\n  font-size: clamp(0.95rem, 1.2vw, 1.1rem);\n  font-weight: 950;\n  text-align: center;\n}\ninput[type=number][_ngcontent-%COMP%]:focus-visible {\n  outline: 3px solid rgba(127, 191, 88, 0.35);\n  outline-offset: 3px;\n  border-color: rgba(127, 191, 88, 0.55);\n}\n.camp-block[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  margin-bottom: 0.8rem;\n}\n.inline-settings-card[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr 1px 1fr;\n  align-items: stretch;\n  padding: clamp(0.8rem, 1.25vw, 1rem);\n}\n.inline-setting[_ngcontent-%COMP%] {\n  display: grid;\n  place-items: center;\n  gap: 0.65rem;\n}\n.centered-title[_ngcontent-%COMP%] {\n  justify-content: center;\n  margin-bottom: 0;\n  text-align: center;\n}\n.centered-title[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  font-size: clamp(1.15rem, 1.7vw, 1.5rem);\n}\n.number-control[_ngcontent-%COMP%] {\n  width: min(7rem, 80%);\n}\n.level-selection-list[_ngcontent-%COMP%] {\n  grid-template-columns: repeat(4, minmax(0, 1fr));\n}\n.level-selection-list-item[_ngcontent-%COMP%] {\n  position: relative;\n  min-height: clamp(2.8rem, 6vh, 3.5rem);\n  display: grid;\n  place-items: center;\n  border: 2px solid rgba(53, 107, 53, 0.14);\n  border-radius: 14px;\n  background: linear-gradient(180deg, #ffffff 0%, #fbfff7 100%);\n  box-shadow: inset 0 -3px 0 rgba(53, 107, 53, 0.05), 0 5px 12px rgba(45, 72, 37, 0.06);\n  color: var(--text);\n  font-size: clamp(0.78rem, 1vw, 0.95rem);\n  font-weight: 950;\n  cursor: pointer;\n  transition: transform 140ms ease, box-shadow 140ms ease, border-color 140ms ease, background 140ms ease;\n}\n.level-selection-list-item[_ngcontent-%COMP%]:hover {\n  transform: translateY(-2px);\n  border-color: rgba(127, 191, 88, 0.45);\n  background: linear-gradient(180deg, #ffffff 0%, var(--grass-soft) 100%);\n}\n.level-selection-list-item[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] {\n  position: absolute;\n  width: 1px;\n  height: 1px;\n  overflow: hidden;\n  clip: rect(0 0 0 0);\n  clip-path: inset(50%);\n}\n.level-selection-list-item.easy[_ngcontent-%COMP%], .level-selection-list-item.medium[_ngcontent-%COMP%], .level-selection-list-item.hard[_ngcontent-%COMP%], .level-selection-list-item.extreme[_ngcontent-%COMP%] {\n  border-color: var(--grass);\n  color: var(--grass-dark);\n  background: linear-gradient(180deg, #ffffff 0%, #dff4d8 100%);\n}\n.start-button[_ngcontent-%COMP%] {\n  appearance: none;\n  border: 0;\n  min-height: clamp(3.2rem, 6vh, 4rem);\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  gap: 0.65rem;\n  border-radius: 16px;\n  color: #ffffff;\n  background: radial-gradient(circle at 26% 20%, rgba(255, 255, 255, 0.28), transparent 32%), linear-gradient(135deg, var(--grass), var(--grass-dark));\n  box-shadow: 0 6px 0 rgba(37, 86, 36, 0.35), 0 16px 30px rgba(52, 102, 51, 0.18);\n  font: inherit;\n  font-size: clamp(0.9rem, 1.25vw, 1.08rem);\n  font-weight: 950;\n  letter-spacing: 0.08em;\n  text-transform: uppercase;\n  cursor: pointer;\n  transition: transform 140ms ease, box-shadow 140ms ease, filter 140ms ease;\n}\n.start-button[_ngcontent-%COMP%]:hover {\n  transform: translateY(-2px);\n  filter: brightness(1.04);\n  box-shadow: 0 8px 0 rgba(37, 86, 36, 0.35), 0 20px 34px rgba(52, 102, 51, 0.2);\n}\n.start-button[_ngcontent-%COMP%]:active {\n  transform: translateY(3px);\n  box-shadow: 0 3px 0 rgba(37, 86, 36, 0.35), 0 10px 20px rgba(52, 102, 51, 0.16);\n}\n.header-button[_ngcontent-%COMP%]:focus-visible, .choice-card[_ngcontent-%COMP%]:focus-visible, .level-selection-list-item[_ngcontent-%COMP%]:focus-within, .start-button[_ngcontent-%COMP%]:focus-visible {\n  outline: 3px solid rgba(127, 191, 88, 0.35);\n  outline-offset: 4px;\n}\n@media (max-width: 1180px) {\n  .config-layout[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n}\n@media (max-width: 760px) {\n  .page-header[_ngcontent-%COMP%] {\n    grid-template-columns: 3.6rem 1fr 5.5rem;\n    gap: 0.65rem;\n    min-height: 4rem;\n  }\n\n  .header-button[_ngcontent-%COMP%] {\n    min-width: 6.5rem;\n    height: 3.4rem;\n    border-radius: 13px;\n  }\n\n  .back-button[_ngcontent-%COMP%] {\n    font-size: 2rem;\n    width: 4rem;\n    height: 4rem;\n  }\n\n  .rules-button[_ngcontent-%COMP%] {\n    padding: 0 0.7rem;\n    font-size: 0.82rem;\n  }\n\n  .board-options-list[_ngcontent-%COMP%] {\n    grid-template-columns: repeat(2, minmax(0, 1fr));\n  }\n\n  .level-selection-list[_ngcontent-%COMP%] {\n    grid-template-columns: repeat(2, minmax(0, 1fr));\n  }\n\n  .inline-settings-card[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n    gap: 1rem;\n  }\n\n  .vertical-divider[_ngcontent-%COMP%] {\n    width: 100%;\n    height: 1px;\n  }\n}\n@media (max-width: 520px) {\n  .config-shell[_ngcontent-%COMP%] {\n    padding: 0.45rem;\n  }\n\n  .page-header[_ngcontent-%COMP%] {\n    grid-template-columns: 3rem 1fr 4.8rem;\n    gap: 0.45rem;\n  }\n\n  .title-block[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n    font-size: 0.56rem;\n    letter-spacing: 0.12em;\n  }\n\n  h1[_ngcontent-%COMP%] {\n    font-size: 1.85rem;\n  }\n\n  h2[_ngcontent-%COMP%] {\n    font-size: 1.15rem;\n  }\n\n  .header-button[_ngcontent-%COMP%] {\n    min-width: 6.5rem;\n    height: 3rem;\n    border-radius: 12px;\n  }\n\n  .back-button[_ngcontent-%COMP%] {\n    width: 3rem;\n    font-size: 1.8rem;\n  }\n\n  .rules-button[_ngcontent-%COMP%] {\n    font-size: 0.72rem;\n  }\n\n  .config-card[_ngcontent-%COMP%] {\n    padding: 0.8rem;\n    border-radius: 15px;\n  }\n\n  .board-options-list[_ngcontent-%COMP%], .two-columns[_ngcontent-%COMP%], .level-selection-list[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n\n  .choice-card[_ngcontent-%COMP%] {\n    min-height: 5.2rem;\n  }\n\n  .param-row[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n    gap: 0.4rem;\n  }\n\n  .number-control[_ngcontent-%COMP%] {\n    width: 100%;\n  }\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uXFwuLlxcLi5cXC4uXFxjb25maWd1cmF0aW9uLW1lbnUuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsZ0JBQWdCO0FBQWhCO0VBQ0ksY0FBQTtFQUNBLGtCQUFBO0VBQ0EsY0FBQTtFQUNBLHVHQUFBO0VBQ0EsOE9BQ0k7QUFDUjtBQUlBO0VBQ0ksc0JBQUE7QUFESjtBQUlBO0VBQ0ksZ0JBQUE7RUFDQSxxQkFBQTtFQUNBLHFCQUFBO0VBQ0EsZUFBQTtFQUNBLGdCQUFBO0VBQ0EsZ0JBQUE7RUFDQSxlQUFBO0VBQ0Esb0JBQUE7RUFDQSxpQkFBQTtFQUNBLGNBQUE7RUFDQSxlQUFBO0VBQ0EsZ0JBQUE7RUFDQSxpQ0FBQTtFQUNBLCtDQUFBO0VBQ0EsaURBQUE7RUFFQSxXQUFBO0VBQ0Esa0JBQUE7RUFDQSxhQUFBO0VBQ0EsdUJBQUE7RUFDQSwrQkFBQTtBQUZKO0FBS0E7RUFDSSxXQUFBO0VBQ0EsaUJBQUE7RUFDQSxhQUFBO0VBQ0Esc0JBQUE7RUFDQSwyQkFBQTtBQUZKO0FBS0E7RUFDSSxhQUFBO0VBQ0Esc0NBQUE7RUFDQSxtQkFBQTtFQUNBLFNBQUE7RUFDQSxzQkFBQTtBQUZKO0FBS0E7RUFDSSxrQkFBQTtBQUZKO0FBS0E7RUFDSSxtQkFBQTtFQUNBLHdCQUFBO0VBQ0EsdUNBQUE7RUFDQSxnQkFBQTtFQUNBLHFCQUFBO0VBQ0EseUJBQUE7QUFGSjtBQUtBO0VBQ0ksU0FBQTtBQUZKO0FBS0E7RUFDSSw4Q0FBQTtFQUNBLG1DQUFBO0VBQ0EsZ0JBQUE7RUFDQSxrQkFBQTtBQUZKO0FBS0E7RUFDSSxxQ0FBQTtFQUNBLGdCQUFBO0VBQ0Esa0JBQUE7QUFGSjtBQUtBO0VBQ0ksaUJBQUE7RUFDQSxnQkFBQTtFQUNBLG1CQUFBO0VBQ0EscUJBQUE7QUFGSjtBQUtBO0VBQ0ksYUFBQTtFQUNBLGtDQUFBO0VBQ0EsMkJBQUE7RUFDQSxrQkFBQTtBQUZKO0FBS0E7RUFDSSxhQUFBO0VBQ0Esc0JBQUE7RUFDQSwyQkFBQTtBQUZKO0FBS0E7RUFDSSwrQkFBQTtFQUNBLG1CQUFBO0VBQ0Esb0NBQUE7RUFDQSwyQkFBQTtFQUNBLDhCQUFBO0VBQ0EsaUNBQUE7QUFGSjtBQUtBO0VBQ0ksYUFBQTtFQUNBLGFBQUE7RUFDQSxpREFBQTtFQUNBLGdCQUFBO0FBRko7QUFLQTtFQUNJLGFBQUE7RUFDQSxxQkFBQTtFQUNBLFlBQUE7RUFDQSx5Q0FBQTtBQUZKO0FBS0E7RUFDSSxtQkFBQTtFQUNBLGtCQUFBO0VBQ0EsZ0JBQUE7RUFDQSxzQkFBQTtBQUZKO0FBS0E7OztFQUdJLGFBQUE7RUFDQSxrQ0FBQTtBQUZKO0FBS0E7RUFDSSxnREFBQTtBQUZKO0FBS0E7RUFDSSxnREFBQTtBQUZKO0FBS0E7RUFDSSxhQUFBO0VBQ0EsbUJBQUE7RUFDQSw4QkFBQTtFQUNBLFNBQUE7RUFDQSxnQkFBQTtFQUNBLDBEQUFBO0FBRko7QUFLQTtFQUNJLFdBQUE7RUFDQSxhQUFBO0VBQ0EsbUJBQUE7RUFDQSw4QkFBQTtFQUNBLFNBQUE7QUFGSjtBQUtBO0VBQ0ksMkJBQUE7RUFDQSxnQkFBQTtFQUNBLGdCQUFBO0FBRko7QUFLQTtFQUNJLHFDQUFBO0FBRko7QUFLQTtFQUNJLGVBQUE7QUFGSjtBQUtBO0VBQ0ksK0JBQUE7QUFGSjtBQUtBO0VBQ0ksZ0NBQUE7RUFDQSxtQkFBQTtFQUNBLHFDQUFBO0FBRko7QUFLQTtFQUNJLGdCQUFBO0VBQ0Esa0JBQUE7RUFDQSx5Q0FBQTtFQUNBLHFDQUFBO0VBQ0EsYUFBQTtFQUNBLG1CQUFBO0VBQ0EscUJBQUE7RUFDQSxZQUFBO0VBQ0EsZ0JBQUE7RUFDQSxtQkFBQTtFQUNBLGtCQUFBO0VBQ0EsNkRBQ0k7RUFDSixxRkFDSTtFQUVKLGFBQUE7RUFDQSxzQ0FBQTtFQUNBLGdCQUFBO0VBQ0Esa0JBQUE7RUFDQSxlQUFBO0VBQ0EsdUdBQ0k7QUFOUjtBQVlBO0VBQ0ksMkJBQUE7RUFDQSxzQ0FBQTtFQUNBLHVFQUNJO0VBQ0oscUZBQ0k7QUFYUjtBQWVBO0VBQ0ksMEJBQUE7QUFaSjtBQWVBO0VBQ0ksbUNBQUE7RUFDQSxvQ0FBQTtFQUNBLGFBQUE7RUFDQSxtQkFBQTtBQVpKO0FBZUE7RUFDSSxjQUFBO0FBWko7QUFlQTtFQUNJLGNBQUE7QUFaSjtBQWVBO0VBQ0ksZUFBQTtFQUNBLGdCQUFBO0VBQ0EsbUJBQUE7QUFaSjtBQWVBO0VBQ0ksWUFBQTtBQVpKO0FBZUE7RUFDSSxzQkFBQTtBQVpKO0FBZUE7RUFDSSxtQ0FBQTtFQUNBLG9DQUFBO0FBWko7QUFlQTs7Ozs7Ozs7O0VBU0ksMEJBQUE7RUFDQSx3QkFBQTtFQUNBLDRJQUNJO0VBRUoscUZBQ0k7QUFmUjtBQW1CQTs7Ozs7Ozs7O0VBU0ksWUFBQTtFQUNBLGtCQUFBO0VBQ0EsV0FBQTtFQUNBLGFBQUE7RUFDQSxjQUFBO0VBQ0EsZUFBQTtFQUNBLGFBQUE7RUFDQSxtQkFBQTtFQUNBLG9CQUFBO0VBQ0EsY0FBQTtFQUNBLDZCQUFBO0VBQ0Esa0JBQUE7RUFDQSxnQkFBQTtFQUNBLDZDQUFBO0FBaEJKO0FBbUJBO0VBQ0ksV0FBQTtFQUNBLHVDQUFBO0VBQ0EseUJBQUE7QUFoQko7QUFtQkE7RUFDSSxhQUFBO0VBQ0EsYUFBQTtFQUNBLGlDQUFBO0VBQ0Esb0JBQUE7QUFoQko7QUFtQkE7RUFDSSxhQUFBO0VBQ0EsOERBQUE7RUFDQSxtQkFBQTtFQUNBLFlBQUE7QUFoQko7QUFtQkE7RUFDSSxtQkFBQTtFQUNBLHNDQUFBO0VBQ0EsZ0JBQUE7QUFoQko7QUFtQkE7RUFDSSxXQUFBO0VBQ0EsZ0NBQUE7RUFDQSx5Q0FBQTtFQUNBLG1CQUFBO0VBQ0Esa0JBQUE7RUFDQSxtQkFBQTtFQUNBLG1GQUNJO0VBRUosYUFBQTtFQUNBLHdDQUFBO0VBQ0EsZ0JBQUE7RUFDQSxrQkFBQTtBQWxCSjtBQXFCQTtFQUNJLDJDQUFBO0VBQ0EsbUJBQUE7RUFDQSxzQ0FBQTtBQWxCSjtBQXFCQTtFQUNJLHFCQUFBO0FBbEJKO0FBcUJBO0VBQ0ksYUFBQTtFQUNBLGtDQUFBO0VBQ0Esb0JBQUE7RUFDQSxvQ0FBQTtBQWxCSjtBQXFCQTtFQUNJLGFBQUE7RUFDQSxtQkFBQTtFQUNBLFlBQUE7QUFsQko7QUFxQkE7RUFDSSx1QkFBQTtFQUNBLGdCQUFBO0VBQ0Esa0JBQUE7QUFsQko7QUFxQkE7RUFDSSx3Q0FBQTtBQWxCSjtBQXFCQTtFQUNJLHFCQUFBO0FBbEJKO0FBcUJBO0VBQ0ksZ0RBQUE7QUFsQko7QUFxQkE7RUFDSSxrQkFBQTtFQUNBLHNDQUFBO0VBQ0EsYUFBQTtFQUNBLG1CQUFBO0VBQ0EseUNBQUE7RUFDQSxtQkFBQTtFQUNBLDZEQUNJO0VBQ0oscUZBQ0k7RUFFSixrQkFBQTtFQUNBLHVDQUFBO0VBQ0EsZ0JBQUE7RUFDQSxlQUFBO0VBQ0EsdUdBQ0k7QUF0QlI7QUE0QkE7RUFDSSwyQkFBQTtFQUNBLHNDQUFBO0VBQ0EsdUVBQ0k7QUExQlI7QUE2QkE7RUFDSSxrQkFBQTtFQUNBLFVBQUE7RUFDQSxXQUFBO0VBQ0EsZ0JBQUE7RUFDQSxtQkFBQTtFQUNBLHFCQUFBO0FBMUJKO0FBNkJBOzs7O0VBSUksMEJBQUE7RUFDQSx3QkFBQTtFQUNBLDZEQUNJO0FBM0JSO0FBOEJBO0VBQ0ksZ0JBQUE7RUFDQSxTQUFBO0VBQ0Esb0NBQUE7RUFDQSxvQkFBQTtFQUNBLG1CQUFBO0VBQ0EsdUJBQUE7RUFDQSxZQUFBO0VBQ0EsbUJBQUE7RUFDQSxjQUFBO0VBQ0Esb0pBQ0k7RUFFSiwrRUFDSTtFQUVKLGFBQUE7RUFDQSx5Q0FBQTtFQUNBLGdCQUFBO0VBQ0Esc0JBQUE7RUFDQSx5QkFBQTtFQUNBLGVBQUE7RUFDQSwwRUFDSTtBQWhDUjtBQXFDQTtFQUNJLDJCQUFBO0VBQ0Esd0JBQUE7RUFDQSw4RUFDSTtBQW5DUjtBQXVDQTtFQUNJLDBCQUFBO0VBQ0EsK0VBQ0k7QUFyQ1I7QUF5Q0E7Ozs7RUFJSSwyQ0FBQTtFQUNBLG1CQUFBO0FBdENKO0FBeUNBO0VBQ0k7SUFDSSwwQkFBQTtFQXRDTjtBQUNGO0FBeUNBO0VBQ0k7SUFDSSx3Q0FBQTtJQUNBLFlBQUE7SUFDQSxnQkFBQTtFQXZDTjs7RUEwQ0U7SUFDSSxpQkFBQTtJQUNBLGNBQUE7SUFDQSxtQkFBQTtFQXZDTjs7RUEwQ0U7SUFDSSxlQUFBO0lBQ0EsV0FBQTtJQUNBLFlBQUE7RUF2Q047O0VBMENFO0lBQ0ksaUJBQUE7SUFDQSxrQkFBQTtFQXZDTjs7RUEwQ0U7SUFDSSxnREFBQTtFQXZDTjs7RUEwQ0U7SUFDSSxnREFBQTtFQXZDTjs7RUEwQ0U7SUFDSSwwQkFBQTtJQUNBLFNBQUE7RUF2Q047O0VBMENFO0lBQ0ksV0FBQTtJQUNBLFdBQUE7RUF2Q047QUFDRjtBQTBDQTtFQUNJO0lBQ0ksZ0JBQUE7RUF4Q047O0VBMkNFO0lBQ0ksc0NBQUE7SUFDQSxZQUFBO0VBeENOOztFQTJDRTtJQUNJLGtCQUFBO0lBQ0Esc0JBQUE7RUF4Q047O0VBMkNFO0lBQ0ksa0JBQUE7RUF4Q047O0VBMkNFO0lBQ0ksa0JBQUE7RUF4Q047O0VBMkNFO0lBQ0ksaUJBQUE7SUFDQSxZQUFBO0lBQ0EsbUJBQUE7RUF4Q047O0VBMkNFO0lBQ0ksV0FBQTtJQUNBLGlCQUFBO0VBeENOOztFQTJDRTtJQUNJLGtCQUFBO0VBeENOOztFQTJDRTtJQUNJLGVBQUE7SUFDQSxtQkFBQTtFQXhDTjs7RUEyQ0U7OztJQUdJLDBCQUFBO0VBeENOOztFQTJDRTtJQUNJLGtCQUFBO0VBeENOOztFQTJDRTtJQUNJLDBCQUFBO0lBQ0EsV0FBQTtFQXhDTjs7RUEyQ0U7SUFDSSxXQUFBO0VBeENOO0FBQ0YiLCJmaWxlIjoiY29uZmlndXJhdGlvbi1tZW51LmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiQGNoYXJzZXQgXCJVVEYtOFwiO1xuOmhvc3Qge1xuICBkaXNwbGF5OiBibG9jaztcbiAgbWluLWhlaWdodDogMTAwZHZoO1xuICBjb2xvcjogIzI1MzMyMjtcbiAgZm9udC1mYW1pbHk6IEludGVyLCB1aS1zYW5zLXNlcmlmLCBzeXN0ZW0tdWksIC1hcHBsZS1zeXN0ZW0sIEJsaW5rTWFjU3lzdGVtRm9udCwgXCJTZWdvZSBVSVwiLCBzYW5zLXNlcmlmO1xuICBiYWNrZ3JvdW5kOiByYWRpYWwtZ3JhZGllbnQoY2lyY2xlIGF0IDEyJSAxMCUsIHJnYmEoMTgzLCAyMjAsIDExNiwgMC4zMiksIHRyYW5zcGFyZW50IDI1cmVtKSwgcmFkaWFsLWdyYWRpZW50KGNpcmNsZSBhdCA5MCUgODIlLCByZ2JhKDE0MywgMjExLCAyMjAsIDAuMjIpLCB0cmFuc3BhcmVudCAyOHJlbSksIGxpbmVhci1ncmFkaWVudCgxMzVkZWcsICNlZGY4ZTggMCUsICNmYmZmZjcgNTAlLCAjZTJmM2RjIDEwMCUpO1xufVxuXG4qIHtcbiAgYm94LXNpemluZzogYm9yZGVyLWJveDtcbn1cblxuLmNvbmZpZy1zaGVsbCB7XG4gIC0tZ3Jhc3M6ICM3ZmJmNTg7XG4gIC0tZ3Jhc3MtZGFyazogIzM1NmIzNTtcbiAgLS1ncmFzcy1zb2Z0OiAjZTZmNWRmO1xuICAtLWxlYWY6ICNiN2RjNzQ7XG4gIC0tY3JlYW06ICNmZmZhZjA7XG4gIC0tcGFwZXI6ICNmYmZmZjc7XG4gIC0tc29pbDogIzhhNjg0MztcbiAgLS1zb2lsLWRhcms6ICM1YzQzMmI7XG4gIC0tZGFuZ2VyOiAjZDg0ZjUyO1xuICAtLXNreTogIzhmZDNkYztcbiAgLS10ZXh0OiAjMjUzMzIyO1xuICAtLW11dGVkOiAjNzM4MDZmO1xuICAtLWJvcmRlcjogcmdiYSg1MywgMTA3LCA1MywgMC4xOCk7XG4gIC0tc2hhZG93LXNvZnQ6IDAgOHB4IDIycHggcmdiYSg0NSwgNzIsIDM3LCAwLjEpO1xuICAtLXNoYWRvdy1jYXJkOiAwIDE0cHggMzRweCByZ2JhKDQ1LCA3MiwgMzcsIDAuMTIpO1xuICB3aWR0aDogMTAwJTtcbiAgbWluLWhlaWdodDogMTAwZHZoO1xuICBkaXNwbGF5OiBmbGV4O1xuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgcGFkZGluZzogY2xhbXAoMXJlbSwgMnZ3LCAycmVtKTtcbn1cblxuLmNvbmZpZy1wYWdlIHtcbiAgd2lkdGg6IDEwMCU7XG4gIG1heC13aWR0aDogMTI4MHB4O1xuICBkaXNwbGF5OiBmbGV4O1xuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICBnYXA6IGNsYW1wKDFyZW0sIDJ2dywgMnJlbSk7XG59XG5cbi5wYWdlLWhlYWRlciB7XG4gIGRpc3BsYXk6IGdyaWQ7XG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogNHJlbSAxZnIgNi4ycmVtO1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBnYXA6IDFyZW07XG4gIHBhZGRpbmctYm90dG9tOiAwLjVyZW07XG59XG5cbi50aXRsZS1ibG9jayB7XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbn1cblxuLnRpdGxlLWJsb2NrIHAge1xuICBtYXJnaW46IDAgMCAwLjI1cmVtO1xuICBjb2xvcjogdmFyKC0tZ3Jhc3MtZGFyayk7XG4gIGZvbnQtc2l6ZTogY2xhbXAoMC43cmVtLCAxLjJ2dywgMC45cmVtKTtcbiAgZm9udC13ZWlnaHQ6IDgwMDtcbiAgbGV0dGVyLXNwYWNpbmc6IDAuMmVtO1xuICB0ZXh0LXRyYW5zZm9ybTogdXBwZXJjYXNlO1xufVxuXG5oMSwgaDIsIGgzLCBwIHtcbiAgbWFyZ2luOiAwO1xufVxuXG5oMSB7XG4gIGZvbnQtZmFtaWx5OiBHZW9yZ2lhLCBcIlRpbWVzIE5ldyBSb21hblwiLCBzZXJpZjtcbiAgZm9udC1zaXplOiBjbGFtcCgycmVtLCA1dncsIDMuNXJlbSk7XG4gIGxpbmUtaGVpZ2h0OiAxLjE7XG4gIGNvbG9yOiB2YXIoLS10ZXh0KTtcbn1cblxuaDIge1xuICBmb250LXNpemU6IGNsYW1wKDEuMnJlbSwgMnZ3LCAxLjZyZW0pO1xuICBmb250LXdlaWdodDogODAwO1xuICBjb2xvcjogdmFyKC0tdGV4dCk7XG59XG5cbmgzIHtcbiAgZm9udC1zaXplOiAxLjFyZW07XG4gIGZvbnQtd2VpZ2h0OiA3MDA7XG4gIGNvbG9yOiB2YXIoLS1tdXRlZCk7XG4gIG1hcmdpbi1ib3R0b206IDAuNXJlbTtcbn1cblxuLmNvbmZpZy1sYXlvdXQge1xuICBkaXNwbGF5OiBncmlkO1xuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IDEuMWZyIDAuOWZyO1xuICBnYXA6IGNsYW1wKDFyZW0sIDJ2dywgMnJlbSk7XG4gIGFsaWduLWl0ZW1zOiBzdGFydDtcbn1cblxuLnJpZ2h0LWNvbHVtbiB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gIGdhcDogY2xhbXAoMXJlbSwgMnZ3LCAycmVtKTtcbn1cblxuLmNvbmZpZy1jYXJkIHtcbiAgYm9yZGVyOiAxcHggc29saWQgdmFyKC0tYm9yZGVyKTtcbiAgYm9yZGVyLXJhZGl1czogMjRweDtcbiAgYmFja2dyb3VuZDogcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjgpO1xuICBiYWNrZHJvcC1maWx0ZXI6IGJsdXIoMTBweCk7XG4gIGJveC1zaGFkb3c6IHZhcigtLXNoYWRvdy1jYXJkKTtcbiAgcGFkZGluZzogY2xhbXAoMS4ycmVtLCAydncsIDJyZW0pO1xufVxuXG4uYm9hcmQtY2FyZCB7XG4gIG1pbi1oZWlnaHQ6IDA7XG4gIGRpc3BsYXk6IGdyaWQ7XG4gIGdyaWQtdGVtcGxhdGUtcm93czogYXV0byBhdXRvIGF1dG8gbWlubWF4KDAsIDFmcik7XG4gIG92ZXJmbG93OiBoaWRkZW47XG59XG5cbi5zZWN0aW9uLXRpdGxlIHtcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24taXRlbXM6IGJhc2VsaW5lO1xuICBnYXA6IDAuNjVyZW07XG4gIG1hcmdpbi1ib3R0b206IGNsYW1wKDAuN3JlbSwgMS4xdncsIDFyZW0pO1xufVxuXG4uc2VjdGlvbi1udW1iZXIge1xuICBjb2xvcjogdmFyKC0tZ3Jhc3MpO1xuICBmb250LXNpemU6IDAuODVyZW07XG4gIGZvbnQtd2VpZ2h0OiA5NTA7XG4gIGxldHRlci1zcGFjaW5nOiAwLjE0ZW07XG59XG5cbi5ib2FyZC1vcHRpb25zLWxpc3QsXG4uY2hvaWNlLWdyaWQsXG4ubGV2ZWwtc2VsZWN0aW9uLWxpc3Qge1xuICBkaXNwbGF5OiBncmlkO1xuICBnYXA6IGNsYW1wKDAuNTVyZW0sIDAuOXZ3LCAwLjhyZW0pO1xufVxuXG4uYm9hcmQtb3B0aW9ucy1saXN0IHtcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoMywgbWlubWF4KDAsIDFmcikpO1xufVxuXG4udHdvLWNvbHVtbnMge1xuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCgyLCBtaW5tYXgoMCwgMWZyKSk7XG59XG5cbi5zcGVlZC1vbmx5LWNhcmQge1xuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XG4gIGdhcDogMnJlbTtcbiAgbWluLWhlaWdodDogN3JlbTtcbiAgcGFkZGluZzogY2xhbXAoMS40cmVtLCAydncsIDEuOHJlbSkgY2xhbXAoMnJlbSwgM3Z3LCAzcmVtKTtcbn1cblxuLnNwZWVkLW9ubHktY2FyZCAuaW5saW5lLXNldHRpbmcge1xuICB3aWR0aDogMTAwJTtcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xuICBnYXA6IDJyZW07XG59XG5cbi5zcGVlZC1vbmx5LWNhcmQgLmNlbnRlcmVkLXRpdGxlIHtcbiAganVzdGlmeS1jb250ZW50OiBmbGV4LXN0YXJ0O1xuICBtYXJnaW4tYm90dG9tOiAwO1xuICB0ZXh0LWFsaWduOiBsZWZ0O1xufVxuXG4uc3BlZWQtb25seS1jYXJkIC5jZW50ZXJlZC10aXRsZSBoMiB7XG4gIGZvbnQtc2l6ZTogY2xhbXAoMS42cmVtLCAyLjN2dywgMnJlbSk7XG59XG5cbi5zcGVlZC1vbmx5LWNhcmQgLnNlY3Rpb24tbnVtYmVyIHtcbiAgZm9udC1zaXplOiAxcmVtO1xufVxuXG4uc3BlZWQtb25seS1jYXJkIC5udW1iZXItY29udHJvbCB7XG4gIHdpZHRoOiBjbGFtcCg4cmVtLCAxNHZ3LCAxMXJlbSk7XG59XG5cbi5zcGVlZC1vbmx5LWNhcmQgaW5wdXRbdHlwZT1udW1iZXJdIHtcbiAgaGVpZ2h0OiBjbGFtcCgzLjJyZW0sIDZ2aCwgNHJlbSk7XG4gIGJvcmRlci1yYWRpdXM6IDE4cHg7XG4gIGZvbnQtc2l6ZTogY2xhbXAoMS4zcmVtLCAydncsIDEuN3JlbSk7XG59XG5cbi5jaG9pY2UtY2FyZCB7XG4gIGFwcGVhcmFuY2U6IG5vbmU7XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgYm9yZGVyOiAycHggc29saWQgcmdiYSg1MywgMTA3LCA1MywgMC4xNCk7XG4gIG1pbi1oZWlnaHQ6IGNsYW1wKDUuNXJlbSwgMTF2aCwgN3JlbSk7XG4gIGRpc3BsYXk6IGdyaWQ7XG4gIHBsYWNlLWl0ZW1zOiBjZW50ZXI7XG4gIGFsaWduLWNvbnRlbnQ6IGNlbnRlcjtcbiAgZ2FwOiAwLjQ1cmVtO1xuICBwYWRkaW5nOiAwLjc1cmVtO1xuICBib3JkZXItcmFkaXVzOiAxNnB4O1xuICBjb2xvcjogdmFyKC0tdGV4dCk7XG4gIGJhY2tncm91bmQ6IGxpbmVhci1ncmFkaWVudCgxODBkZWcsICNmZmZmZmYgMCUsICNmYmZmZjcgMTAwJSk7XG4gIGJveC1zaGFkb3c6IGluc2V0IDAgLTNweCAwIHJnYmEoNTMsIDEwNywgNTMsIDAuMDYpLCAwIDVweCAxNHB4IHJnYmEoNDUsIDcyLCAzNywgMC4wNik7XG4gIGZvbnQ6IGluaGVyaXQ7XG4gIGZvbnQtc2l6ZTogY2xhbXAoMC43OHJlbSwgMS4xdncsIDFyZW0pO1xuICBmb250LXdlaWdodDogOTUwO1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gIGN1cnNvcjogcG9pbnRlcjtcbiAgdHJhbnNpdGlvbjogdHJhbnNmb3JtIDE0MG1zIGVhc2UsIGJveC1zaGFkb3cgMTQwbXMgZWFzZSwgYm9yZGVyLWNvbG9yIDE0MG1zIGVhc2UsIGJhY2tncm91bmQgMTQwbXMgZWFzZTtcbn1cblxuLmNob2ljZS1jYXJkOmhvdmVyIHtcbiAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC0ycHgpO1xuICBib3JkZXItY29sb3I6IHJnYmEoMTI3LCAxOTEsIDg4LCAwLjQ4KTtcbiAgYmFja2dyb3VuZDogbGluZWFyLWdyYWRpZW50KDE4MGRlZywgI2ZmZmZmZiAwJSwgdmFyKC0tZ3Jhc3Mtc29mdCkgMTAwJSk7XG4gIGJveC1zaGFkb3c6IGluc2V0IDAgLTNweCAwIHJnYmEoNTMsIDEwNywgNTMsIDAuMDgpLCAwIDEwcHggMjBweCByZ2JhKDQ1LCA3MiwgMzcsIDAuMSk7XG59XG5cbi5jaG9pY2UtY2FyZDphY3RpdmUge1xuICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoMXB4KTtcbn1cblxuLmNob2ljZS12aXN1YWwge1xuICB3aWR0aDogY2xhbXAoMi41cmVtLCA0LjV2dywgMy40cmVtKTtcbiAgaGVpZ2h0OiBjbGFtcCgyLjVyZW0sIDQuNXZ3LCAzLjRyZW0pO1xuICBkaXNwbGF5OiBncmlkO1xuICBwbGFjZS1pdGVtczogY2VudGVyO1xufVxuXG4uYmFjay1idXR0b24ge1xuICBoZWlnaHQ6IDMuNXJlbTtcbn1cblxuLnJ1bGVzLWJ1dHRvbiB7XG4gIGhlaWdodDogMy41cmVtO1xufVxuXG4uY2hvaWNlLXZpc3VhbCBpbWcge1xuICBtYXgtd2lkdGg6IDEwMCU7XG4gIG1heC1oZWlnaHQ6IDEwMCU7XG4gIG9iamVjdC1maXQ6IGNvbnRhaW47XG59XG5cbi5ncmFwaC12aXN1YWwgaW1nIHtcbiAgb3BhY2l0eTogMC45O1xufVxuXG4ub3Bwb25lbnQtdmlzdWFsIGltZyB7XG4gIGZpbHRlcjogc2F0dXJhdGUoMC45NSk7XG59XG5cbi5wbGF5ZXItdmlzdWFsIHtcbiAgd2lkdGg6IGNsYW1wKDIuOHJlbSwgNC44dncsIDMuN3JlbSk7XG4gIGhlaWdodDogY2xhbXAoMi44cmVtLCA0Ljh2dywgMy43cmVtKTtcbn1cblxuLnNlbGVjdGVkLFxuLmFpLFxuLmh1bWFuLFxuLmdvYXQsXG4uY2FiYmFnZSxcbi5lYXN5LFxuLm1lZGl1bSxcbi5oYXJkLFxuLmV4dHJlbWUge1xuICBib3JkZXItY29sb3I6IHZhcigtLWdyYXNzKTtcbiAgY29sb3I6IHZhcigtLWdyYXNzLWRhcmspO1xuICBiYWNrZ3JvdW5kOiByYWRpYWwtZ3JhZGllbnQoY2lyY2xlIGF0IDI4JSAxOCUsIHJnYmEoMjU1LCAyNTUsIDI1NSwgMC44KSwgdHJhbnNwYXJlbnQgMzUlKSwgbGluZWFyLWdyYWRpZW50KDE4MGRlZywgI2ZmZmZmZiAwJSwgI2RmZjRkOCAxMDAlKTtcbiAgYm94LXNoYWRvdzogaW5zZXQgMCAtNHB4IDAgcmdiYSg1MywgMTA3LCA1MywgMC4xKSwgMCA5cHggMjJweCByZ2JhKDUzLCAxMDcsIDUzLCAwLjE2KTtcbn1cblxuLnNlbGVjdGVkOjphZnRlcixcbi5haTo6YWZ0ZXIsXG4uaHVtYW46OmFmdGVyLFxuLmdvYXQ6OmFmdGVyLFxuLmNhYmJhZ2U6OmFmdGVyLFxuLmVhc3k6OmFmdGVyLFxuLm1lZGl1bTo6YWZ0ZXIsXG4uaGFyZDo6YWZ0ZXIsXG4uZXh0cmVtZTo6YWZ0ZXIge1xuICBjb250ZW50OiBcIuKck1wiO1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIHRvcDogMC41cmVtO1xuICByaWdodDogMC41cmVtO1xuICB3aWR0aDogMS4zNXJlbTtcbiAgaGVpZ2h0OiAxLjM1cmVtO1xuICBkaXNwbGF5OiBncmlkO1xuICBwbGFjZS1pdGVtczogY2VudGVyO1xuICBib3JkZXItcmFkaXVzOiA5OTlweDtcbiAgY29sb3I6ICNmZmZmZmY7XG4gIGJhY2tncm91bmQ6IHZhcigtLWdyYXNzLWRhcmspO1xuICBmb250LXNpemU6IDAuNzVyZW07XG4gIGZvbnQtd2VpZ2h0OiA5NTA7XG4gIGJveC1zaGFkb3c6IDAgNXB4IDEycHggcmdiYSg1MywgMTA3LCA1MywgMC4yKTtcbn1cblxuLmRpdmlkZXIge1xuICBoZWlnaHQ6IDFweDtcbiAgbWFyZ2luOiBjbGFtcCgwLjhyZW0sIDEuNHZ3LCAxLjE1cmVtKSAwO1xuICBiYWNrZ3JvdW5kOiB2YXIoLS1ib3JkZXIpO1xufVxuXG4ucGFyYW1zLWJsb2NrIHtcbiAgbWluLWhlaWdodDogMDtcbiAgZGlzcGxheTogZ3JpZDtcbiAgZ2FwOiBjbGFtcCgwLjY1cmVtLCAxdncsIDAuODVyZW0pO1xuICBhbGlnbi1jb250ZW50OiBzdGFydDtcbn1cblxuLnBhcmFtLXJvdyB7XG4gIGRpc3BsYXk6IGdyaWQ7XG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogbWlubWF4KDAsIDFmcikgY2xhbXAoNS40cmVtLCA5dncsIDdyZW0pO1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBnYXA6IDAuODVyZW07XG59XG5cbmxhYmVsIHtcbiAgY29sb3I6IHZhcigtLW11dGVkKTtcbiAgZm9udC1zaXplOiBjbGFtcCgwLjgycmVtLCAxLjF2dywgMXJlbSk7XG4gIGZvbnQtd2VpZ2h0OiA5MDA7XG59XG5cbmlucHV0W3R5cGU9bnVtYmVyXSB7XG4gIHdpZHRoOiAxMDAlO1xuICBoZWlnaHQ6IGNsYW1wKDIuNnJlbSwgNXZoLCAzcmVtKTtcbiAgYm9yZGVyOiAycHggc29saWQgcmdiYSg1MywgMTA3LCA1MywgMC4xNCk7XG4gIGJvcmRlci1yYWRpdXM6IDE0cHg7XG4gIGNvbG9yOiB2YXIoLS10ZXh0KTtcbiAgYmFja2dyb3VuZDogI2ZmZmZmZjtcbiAgYm94LXNoYWRvdzogaW5zZXQgMCAycHggNXB4IHJnYmEoNDUsIDcyLCAzNywgMC4wNiksIDAgNHB4IDAgcmdiYSg1MywgMTA3LCA1MywgMC4wOCk7XG4gIGZvbnQ6IGluaGVyaXQ7XG4gIGZvbnQtc2l6ZTogY2xhbXAoMC45NXJlbSwgMS4ydncsIDEuMXJlbSk7XG4gIGZvbnQtd2VpZ2h0OiA5NTA7XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbn1cblxuaW5wdXRbdHlwZT1udW1iZXJdOmZvY3VzLXZpc2libGUge1xuICBvdXRsaW5lOiAzcHggc29saWQgcmdiYSgxMjcsIDE5MSwgODgsIDAuMzUpO1xuICBvdXRsaW5lLW9mZnNldDogM3B4O1xuICBib3JkZXItY29sb3I6IHJnYmEoMTI3LCAxOTEsIDg4LCAwLjU1KTtcbn1cblxuLmNhbXAtYmxvY2sgaDMge1xuICBtYXJnaW4tYm90dG9tOiAwLjhyZW07XG59XG5cbi5pbmxpbmUtc2V0dGluZ3MtY2FyZCB7XG4gIGRpc3BsYXk6IGdyaWQ7XG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogMWZyIDFweCAxZnI7XG4gIGFsaWduLWl0ZW1zOiBzdHJldGNoO1xuICBwYWRkaW5nOiBjbGFtcCgwLjhyZW0sIDEuMjV2dywgMXJlbSk7XG59XG5cbi5pbmxpbmUtc2V0dGluZyB7XG4gIGRpc3BsYXk6IGdyaWQ7XG4gIHBsYWNlLWl0ZW1zOiBjZW50ZXI7XG4gIGdhcDogMC42NXJlbTtcbn1cblxuLmNlbnRlcmVkLXRpdGxlIHtcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gIG1hcmdpbi1ib3R0b206IDA7XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbn1cblxuLmNlbnRlcmVkLXRpdGxlIGgyIHtcbiAgZm9udC1zaXplOiBjbGFtcCgxLjE1cmVtLCAxLjd2dywgMS41cmVtKTtcbn1cblxuLm51bWJlci1jb250cm9sIHtcbiAgd2lkdGg6IG1pbig3cmVtLCA4MCUpO1xufVxuXG4ubGV2ZWwtc2VsZWN0aW9uLWxpc3Qge1xuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCg0LCBtaW5tYXgoMCwgMWZyKSk7XG59XG5cbi5sZXZlbC1zZWxlY3Rpb24tbGlzdC1pdGVtIHtcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xuICBtaW4taGVpZ2h0OiBjbGFtcCgyLjhyZW0sIDZ2aCwgMy41cmVtKTtcbiAgZGlzcGxheTogZ3JpZDtcbiAgcGxhY2UtaXRlbXM6IGNlbnRlcjtcbiAgYm9yZGVyOiAycHggc29saWQgcmdiYSg1MywgMTA3LCA1MywgMC4xNCk7XG4gIGJvcmRlci1yYWRpdXM6IDE0cHg7XG4gIGJhY2tncm91bmQ6IGxpbmVhci1ncmFkaWVudCgxODBkZWcsICNmZmZmZmYgMCUsICNmYmZmZjcgMTAwJSk7XG4gIGJveC1zaGFkb3c6IGluc2V0IDAgLTNweCAwIHJnYmEoNTMsIDEwNywgNTMsIDAuMDUpLCAwIDVweCAxMnB4IHJnYmEoNDUsIDcyLCAzNywgMC4wNik7XG4gIGNvbG9yOiB2YXIoLS10ZXh0KTtcbiAgZm9udC1zaXplOiBjbGFtcCgwLjc4cmVtLCAxdncsIDAuOTVyZW0pO1xuICBmb250LXdlaWdodDogOTUwO1xuICBjdXJzb3I6IHBvaW50ZXI7XG4gIHRyYW5zaXRpb246IHRyYW5zZm9ybSAxNDBtcyBlYXNlLCBib3gtc2hhZG93IDE0MG1zIGVhc2UsIGJvcmRlci1jb2xvciAxNDBtcyBlYXNlLCBiYWNrZ3JvdW5kIDE0MG1zIGVhc2U7XG59XG5cbi5sZXZlbC1zZWxlY3Rpb24tbGlzdC1pdGVtOmhvdmVyIHtcbiAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC0ycHgpO1xuICBib3JkZXItY29sb3I6IHJnYmEoMTI3LCAxOTEsIDg4LCAwLjQ1KTtcbiAgYmFja2dyb3VuZDogbGluZWFyLWdyYWRpZW50KDE4MGRlZywgI2ZmZmZmZiAwJSwgdmFyKC0tZ3Jhc3Mtc29mdCkgMTAwJSk7XG59XG5cbi5sZXZlbC1zZWxlY3Rpb24tbGlzdC1pdGVtIGlucHV0IHtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICB3aWR0aDogMXB4O1xuICBoZWlnaHQ6IDFweDtcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgY2xpcDogcmVjdCgwIDAgMCAwKTtcbiAgY2xpcC1wYXRoOiBpbnNldCg1MCUpO1xufVxuXG4ubGV2ZWwtc2VsZWN0aW9uLWxpc3QtaXRlbS5lYXN5LFxuLmxldmVsLXNlbGVjdGlvbi1saXN0LWl0ZW0ubWVkaXVtLFxuLmxldmVsLXNlbGVjdGlvbi1saXN0LWl0ZW0uaGFyZCxcbi5sZXZlbC1zZWxlY3Rpb24tbGlzdC1pdGVtLmV4dHJlbWUge1xuICBib3JkZXItY29sb3I6IHZhcigtLWdyYXNzKTtcbiAgY29sb3I6IHZhcigtLWdyYXNzLWRhcmspO1xuICBiYWNrZ3JvdW5kOiBsaW5lYXItZ3JhZGllbnQoMTgwZGVnLCAjZmZmZmZmIDAlLCAjZGZmNGQ4IDEwMCUpO1xufVxuXG4uc3RhcnQtYnV0dG9uIHtcbiAgYXBwZWFyYW5jZTogbm9uZTtcbiAgYm9yZGVyOiAwO1xuICBtaW4taGVpZ2h0OiBjbGFtcCgzLjJyZW0sIDZ2aCwgNHJlbSk7XG4gIGRpc3BsYXk6IGlubGluZS1mbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgZ2FwOiAwLjY1cmVtO1xuICBib3JkZXItcmFkaXVzOiAxNnB4O1xuICBjb2xvcjogI2ZmZmZmZjtcbiAgYmFja2dyb3VuZDogcmFkaWFsLWdyYWRpZW50KGNpcmNsZSBhdCAyNiUgMjAlLCByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMjgpLCB0cmFuc3BhcmVudCAzMiUpLCBsaW5lYXItZ3JhZGllbnQoMTM1ZGVnLCB2YXIoLS1ncmFzcyksIHZhcigtLWdyYXNzLWRhcmspKTtcbiAgYm94LXNoYWRvdzogMCA2cHggMCByZ2JhKDM3LCA4NiwgMzYsIDAuMzUpLCAwIDE2cHggMzBweCByZ2JhKDUyLCAxMDIsIDUxLCAwLjE4KTtcbiAgZm9udDogaW5oZXJpdDtcbiAgZm9udC1zaXplOiBjbGFtcCgwLjlyZW0sIDEuMjV2dywgMS4wOHJlbSk7XG4gIGZvbnQtd2VpZ2h0OiA5NTA7XG4gIGxldHRlci1zcGFjaW5nOiAwLjA4ZW07XG4gIHRleHQtdHJhbnNmb3JtOiB1cHBlcmNhc2U7XG4gIGN1cnNvcjogcG9pbnRlcjtcbiAgdHJhbnNpdGlvbjogdHJhbnNmb3JtIDE0MG1zIGVhc2UsIGJveC1zaGFkb3cgMTQwbXMgZWFzZSwgZmlsdGVyIDE0MG1zIGVhc2U7XG59XG5cbi5zdGFydC1idXR0b246aG92ZXIge1xuICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoLTJweCk7XG4gIGZpbHRlcjogYnJpZ2h0bmVzcygxLjA0KTtcbiAgYm94LXNoYWRvdzogMCA4cHggMCByZ2JhKDM3LCA4NiwgMzYsIDAuMzUpLCAwIDIwcHggMzRweCByZ2JhKDUyLCAxMDIsIDUxLCAwLjIpO1xufVxuXG4uc3RhcnQtYnV0dG9uOmFjdGl2ZSB7XG4gIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgzcHgpO1xuICBib3gtc2hhZG93OiAwIDNweCAwIHJnYmEoMzcsIDg2LCAzNiwgMC4zNSksIDAgMTBweCAyMHB4IHJnYmEoNTIsIDEwMiwgNTEsIDAuMTYpO1xufVxuXG4uaGVhZGVyLWJ1dHRvbjpmb2N1cy12aXNpYmxlLFxuLmNob2ljZS1jYXJkOmZvY3VzLXZpc2libGUsXG4ubGV2ZWwtc2VsZWN0aW9uLWxpc3QtaXRlbTpmb2N1cy13aXRoaW4sXG4uc3RhcnQtYnV0dG9uOmZvY3VzLXZpc2libGUge1xuICBvdXRsaW5lOiAzcHggc29saWQgcmdiYSgxMjcsIDE5MSwgODgsIDAuMzUpO1xuICBvdXRsaW5lLW9mZnNldDogNHB4O1xufVxuXG5AbWVkaWEgKG1heC13aWR0aDogMTE4MHB4KSB7XG4gIC5jb25maWctbGF5b3V0IHtcbiAgICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IDFmcjtcbiAgfVxufVxuQG1lZGlhIChtYXgtd2lkdGg6IDc2MHB4KSB7XG4gIC5wYWdlLWhlYWRlciB7XG4gICAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiAzLjZyZW0gMWZyIDUuNXJlbTtcbiAgICBnYXA6IDAuNjVyZW07XG4gICAgbWluLWhlaWdodDogNHJlbTtcbiAgfVxuXG4gIC5oZWFkZXItYnV0dG9uIHtcbiAgICBtaW4td2lkdGg6IDYuNXJlbTtcbiAgICBoZWlnaHQ6IDMuNHJlbTtcbiAgICBib3JkZXItcmFkaXVzOiAxM3B4O1xuICB9XG5cbiAgLmJhY2stYnV0dG9uIHtcbiAgICBmb250LXNpemU6IDJyZW07XG4gICAgd2lkdGg6IDRyZW07XG4gICAgaGVpZ2h0OiA0cmVtO1xuICB9XG5cbiAgLnJ1bGVzLWJ1dHRvbiB7XG4gICAgcGFkZGluZzogMCAwLjdyZW07XG4gICAgZm9udC1zaXplOiAwLjgycmVtO1xuICB9XG5cbiAgLmJvYXJkLW9wdGlvbnMtbGlzdCB7XG4gICAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoMiwgbWlubWF4KDAsIDFmcikpO1xuICB9XG5cbiAgLmxldmVsLXNlbGVjdGlvbi1saXN0IHtcbiAgICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCgyLCBtaW5tYXgoMCwgMWZyKSk7XG4gIH1cblxuICAuaW5saW5lLXNldHRpbmdzLWNhcmQge1xuICAgIGdyaWQtdGVtcGxhdGUtY29sdW1uczogMWZyO1xuICAgIGdhcDogMXJlbTtcbiAgfVxuXG4gIC52ZXJ0aWNhbC1kaXZpZGVyIHtcbiAgICB3aWR0aDogMTAwJTtcbiAgICBoZWlnaHQ6IDFweDtcbiAgfVxufVxuQG1lZGlhIChtYXgtd2lkdGg6IDUyMHB4KSB7XG4gIC5jb25maWctc2hlbGwge1xuICAgIHBhZGRpbmc6IDAuNDVyZW07XG4gIH1cblxuICAucGFnZS1oZWFkZXIge1xuICAgIGdyaWQtdGVtcGxhdGUtY29sdW1uczogM3JlbSAxZnIgNC44cmVtO1xuICAgIGdhcDogMC40NXJlbTtcbiAgfVxuXG4gIC50aXRsZS1ibG9jayBwIHtcbiAgICBmb250LXNpemU6IDAuNTZyZW07XG4gICAgbGV0dGVyLXNwYWNpbmc6IDAuMTJlbTtcbiAgfVxuXG4gIGgxIHtcbiAgICBmb250LXNpemU6IDEuODVyZW07XG4gIH1cblxuICBoMiB7XG4gICAgZm9udC1zaXplOiAxLjE1cmVtO1xuICB9XG5cbiAgLmhlYWRlci1idXR0b24ge1xuICAgIG1pbi13aWR0aDogNi41cmVtO1xuICAgIGhlaWdodDogM3JlbTtcbiAgICBib3JkZXItcmFkaXVzOiAxMnB4O1xuICB9XG5cbiAgLmJhY2stYnV0dG9uIHtcbiAgICB3aWR0aDogM3JlbTtcbiAgICBmb250LXNpemU6IDEuOHJlbTtcbiAgfVxuXG4gIC5ydWxlcy1idXR0b24ge1xuICAgIGZvbnQtc2l6ZTogMC43MnJlbTtcbiAgfVxuXG4gIC5jb25maWctY2FyZCB7XG4gICAgcGFkZGluZzogMC44cmVtO1xuICAgIGJvcmRlci1yYWRpdXM6IDE1cHg7XG4gIH1cblxuICAuYm9hcmQtb3B0aW9ucy1saXN0LFxuLnR3by1jb2x1bW5zLFxuLmxldmVsLXNlbGVjdGlvbi1saXN0IHtcbiAgICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IDFmcjtcbiAgfVxuXG4gIC5jaG9pY2UtY2FyZCB7XG4gICAgbWluLWhlaWdodDogNS4ycmVtO1xuICB9XG5cbiAgLnBhcmFtLXJvdyB7XG4gICAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiAxZnI7XG4gICAgZ2FwOiAwLjRyZW07XG4gIH1cblxuICAubnVtYmVyLWNvbnRyb2wge1xuICAgIHdpZHRoOiAxMDAlO1xuICB9XG59Il19 */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](ConfigurationMenuComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-configuration-menu',
                templateUrl: './configuration-menu.component.html',
                styleUrls: ['./configuration-menu.component.scss']
            }]
    }], function () { return [{ type: src_app_services_game_game_service__WEBPACK_IMPORTED_MODULE_1__["GameService"] }, { type: _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"] }, { type: src_app_services_graph_graph_service__WEBPACK_IMPORTED_MODULE_3__["GraphService"] }]; }, null); })();


/***/ }),

/***/ "zUnb":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./environments/environment */ "AytR");
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app/app.module */ "ZAI4");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/platform-browser */ "jhN1");




if (_environments_environment__WEBPACK_IMPORTED_MODULE_1__["environment"].production) {
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["enableProdMode"])();
}
_angular_platform_browser__WEBPACK_IMPORTED_MODULE_3__["platformBrowser"]().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_2__["AppModule"])
    .catch(err => console.error(err));


/***/ }),

/***/ "zn8P":
/*!******************************************************!*\
  !*** ./$$_lazy_route_resource lazy namespace object ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncaught exception popping up in devtools
	return Promise.resolve().then(function() {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "zn8P";

/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main.js.map