import express, {Request , Response } from 'express';
import * as registerController from '../controllers/registerController';
import { Register } from '../models/registerModel';
export const registerRouter = express.Router();

// Getting records:
registerRouter.get('/', async (req: Request, res: Response) => {
    registerController.getAll((err: Error, result: any) => {
        if (err) {
            return res.status(500).json({ 'message': err.message });
        }
        if (!result || result.data.length === 0) {
            return res.status(204).send(); 
        }
        res.status(result.statusCode).json(result);
    });
});

// Creating records:
registerRouter.post('/', async (req: Request , res: Response)=>{
    const newregister: Register = req.body;
    registerController.create(newregister, (err: Error, result: any) => {
        if (err) {
            return res.status(500).json({ 'message': err.message });
        }
        
        res.status(result.statusCode).json(result);
    });
});

// Getting records by students Id:
registerRouter.get('/students/:id_st', async (req: Request, res: Response) => {
    const id_st = parseInt(req.params.id_st);
    registerController.getById(id_st, (err: Error, result: any) => {
        if (err) {
            return res.status(500).json({ 'message': err.message });
        }
 
        if (!result) {
            return res.status(404).json({ 'message': 'No records found' });
        }
        
 
        res.status(result.statusCode).json(result);
    });
});

// Getting records by subjects Id and groups:
registerRouter.get('/subjects/:id_s/group/:group', async (req: Request, res: Response) => {
    const id_s = parseInt(req.params.id_s);
    const group = parseInt(req.params.group);
    registerController.getById1(id_s, group,(err: Error, result: any) => {
        if (err) {
            return res.status(500).json({ 'message': err.message });
        }
 
        if (!result) {
            return res.status(404).json({ 'message': 'No records found' });
        }
 
        res.status(result.statusCode).json(result);
    });
});

// Updating records by professors, subjects and students Id, and groups:
registerRouter.put('/professors/:id_p/subjects/:id_s/group/:group/students/:id_st', async (req: Request, res: Response) => {
    const id_p = parseInt(req.params.id_p);
    const id_s = parseInt(req.params.id_s);
    const group = parseInt(req.params.group);
    const id_st = parseInt(req.params.id_st);
    const updatedregister: Register = { ...req.body, id_p , id_s , group , id_st};
    /*  Spread operator (...)
    this operator lets us expand an object or array in its individual elements. */
 
    registerController.update(updatedregister, (err: Error, result: any) => {
        if (err) {
            return res.status(500).json({ 'message': err.message });
        }
 
        res.status(result.statusCode).json(result);
    });
});

// Trying to remove records in the table without that permission:
registerRouter.delete('/professors/:id_p/subjects/:id_s/group/:group/students/:id_st', async (req: Request, res: Response) => {
    const id_p = parseInt(req.params.id_p);
    const id_s = parseInt(req.params.id_s);
    const id_st = parseInt(req.params.id_st);
    const group = parseInt(req.params.group);
    registerController.remove(id_p, id_s, id_st, group,(err: Error, result: any) => {
        if (err) {
            return res.status(500).json({ message: err.message });
        }

        res.status(result.statusCode).json(result);
    });
});
