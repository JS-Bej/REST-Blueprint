import { Subject } from '../models/subjectModel';
import { db } from '../../db';
import { OkPacket, RowDataPacket } from 'mysql2';
 
// Creating a subject:
export const create = (subject: Subject, callback: Function) => {
    const queryString = 'INSERT INTO subjects (id_s, name_s, int_h, credits) VALUES (?, ?, ?, ?)';
 
    db.query(
        queryString,
        [subject.id_s, subject.name_s, subject.int_h, subject.credits],
        (err) => {
            if (err) { callback(err); }
 
            callback(null, {
                statusCode: 201,
                message: 'Subject successfully created',
                data: {
                    id_s: subject.id_s
                }
            });
        }
    );
};

// Getting every subject:
export const getAll = (callback: Function) => {
    const queryString = 'SELECT * FROM subjects';
   
    db.query(queryString, (err, result) => {
        if (err) { callback(err); }
       
        const rows = <RowDataPacket[]>result;
        const subjects: Subject[] = [];
        rows.forEach(row => {
            const subject: Subject = {
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

// Getting subject by Id:
export const getById = (id_s: number, callback: Function) => {
    const queryString = 'SELECT * FROM subjects WHERE id_s = ?';
 
    db.query(queryString, [id_s], (err, result) => {
        if (err) { callback(err); }
 
        const row = (<RowDataPacket[]>result)[0];
        if (row) {
            const subject: Subject = {
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
        } else {
            callback(null, {
                statusCode: 404,
                message: 'Subject not found'
            });
        }
    });
};

// Updating a subject by Id:
export const update = (subject: Subject, callback: Function) => {
    const queryString = 'UPDATE subjects SET name_s = ?, int_h = ?, credits = ? WHERE id_s = ?';
 
    db.query(
        queryString,
        [subject.name_s, subject.int_h, subject.credits, subject.id_s],
        (err) => {
            if (err) { callback(err); }
 
            callback(null, {
                statusCode: 200,
                message: 'Subject successfully updated',
                data: {
                    cod_e: subject.id_s
                }
            });
        }
    );
};

// Removing subject by Id:
export const remove = (id_s: number, callback: Function) => {
    const queryString = 'DELETE FROM subjects WHERE id_s = ?';
 
    db.query(queryString, [id_s], (err) => {
        if (err) { callback(err); }
 
        callback(null, {
            statusCode: 200,
            message: 'Subject successfully removed'
        });
    });
};