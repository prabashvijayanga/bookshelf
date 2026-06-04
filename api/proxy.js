export default async function handler(req, res) {
  // 1. Epub.js වලට අවශ්‍ය කරන විශේෂ Headers එක්ක CORS හදනවා
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, Range');
  res.setHeader('Access-Control-Expose-Headers', 'Content-Length, Content-Range, Accept-Ranges');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // 2. URL එක අනිවාර්යයෙන්ම අල්ලගන්න පුළුවන් විදියට හදනවා
  let targetUrl = req.query?.url;
  
  if (!targetUrl) {
    // req.query වැඩ කරේ නැත්තම් බලෙන් URL එක කඩලා ගන්නවා
    try {
      const fullUrl = new URL(req.url, `https://${req.headers.host}`);
      targetUrl = fullUrl.searchParams.get('url');
    } catch (e) {
      console.error('URL parsing failed', e);
    }
  }

  if (!targetUrl) {
    // එහෙමත් නැත්තම් Error එකත් එක්කම ආපු URL එක මොකක්ද කියලා Console එකට දෙනවා
    return res.status(400).json({ error: 'URL parameter is required', receivedUrl: req.url });
  }

  try {
    // 3. Google සර්වර් එකෙන් පොත (EPUB) ගන්නවා
    const response = await fetch(targetUrl);

    if (!response.ok) {
      return res.status(response.status).json({ error: `Google API Error: ${response.statusText}` });
    }

    // 4. File Type එක හරියටම දාලා Browser එකට යවනවා
    const contentType = response.headers.get('content-type');
    if (contentType) res.setHeader('Content-Type', contentType);

    const buffer = await response.arrayBuffer();
    res.status(200).send(Buffer.from(buffer));
    
  } catch (error) {
    console.error('Proxy Fetch Error:', error);
    res.status(500).json({ error: error.message });
  }
}