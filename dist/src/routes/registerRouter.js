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
exports.registerRouter = void 0;
const express_1 = __importDefault(require("express"));
const registerController = __importStar(require("../controllers/registerController"));
exports.registerRouter = express_1.default.Router();
// Getting records:
exports.registerRouter.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    registerController.getAll((err, result) => {
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
exports.registerRouter.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const newregister = req.body;
    registerController.create(newregister, (err, result) => {
        if (err) {
            return res.status(500).json({ 'message': err.message });
        }
        res.status(result.statusCode).json(result);
    });
}));
// Getting records by students Id:
exports.registerRouter.get('/students/:id_st', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id_st = parseInt(req.params.id_st);
    registerController.getById(id_st, (err, result) => {
        if (err) {
            return res.status(500).json({ 'message': err.message });
        }
        if (!result) {
            return res.status(404).json({ 'message': 'No records found' });
        }
        res.status(result.statusCode).json(result);
    });
}));
// Getting records by subjects Id and groups:
exports.registerRouter.get('/subjects/:id_s/group/:group', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id_s = parseInt(req.params.id_s);
    const group = parseInt(req.params.group);
    registerController.getById1(id_s, group, (err, result) => {
        if (err) {
            return res.status(500).json({ 'message': err.message });
        }
        if (!result) {
            return res.status(404).json({ 'message': 'No records found' });
        }
        res.status(result.statusCode).json(result);
    });
}));
// Updating records by professors, subjects and students Id, and groups:
exports.registerRouter.put('/professors/:id_p/subjects/:id_s/group/:group/students/:id_st', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id_p = parseInt(req.params.id_p);
    const id_s = parseInt(req.params.id_s);
    const group = parseInt(req.params.group);
    const id_st = parseInt(req.params.id_st);
    const updatedregister = Object.assign(Object.assign({}, req.body), { id_p, id_s, group, id_st });
    /*  Spread operator (...)
    this operator lets us expand an object or array in its individual elements. */
    registerController.update(updatedregister, (err, result) => {
        if (err) {
            return res.status(500).json({ 'message': err.message });
        }
        res.status(result.statusCode).json(result);
    });
}));
// Trying to remove records in the table without that permission:
exports.registerRouter.delete('/professors/:id_p/subjects/:id_s/group/:group/students/:id_st', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id_p = parseInt(req.params.id_p);
    const id_s = parseInt(req.params.id_s);
    const id_st = parseInt(req.params.id_st);
    const group = parseInt(req.params.group);
    registerController.remove(id_p, id_s, id_st, group, (err, result) => {
        if (err) {
            return res.status(500).json({ message: err.message });
        }
        res.status(result.statusCode).json(result);
    });
}));
