import express, {Request , Response } from 'express';
import * as inscribeController from '../controllers/inscribeController';
import { Inscribe} from '../models/inscribeModel';
export const inscribeRouter = express.Router();

inscribeRouter.get('/', async (req: Request, res: Response) => {
    inscribeController.getAll((err: Error, result: any) => {
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
inscribeRouter.post('/', async (req: Request , res: Response)=>{
    const newInscribe: Inscribe = req.body;
    inscribeController.create(newInscribe, (err: Error, result: any) => {
        if (err) {
            return res.status(500).json({ 'message': err.message });
        }
        
        res.status(result.statusCode).json(result);
    });
});
////////////asignaturas y notas por estudiante:
inscribeRouter.get('/estudiantes/:cod_e', async (req: Request, res: Response) => {
    const cod_e = parseInt(req.params.cod_e);
    inscribeController.getById(cod_e, (err: Error, result: any) => {
        if (err) {
            return res.status(500).json({ 'message': err.message });
        }
 
        if (!result) {
            return res.status(404).json({ 'message': 'Registro no encontrado' });
        }
        
 
        res.status(result.statusCode).json(result);
    });
});
////////////estudiantes y notas por asignatura y grupo:
inscribeRouter.get('/asignaturas/:cod_a/grupo/:grupo', async (req: Request, res: Response) => {
    const cod_a = parseInt(req.params.cod_a);
    const grupo = parseInt(req.params.grupo);
    inscribeController.getById1(cod_a, grupo,(err: Error, result: any) => {
        if (err) {
            return res.status(500).json({ 'message': err.message });
        }
 
        if (!result) {
            return res.status(404).json({ 'message': 'Registro no encontrado' });
        }
 
        res.status(result.statusCode).json(result);
    });
});
///////////
inscribeRouter.put('/profesores/:id_p/asignaturas/:cod_a/grupo/:grupo/estudiantes/:cod_e', async (req: Request, res: Response) => {
    const id_p = parseInt(req.params.id_p);
    const cod_a = parseInt(req.params.cod_a);
    const grupo = parseInt(req.params.grupo);
    const cod_e = parseInt(req.params.cod_e);
    /*
    ... operador de propagación (spread operator) en JavaScript y TypeScript.
    Este operador permite expandir un objeto o un array en sus elementos individuales.
    Gracias por la explicación :)
    */
    const updatedInscribe: Inscribe = { ...req.body, id_p , cod_a , grupo , cod_e};
 
    inscribeController.update(updatedInscribe, (err: Error, result: any) => {
        if (err) {
            return res.status(500).json({ 'message': err.message });
        }
 
        res.status(result.statusCode).json(result);
    });
});
////////////
inscribeRouter.delete('/profesores/:id_p/asignaturas/:cod_a/grupo/:grupo/estudiantes/:cod_e', async (req: Request, res: Response) => {
    const id_p = parseInt(req.params.id_p);
    const cod_a = parseInt(req.params.cod_a);
    const cod_e = parseInt(req.params.cod_e);
    const grupo = parseInt(req.params.grupo);
    inscribeController.remove(id_p, cod_a, cod_e, grupo,(err: Error, result: any) => {
        if (err) {
            return res.status(500).json({ message: err.message });
        }

        res.status(result.statusCode).json(result);
    });
});
