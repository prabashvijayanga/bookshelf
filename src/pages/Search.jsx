import { useState } from 'react'
import {
  Container,
  TextField,
  InputAdornment,
  IconButton,
  Box,
  Typography,
  Grid,
  CircularProgress,
  Alert,
  Chip,
  Stack,
} from '@mui/material'
import { Search as SearchIcon, PageviewOutlined } from '@mui/icons-material'
import googleBooksApi from '../services/googleBooksApi'
import BookCard from '../components/BookCard'
import localStorageService from '../services/localStorage'

const Search = () => {
  const [query, setQuery] = useState('')
  const [books, setBooks] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [searched, setSearched] = useState(false)

  const categories = [
    'Fiction', 'Science Fiction', 'Mystery', 'Romance', 
    'Biography', 'History', 'Self-Help', 'Business', 
    'Fantasy', 'Thriller',
  ]

  const handleSearch = async (searchQuery = query) => {
    if (!searchQuery.trim()) return

    setLoading(true)
    setError(null)
    setSearched(true)

    try {
      const data = await googleBooksApi.searchBooks(searchQuery, 24)
      setBooks(data.items || [])
      if (!data.items || data.items.length === 0) {
        setError('No results found. Adjust your search parameters.')
      }
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleCategoryClick = async (category) => {
    setQuery(category)
    handleSearch(category)
  }

  const handleAddToShelf = (book, shelf) => {
    localStorageService.addBookToShelf(book, shelf)
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') handleSearch()
  }

  return (
    <Container maxWidth="xl" sx={{ py: { xs: 6, md: 10 } }}>
      {/* Header */}
      <Box sx={{ mb: 6 }}>
        <Typography variant="h2" gutterBottom fontWeight="800">
          Search Index
        </Typography>
        <Typography variant="h6" color="text.secondary" sx={{ fontWeight: 400 }}>
          Query millions of volumes via the Google Books API.
        </Typography>
      </Box>

      {/* Search Bar */}
      <Box sx={{ mb: 6 }}>
        <TextField
          fullWidth
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Enter title, author, or ISBN..."
          variant="outlined"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: 'text.secondary' }} />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => handleSearch()} sx={{ color: 'text.primary' }}>
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
          sx={{
            '& .MuiOutlinedInput-root': {
              backgroundColor: 'rgba(255,255,255,0.02)',
              '& fieldset': { borderColor: 'rgba(255,255,255,0.1)' },
              '&:hover fieldset': { borderColor: 'rgba(255,255,255,0.2)' },
              '&.Mui-focused fieldset': { borderColor: 'text.primary' },
            },
          }}
        />
      </Box>

      {/* Category Chips */}
      <Box sx={{ mb: 8 }}>
        <Typography variant="body2" color="text.secondary" gutterBottom sx={{ textTransform: 'uppercase', letterSpacing: 1, mb: 2 }}>
          Quick Filters
        </Typography>
        <Stack direction="row" spacing={1.5} flexWrap="wrap" useFlexGap>
          {categories.map((category) => (
            <Chip
              key={category}
              label={category}
              onClick={() => handleCategoryClick(category)}
              variant="outlined"
              sx={{
                mb: 1.5,
                borderColor: 'rgba(255,255,255,0.1)',
                color: 'text.secondary',
                '&:hover': {
                  backgroundColor: 'rgba(255,255,255,0.1)',
                  borderColor: 'text.primary',
                  color: 'text.primary',
                },
              }}
            />
          ))}
        </Stack>
      </Box>

      {/* Loading */}
      {loading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
          <CircularProgress size={30} sx={{ color: 'text.secondary' }} />
        </Box>
      )}

      {/* Error */}
      {error && (
        <Alert severity="error" sx={{ mb: 3, bgcolor: 'transparent', border: '1px solid rgba(255,0,0,0.2)' }}>
          {error}
        </Alert>
      )}

      {/* Results */}
      {!loading && searched && books.length > 0 && (
        <Box>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3, textTransform: 'uppercase', letterSpacing: 1 }}>
            {books.length} Results Found
          </Typography>
          <Grid container spacing={3}>
            {books.map((book) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={book.id}>
                <BookCard book={book} onAddToShelf={handleAddToShelf} />
              </Grid>
            ))}
          </Grid>
        </Box>
      )}

      {/* Empty State */}
      {!loading && !searched && (
        <Box sx={{ textAlign: 'center', py: 12 }}>
          <PageviewOutlined sx={{ fontSize: 64, color: 'rgba(255,255,255,0.1)', mb: 3 }} />
          <Typography variant="h6" color="text.secondary" fontWeight="500">
            Awaiting query parameters...
          </Typography>
        </Box>
      )}
    </Container>
  )
}

export default Search