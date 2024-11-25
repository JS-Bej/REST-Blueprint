"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.remove = exports.update = exports.getById1 = exports.getById = exports.getAll = exports.create = void 0;
const db_1 = require("../../db");
const create = (inscribe, callback) => {
    const queryString = 'INSERT INTO inscriben (id_p, cod_a, grupo, cod_e, n1, n2, n3) VALUES (?, ?, ?, ?, ?, ?, ? )';
    db_1.db.query(queryString, [inscribe.id_p, inscribe.cod_a, inscribe.grupo, inscribe.cod_e, inscribe.n1, inscribe.n2, inscribe.n3], (err) => {
        if (err) {
            callback(err);
        }
        //const insertId = (<OkPacket>result).insertId;
        //callback(null, insertId);
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
    });
};
exports.create = create;
/////////////////
const getAll = (callback) => {
    const queryString = 'SELECT * FROM inscriben';
    db_1.db.query(queryString, (err, result) => {
        if (err) {
            callback(err);
        }
        const rows = result;
        const inscriben = [];
        rows.forEach(row => {
            const inscribe = {
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
exports.getAll = getAll;
/////////////getbyid: estudiante
const getById = (cod_e, callback) => {
    const queryString = 'SELECT * FROM inscriben WHERE cod_e = ?';
    db_1.db.query(queryString, [cod_e], (err, result) => {
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
/////////////getbyid: asignatura y grupo
const getById1 = (cod_a, grupo, callback) => {
    const queryString = 'SELECT * FROM inscriben WHERE cod_a = ? AND grupo = ?';
    db_1.db.query(queryString, [cod_a, grupo], (err, result) => {
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
const update = (inscribe, callback) => {
    const queryString = 'UPDATE inscriben SET n1 = ?, n2 = ?, n3 = ?   WHERE id_p = ? AND cod_a = ? AND cod_e= ?';
    db_1.db.query(queryString, [inscribe.id_p, inscribe.cod_a, inscribe.grupo, inscribe.cod_e, inscribe.n1, inscribe.n2, inscribe.n3], (err) => {
        if (err) {
            callback(err);
        }
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
    });
};
exports.update = update;
////////////
const remove = (callback) => {
    callback(null, {
        statusCode: 403,
        message: 'La eliminación de registros no está permitida en esta tabla'
    });
};
exports.remove = remove;
