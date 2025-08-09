"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.remove = exports.update = exports.getById1 = exports.getById = exports.getAll = exports.create = void 0;
const db_1 = require("../../db");
// Creating a record: 
const create = (register, callback) => {
    const queryString = 'INSERT INTO registers (id_p, id_s, group, id_st, n1, n2, n3) VALUES (?, ?, ?, ?, ?, ?, ? )';
    db_1.db.query(queryString, [register.id_p, register.id_s, register.group, register.id_st, register.n1, register.n2, register.n3], (err) => {
        if (err) {
            callback(err);
        }
        callback(null, {
            statusCode: 201,
            message: 'Record successfully created',
            data: {
                id_p: register.id_p,
                id_s: register.id_s,
                group: register.group,
                id_st: register.id_st,
                n1: register.n1,
                n2: register.n2,
                n3: register.n3
            }
        });
    });
};
exports.create = create;
// Getting every record:
const getAll = (callback) => {
    const queryString = 'SELECT * FROM registers';
    db_1.db.query(queryString, (err, result) => {
        if (err) {
            callback(err);
        }
        const rows = result;
        const registers = [];
        rows.forEach(row => {
            const register = {
                id_p: row.id_p,
                id_s: row.id_s,
                group: row.group,
                id_st: row.id_st,
                n1: row.n1,
                n2: row.n2,
                n3: row.n3
            };
            registers.push(register);
        });
        callback(null, {
            statusCode: 200,
            message: 'Records successfully returned',
            data: registers
        });
    });
};
exports.getAll = getAll;
// Getting a record by a student Id:
const getById = (id_st, callback) => {
    const queryString = 'SELECT * FROM registers WHERE id_st = ?';
    db_1.db.query(queryString, [id_st], (err, result) => {
        if (err) {
            return callback({
                statusCode: 500,
                message: 'Ocurred an error in the query',
                error: err
            });
        }
        const rows = result;
        if (rows.length > 0) {
            const registros = rows.map(row => ({
                id_st: row.id_st,
                id_s: row.id_s,
                n1: row.n1,
                n2: row.n2,
                n3: row.n3,
                id_p: row.id_p,
                group: row.group
            }));
            callback(null, {
                statusCode: 200,
                message: 'Records successfully returned',
                data: registros
            });
        }
        else {
            callback(null, {
                statusCode: 404,
                message: 'No records found'
            });
        }
    });
};
exports.getById = getById;
// Getting a record by subject Id and group:
const getById1 = (id_s, group, callback) => {
    const queryString = 'SELECT * FROM registers WHERE id_s = ? AND group = ?';
    db_1.db.query(queryString, [id_s, group], (err, result) => {
        if (err) {
            return callback({
                statusCode: 500,
                message: 'Ocurred an error in the query',
                error: err
            });
        }
        const rows = result;
        if (rows.length > 0) {
            const registros = rows.map(row => ({
                id_st: row.id_st,
                n1: row.n1,
                n2: row.n2,
                n3: row.n3,
                id_p: row.id_p,
                id_s: row.id_s,
                group: row.group
            }));
            callback(null, {
                statusCode: 200,
                message: 'Records successfully returned',
                data: registros
            });
        }
        else {
            callback(null, {
                statusCode: 404,
                message: 'No records found'
            });
        }
    });
};
exports.getById1 = getById1;
// Updating a record by professor,subject and student Id, and group:
const update = (register, callback) => {
    const queryString = 'UPDATE registers SET n1 = ?, n2 = ?, n3 = ? WHERE id_p = ? AND id_s = ? AND group = ? AND id_st= ? ';
    db_1.db.query(queryString, [register.n1, register.n2, register.n3, register.id_p, register.id_s, register.group, register.id_st], (err) => {
        if (err) {
            callback(err);
        }
        callback(null, {
            statusCode: 200,
            message: 'Record successfully updated',
            data: {
                id_p: register.id_p,
                id_s: register.id_s,
                id_st: register.id_st,
                n1: register.n1,
                n2: register.n2,
                n3: register.n3
            }
        });
    });
};
exports.update = update;
// Trying to remove a record in the table without that permission:
const remove = (id_p, id_s, group, id_st, callback) => {
    callback(null, {
        statusCode: 403,
        message: 'Removing is forbidden in this table'
    });
};
exports.remove = remove;
