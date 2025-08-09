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
exports.subjectRouter = void 0;
const express_1 = __importDefault(require("express"));
const subjectController = __importStar(require("../controllers/subjectController"));
exports.subjectRouter = express_1.default.Router();
// Getting subjects:
exports.subjectRouter.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    subjectController.getAll((err, result) => {
        if (err) {
            return res.status(500).json({ 'message': err.message });
        }
        if (!result || result.data.length === 0) {
            return res.status(204).send();
        }
        res.status(result.statusCode).json(result);
    });
}));
// Creating subjects:
exports.subjectRouter.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const newSubject = req.body;
    subjectController.create(newSubject, (err, result) => {
        if (err) {
            return res.status(500).json({ 'message': err.message });
        }
        res.status(result.statusCode).json(result);
    });
}));
// Getting subjects by Id:
exports.subjectRouter.get('/:id_s', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id_s = parseInt(req.params.id_s);
    subjectController.getById(id_s, (err, result) => {
        if (err) {
            return res.status(500).json({ 'message': err.message });
        }
        if (!result) {
            return res.status(404).json({ 'message': 'Subject not found' });
        }
        res.status(result.statusCode).json(result);
    });
}));
// Updating subjects:
exports.subjectRouter.put('/:id_s', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id_s = parseInt(req.params.id_s);
    const updatedSubject = Object.assign(Object.assign({}, req.body), { id_s });
    /*  Spread operator (...)
        this operator lets us expand an object or array in its individual elements. */
    subjectController.update(updatedSubject, (err, result) => {
        if (err) {
            return res.status(500).json({ 'message': err.message });
        }
        res.status(result.statusCode).json(result);
    });
}));
// Removing subjects:
exports.subjectRouter.delete('/:id_s', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id_s = parseInt(req.params.id_s);
    subjectController.remove(id_s, (err, result) => {
        if (err) {
            return res.status(500).json({ 'message': err.message });
        }
        res.status(result.statusCode).json(result);
    });
}));
