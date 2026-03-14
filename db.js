// BACKEND/db.js
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

export const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  // Siguraduhin na Number ang port at gamitin ang Public Port ng Railway
  port: Number(process.env.DB_PORT) || 23648, 
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

