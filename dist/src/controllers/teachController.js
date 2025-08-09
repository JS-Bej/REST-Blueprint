"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.remove = exports.update = exports.getById1 = exports.getById = exports.getAll = exports.create = void 0;
const db_1 = require("../../db");
// Creating records:
const create = (teach, callback) => {
    const queryString = 'INSERT INTO teaches (id_p, id_s, group, schedule) VALUES (?, ?, ?, ?)';
    db_1.db.query(queryString, [teach.id_p, teach.id_s, teach.group, teach.schedule], (err) => {
        if (err) {
            callback(err);
        }
        callback(null, {
            statusCode: 201,
            message: 'Record successfully created',
            data: {
                id_p: teach.id_p,
                id_s: teach.id_s,
                group: teach.group,
                schedule: teach.schedule
            }
        });
    });
};
exports.create = create;
// Getting every record:
const getAll = (callback) => {
    const queryString = 'SELECT * FROM teaches';
    db_1.db.query(queryString, (err, result) => {
        if (err) {
            callback(err);
        }
        const rows = result;
        const teaches = [];
        rows.forEach(row => {
            const teach = {
                id_p: row.id_p,
                id_s: row.id_s,
                group: row.group,
                newGroup: row.newGroup,
                schedule: row.schedule
            };
            teaches.push(teach);
        });
        callback(null, {
            statusCode: 200,
            message: 'Records successfully returned',
            data: teaches
        });
    });
};
exports.getAll = getAll;
// Getting a record by Id:
const getById = (id_p, callback) => {
    const queryString = 'SELECT * FROM teaches WHERE id_p = ?';
    db_1.db.query(queryString, [id_p], (err, result) => {
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
                id_p: row.id_p,
                id_s: row.id_s,
                group: row.group,
                newGroup: row.newGroup,
                schedule: row.schedule
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
// Getting a subject by id:
const getById1 = (id_s, callback) => {
    const queryString = 'SELECT * FROM teaches WHERE id_s = ?';
    db_1.db.query(queryString, [id_s], (err, result) => {
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
                id_s: row.id_s,
                id_p: row.id_p,
                group: row.group,
                newGroup: row.newGroup,
                schedule: row.schedule
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
// Updating a record by Id:
const update = (teach, callback) => {
    const queryString = 'UPDATE teaches SET group= ?, schedule =?   WHERE id_p = ? AND id_s = ? AND group= ?';
    db_1.db.query(queryString, [teach.newGroup, teach.schedule, teach.id_p, teach.id_s, teach.group], (err) => {
        if (err) {
            callback(err);
        }
        callback(null, {
            statusCode: 200,
            message: 'Record successfully updated',
            data: {
                id_p: teach.id_p,
                id_s: teach.id_s,
                group: teach.newGroup,
                schedule: teach.schedule
            }
        });
    });
};
exports.update = update;
// Removing a record by Id:
const remove = (id_p, id_s, group, callback) => {
    const queryString = 'DELETE FROM teaches WHERE id_p = ? AND id_s = ? AND group = ?';
    db_1.db.query(queryString, [id_p, id_s, group], (err) => {
        if (err) {
            callback(err);
        }
        callback(null, {
            statusCode: 200,
            message: 'Record successfully removed'
        });
    });
};
exports.remove = remove;
