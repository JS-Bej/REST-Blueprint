"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.remove = exports.update = exports.getById = exports.getAll = exports.create = void 0;
const db_1 = require("../../db");
// Creating a student:
const create = (student, callback) => {
    const queryString = 'INSERT INTO students (id_st, name_st, address_st, pnumber_st, birth_date) VALUES (?, ?, ?, ?, ?)';
    db_1.db.query(queryString, [student.id_st, student.name_st, student.address_st, student.pnumber_st, student.birth_date], (err) => {
        if (err) {
            callback(err);
        }
        callback(null, {
            statusCode: 201,
            message: 'Student successfully created',
            data: {
                id_st: student.id_st
            }
        });
    });
};
exports.create = create;
// Getting every student:
const getAll = (callback) => {
    const queryString = 'SELECT * FROM students';
    db_1.db.query(queryString, (err, result) => {
        if (err) {
            callback(err);
        }
        const rows = result;
        const students = [];
        rows.forEach(row => {
            const student = {
                id_st: row.id_st,
                name_st: row.name_st,
                address_st: row.address_st,
                pnumber_st: row.pnumber_st,
                birth_date: row.birth_date
            };
            students.push(student);
        });
        callback(null, {
            statusCode: 200,
            message: 'Students successfully returned',
            data: students
        });
    });
};
exports.getAll = getAll;
// Getting a student by Id:
const getById = (id_st, callback) => {
    const queryString = 'SELECT * FROM students WHERE id_st = ?';
    db_1.db.query(queryString, [id_st], (err, result) => {
        if (err) {
            callback(err);
        }
        const row = result[0];
        if (row) {
            const student = {
                id_st: row.id_st,
                name_st: row.name_st,
                address_st: row.address_st,
                pnumber_st: row.pnumber_st,
                birth_date: row.birth_date
            };
            callback(null, {
                statusCode: 200,
                message: 'Student successfully returned',
                data: student
            });
        }
        else {
            callback(null, {
                statusCode: 404,
                message: 'Student not found'
            });
        }
    });
};
exports.getById = getById;
// Updating a student by Id:
const update = (student, callback) => {
    const queryString = 'UPDATE students SET name_st = ?, address_st = ?, pnumber_st = ?, birth_date = ? WHERE id_st = ?';
    db_1.db.query(queryString, [student.name_st, student.address_st, student.pnumber_st, student.birth_date, student.id_st], (err) => {
        if (err) {
            callback(err);
        }
        callback(null, {
            statusCode: 200,
            message: 'Student successfully updated',
            data: {
                id_st: student.id_st
            }
        });
    });
};
exports.update = update;
// Removing a student:
const remove = (id_st, callback) => {
    const queryString = 'DELETE FROM students WHERE id_st = ?';
    db_1.db.query(queryString, [id_st], (err) => {
        if (err) {
            callback(err);
        }
        callback(null, {
            statusCode: 200,
            message: 'student successfully removed'
        });
    });
};
exports.remove = remove;
