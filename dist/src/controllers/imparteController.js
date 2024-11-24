"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.remove = exports.update = exports.getById1 = exports.getById = exports.getAll = exports.create = void 0;
const db_1 = require("../../db");
const create = (imparte, callback) => {
    const queryString = 'INSERT INTO imparten (id_p, cod_a, grupo, horario) VALUES (?, ?, ?, ?)';
    db_1.db.query(queryString, [imparte.id_p, imparte.cod_a, imparte.grupo, imparte.horario], (err) => {
        if (err) {
            callback(err);
        }
        //const insertId = (<OkPacket>result).insertId;
        //callback(null, insertId);
        callback(null, {
            statusCode: 201,
            message: 'Registro creado exitosamente',
            data: {
                id_p: imparte.id_p,
                cod_a: imparte.cod_a,
                grupo: imparte.grupo
            }
        });
    });
};
exports.create = create;
/////////////////
const getAll = (callback) => {
    const queryString = 'SELECT * FROM imparten';
    db_1.db.query(queryString, (err, result) => {
        if (err) {
            callback(err);
        }
        const rows = result;
        const imparten = [];
        rows.forEach(row => {
            const imparte = {
                id_p: row.id_p,
                cod_a: row.cod_a,
                grupo: row.grupo,
                grupoActual: row.grupoActual,
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
exports.getAll = getAll;
/////////////getbyid de profesor
const getById = (id_p, callback) => {
    const queryString = 'SELECT * FROM imparten WHERE id_p = ?';
    db_1.db.query(queryString, [id_p], (err, result) => {
        if (err) {
            return callback({
                statusCode: 500,
                message: 'Error al realizar la consulta',
                error: err
            });
        }
        const rows = result;
        if (rows.length > 0) {
            const registros = rows.map(row => ({
                id_p: row.id_p,
                cod_a: row.cod_a,
                grupo: row.grupo,
                grupoActual: row.grupoActual,
                horario: row.horario
            }));
            callback(null, {
                statusCode: 200,
                message: 'Registros obtenidos exitosamente',
                data: registros
            });
        }
        else {
            callback(null, {
                statusCode: 404,
                message: 'No se encontraron registros'
            });
        }
    });
};
exports.getById = getById;
/////////////getbyid de asignatura
const getById1 = (cod_a, callback) => {
    const queryString = 'SELECT * FROM imparten WHERE cod_a = ?';
    db_1.db.query(queryString, [cod_a], (err, result) => {
        if (err) {
            return callback({
                statusCode: 500,
                message: 'Error al realizar la consulta',
                error: err
            });
        }
        const rows = result;
        if (rows.length > 0) {
            const registros = rows.map(row => ({
                cod_a: row.cod_a,
                id_p: row.id_p,
                grupo: row.grupo,
                grupoActual: row.grupoActual,
                horario: row.horario
            }));
            callback(null, {
                statusCode: 200,
                message: 'Registros obtenidos exitosamente',
                data: registros
            });
        }
        else {
            callback(null, {
                statusCode: 404,
                message: 'No se encontraron registros'
            });
        }
    });
};
exports.getById1 = getById1;
///////////
const update = (imparte, callback) => {
    const queryString = 'UPDATE imparten SET grupo= ?, horario =?   WHERE id_p = ? AND cod_a = ? AND grupo= ?';
    db_1.db.query(queryString, [imparte.grupoActual, imparte.horario, imparte.id_p, imparte.cod_a, imparte.grupo], (err) => {
        if (err) {
            callback(err);
        }
        callback(null, {
            statusCode: 200,
            message: 'Registro actualizado exitosamente',
            data: {
                id_p: imparte.id_p,
                cod_a: imparte.cod_a,
                grupo: imparte.grupoActual,
                horario: imparte.horario
            }
        });
    });
};
exports.update = update;
////////////
const remove = (id_p, cod_a, grupo, callback) => {
    const queryString = 'DELETE FROM imparten WHERE id_p = ? AND cod_a = ? AND grupo = ?';
    db_1.db.query(queryString, [id_p, cod_a, grupo], (err) => {
        if (err) {
            callback(err);
        }
        callback(null, {
            statusCode: 200,
            message: 'Registro eliminado exitosamente'
        });
    });
};
exports.remove = remove;
