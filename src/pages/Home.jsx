import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
  Container,
  Typography,
  Box,
  Button,
  Grid,
  Card,
  CardContent,
  CircularProgress,
  Alert,
} from '@mui/material'
import {
  ArrowForward,
  Speed,
  Security,
  CloudOff,
  Star,
  Search as SearchIcon,
  LocalLibrary,
} from '@mui/icons-material'
import googleBooksApi from '../services/googleBooksApi'
import BookCard from '../components/BookCard'
import localStorageService from '../services/localStorage'

const Home = () => {
  const [trendingBooks, setTrendingBooks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchTrendingBooks = async () => {
      try {
        const data = await googleBooksApi.getTrendingBooks()
        setTrendingBooks(data.items?.slice(0, 8) || [])
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchTrendingBooks()
  }, [])

  const handleAddToShelf = (book, shelf) => {
    localStorageService.addBookToShelf(book, shelf)
  }

  const features = [
    {
      icon: <Speed sx={{ fontSize: 40 }} />,
      title: 'Fast Search',
      description: 'Search millions of books instantly with Google Books API',
    },
    {
      icon: <Security sx={{ fontSize: 40 }} />,
      title: 'Secure & Private',
      description: 'All your data is stored locally in your browser',
    },
    {
      icon: <CloudOff sx={{ fontSize: 40 }} />,
      title: 'No Account Required',
      description: 'Start organizing your library without any registration',
    },
    {
      icon: <Star sx={{ fontSize: 40 }} />,
      title: 'Track Progress',
      description: 'Monitor your reading progress and set yearly goals',
    },
  ]

  return (
    <Container maxWidth="xl" sx={{ py: 6 }}>
      {/* Hero Section */}
      <Box sx={{ textAlign: 'center', mb: 8 }}>
        <Box
          sx={{
            fontSize: '6rem',
            mb: 2,
            animation: 'float 3s ease-in-out infinite',
            '@keyframes float': {
              '0%, 100%': { transform: 'translateY(0)' },
              '50%': { transform: 'translateY(-20px)' },
            },
          }}
        >
          📚
        </Box>

        <Typography
          variant="h2"
          gutterBottom
          sx={{
            fontWeight: 700,
            background: 'linear-gradient(45deg, #5c6bc0 30%, #ff4081 90%)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            mb: 2,
          }}
        >
          Welcome to BookShelf
        </Typography>

        <Typography variant="h5" color="text.secondary" sx={{ mb: 4, maxWidth: 800, mx: 'auto' }}>
          Your personal library manager. Search, organize, and track your reading journey
          with millions of books at your fingertips.
        </Typography>

        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Button
            component={Link}
            to="/search"
            variant="contained"
            size="large"
            endIcon={<SearchIcon />}
            sx={{ px: 4, py: 1.5 }}
          >
            Search Books
          </Button>
          <Button
            component={Link}
            to="/library"
            variant="outlined"
            size="large"
            endIcon={<LocalLibrary />}
            sx={{ px: 4, py: 1.5 }}
          >
            My Library
          </Button>
        </Box>
      </Box>

      {/* Features Section */}
      <Box sx={{ mb: 8 }}>
        <Typography variant="h4" align="center" gutterBottom fontWeight="bold" sx={{ mb: 4 }}>
          Why Choose BookShelf?
        </Typography>
        <Grid container spacing={3}>
          {features.map((feature, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card
                sx={{
                  height: '100%',
                  textAlign: 'center',
                  transition: 'transform 0.3s',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                  },
                }}
              >
                <CardContent>
                  <Box sx={{ color: 'primary.main', mb: 2 }}>{feature.icon}</Box>
                  <Typography variant="h6" gutterBottom fontWeight="bold">
                    {feature.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {feature.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Trending Books Section */}
      <Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h4" fontWeight="bold">
            Trending Books
          </Typography>
          <Button component={Link} to="/search" endIcon={<ArrowForward />}>
            View All
          </Button>
        </Box>

        {loading && (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
            <CircularProgress />
          </Box>
        )}

        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        <Grid container spacing={3}>
          {trendingBooks.map((book) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={book.id}>
              <BookCard book={book} onAddToShelf={handleAddToShelf} />
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* How It Works Section */}
      <Box sx={{ mt: 8, textAlign: 'center' }}>
        <Typography variant="h4" gutterBottom fontWeight="bold" sx={{ mb: 4 }}>
          How It Works
        </Typography>
        <Grid container spacing={4}>
          {[
            { step: '1', title: 'Search Books', desc: 'Find any book from millions available' },
            { step: '2', title: 'Add to Library', desc: 'Organize into Reading, Want to Read, or Read' },
            { step: '3', title: 'Track Progress', desc: 'Monitor your reading and set goals' },
          ].map((item) => (
            <Grid item xs={12} md={4} key={item.step}>
              <Box
                sx={{
                  width: 80,
                  height: 80,
                  borderRadius: '50%',
                  background: 'linear-gradient(45deg, #5c6bc0 30%, #ff4081 90%)',
                  color: 'white',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '2rem',
                  fontWeight: 'bold',
                  mx: 'auto',
                  mb: 2,
                }}
              >
                {item.step}
              </Box>
              <Typography variant="h6" gutterBottom fontWeight="bold">
                {item.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {item.desc}
              </Typography>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  )
}

export default Home