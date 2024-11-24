import { Asignatura } from '../models/asignaturaModel';
import { db } from '../../db';
import { OkPacket, RowDataPacket } from 'mysql2';
 
export const create = (asignatura: Asignatura, callback: Function) => {
    const queryString = 'INSERT INTO asignaturas (cod_a, nom_a, int_h, creditos) VALUES (?, ?, ?, ?)';
 
    db.query(
        queryString,
        [asignatura.cod_a, asignatura.nom_a, asignatura.int_h, asignatura.creditos],
        (err) => {
            if (err) { callback(err); }
 
            //const insertId = (<OkPacket>result).insertId;
            //callback(null, insertId);
 
            callback(null, {
                statusCode: 201,
                message: 'Asignatura creada exitosamente',
                data: {
                    cod_a: asignatura.cod_a
                }
            });
        }
    );
};
/////////////////
export const getAll = (callback: Function) => {
    const queryString = 'SELECT * FROM asignaturas';
   
    db.query(queryString, (err, result) => {
        if (err) { callback(err); }
       
        const rows = <RowDataPacket[]>result;
        const asignaturas: Asignatura[] = [];
        rows.forEach(row => {
            const asignatura: Asignatura = {
                cod_a: row.cod_a,
                nom_a: row.nom_a,
                int_h: row.int_h,
                creditos: row.creditos
            };
            asignaturas.push(asignatura);
        });
        callback(null, {
            statusCode: 200,
            message: 'Asignaturas obtenidas exitosamente',
            data: asignaturas
        });
    });
};
/////////////
export const getById = (cod_a: number, callback: Function) => {
    const queryString = 'SELECT * FROM asignaturas WHERE cod_a = ?';
 
    db.query(queryString, [cod_a], (err, result) => {
        if (err) { callback(err); }
 
        const row = (<RowDataPacket[]>result)[0];
        if (row) {
            const asignatura: Asignatura = {
                cod_a: row.cod_a,
                nom_a: row.nom_a,
                int_h: row.int_h,
                creditos: row.creditos
            };
            callback(null, {
                statusCode: 200,
                message: 'Asignatura obtenida exitosamente',
                data: asignatura
            });
        } else {
            callback(null, {
                statusCode: 404,
                message: 'Asignatura no encontrada'
            });
        }
    });
};
///////////
export const update = (asignatura: Asignatura, callback: Function) => {
    const queryString = 'UPDATE asignaturas SET nom_a = ?, int_h = ?, creditos = ? WHERE cod_a = ?';
 
    db.query(
        queryString,
        [asignatura.nom_a, asignatura.int_h, asignatura.creditos, asignatura.cod_a],
        (err) => {
            if (err) { callback(err); }
 
            callback(null, {
                statusCode: 200,
                message: 'Asignatura actualizada exitosamente',
                data: {
                    cod_e: asignatura.cod_a
                }
            });
        }
    );
};
////////////
export const remove = (cod_a: number, callback: Function) => {
    const queryString = 'DELETE FROM asignaturas WHERE cod_a = ?';
 
    db.query(queryString, [cod_a], (err) => {
        if (err) { callback(err); }
 
        callback(null, {
            statusCode: 200,
            message: 'Asignatura eliminada exitosamente'
        });
    });
};