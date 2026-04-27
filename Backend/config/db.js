

const mysql = require('mysql2');
const path = require('path');
// This forces Node to look in the folder above 'config' for the .env
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

console.log("Checking DB_PASSWORD:", process.env.DB_PASSWORD); 

// const pool = mysql.createPool({
//   host: process.env.DB_HOST,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_NAME,
//   port: process.env.DB_PORT,
//   waitForConnections: true,
//   connectionLimit: 10,
//   queueLimit: 0,
//   ssl:{
//     rejectUnauthorized:false
//   }
// });
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  // If DB_PORT isn't found in the environment, use 3306
  port: process.env.DB_PORT || 3306, 
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  ssl: process.env.DB_HOST === 'localhost' ? false : { rejectUnauthorized: false }
});

module.exports = pool.promise();