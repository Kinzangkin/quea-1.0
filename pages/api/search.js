// pages/api/search.js
import db from '../../lib/db';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const q = req.query.q;
  if (!q) {
    return res.status(400).json({ error: 'Query is required' });
  }

  try {
    const sql = 'SELECT * FROM media WHERE title LIKE ? OR description LIKE ?';
    const term = `%${q}%`;
    const [rows] = await db.query(sql, [term, term]);
    res.status(200).json(rows);
  } catch (err) {
    console.error('Search failed:', err);
    res.status(500).json({ error: err.message });
  }
}
