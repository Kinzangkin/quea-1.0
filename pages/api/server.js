const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const path = require('path');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

require('dotenv').config();

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT
});


// Koneksi ke database
db.connect((err) => {
  if (err) {
    console.error('Database connection error:', err.stack);
    return;
  }
  console.log('Connected to local MySQL database');
});

// Serve HTML file (admin.html)
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'admin.html'));
});

// Endpoint untuk mengambil semua data
app.get('/media', (req, res) => {
  const query = 'SELECT * FROM media';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching data:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    res.json(results);
  });
});

// Endpoint untuk menambahkan data
app.post('/submit', (req, res) => {
  const { title, description, file_link, thumbnail } = req.body;
  if (!title || !description || !file_link || !thumbnail) {
    return res.status(400).json({ error: 'All fields are required!' });
  }

  const query = 'INSERT INTO media (title, description, file_link, thumbnail) VALUES (?, ?, ?, ?)';
  db.query(query, [title, description, file_link, thumbnail], (err, result) => {
    if (err) {
      console.error('Error inserting data:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    res.json({ message: 'Data inserted successfully!', id: result.insertId });
  });
});

// Endpoint untuk menghapus data berdasarkan ID
app.delete('/media/:id', (req, res) => {
  const mediaId = req.params.id;
  const query = 'DELETE FROM media WHERE id = ?';

  db.query(query, [mediaId], (err, result) => {
    if (err) {
      console.error('Error deleting data:', err);
      return res.status(500).json({ error: 'Database error' });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Data not found' });
    }

    res.json({ message: 'Data deleted successfully' });
  });
});

// Endpoint pencarian
app.get('/search', (req, res) => {
  const searchQuery = req.query.q;
  if (!searchQuery) {
    return res.status(400).json({ error: 'Query is required' });
  }

  const query = `SELECT * FROM media WHERE title LIKE ? OR description LIKE ?`;
  const searchTerm = `%${searchQuery}%`;

  db.query(query, [searchTerm, searchTerm], (err, results) => {
    if (err) {
      console.error('Error searching data:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    res.json(results);
  });
});

// Jalankan server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
