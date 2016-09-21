/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/checkuser        ->  index
 */

'use strict';

var mysql = require('../../mysql');

// Gets a list of Things
export function index(req, res) {
    if(!req.query.username || req.query.username.trim().length < 1) {
        return Promise.reject('Sorry! Please make sure to include the username param');
    }

    var username = req.query.username;

    return mysql.pool.getConnection(function(err, conn) {
        var userExists = true;
        if (err) {
            console.log('Sorry! Issue connecting to the MySQL Database. The process will exit');
            // If issue arises from something other than not connecting, making sure to release the pool
            if (conn) {
                conn.release();
            }
            throw err;
            return res.json(userExists);
        }
        conn.query('SELECT COUNT(*) AS total FROM chat_app.user_info WHERE username = \''
        + username + '\'', function(err, rows) {
            if (err) {
                throw err;
            }
            console.log(rows);
            if(rows && rows[0].total < 1) {
                userExists = false;
            }
            conn.release();
            return res.json(userExists);
        });
    });
}
