'use strict';

var mysql = require('mysql');

var credentials = {
    host: 'localhost',
    user: 'chat_app',
    password: 'lets_talk',
    database: 'chat_app'
};

exports = module.exports = {};

// Creating a MySQL Connection Pool
exports.pool = mysql.createPool(credentials);

// Exporting Database and Table names
exports.dbName = credentials.database;

exports.tables = {
    users: 'user_info',
    messages: 'messages'
};
