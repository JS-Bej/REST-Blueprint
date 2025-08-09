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
exports.studentRouter = void 0;
const express_1 = __importDefault(require("express"));
const studentController = __importStar(require("../controllers/studentController"));
exports.studentRouter = express_1.default.Router();
// Getting students:
exports.studentRouter.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    studentController.getAll((err, result) => {
        if (err) {
            return res.status(500).json({ 'message': err.message });
        }
        if (!result || result.data.length === 0) {
            return res.status(204).send();
        }
        res.status(result.statusCode).json(result);
    });
}));
// Creating students:
exports.studentRouter.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const newStudent = req.body;
    studentController.create(newStudent, (err, result) => {
        if (err) {
            return res.status(500).json({ 'message': err.message });
        }
        res.status(result.statusCode).json(result);
    });
}));
// Getting students by Id:
exports.studentRouter.get('/:id_st', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id_st = parseInt(req.params.id_st);
    studentController.getById(id_st, (err, result) => {
        if (err) {
            return res.status(500).json({ 'message': err.message });
        }
        if (!result) {
            return res.status(404).json({ 'message': 'Student no encontrado' });
        }
        res.status(result.statusCode).json(result);
    });
}));
// Updating students:
exports.studentRouter.put('/:id_st', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id_st = parseInt(req.params.id_st);
    const updatedStudent = Object.assign(Object.assign({}, req.body), { id_st });
    /*  Spread operator (...)
        this operator lets us expand an object or array in its individual elements. */
    studentController.update(updatedStudent, (err, result) => {
        if (err) {
            return res.status(500).json({ 'message': err.message });
        }
        res.status(result.statusCode).json(result);
    });
}));
// Removing students:
exports.studentRouter.delete('/:id_st', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id_st = parseInt(req.params.id_st);
    studentController.remove(id_st, (err, result) => {
        if (err) {
            return res.status(500).json({ 'message': err.message });
        }
        res.status(result.statusCode).json(result);
    });
}));
