export default async function handler(req, res) {
  // 1. CORS Errors Handling
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Pre-flight request එකකට (OPTIONS) ඉඩ දීම
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // 2. Frontend URL එකෙන් URL parameter එක ලබා ගැනීම
  const { url } = req.query;

  if (!url) {
    return res.status(400).json({ error: 'URL parameter is required' });
  }

  try {
    // 3. අදාල URL එකෙන් (Google) EPUB file එක Fetch කිරීම
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch from source: ${response.status} ${response.statusText}`);
    }

    // 4. File එකේ type එක frontend එකට යැවීම
    const contentType = response.headers.get('content-type') || 'application/epub+zip';
    res.setHeader('Content-Type', contentType);

    // 5. File data ටික buffer එකක් විදියට යැවීම
    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    
    res.status(200).send(buffer);

  } catch (error) {
    console.error('Proxy Error:', error);
    res.status(500).json({ error: 'Error fetching the EPUB file', details: error.message });
  }
}