var env = require('./env');

var mysql = require('mysql');

var connection = mysql.createConnection({
    host: env.hostname,
    user: env.dbusername,
    password: env.dbpassword,
    database: env.dbname
});

connection.connect();

module.exports.connection = connection;