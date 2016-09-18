# Chat Messenger App

[![Build Status](https://travis-ci.org/anchit-choudhry/chat-messenger.svg?branch=master)](https://travis-ci.org/anchit-choudhry/chat-messenger)

A simple demonstration of a chat app using:

**Front-end**: HTML5, Twitter Bootstrap, AngularJS  
**Middleware**: NodeJS  
**Backend**: MySQL 5.7

This project was generated with the [Angular Full-Stack Generator](https://github.com/DaftMonk/generator-angular-fullstack) version 4.0.5.

## Getting Started

### Prerequisites

- [Git](https://git-scm.com/)
- [Node.js and npm](nodejs.org) Node >= 4.x.x, npm >= 2.x.x
- [Gulp](http://gulpjs.com/) (`npm install --global gulp`)

### Setting up the MySQL Database

Before running the Web App, please make sure to have access and setup a MySQL Server instance

For installing MySQL Server, please visit the docs at [MySQL Website](http://dev.mysql.com/doc/refman/5.7/en/installing.html)

See the file [db-schema-setup.sql](https://github.com/anchit-choudhry/chat-messenger/blob/master/db-schema-setup.sql) which contains the SQL commands for setting up the Database and Tables

*To run the SQL commands described in the file, the MySQL logged in user must have proper privileges to CREATE USER/DATABASE/TABLE, GRANT, etc.*

The SQL commands could be typed or imported using `mysql -u <username> -p < <Path to db-schema-setup.sql>`

Suggestions /Feedback / Issues

Please report all your wonderful suggestions and improvements on the [Issues](https://github.com/anchit-choudhry/chat-messenger/issues) tab

### Developing

1. Run `npm install` to install server dependencies.

2. Run `gulp serve` to start the development server. It should automatically open the client in your browser when ready.

## Build & development

Run `gulp build` for building and `gulp serve` for preview.

## Testing

Running `npm test` will run the unit tests with karma.

## Userful links

[AngularJS](https://angularjs.org/)  
[Bootstrap](http://getbootstrap.com/)  
[NodeJS](https://nodejs.org/en/)  
[npm(Node Package Manager)](https://www.npmjs.com/)  
[MySQL](http://dev.mysql.com/doc/refman/5.7/en/installing.html)
