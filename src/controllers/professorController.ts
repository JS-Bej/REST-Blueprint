import { Professor } from '../models/professorModel';
import { db } from '../../db';
import { OkPacket, RowDataPacket } from 'mysql2';
 
// Creating a professor:
export const create = (professor: Professor, callback: Function) => {
    const queryString = 'INSERT INTO professors (id_p, name_p, address_p, pnumber_p, profession) VALUES (?, ?, ?, ?, ?)';
 
    db.query(
        queryString,
        [professor.id_p, professor.name_p, professor.address_p, professor.pnumber_p, professor.profession],
        (err) => {
            if (err) { callback(err); }
 
            callback(null, {
                statusCode: 201,
                message: 'Professor successfully created',
                data: {
                    id_p: professor.id_p
                }
            });
        }
    );
};

// Getting every professor:
export const getAll = (callback: Function) => {
    const queryString = 'SELECT * FROM professors';
   
    db.query(queryString, (err, result) => {
        if (err) { callback(err); }
       
        const rows = <RowDataPacket[]>result;
        const professors: Professor[] = [];
        rows.forEach(row => {
            const professor: Professor = {
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

// Getting a professor by Id:
export const getById = (id_p: number, callback: Function) => {
    const queryString = 'SELECT * FROM professors WHERE id_p = ?';
 
    db.query(queryString, [id_p], (err, result) => {
        if (err) { callback(err); }
 
        const row = (<RowDataPacket[]>result)[0];
        if (row) {
            const professor: Professor = {
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
        } else {
            callback(null, {
                statusCode: 404,
                message: 'Professor not found'
            });
        }
    });
};

// Updating a professor by Id:
export const update = (professor: Professor, callback: Function) => {
    const queryString = 'UPDATE professors SET name_p = ?, address_p = ?, pnumber_p = ?, profession = ? WHERE id_p = ?';
 
    db.query(
        queryString,
        [professor.name_p, professor.address_p, professor.pnumber_p, professor.profession, professor.id_p],
        (err) => {
            if (err) { callback(err); }
 
            callback(null, {
                statusCode: 200,
                message: 'Professor successfully updated',
                data: {
                    cod_e: professor.id_p
                }
            });
        }
    );
};

// Removing a professor by Id:
export const remove = (id_p: number, callback: Function) => {
    const queryString = 'DELETE FROM professors WHERE id_p = ?';
 
    db.query(queryString, [id_p], (err) => {
        if (err) { callback(err); }
 
        callback(null, {
            statusCode: 200,
            message: 'Professor successfully removed'
        });
    });
};