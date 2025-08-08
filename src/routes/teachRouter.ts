import express, {Request , Response } from 'express';
import * as teachController from '../controllers/teachController';
import { Teach } from '../models/teachModel';
export const teachRouter = express.Router();

// Getting records:
teachRouter.get('/', async (req: Request, res: Response) => {
    teachController.getAll((err: Error, result: any) => {
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
teachRouter.post('/', async (req: Request , res: Response)=>{
    const newTeach: Teach = req.body;
    teachController.create(newTeach, (err: Error, result: any) => {
        if (err) {
            return res.status(500).json({ 'message': err.message });
        }
        
        res.status(result.statusCode).json(result);
    });
});

// Getting records by professors Id:
teachRouter.get('/professors/:id_p', async (req: Request, res: Response) => {
    const id_p = parseInt(req.params.id_p);
    teachController.getById(id_p, (err: Error, result: any) => {
        if (err) {
            return res.status(500).json({ 'message': err.message });
        }
 
        if (!result) {
            return res.status(404).json({ 'message': 'Professor not found' });
        }
 
        res.status(result.statusCode).json(result);
    });
});

// Getting records by subjects Id:
teachRouter.get('/subjects/:id_s', async (req: Request, res: Response) => {
    const id_s = parseInt(req.params.id_s);
    teachController.getById1(id_s, (err: Error, result: any) => {
        if (err) {
            return res.status(500).json({ 'message': err.message });
        }
 
        if (!result) {
            return res.status(404).json({ 'message': 'Subject not found' });
        }
 
        res.status(result.statusCode).json(result);
    });
});

// Updating records by professor Id, subject Id and group:
teachRouter.put('/professors/:id_p/subjects/:id_s/group/:group', async (req: Request, res: Response) => {
    const id_p = parseInt(req.params.id_p);
    const id_s = parseInt(req.params.id_s);
    const group = parseInt(req.params.group);
    const updatedTeach: Teach = { ...req.body, id_p , id_s , group};
    /*  Spread operator (...)
    this operator lets us expand an object or array in its individual elements. */
 
    teachController.update(updatedTeach, (err: Error, result: any) => {
        if (err) {
            return res.status(500).json({ 'message': err.message });
        }
 
        res.status(result.statusCode).json(result);
    });
});

// Removing records by professor Id, subject Id and group:
teachRouter.delete('/professors/:id_p/subjects/:id_s/group/:group', async (req: Request, res: Response) => {
    const id_p = parseInt(req.params.id_p);
    const id_s = parseInt(req.params.id_s);
    const group = parseInt(req.params.group);
 
    teachController.remove(id_p, id_s, group, (err: Error, result: any) => {
        if (err) {
            return res.status(500).json({ 'message': err.message });
        }
 
        res.status(result.statusCode).json(result);
    });
});