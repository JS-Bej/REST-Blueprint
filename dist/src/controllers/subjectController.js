"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.remove = exports.update = exports.getById = exports.getAll = exports.create = void 0;
const db_1 = require("../../db");
// Creating a subject:
const create = (subject, callback) => {
    const queryString = 'INSERT INTO subjects (id_s, name_s, int_h, credits) VALUES (?, ?, ?, ?)';
    db_1.db.query(queryString, [subject.id_s, subject.name_s, subject.int_h, subject.credits], (err) => {
        if (err) {
            callback(err);
        }
        callback(null, {
            statusCode: 201,
            message: 'Subject successfully created',
            data: {
                id_s: subject.id_s
            }
        });
    });
};
exports.create = create;
// Getting every subject:
const getAll = (callback) => {
    const queryString = 'SELECT * FROM subjects';
    db_1.db.query(queryString, (err, result) => {
        if (err) {
            callback(err);
        }
        const rows = result;
        const subjects = [];
        rows.forEach(row => {
            const subject = {
                id_s: row.id_s,
                name_s: row.name_s,
                int_h: row.int_h,
                credits: row.credits
            };
            subjects.push(subject);
        });
        callback(null, {
            statusCode: 200,
            message: 'Subjects successfully returned',
            data: subjects
        });
    });
};
exports.getAll = getAll;
// Getting subject by Id:
const getById = (id_s, callback) => {
    const queryString = 'SELECT * FROM subjects WHERE id_s = ?';
    db_1.db.query(queryString, [id_s], (err, result) => {
        if (err) {
            callback(err);
        }
        const row = result[0];
        if (row) {
            const subject = {
                id_s: row.id_s,
                name_s: row.name_s,
                int_h: row.int_h,
                credits: row.credits
            };
            callback(null, {
                statusCode: 200,
                message: 'Subject successfully returned',
                data: subject
            });
        }
        else {
            callback(null, {
                statusCode: 404,
                message: 'Subject not found'
            });
        }
    });
};
exports.getById = getById;
// Updating a subject by Id:
const update = (subject, callback) => {
    const queryString = 'UPDATE subjects SET name_s = ?, int_h = ?, credits = ? WHERE id_s = ?';
    db_1.db.query(queryString, [subject.name_s, subject.int_h, subject.credits, subject.id_s], (err) => {
        if (err) {
            callback(err);
        }
        callback(null, {
            statusCode: 200,
            message: 'Subject successfully updated',
            data: {
                cod_e: subject.id_s
            }
        });
    });
};
exports.update = update;
// Removing subject by Id:
const remove = (id_s, callback) => {
    const queryString = 'DELETE FROM subjects WHERE id_s = ?';
    db_1.db.query(queryString, [id_s], (err) => {
        if (err) {
            callback(err);
        }
        callback(null, {
            statusCode: 200,
            message: 'Subject successfully removed'
        });
    });
};
exports.remove = remove;
