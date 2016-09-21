/**
* Using Rails-like standard naming convention for endpoints.
* GET     /api/checkuser        ->  index
*/

'use strict';

var mysql = require('../../mysql');

// Gets a list of Things
export function index(req, res) {
    if(!req.body || !req.body.username || !req.body.password || !req.body.email) {
        return Promise.reject('Sorry! Please make sure to include the username, password and email param');
    }

    var params = {
        username : req.body.username,
        password: req.body.password,
        email: req.body.email
    };

    return mysql.pool.getConnection(function(err, conn) {
        if (err) {
            console.log('Sorry! Issue connecting to the MySQL Database. The process will exit');
            // If issue arises from something other than not connecting, making sure to release the pool
            if (conn) {
                conn.release();
            }
            throw err;
            return res.json(null);
        }
        conn.query("INSERT INTO user_info(username, password, email, session) VALUES('" +
            params.username + "',SHA2('" + params.password + "', 512),'" + params.email +
            "',UUID())", function(err, rows) {
            if (err) {
                throw err;
                if (conn) {
                    conn.release();
                }
                return res.json(null);
            }
            console.log(rows);
            if(rows && rows.affectedRows == 1) {
                conn.query("SELECT session as session from user_info WHERE user_id = " + rows.insertId,
                    function(err, rows) {
                        if (err) {
                            throw err;
                            if(conn) {
                                conn.release();
                            }
                            return res.json(null);
                        }
                        console.log(rows);
                        return rows && rows.length > 0 && rows[0].session ?
                        res.json(rows[0].session) : res.json(null);
                });
            }
        });
    });
}
