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
import { Search as SearchIcon } from '@mui/icons-material'
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
    'Fiction',
    'Science Fiction',
    'Mystery',
    'Romance',
    'Biography',
    'History',
    'Self-Help',
    'Business',
    'Fantasy',
    'Thriller',
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
        setError('No books found. Try a different search term.')
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
    if (e.key === 'Enter') {
      handleSearch()
    }
  }

  return (
    <Container maxWidth="xl" sx={{ py: 6 }}>
      {/* Header */}
      <Box sx={{ textAlign: 'center', mb: 6 }}>
        <Typography
          variant="h3"
          gutterBottom
          fontWeight="bold"
          sx={{
            background: 'linear-gradient(45deg, #5c6bc0 30%, #ff4081 90%)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          Search Books
        </Typography>
        <Typography variant="h6" color="text.secondary">
          Discover from millions of books powered by Google Books
        </Typography>
      </Box>

      {/* Search Bar */}
      <Box sx={{ mb: 4 }}>
        <TextField
          fullWidth
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Search by title, author, or ISBN..."
          variant="outlined"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <IconButton color="primary" onClick={() => handleSearch()}>
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
          sx={{
            '& .MuiOutlinedInput-root': {
              backgroundColor: 'background.paper',
              borderRadius: 2,
            },
          }}
        />
      </Box>

      {/* Category Chips */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="body1" gutterBottom fontWeight="bold">
          Browse by Category:
        </Typography>
        <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
          {categories.map((category) => (
            <Chip
              key={category}
              label={category}
              onClick={() => handleCategoryClick(category)}
              sx={{
                mb: 1,
                '&:hover': {
                  backgroundColor: 'primary.main',
                  color: 'white',
                },
              }}
            />
          ))}
        </Stack>
      </Box>

      {/* Loading */}
      {loading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
          <CircularProgress />
        </Box>
      )}

      {/* Error */}
      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      {/* Results */}
      {!loading && searched && books.length > 0 && (
        <>
          <Typography variant="h6" gutterBottom sx={{ mb: 3 }}>
            Found {books.length} books
          </Typography>
          <Grid container spacing={3}>
            {books.map((book) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={book.id}>
                <BookCard book={book} onAddToShelf={handleAddToShelf} />
              </Grid>
            ))}
          </Grid>
        </>
      )}

      {/* Empty State */}
      {!loading && !searched && (
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <Typography variant="h4" gutterBottom sx={{ fontSize: '4rem' }}>
            🔍
          </Typography>
          <Typography variant="h6" color="text.secondary">
            Start searching for your next great read!
          </Typography>
        </Box>
      )}
    </Container>
  )
}

export default Search