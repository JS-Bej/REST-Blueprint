import express, {Request , Response } from 'express';
import * as imparteController from '../controllers/imparteController';
import { Imparte } from '../models/imparteModel';
export const imparteRouter = express.Router();

imparteRouter.get('/', async (req: Request, res: Response) => {
    imparteController.getAll((err: Error, result: any) => {
        if (err) {
            return res.status(500).json({ 'message': err.message });
        }
        if (!result || result.data.length === 0) {
            return res.status(204).send(); 
        }
        res.status(result.statusCode).json(result);
    });
});
////////////
imparteRouter.post('/', async (req: Request , res: Response)=>{
    const newImparte: Imparte = req.body;
    imparteController.create(newImparte, (err: Error, result: any) => {
        if (err) {
            return res.status(500).json({ 'message': err.message });
        }
        
        res.status(result.statusCode).json(result);
    });
});
////////////asignaturas por profesor:
imparteRouter.get('/profesores/:id_p', async (req: Request, res: Response) => {
    const id_p = parseInt(req.params.id_p);
    imparteController.getById(id_p, (err: Error, result: any) => {
        if (err) {
            return res.status(500).json({ 'message': err.message });
        }
 
        if (!result) {
            return res.status(404).json({ 'message': 'Profesor no encontrado' });
        }
 
        res.status(result.statusCode).json(result);
    });
});
////////////profesores por asignatura:
imparteRouter.get('/asignaturas/:cod_a', async (req: Request, res: Response) => {
    const cod_a = parseInt(req.params.cod_a);
    imparteController.getById1(cod_a, (err: Error, result: any) => {
        if (err) {
            return res.status(500).json({ 'message': err.message });
        }
 
        if (!result) {
            return res.status(404).json({ 'message': 'Asignatura no encontrada' });
        }
 
        res.status(result.statusCode).json(result);
    });
});
///////////
imparteRouter.put('/profesores/:id_p/asignaturas/:cod_a/grupo/:grupo', async (req: Request, res: Response) => {
    const id_p = parseInt(req.params.id_p);
    const cod_a = parseInt(req.params.cod_a);
    const grupo = parseInt(req.params.grupo);
    /*
    ... operador de propagación (spread operator) en JavaScript y TypeScript.
    Este operador permite expandir un objeto o un array en sus elementos individuales.
    Gracias por la explicación :)
    */
    const updatedImparte: Imparte = { ...req.body, id_p , cod_a , grupo};
 
    imparteController.update(updatedImparte, (err: Error, result: any) => {
        if (err) {
            return res.status(500).json({ 'message': err.message });
        }
 
        res.status(result.statusCode).json(result);
    });
});
////////////
imparteRouter.delete('/profesores/:id_p/asignaturas/:cod_a/grupo/:grupo', async (req: Request, res: Response) => {
    const id_p = parseInt(req.params.id_p);
    const cod_a = parseInt(req.params.cod_a);
    const grupo = parseInt(req.params.grupo);
 
    imparteController.remove(id_p, cod_a, grupo, (err: Error, result: any) => {
        if (err) {
            return res.status(500).json({ 'message': err.message });
        }
 
        res.status(result.statusCode).json(result);
    });
});