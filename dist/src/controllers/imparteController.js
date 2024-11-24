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
    db_1.db.query(queryString, (err, result) => {
        if (err) {
            callback(err);
        }
        const row = result[0];
        if (row) {
            const imparte = {
                id_p: row.id_p,
                cod_a: row.cod_a,
                grupo: row.grupo,
                horario: row.horario
            };
            callback(null, {
                statusCode: 200,
                message: 'Registros obtenidos exitosamente',
                data: imparte
            });
        }
        else {
            callback(null, {
                statusCode: 404,
                message: 'Registros no encontrados'
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
            callback(err);
        }
        const row = result[0];
        if (row) {
            const imparte = {
                cod_a: row.cod_a,
                id_p: row.id_p,
                grupo: row.grupo,
                horario: row.horario
            };
            callback(null, {
                statusCode: 200,
                message: 'Registros obtenidos exitosamente',
                data: imparte
            });
        }
        else {
            callback(null, {
                statusCode: 404,
                message: 'Registros no encontrados'
            });
        }
    });
};
exports.getById1 = getById1;
///////////
const update = (imparte, callback) => {
    const queryString = 'UPDATE imparten SET horario = ? WHERE id_p = ?, cod_a = ?, grupo= ?';
    db_1.db.query(queryString, [imparte.id_p, imparte.cod_a, imparte.grupo, imparte.horario], (err) => {
        if (err) {
            callback(err);
        }
        callback(null, {
            statusCode: 200,
            message: 'Registro actualizado exitosamente',
            data: {
                id_p: imparte.id_p,
                cod_a: imparte.cod_a,
                grupo: imparte.grupo,
                horario: imparte.horario
            }
        });
    });
};
exports.update = update;
////////////
const remove = (id_p, cod_a, grupo, callback) => {
    const queryString = 'DELETE FROM imparten WHERE id_p = ?, cod_a = ?, grupo = ?';
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
