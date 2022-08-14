const mysql = require("mysql2");


module.exports = mysql.createConnection({
    host: process.env.HOST,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    user: process.env.USER,
  });
