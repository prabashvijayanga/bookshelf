// api/books.js
export default async function handler(req, res) {
  // Allow ALL origins (both localhost and GitHub Pages)
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  // Handle preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).end()
  }

  // Only allow GET
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { endpoint, ...params } = req.query
    
    if (!endpoint) {
      return res.status(400).json({ 
        error: 'Missing endpoint parameter',
        usage: 'Example: /api/books?endpoint=volumes&q=javascript'
      })
    }

    const API_KEY = process.env.GOOGLE_BOOKS_API_KEY || ''
    const BASE_URL = 'https://www.googleapis.com/books/v1'

    const queryParams = new URLSearchParams({
      ...params,
      ...(API_KEY && { key: API_KEY })
    })

    const apiUrl = `${BASE_URL}/${endpoint}?${queryParams.toString()}`
    
    console.log('Calling API:', apiUrl.replace(API_KEY || 'none', 'HIDDEN'))

    const response = await fetch(apiUrl)
    
    if (!response.ok) {
      const errorText = await response.text()
      console.error('API Error:', response.status, errorText)
      return res.status(response.status).json({ 
        error: 'API error',
        status: response.status,
        message: errorText
      })
    }

    const data = await response.json()
    return res.status(200).json(data)

  } catch (error) {
    console.error('Server Error:', error)
    return res.status(500).json({ 
      error: 'Failed to fetch data',
      message: error.message 
    })
  }
}