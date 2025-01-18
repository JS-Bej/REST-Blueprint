import { Inscribe } from '../models/inscribeModel';
import { db } from '../../db';
import { OkPacket, RowDataPacket } from 'mysql2';
 
export const create = (inscribe: Inscribe, callback: Function) => {
    const queryString = 'INSERT INTO inscriben (id_p, cod_a, grupo, cod_e, n1, n2, n3) VALUES (?, ?, ?, ?, ?, ?, ? )';
 
    db.query(
        queryString,
        [inscribe.id_p, inscribe.cod_a, inscribe.grupo, inscribe.cod_e, inscribe.n1, inscribe.n2, inscribe.n3],
        (err) => {
            if (err) { callback(err); }
 
            callback(null, {
                statusCode: 201,
                message: 'Registro creado exitosamente',
                data: {
                    id_p: inscribe.id_p,
                    cod_a: inscribe.cod_a,
                    grupo: inscribe.grupo,
                    cod_e: inscribe.cod_e,
                    n1: inscribe.n1,
                    n2: inscribe.n2,
                    n3: inscribe.n3
                }
            });
        }
    );
};
/////////////////
export const getAll = (callback: Function) => {
    const queryString = 'SELECT * FROM inscriben';
   
    db.query(queryString, (err, result) => {
        if (err) { callback(err); }
       
        const rows = <RowDataPacket[]>result;
        const inscriben: Inscribe[] = [];
        rows.forEach(row => {
            const inscribe: Inscribe = {
                id_p: row.id_p,
                cod_a: row.cod_a,
                grupo: row.grupo,
                cod_e: row.cod_e,
                n1: row.n1,
                n2: row.n2,
                n3: row.n3
            };
            inscriben.push(inscribe);
        });
        callback(null, {
            statusCode: 200,
            message: 'Registros obtenidos exitosamente',
            data: inscriben
        });
    });
};
/////////////getbyid: estudiante
export const getById = (cod_e: number, callback: Function) => {
    const queryString = 'SELECT * FROM inscriben WHERE cod_e = ?';

    db.query(queryString, [cod_e], (err, result) => {
        if (err) {
            return callback({
                statusCode: 500,
                message: 'Error al realizar la consulta',
                error: err
            });
        }

        const rows = <RowDataPacket[]>result;
        if (rows.length > 0) {
            const registros: Inscribe[] = rows.map(row => ({
                cod_e: row.cod_e,
                cod_a: row.cod_a,
                n1: row.n1,
                n2: row.n2,
                n3: row.n3,
                id_p: row.id_p,
                grupo: row.grupo
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
/////////////getbyid: asignatura y grupo
export const getById1 = (cod_a: number, grupo: number, callback: Function) => {
    const queryString = 'SELECT * FROM inscriben WHERE cod_a = ? AND grupo = ?';

    db.query(queryString, [cod_a, grupo], (err, result) => {
        if (err) {
            return callback({
                statusCode: 500,
                message: 'Error al realizar la consulta',
                error: err
            });
        }

        const rows = <RowDataPacket[]>result;
        if (rows.length > 0) {
            const registros: Inscribe[] = rows.map(row => ({
                cod_e: row.cod_e,
                n1: row.n1,
                n2: row.n2,
                n3: row.n3,
                id_p: row.id_p,
                cod_a: row.cod_a,
                grupo: row.grupo
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
export const update = (inscribe: Inscribe, callback: Function) => {
    const queryString = 'UPDATE inscriben SET n1 = ?, n2 = ?, n3 = ? WHERE id_p = ? AND cod_a = ? AND grupo = ? AND cod_e= ? ';
    db.query(
        queryString,
        [inscribe.n1, inscribe.n2, inscribe.n3, inscribe.id_p, inscribe.cod_a, inscribe.grupo, inscribe.cod_e],
        (err) => {
            if (err) { callback(err); }
 
            callback(null, {
                statusCode: 200,
                message: 'Registro actualizado exitosamente',
                data: {
                    id_p: inscribe.id_p,
                    cod_a: inscribe.cod_a,
                    cod_e: inscribe.cod_e,
                    n1: inscribe.n1,
                    n2: inscribe.n2,
                    n3: inscribe.n3
                }
            });
        }
    );
};
////////////
export const remove = (id_p: number, cod_a: number, grupo:number, cod_e: number, callback: Function) => {
    callback(null, {
        statusCode: 403,
        message: 'La eliminación de registros no está permitida en esta tabla'
    });
};

