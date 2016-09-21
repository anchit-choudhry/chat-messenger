# Chat Messenger App

[![Build Status](https://travis-ci.org/anchit-choudhry/chat-messenger.svg?branch=master)](https://travis-ci.org/anchit-choudhry/chat-messenger)

A simple demonstration of a chat app using:

**Front-end**: HTML5, Twitter Bootstrap, AngularJS  
**Middleware**: Node.js  
**Backend**: MySQL 5.7

This project was generated with the [Angular Full-Stack Generator](https://github.com/DaftMonk/generator-angular-fullstack) version 4.0.5.

## Getting Started

### Prerequisites

- [Git](https://git-scm.com)
- [Node.js](https://nodejs.org/en) (Node >= 6.x.x) and [npm](https://www.npmjs.com) (npm >= 3.x.x)
- [Gulp](http://gulpjs.com) (`npm install -g gulp`)
- [node-gyp](https://github.com/nodejs/node-gyp) (`npm install -g node-gyp`)
- [MySQL Server Instance](https://dev.mysql.com/downloads/mysql)

### Setting up the MySQL Database

Before running the Web App, please make sure to have access and setup a MySQL Server instance

For installing MySQL Server, please visit the docs at [MySQL Website](http://dev.mysql.com/doc/refman/5.7/en/installing.html)

See the file [db-schema-setup.sql](db-schema-setup.sql) which contains the SQL commands for setting up the Database and Tables

*To run the SQL commands described in the file, the MySQL logged in user must have proper privileges to CREATE USER/DATABASE/TABLE, GRANT, etc.*

The SQL commands could be typed or imported using `mysql -u <username> -p < <Path to db-schema-setup.sql>`

### Suggestions/Feedback/Issues

Please report all your wonderful suggestions and improvements on the [Issues](../../issues) tab

### Developing

1. Run `npm install` to install server dependencies.

2. Run `gulp serve` to start the development server. It should automatically open the client in your browser when ready.

## Build & development

Run `gulp build` for building and `gulp serve` for preview.

## Testing

Running `npm test` will run the unit tests with karma.

## Userful links

[HTML5](https://www.w3.org/TR/html5)  
[AngularJS](https://angularjs.org)  
[Bootstrap](http://getbootstrap.com)  
[Node.js](https://nodejs.org/en)  
[npm(Node Package Manager)](https://www.npmjs.com)  
[Express](https://expressjs.com)  
[Socket.IO](http://socket.io)  
[MySQL](http://dev.mysql.com/doc/refman/5.7/en/installing.html)
