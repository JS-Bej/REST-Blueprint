import { Imparte } from '../models/imparteModel';
import { db } from '../../db';
import { OkPacket, RowDataPacket } from 'mysql2';
 
export const create = (imparte: Imparte, callback: Function) => {
    const queryString = 'INSERT INTO imparten (id_p, cod_a, grupo, horario) VALUES (?, ?, ?, ?)';
 
    db.query(
        queryString,
        [imparte.id_p, imparte.cod_a, imparte.grupo, imparte.horario],
        (err) => {
            if (err) { callback(err); }
 
            callback(null, {
                statusCode: 201,
                message: 'Registro creado exitosamente',
                data: {
                    id_p: imparte.id_p,
                    cod_a: imparte.cod_a,
                    grupo: imparte.grupo,
                    horario: imparte.horario
                }
            });
        }
    );
};
/////////////////
export const getAll = (callback: Function) => {
    const queryString = 'SELECT * FROM imparten';
   
    db.query(queryString, (err, result) => {
        if (err) { callback(err); }
       
        const rows = <RowDataPacket[]>result;
        const imparten: Imparte[] = [];
        rows.forEach(row => {
            const imparte: Imparte = {
                id_p: row.id_p,
                cod_a: row.cod_a,
                grupo: row.grupo,
                grupoActualiz: row.grupoActualiz,
                horario: row.horario
            };
            imparten.push(imparte);
        });
        callback(null, {
            statusCode: 200,
            message: 'Registros obtenidos exitosamente',
            data: imparten
        });
    });
};
/////////////getbyid de profesor
export const getById = (id_p: number, callback: Function) => {
    const queryString = 'SELECT * FROM imparten WHERE id_p = ?';

    db.query(queryString, [id_p], (err, result) => {
        if (err) {
            return callback({
                statusCode: 500,
                message: 'Error al realizar la consulta',
                error: err
            });
        }

        const rows = <RowDataPacket[]>result;
        if (rows.length > 0) {
            const registros: Imparte[] = rows.map(row => ({
                id_p: row.id_p,
                cod_a: row.cod_a,
                grupo: row.grupo,
                grupoActualiz: row.grupoActualiz,
                horario: row.horario
            }));

            callback(null, {
                statusCode: 200,
                message: 'Registros obtenidos exitosamente',
                data: registros
            });
        } else {
            callback(null, {
                statusCode: 404,
                message: 'No se encontraron registros'
            });
        }
    });
};
/////////////getbyid de asignatura
export const getById1 = (cod_a: number, callback: Function) => {
    const queryString = 'SELECT * FROM imparten WHERE cod_a = ?';

    db.query(queryString, [cod_a], (err, result) => {
        if (err) {
            return callback({
                statusCode: 500,
                message: 'Error al realizar la consulta',
                error: err
            });
        }

        const rows = <RowDataPacket[]>result;
        if (rows.length > 0) {
            const registros: Imparte[] = rows.map(row => ({
                cod_a: row.cod_a,
                id_p: row.id_p,
                grupo: row.grupo,
                grupoActualiz: row.grupoActualiz,
                horario: row.horario
            }));

            callback(null, {
                statusCode: 200,
                message: 'Registros obtenidos exitosamente',
                data: registros
            });
        } else {
            callback(null, {
                statusCode: 404,
                message: 'No se encontraron registros'
            });
        }
    });
};
///////////
export const update = (imparte: Imparte, callback: Function) => {
    const queryString = 'UPDATE imparten SET grupo= ?, horario =?   WHERE id_p = ? AND cod_a = ? AND grupo= ?';
    db.query(
        queryString,
        [imparte.grupoActualiz, imparte.horario, imparte.id_p, imparte.cod_a, imparte.grupo],
        (err) => {
            if (err) { callback(err); }
 
            callback(null, {
                statusCode: 200,
                message: 'Registro actualizado exitosamente',
                data: {
                    id_p: imparte.id_p,
                    cod_a: imparte.cod_a,
                    grupo: imparte.grupoActualiz,
                    horario: imparte.horario
                }
            });
        }
    );
};
////////////
export const remove = (id_p: number, cod_a: number, grupo: number, callback: Function) => {
    const queryString = 'DELETE FROM imparten WHERE id_p = ? AND cod_a = ? AND grupo = ?';
 
    db.query(queryString, [id_p,cod_a,grupo], (err) => {
        if (err) { callback(err); }
 
        callback(null, {
            statusCode: 200,
            message: 'Registro eliminado exitosamente'
        });
    });
};