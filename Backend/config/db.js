
const mysql = require('mysql2');
const path = require('path');

// 1. Force the app to prioritize Render variables over the .env file
if (process.env.NODE_ENV === 'production' || process.env.RENDER) {
    console.log("--- PRODUCTION MODE: Using Render Dashboard Variables ---");
} else {
    require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
    console.log("--- LOCAL MODE: Using .env file ---");
}

// 2. LOG THE HOST (To catch typos/empty values)
console.log("DB_HOST being used:", `"${process.env.DB_HOST}"`);

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: parseInt(process.env.DB_PORT) || 14764,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  // Aiven REQUIRES this block for cloud connections
  ssl: {
    rejectUnauthorized: false
  }
});

module.exports = pool.promise();