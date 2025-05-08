
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
