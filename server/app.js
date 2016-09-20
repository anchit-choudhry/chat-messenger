/**
* Main application file
*/

'use strict';

import express from 'express';
import config from './config/environment';
import http from 'http';

// Connect to MySQL Server and check everything is setup
var mysql = require('./mysql');

mysql.pool.getConnection(function(err, conn) {
    if (err) {
        console.log('Sorry! Issue connecting to the MySQL Database. The process will exit');
        // If issue arises from something other than not connecting, making sure to release the pool
        if (conn) {
            conn.release();
        }
        throw err;
        process.exit(-1);
    }
    conn.query('SELECT COUNT(*) AS total FROM information_schema.tables WHERE table_schema = \''
    + mysql.dbName + '\'', function(err, rows) {
        if (err) {
            throw err;
        }
        if(!rows || rows[0].total !== 2) {
            console.log('Sorry! The Database is not properly setup. The program will exit');
            process.exit(-1);
        }
        console.log('Cool! The Database and Schema check is complete.');
    });
    conn.release();
});

// Setup server
var app = express();
var server = http.createServer(app);
require('./config/express').default(app);
require('./routes').default(app);

// Start server
function startServer() {
    app.angularFullstack = server.listen(config.port, config.ip, function() {
        console.log('Express server listening on %d, in %s mode', config.port, app.get('env'));
    });
}

setImmediate(startServer);

// Expose app
exports = module.exports = app;
