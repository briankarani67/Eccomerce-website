

const mysql = require('mysql2');
const path = require('path');
// This forces Node to look in the folder above 'config' for the .env
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

console.log("Checking DB_PASSWORD:", process.env.DB_PASSWORD); 

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  ssl:{
    rejectUnauthorized:false
  }
});

module.exports = pool.promise();