const mysql = require('mysql2');

// Create connection to our mysql database
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'mysql_first_day_db'
  });

  module.exports = connection;