"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.teachRouter = void 0;
const express_1 = __importDefault(require("express"));
const teachController = __importStar(require("../controllers/teachController"));
exports.teachRouter = express_1.default.Router();
// Getting records:
exports.teachRouter.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    teachController.getAll((err, result) => {
        if (err) {
            return res.status(500).json({ 'message': err.message });
        }
        if (!result || result.data.length === 0) {
            return res.status(204).send();
        }
        res.status(result.statusCode).json(result);
    });
}));
// Creating records:
exports.teachRouter.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const newTeach = req.body;
    teachController.create(newTeach, (err, result) => {
        if (err) {
            return res.status(500).json({ 'message': err.message });
        }
        res.status(result.statusCode).json(result);
    });
}));
// Getting records by professors Id:
exports.teachRouter.get('/professors/:id_p', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id_p = parseInt(req.params.id_p);
    teachController.getById(id_p, (err, result) => {
        if (err) {
            return res.status(500).json({ 'message': err.message });
        }
        if (!result) {
            return res.status(404).json({ 'message': 'Professor not found' });
        }
        res.status(result.statusCode).json(result);
    });
}));
// Getting records by subjects Id:
exports.teachRouter.get('/subjects/:id_s', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id_s = parseInt(req.params.id_s);
    teachController.getById1(id_s, (err, result) => {
        if (err) {
            return res.status(500).json({ 'message': err.message });
        }
        if (!result) {
            return res.status(404).json({ 'message': 'Subject not found' });
        }
        res.status(result.statusCode).json(result);
    });
}));
// Updating records by professor Id, subject Id and group:
exports.teachRouter.put('/professors/:id_p/subjects/:id_s/group/:group', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id_p = parseInt(req.params.id_p);
    const id_s = parseInt(req.params.id_s);
    const group = parseInt(req.params.group);
    const updatedTeach = Object.assign(Object.assign({}, req.body), { id_p, id_s, group });
    /*  Spread operator (...)
    this operator lets us expand an object or array in its individual elements. */
    teachController.update(updatedTeach, (err, result) => {
        if (err) {
            return res.status(500).json({ 'message': err.message });
        }
        res.status(result.statusCode).json(result);
    });
}));
// Removing records by professor Id, subject Id and group:
exports.teachRouter.delete('/professors/:id_p/subjects/:id_s/group/:group', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id_p = parseInt(req.params.id_p);
    const id_s = parseInt(req.params.id_s);
    const group = parseInt(req.params.group);
    teachController.remove(id_p, id_s, group, (err, result) => {
        if (err) {
            return res.status(500).json({ 'message': err.message });
        }
        res.status(result.statusCode).json(result);
    });
}));
