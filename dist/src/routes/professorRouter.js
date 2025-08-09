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
exports.professorRouter = void 0;
const express_1 = __importDefault(require("express"));
const professorController = __importStar(require("../controllers/professorController"));
exports.professorRouter = express_1.default.Router();
// Getting professors:
exports.professorRouter.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    professorController.getAll((err, result) => {
        if (err) {
            return res.status(500).json({ 'message': err.message });
        }
        if (!result || result.data.length === 0) {
            return res.status(204).send();
        }
        res.status(result.statusCode).json(result);
    });
}));
// Creating professors:
exports.professorRouter.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const newProfessor = req.body;
    professorController.create(newProfessor, (err, result) => {
        if (err) {
            return res.status(500).json({ 'message': err.message });
        }
        res.status(result.statusCode).json(result);
    });
}));
// Getting professors by Id:
exports.professorRouter.get('/:id_p', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id_p = parseInt(req.params.id_p);
    professorController.getById(id_p, (err, result) => {
        if (err) {
            return res.status(500).json({ 'message': err.message });
        }
        if (!result) {
            return res.status(404).json({ 'message': 'Professor not found' });
        }
        res.status(result.statusCode).json(result);
    });
}));
// Updating professors:
exports.professorRouter.put('/:id_p', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id_p = parseInt(req.params.id_p);
    const updatedProfessor = Object.assign(Object.assign({}, req.body), { id_p });
    /*  Spread operator (...)
        this operator lets us expand an object or array in its individual elements. */
    professorController.update(updatedProfessor, (err, result) => {
        if (err) {
            return res.status(500).json({ 'message': err.message });
        }
        res.status(result.statusCode).json(result);
    });
}));
// Removing professors:
exports.professorRouter.delete('/:id_p', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id_p = parseInt(req.params.id_p);
    professorController.remove(id_p, (err, result) => {
        if (err) {
            return res.status(500).json({ 'message': err.message });
        }
        res.status(result.statusCode).json(result);
    });
}));
