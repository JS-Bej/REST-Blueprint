"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.remove = exports.update = exports.getById = exports.getAll = exports.create = void 0;
const db_1 = require("../../db");
const create = (estudiante, callback) => {
    const queryString = 'INSERT INTO estudiantes (cod_e, nom_e, dir_e, tel_e, fech_nac) VALUES (?, ?, ?, ?, ?)';
    db_1.db.query(queryString, [estudiante.cod_e, estudiante.nom_e, estudiante.dir_e, estudiante.tel_e, estudiante.fech_nac], (err) => {
        if (err) {
            callback(err);
        }
        //const insertId = (<OkPacket>result).insertId;
        //callback(null, insertId);
        callback(null, {
            statusCode: 201,
            message: 'Estudiante creado exitosamente',
            data: {
                cod_e: estudiante.cod_e
            }
        });
    });
};
exports.create = create;
/////////////////
const getAll = (callback) => {
    const queryString = 'SELECT * FROM estudiantes';
    db_1.db.query(queryString, (err, result) => {
        if (err) {
            callback(err);
        }
        const rows = result;
        const estudiantes = [];
        rows.forEach(row => {
            const estudiante = {
                cod_e: row.cod_e,
                nom_e: row.nom_e,
                dir_e: row.dir_e,
                tel_e: row.tel_e,
                fech_nac: row.fech_nac
            };
            estudiantes.push(estudiante);
        });
        callback(null, {
            statusCode: 200,
            message: 'Estudiantes obtenidos exitosamente',
            data: estudiantes
        });
    });
};
exports.getAll = getAll;
/////////////
const getById = (cod_e, callback) => {
    const queryString = 'SELECT * FROM estudiantes WHERE cod_e = ?';
    db_1.db.query(queryString, [cod_e], (err, result) => {
        if (err) {
            callback(err);
        }
        const row = result[0];
        if (row) {
            const estudiante = {
                cod_e: row.cod_e,
                nom_e: row.nom_e,
                dir_e: row.dir_e,
                tel_e: row.tel_e,
                fech_nac: row.fech_nac
            };
            callback(null, {
                statusCode: 200,
                message: 'Estudiante obtenido exitosamente',
                data: estudiante
            });
        }
        else {
            callback(null, {
                statusCode: 404,
                message: 'Estudiante no encontrado'
            });
        }
    });
};
exports.getById = getById;
///////////
const update = (estudiante, callback) => {
    const queryString = 'UPDATE estudiantes SET nom_e = ?, dir_e = ?, tel_e = ?, fech_nac = ? WHERE cod_e = ?';
    db_1.db.query(queryString, [estudiante.nom_e, estudiante.dir_e, estudiante.tel_e, estudiante.fech_nac, estudiante.cod_e], (err) => {
        if (err) {
            callback(err);
        }
        callback(null, {
            statusCode: 200,
            message: 'Estudiante actualizado exitosamente',
            data: {
                cod_e: estudiante.cod_e
            }
        });
    });
};
exports.update = update;
////////////
const remove = (cod_e, callback) => {
    const queryString = 'DELETE FROM estudiantes WHERE cod_e = ?';
    db_1.db.query(queryString, [cod_e], (err) => {
        if (err) {
            callback(err);
        }
        callback(null, {
            statusCode: 200,
            message: 'Estudiante eliminado exitosamente'
        });
    });
};
exports.remove = remove;
