import { Teach } from '../models/teachModel';
import { db } from '../../db';
import { OkPacket, RowDataPacket } from 'mysql2';
 
// Creating records:
export const create = (teach: Teach, callback: Function) => {
    const queryString = 'INSERT INTO teaches (id_p, id_s, group, schedule) VALUES (?, ?, ?, ?)';
 
    db.query(
        queryString,
        [teach.id_p, teach.id_s, teach.group, teach.schedule],
        (err) => {
            if (err) { callback(err); }
 
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
        }
    );
};

// Getting every record:
export const getAll = (callback: Function) => {
    const queryString = 'SELECT * FROM teaches';
   
    db.query(queryString, (err, result) => {
        if (err) { callback(err); }
       
        const rows = <RowDataPacket[]>result;
        const teaches: Teach[] = [];
        rows.forEach(row => {
            const teach: Teach = {
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

// Getting a record by Id:
export const getById = (id_p: number, callback: Function) => {
    const queryString = 'SELECT * FROM teaches WHERE id_p = ?';

    db.query(queryString, [id_p], (err, result) => {
        if (err) {
            return callback({
                statusCode: 500,
                message: 'Ocurred an error in the query',
                error: err
            });
        }

        const rows = <RowDataPacket[]>result;
        if (rows.length > 0) {
            const registros: Teach[] = rows.map(row => ({
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
        } else {
            callback(null, {
                statusCode: 404,
                message: 'No records found'
            });
        }
    });
};

// Getting a subject by id:
export const getById1 = (id_s: number, callback: Function) => {
    const queryString = 'SELECT * FROM teaches WHERE id_s = ?';

    db.query(queryString, [id_s], (err, result) => {
        if (err) {
            return callback({
                statusCode: 500,
                message: 'Ocurred an error in the query',
                error: err
            });
        }

        const rows = <RowDataPacket[]>result;
        if (rows.length > 0) {
            const registros: Teach[] = rows.map(row => ({
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
        } else {
            callback(null, {
                statusCode: 404,
                message: 'No records found'
            });
        }
    });
};

// Updating a record by Id:
export const update = (teach: Teach, callback: Function) => {
    const queryString = 'UPDATE teaches SET group= ?, schedule =?   WHERE id_p = ? AND id_s = ? AND group= ?';
    db.query(
        queryString,
        [teach.newGroup, teach.schedule, teach.id_p, teach.id_s, teach.group],
        (err) => {
            if (err) { callback(err); }
 
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
        }
    );
};

// Removing a record by Id:
export const remove = (id_p: number, id_s: number, group: number, callback: Function) => {
    const queryString = 'DELETE FROM teaches WHERE id_p = ? AND id_s = ? AND group = ?';
 
    db.query(queryString, [id_p,id_s,group], (err) => {
        if (err) { callback(err); }
 
        callback(null, {
            statusCode: 200,
            message: 'Record successfully removed'
        });
    });
};