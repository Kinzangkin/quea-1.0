// pages/api/media.js
import db from '../../lib/db';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const [rows] = await db.query('SELECT * FROM media');
    res.status(200).json(rows);
  } catch (err) {
    console.error('Media fetch failed:', err);
    res.status(500).json({ error: err.message });
  }
}
