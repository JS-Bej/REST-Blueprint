import { Student } from '../models/studentModel';
import { db } from '../../db';
import { OkPacket, RowDataPacket } from 'mysql2';
 
// Creating a student:
export const create = (student: Student, callback: Function) => {
    const queryString = 'INSERT INTO students (id_st, name_st, address_st, pnumber_st, birth_date) VALUES (?, ?, ?, ?, ?)';
 
    db.query(
        queryString,
        [student.id_st, student.name_st, student.address_st, student.pnumber_st, student.birth_date],
        (err) => {
            if (err) { callback(err); }
 
 
            callback(null, {
                statusCode: 201,
                message: 'Student successfully created',
                data: {
                    id_st: student.id_st
                }
            });
        }
    );
};

// Getting every student:
export const getAll = (callback: Function) => {
    const queryString = 'SELECT * FROM students';
   
    db.query(queryString, (err, result) => {
        if (err) { callback(err); }
       
        const rows = <RowDataPacket[]>result;
        const students: Student[] = [];
        rows.forEach(row => {
            const student: Student = {
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

// Getting a student by Id:
export const getById = (id_st: number, callback: Function) => {
    const queryString = 'SELECT * FROM students WHERE id_st = ?';
 
    db.query(queryString, [id_st], (err, result) => {
        if (err) { callback(err); }
 
        const row = (<RowDataPacket[]>result)[0];
        if (row) {
            const student: Student = {
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
        } else {
            callback(null, {
                statusCode: 404,
                message: 'Student not found'
            });
        }
    });
};

// Updating a student by Id:
export const update = (student: Student, callback: Function) => {
    const queryString = 'UPDATE students SET name_st = ?, address_st = ?, pnumber_st = ?, birth_date = ? WHERE id_st = ?';
 
    db.query(
        queryString,
        [student.name_st, student.address_st, student.pnumber_st, student.birth_date, student.id_st],
        (err) => {
            if (err) { callback(err); }
 
            callback(null, {
                statusCode: 200,
                message: 'Student successfully updated',
                data: {
                    id_st: student.id_st
                }
            });
        }
    );
};

// Removing a student:
export const remove = (id_st: number, callback: Function) => {
    const queryString = 'DELETE FROM students WHERE id_st = ?';
 
    db.query(queryString, [id_st], (err) => {
        if (err) { callback(err); }
 
        callback(null, {
            statusCode: 200,
            message: 'student successfully removed'
        });
    });
};