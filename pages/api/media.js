import db from '../../lib/db';

export default async function handler(req, res) {
  const query = 'SELECT * FROM media';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching media:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    res.status(200).json(results);
  });
}