import db from '../../lib/db';

export default async function handler(req, res) {
  const searchQuery = req.query.q;
  if (!searchQuery) {
    return res.status(400).json({ error: 'Query is required' });
  }

  const query = `SELECT * FROM media WHERE title LIKE ? OR description LIKE ?`;
  const searchTerm = `%${searchQuery}%`;

  db.query(query, [searchTerm, searchTerm], (err, results) => {
    if (err) {
      console.error('Error searching media:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    res.status(200).json(results);
  });
}
