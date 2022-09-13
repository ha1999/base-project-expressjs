'use strict';
import ErrorCode from '../consts/error_codes';
import * as mysql from "../mysql_connector";

export default function response() {
    return function (req, res, next) {
        res.sendJson = function ({message, data, paging}) {
            let tmp = {
                status: 'success',
                message: message || 'success',
                data: data || {},
            };
            if (paging) {
                tmp.paging = paging || {};
            }
            res.statusCode = 200;
            res.json(tmp);
            // authLog(req, 'success');
        };

        /**
         *
         * @param code
         * @param message
         * @param httpStatusCode
         * @param data
         * @param messFormat
         */
        res.sendError = function ({code, message, httpStatusCode, data, messFormat, detail}) {
            if (!code) code = '400';
            message = message || ErrorCode[code];

            res.statusCode = httpStatusCode * 1 || 200;
            if (res.statusCode === 401) {
                res.setHeader("WWW-Authenticate", 'Bearer realm="Users", error="invalid_token"');
            }
            res.json({
                message: message,
                status: 'error',
                error_code: code,
                data: data,
                detail
            });
            // authLog(req, 'fail');
        };

        next();
    }
}

export function authLog(req, status, level = 1) {
    if (req.action !== undefined && req.user) mysql.query(`INSERT INTO user_log (user_id, username, action, body, query, param, api, method, user_agent, referer, ip, level, status, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, now());`, [req.user.user_id, req.user.username, req.action, JSON.stringify(req.body), JSON.stringify(req.query), JSON.stringify(req.params), req.originalUrl, req.method, req.headers['user-agent'], req.headers['referer'], req.headers['x-forwarded-for'] || req.connection.remoteAddress, level, status]).catch(e => {
        console.log('authLog', req.originalUrl, e.toString());
    });
}