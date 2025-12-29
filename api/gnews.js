export default async function handler(req, res) {
  const q = req.query.q || 'india elections';

  const key = process.env.GNEWS_API_KEY;
  if (!key) {
    return res.status(500).json({ error: 'Missing API key' });
  }

  const url =
    'https://gnews.io/api/v4/search?' +
    new URLSearchParams({
      q,
      lang: 'en',
      country: 'in',
      max: '5',
      apikey: key
    });

  try {
    const r = await fetch(url);
    const data = await r.json();
    res.status(200).json(data);
  } catch {
    res.status(500).json({ error: 'Fetch failed' });
  }
}
