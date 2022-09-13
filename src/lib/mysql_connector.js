'use strict';
import mysql from 'mysql2';

let pool;

export function init(config) {
    pool = pool ? pool : mysql.createPool(config);
    console.log("Connected to DB ", JSON.stringify(config))
    return pool;
}

export function getConnection() {
    return new Promise((resolve, reject) => {
        if (!pool) return reject(new AppError('pool is not ready', 'E101'));
        pool.getConnection((err, connection) => {
            if (err) return reject(err);
            else resolve(connection);
        });
    });
}

export function query(query = '', params = {}) {
    return new Promise((resolve, reject) => {
        pool.query(query, params, (error, results, fields) => {
            if (error) return reject(error);
            resolve(results);
        });
    });
}

export async function queryTransaction(func, ...params) {
    const connection = await pool.promise().getConnection();
    try {
        await connection.beginTransaction();
        await func(connection, ...params);
        await connection.commit();
    } catch (error) {
        await connection.rollback();
        throw error;
    } finally {
        await connection.release();
    }
}

// export function queryTransactionPromise(func, ...params) {
//     let connection;
//     return new Promise((resolve, reject) => {
//         getConnection()
//             .then(conn => {
//                 connection = conn;
//                 conn.beginTransaction()
//             })
//             .then(() => func(connection, ...params))
//             .then(() => connection.commit())
//             .then(() => resolve("ok"))
//             .catch(error => {
//                 connection.rollback();
//                 reject(error)
//             })
//             .finally(() => connection.release());
//     });
// }
//
//
//
// export async function asyncQueryTransaction(func, ...params) {
//     const mysql = require('mysql2/promise');
//     const conn = await mysql.createConnection(config.mysql);
//     try {
//         await conn.query('START TRANSACTION');
//         await func(conn, ...params);
//         await conn.query('COMMIT');
//     } catch (error) {
//         await conn.query('ROLLBACK');
//         throw error;
//     } finally {
//         await conn.destroy();
//     }
// }

export function escape(param) {
    return mysql.escape(param);
}

export async function queryWithConn(conn, query = '', params = {}) {
    const [rows, _] = await conn.query(query, params);
    return rows;
}