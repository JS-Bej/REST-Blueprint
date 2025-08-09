"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.remove = exports.update = exports.getById = exports.getAll = exports.create = void 0;
const db_1 = require("../../db");
// Creating a professor:
const create = (professor, callback) => {
    const queryString = 'INSERT INTO professors (id_p, name_p, address_p, pnumber_p, profession) VALUES (?, ?, ?, ?, ?)';
    db_1.db.query(queryString, [professor.id_p, professor.name_p, professor.address_p, professor.pnumber_p, professor.profession], (err) => {
        if (err) {
            callback(err);
        }
        callback(null, {
            statusCode: 201,
            message: 'Professor successfully created',
            data: {
                id_p: professor.id_p
            }
        });
    });
};
exports.create = create;
// Getting every professor:
const getAll = (callback) => {
    const queryString = 'SELECT * FROM professors';
    db_1.db.query(queryString, (err, result) => {
        if (err) {
            callback(err);
        }
        const rows = result;
        const professors = [];
        rows.forEach(row => {
            const professor = {
                id_p: row.id_p,
                name_p: row.name_p,
                address_p: row.address_p,
                pnumber_p: row.pnumber_p,
                profession: row.profession
            };
            professors.push(professor);
        });
        callback(null, {
            statusCode: 200,
            message: 'Professors successfully returned',
            data: professors
        });
    });
};
exports.getAll = getAll;
// Getting a professor by Id:
const getById = (id_p, callback) => {
    const queryString = 'SELECT * FROM professors WHERE id_p = ?';
    db_1.db.query(queryString, [id_p], (err, result) => {
        if (err) {
            callback(err);
        }
        const row = result[0];
        if (row) {
            const professor = {
                id_p: row.id_p,
                name_p: row.name_p,
                address_p: row.address_p,
                pnumber_p: row.pnumber_p,
                profession: row.profession
            };
            callback(null, {
                statusCode: 200,
                message: 'Professor successfully returned',
                data: professor
            });
        }
        else {
            callback(null, {
                statusCode: 404,
                message: 'Professor not found'
            });
        }
    });
};
exports.getById = getById;
// Updating a professor by Id:
const update = (professor, callback) => {
    const queryString = 'UPDATE professors SET name_p = ?, address_p = ?, pnumber_p = ?, profession = ? WHERE id_p = ?';
    db_1.db.query(queryString, [professor.name_p, professor.address_p, professor.pnumber_p, professor.profession, professor.id_p], (err) => {
        if (err) {
            callback(err);
        }
        callback(null, {
            statusCode: 200,
            message: 'Professor successfully updated',
            data: {
                cod_e: professor.id_p
            }
        });
    });
};
exports.update = update;
// Removing a professor by Id:
const remove = (id_p, callback) => {
    const queryString = 'DELETE FROM professors WHERE id_p = ?';
    db_1.db.query(queryString, [id_p], (err) => {
        if (err) {
            callback(err);
        }
        callback(null, {
            statusCode: 200,
            message: 'Professor successfully removed'
        });
    });
};
exports.remove = remove;
