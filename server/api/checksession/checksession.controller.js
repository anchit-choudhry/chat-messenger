/**
* Using Rails-like standard naming convention for endpoints.
* GET     /api/checksession        ->  index
*/

'use strict';

var mysql = require('../../mysql');

// Gets a list of Things
export function index(req, res) {
    if(!req.query || !req.query.username || !req.query.session) {
        return Promise.reject('Sorry! Please make sure to include the username and session param');
    }

    return mysql.pool.getConnection(function(err, conn) {
        if(err) {
            console.log('Sorry! Issue connecting to the MySQL Database. The process will exit');
            // If issue arises from something other than not connecting, making sure to release the pool
            if(conn) {
                conn.release();
            }
            console.log(err);
            return res.json(false);
        }
        conn.query('SELECT COUNT(*) as total FROM chat_app.user_info WHERE username = \''
        + req.query.username + '\' AND session = \'' + req.query.session + '\'', function(err, rows) {
            if(err) {
                if(conn) {
                    conn.release();
                }
                console.log(err);
                return res.json(false);
            }
            console.log(rows);
            conn.release();
            return rows && rows.length === 1 && rows[0].total === 1 ? res.json(true)
            : res.json(false);
        });
    });
}
