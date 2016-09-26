/**
* Using Rails-like standard naming convention for endpoints.
* POST    /api/logout           ->  index
*/

'use strict';

var mysql = require('../../mysql');

// Gets a list of Things
export function index(req, res) {
    if(!req.body || !req.body.session || req.body.session.length < 1) {
        return Promise.reject('Sorry! Please make sure to include the session param');
    }

    if(req.body.session.length !== 36) {
        return res.json(false);
    }

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
        return conn.query('UPDATE chat_app.user_info SET session=NULL, last_login=CURRENT_TIMESTAMP '
        + 'WHERE session = \'' + req.body.session + '\'', function(err, rows) {
            if(err) {
                if(conn) {
                    conn.release();
                }
                console.log(err);
                return res.json(undefined);
            }
            console.log(rows);
            conn.release();
            return res.json(rows && rows.affectedRows === 1);
        });
    });
}
