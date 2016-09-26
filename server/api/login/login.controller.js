/**
* Using Rails-like standard naming convention for endpoints.
* POST    /api/login            ->  index
*/

'use strict';

var mysql = require('../../mysql');

// Gets a list of Things
export function index(req, res) {
    if(!req.body || !req.body.username || req.body.username.trim().length < 1 || !req.body.password
    || req.body.password.trim().length < 1) {
        return Promise.reject('Sorry! Please make sure to include the username and password param');
    }

    var credentials = req.body;

    return mysql.pool.getConnection(function(err, conn) {
        if(err) {
            console.log('Sorry! Issue connecting to the MySQL Database. The process will exit');
            // If issue arises from something other than not connecting, making sure to release the pool
            if(conn) {
                conn.release();
            }
            console.log(err);
            return res.json(undefined);
        }
        return conn.query('UPDATE chat_app.user_info SET session=UUID() WHERE username = \''
        + credentials.username + '\' AND password=SHA2(\'' +  credentials.password + '\', 512)',
        function(err, rows) {
            if(err) {
                if(conn) {
                    conn.release();
                }
                console.log(err);
                return res.json(undefined);
            }
            console.log(rows);
            if(rows.affectedRows !== 1) {
                if(conn) {
                    conn.release();
                }
                return res.json('None');
            }
            conn.query('SELECT session as session from chat_app.user_info WHERE username=\''
            + credentials.username + '\'', function(err, sessionRow) {
                if(err) {
                    if(conn) {
                        conn.release();
                    }
                    console.log(err);
                    return res.json(null);
                }
                console.log(sessionRow);
                return sessionRow && sessionRow.length === 1 && sessionRow[0].session
                ? res.json(sessionRow[0].session) : res.json(undefined);
            });
        });
    });
}
