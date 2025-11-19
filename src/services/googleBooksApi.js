import axios from 'axios'

const API_BASE_URL = 'https://www.googleapis.com/books/v1'
const API_KEY = import.meta.env.VITE_GOOGLE_BOOKS_API_KEY || ''

const googleBooksApi = {
  searchBooks: async (query, maxResults = 20, startIndex = 0) => {
    try {
      const params = {
        q: query,
        maxResults,
        startIndex,
        key: API_KEY,
      }
      const response = await axios.get(`${API_BASE_URL}/volumes`, { params })
      return response.data
    } catch (error) {
      console.error('Error searching books:', error)
      throw new Error('Failed to search books')
    }
  },

  getBookById: async (bookId) => {
    try {
      const params = API_KEY ? { key: API_KEY } : {}
      const response = await axios.get(`${API_BASE_URL}/volumes/${bookId}`, { params })
      return response.data
    } catch (error) {
      console.error('Error fetching book details:', error)
      throw new Error('Failed to fetch book details')
    }
  },

  searchByCategory: async (category, maxResults = 20) => {
    try {
      const params = {
        q: `subject:${category}`,
        maxResults,
        key: API_KEY,
      }
      const response = await axios.get(`${API_BASE_URL}/volumes`, { params })
      return response.data
    } catch (error) {
      console.error('Error searching by category:', error)
      throw new Error('Failed to search by category')
    }
  },

  getTrendingBooks: async () => {
    try {
      const params = {
        q: 'bestseller',
        maxResults: 20,
        orderBy: 'relevance',
        key: API_KEY,
      }
      const response = await axios.get(`${API_BASE_URL}/volumes`, { params })
      return response.data
    } catch (error) {
      console.error('Error fetching trending books:', error)
      throw new Error('Failed to fetch trending books')
    }
  },
}

export default googleBooksApi