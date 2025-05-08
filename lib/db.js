// lib/db.js
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  port: Number(process.env.DB_PORT) || 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Cek koneksi saat startup
pool.getConnection()
  .then(conn => {
    console.log('✔️  MySQL connected');
    conn.release();
  })
  .catch(err => {
    console.error('❌  MySQL connection error:', err);
  });

export default pool;
