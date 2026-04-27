

// const mysql = require('mysql2');
// const path = require('path');
// This forces Node to look in the folder above 'config' for the .env
// require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

// console.log("Checking DB_PASSWORD:", process.env.DB_PASSWORD); 
const mysql = require('mysql2');
const path = require('path');

// Only load .env if we are NOT on Render
if (!process.env.RENDER) {
  require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
}

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
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: parseInt(process.env.DB_PORT), // This will take 3306 locally and 14764 on Render
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  ssl: process.env.RENDER ? { rejectUnauthorized: false } : null
});

module.exports = pool.promise();