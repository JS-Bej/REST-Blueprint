import express, {Request , Response } from 'express';
import * as professorController from '../controllers/professorController';
import { Professor } from '../models/professorModel';
export const professorRouter = express.Router();

// Getting professors:
professorRouter.get('/', async (req: Request, res: Response) => {
    professorController.getAll((err: Error, result: any) => {
        if (err) {
            return res.status(500).json({ 'message': err.message });
        }
        if (!result || result.data.length === 0) {
            return res.status(204).send(); 
        }
        res.status(result.statusCode).json(result);
    });
});

// Creating professors:
professorRouter.post('/', async (req: Request , res: Response)=>{
    const newProfessor: Professor = req.body;
    professorController.create(newProfessor, (err: Error, result: any) => {
        if (err) {
            return res.status(500).json({ 'message': err.message });
        }
        
        res.status(result.statusCode).json(result);
    });
});

// Getting professors by Id:
professorRouter.get('/:id_p', async (req: Request, res: Response) => {
    const id_p = parseInt(req.params.id_p);
    professorController.getById(id_p, (err: Error, result: any) => {
        if (err) {
            return res.status(500).json({ 'message': err.message });
        }
 
        if (!result) {
            return res.status(404).json({ 'message': 'Professor not found' });
        }
 
        res.status(result.statusCode).json(result);
    });
});

// Updating professors:
professorRouter.put('/:id_p', async (req: Request, res: Response) => {
    const id_p = parseInt(req.params.id_p);
    const updatedProfessor: Professor = { ...req.body, id_p };
/*  Spread operator (...)
    this operator lets us expand an object or array in its individual elements. */

    professorController.update(updatedProfessor, (err: Error, result: any) => {
        if (err) {
            return res.status(500).json({ 'message': err.message });
        }
 
        res.status(result.statusCode).json(result);
    });
});

// Removing professors:
professorRouter.delete('/:id_p', async (req: Request, res: Response) => {
    const id_p = parseInt(req.params.id_p);
 
    professorController.remove(id_p, (err: Error, result: any) => {
        if (err) {
            return res.status(500).json({ 'message': err.message });
        }
 
        res.status(result.statusCode).json(result);
    });
});