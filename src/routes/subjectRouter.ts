import express, {Request , Response } from 'express';
import * as subjectController from '../controllers/subjectController';
import { Subject } from '../models/subjectModel';
export const subjectRouter = express.Router();

// Getting subjects:
subjectRouter.get('/', async (req: Request, res: Response) => {
    subjectController.getAll((err: Error, result: any) => {
        if (err) {
            return res.status(500).json({ 'message': err.message });
        }
        if (!result || result.data.length === 0) {
            return res.status(204).send(); 
        }
        res.status(result.statusCode).json(result);
    });
});

// Creating subjects:
subjectRouter.post('/', async (req: Request , res: Response)=>{
    const newSubject: Subject = req.body;
    subjectController.create(newSubject, (err: Error, result: any) => {
        if (err) {
            return res.status(500).json({ 'message': err.message });
        }
        
        res.status(result.statusCode).json(result);
    });
});

// Getting subjects by Id:
subjectRouter.get('/:id_s', async (req: Request, res: Response) => {
    const id_s = parseInt(req.params.id_s);
    subjectController.getById(id_s, (err: Error, result: any) => {
        if (err) {
            return res.status(500).json({ 'message': err.message });
        }
 
        if (!result) {
            return res.status(404).json({ 'message': 'Subject not found' });
        }
 
        res.status(result.statusCode).json(result);
    });
});

// Updating subjects:
subjectRouter.put('/:id_s', async (req: Request, res: Response) => {
    const id_s = parseInt(req.params.id_s); 
    const updatedSubject: Subject = { ...req.body, id_s };
/*  Spread operator (...)
    this operator lets us expand an object or array in its individual elements. */
 
    subjectController.update(updatedSubject, (err: Error, result: any) => {
        if (err) {
            return res.status(500).json({ 'message': err.message });
        }

        res.status(result.statusCode).json(result);
    });
});

// Removing subjects:
subjectRouter.delete('/:id_s', async (req: Request, res: Response) => {
    const id_s = parseInt(req.params.id_s);
 
    subjectController.remove(id_s, (err: Error, result: any) => {
        if (err) {
            return res.status(500).json({ 'message': err.message });
        }

        res.status(result.statusCode).json(result);
    });
});