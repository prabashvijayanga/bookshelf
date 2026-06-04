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
      icon: <Speed sx={{ fontSize: 32 }} />,
      title: 'Lightning Fast',
      description: 'Search millions of books instantly via Google Books API.',
    },
    {
      icon: <Security sx={{ fontSize: 32 }} />,
      title: 'Local Privacy',
      description: 'Zero tracking. All data is securely stored in your local environment.',
    },
    {
      icon: <CloudOff sx={{ fontSize: 32 }} />,
      title: 'Frictionless',
      description: 'No sign-ups, no passwords. Start organizing immediately.',
    },
    {
      icon: <Star sx={{ fontSize: 32 }} />,
      title: 'Goal Tracking',
      description: 'Monitor your reading volume and set ambitious yearly targets.',
    },
  ]

  return (
    <Container maxWidth="xl" sx={{ py: { xs: 6, md: 12 } }}>
      {/* Premium Typography Hero */}
      <Box sx={{ textAlign: 'center', mb: 12, maxWidth: '800px', mx: 'auto' }}>
        <Box 
          sx={{ 
            display: 'inline-block', 
            border: '1px solid rgba(255,255,255,0.1)', 
            borderRadius: '100px', 
            px: 2, 
            py: 0.5, 
            mb: 4 
          }}
        >
          <Typography variant="body2" color="text.secondary">
            v1.0 is now live
          </Typography>
        </Box>
        <Typography
          variant="h1"
          gutterBottom
          sx={{
            fontWeight: 800,
            color: 'text.primary',
            mb: 3,
            lineHeight: 1.1,
          }}
        >
          Your digital library, <br/>perfected.
        </Typography>

        <Typography variant="h6" color="text.secondary" sx={{ mb: 6, fontWeight: 400 }}>
          Search, organize, and track your reading journey with a lightning-fast, privacy-first interface.
        </Typography>

        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Button
            component={Link}
            to="/search"
            variant="contained"
            size="large"
            endIcon={<SearchIcon />}
            sx={{ px: 4, py: 1.5, fontSize: '1rem' }}
          >
            Search Books
          </Button>
          <Button
            component={Link}
            to="/library"
            variant="outlined"
            size="large"
            endIcon={<LocalLibrary />}
            sx={{ 
              px: 4, 
              py: 1.5, 
              fontSize: '1rem',
              borderColor: 'rgba(255,255,255,0.2)',
              color: 'text.primary',
              '&:hover': { borderColor: 'text.primary' }
            }}
          >
            My Library
          </Button>
        </Box>
      </Box>

      {/* Features Section - Minimal Cards */}
      <Box sx={{ mb: 12 }}>
        <Grid container spacing={3}>
          {features.map((feature, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card
                sx={{
                  height: '100%',
                  bgcolor: 'transparent',
                  border: 'none',
                  textAlign: 'left',
                }}
              >
                <CardContent sx={{ p: 0 }}>
                  <Box sx={{ color: 'text.primary', mb: 2 }}>{feature.icon}</Box>
                  <Typography variant="h6" gutterBottom fontWeight="600">
                    {feature.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6 }}>
                    {feature.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Trending Books */}
      <Box sx={{ mb: 12 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', mb: 4 }}>
          <Typography variant="h3" fontWeight="700">
            Trending now
          </Typography>
          <Button 
            component={Link} 
            to="/search" 
            endIcon={<ArrowForward />}
            sx={{ color: 'text.secondary', '&:hover': { color: 'text.primary', bgcolor: 'transparent' } }}
          >
            View all
          </Button>
        </Box>

        {loading && (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
            <CircularProgress size={30} sx={{ color: 'text.secondary' }} />
          </Box>
        )}

        {error && (
          <Alert severity="error" sx={{ mb: 3, bgcolor: 'transparent', border: '1px solid rgba(255,0,0,0.2)' }}>
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

      {/* How It Works - Clean Numbering */}
      <Box sx={{ pt: 6, borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <Grid container spacing={6}>
          {[
            { step: '01', title: 'Search', desc: 'Query millions of titles via API.' },
            { step: '02', title: 'Organize', desc: 'Categorize into custom reading states.' },
            { step: '03', title: 'Track', desc: 'Monitor progress and rate your reads.' },
          ].map((item) => (
            <Grid item xs={12} md={4} key={item.step}>
              <Typography variant="h3" color="text.secondary" sx={{ mb: 2, opacity: 0.3, fontWeight: 800 }}>
                {item.step}
              </Typography>
              <Typography variant="h6" gutterBottom fontWeight="600">
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