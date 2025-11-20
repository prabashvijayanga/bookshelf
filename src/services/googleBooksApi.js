import axios from 'axios'

// Vercel backend URL
const API_BASE_URL = 'https://bookshelf-backend-omega.vercel.app/api/books'

const googleBooksApi = {
  searchBooks: async (query, maxResults = 20, startIndex = 0) => {
    try {
      const params = {
        endpoint: 'volumes',
        q: query,
        maxResults,
        startIndex,
      }
      const response = await axios.get(API_BASE_URL, { params })
      return response.data
    } catch (error) {
      console.error('Error searching books:', error)
      throw new Error('Failed to search books')
    }
  },

  getBookById: async (bookId) => {
    try {
      const params = {
        endpoint: `volumes/${bookId}`,
      }
      const response = await axios.get(API_BASE_URL, { params })
      return response.data
    } catch (error) {
      console.error('Error fetching book details:', error)
      throw new Error('Failed to fetch book details')
    }
  },

  searchByCategory: async (category, maxResults = 20) => {
    try {
      const params = {
        endpoint: 'volumes',
        q: `subject:${category}`,
        maxResults,
      }
      const response = await axios.get(API_BASE_URL, { params })
      return response.data
    } catch (error) {
      console.error('Error searching by category:', error)
      throw new Error('Failed to search by category')
    }
  },

  getTrendingBooks: async () => {
    try {
      const params = {
        endpoint: 'volumes',
        q: 'bestseller',
        maxResults: 20,
        orderBy: 'relevance',
      }
      const response = await axios.get(API_BASE_URL, { params })
      return response.data
    } catch (error) {
      console.error('Error fetching trending books:', error)
      throw new Error('Failed to fetch trending books')
    }
  },
}

export default googleBooksApi