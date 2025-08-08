import express, {Request , Response } from 'express';
import * as studentController from '../controllers/studentController';
import { Student } from '../models/studentModel';
export const studentRouter = express.Router();

// Getting students:
studentRouter.get('/', async (req: Request, res: Response) => {
    studentController.getAll((err: Error, result: any) => {
        if (err) {
            return res.status(500).json({ 'message': err.message });
        }
        if (!result || result.data.length === 0) {
            return res.status(204).send(); 
        }
        res.status(result.statusCode).json(result);
    });
});

// Creating students:
studentRouter.post('/', async (req: Request , res: Response)=>{
    const newStudent: Student = req.body;
    studentController.create(newStudent, (err: Error, result: any) => {
        if (err) {
            return res.status(500).json({ 'message': err.message });
        }
        
        res.status(result.statusCode).json(result);
    });
});

// Getting students by Id:
studentRouter.get('/:id_st', async (req: Request, res: Response) => {
    const id_st = parseInt(req.params.id_st);
    studentController.getById(id_st, (err: Error, result: any) => {
        if (err) {
            return res.status(500).json({ 'message': err.message });
        }
 
        if (!result) {
            return res.status(404).json({ 'message': 'Student no encontrado' });
        }
 
        res.status(result.statusCode).json(result);
    });
});

// Updating students:
studentRouter.put('/:id_st', async (req: Request, res: Response) => {
    const id_st = parseInt(req.params.id_st);
    const updatedStudent: Student = { ...req.body, id_st };
/*  Spread operator (...)
    this operator lets us expand an object or array in its individual elements. */
 
    studentController.update(updatedStudent, (err: Error, result: any) => {
        if (err) {
            return res.status(500).json({ 'message': err.message });
        }
 
        res.status(result.statusCode).json(result);
    });
});

// Removing students:
studentRouter.delete('/:id_st', async (req: Request, res: Response) => {
    const id_st = parseInt(req.params.id_st);
 
    studentController.remove(id_st, (err: Error, result: any) => {
        if (err) {
            return res.status(500).json({ 'message': err.message });
        }
 
        res.status(result.statusCode).json(result);
    });
});