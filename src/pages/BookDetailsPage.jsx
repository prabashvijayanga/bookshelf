import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import {
  Container,
  Box,
  Typography,
  Grid,
  Paper,
  Chip,
  Button,
  CircularProgress,
  Alert,
  Divider,
  TextField,
} from '@mui/material'
import {
  ArrowBack,
  MenuBook,
  BookmarkAdd,
  CheckCircle,
  Person,
  CalendarToday,
  Description,
} from '@mui/icons-material'
import googleBooksApi from '../services/googleBooksApi'
import localStorageService from '../services/localStorage'
import { formatAuthors, getThumbnail, formatPublishedDate } from '../utils/helpers'
import RatingStars from '../components/RatingStars'
import ProgressTracker from '../components/ProgressTracker'
import WhereToReadButtons from '../components/WhereToReadButtons'

const BookDetailsPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [book, setBook] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [libraryBook, setLibraryBook] = useState(null)
  const [userRating, setUserRating] = useState(0)
  const [userReview, setUserReview] = useState('')

  useEffect(() => {
    loadBookDetails()
  }, [id])

  const loadBookDetails = async () => {
    try {
      const data = await googleBooksApi.getBookById(id)
      setBook(data)

      // Check if book is in library
      const libBook = localStorageService.getBookFromLibrary(id)
      setLibraryBook(libBook)

      // Load review
      const review = localStorageService.getReview(id)
      if (review) {
        setUserRating(review.rating || 0)
        setUserReview(review.text || '')
      }
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleAddToShelf = (shelf) => {
    localStorageService.addBookToShelf(book, shelf)
    loadBookDetails()
  }

  const handleSaveReview = () => {
    localStorageService.saveReview(id, {
      rating: userRating,
      text: userReview,
    })
    alert('Review saved!')
  }

  const handleUpdateProgress = (bookId, progress) => {
    localStorageService.updateBookProgress(bookId, progress)
    loadBookDetails()
  }

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
        <CircularProgress />
      </Box>
    )
  }

  if (error || !book) {
    return (
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Alert severity="error">{error || 'Book not found'}</Alert>
        <Button startIcon={<ArrowBack />} onClick={() => navigate(-1)} sx={{ mt: 2 }}>
          Go Back
        </Button>
      </Container>
    )
  }

  const volumeInfo = book.volumeInfo || {}

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Button startIcon={<ArrowBack />} onClick={() => navigate(-1)} sx={{ mb: 3 }}>
        Back
      </Button>

      <Grid container spacing={4}>
        {/* Book Cover */}
        <Grid item xs={12} md={4}>
          <Paper elevation={3}>
            <Box
              component="img"
              src={getThumbnail(volumeInfo.imageLinks)}
              alt={volumeInfo.title}
              sx={{ width: '100%', display: 'block' }}
            />
          </Paper>

          {/* Action Buttons */}
          <Box sx={{ mt: 2, display: 'flex', flexDirection: 'column', gap: 1 }}>
            <Button
              fullWidth
              variant={libraryBook?.shelf === 'wantToRead' ? 'contained' : 'outlined'}
              startIcon={<BookmarkAdd />}
              onClick={() => handleAddToShelf('wantToRead')}
            >
              Want to Read
            </Button>
            <Button
              fullWidth
              variant={libraryBook?.shelf === 'reading' ? 'contained' : 'outlined'}
              startIcon={<MenuBook />}
              onClick={() => handleAddToShelf('reading')}
            >
              Currently Reading
            </Button>
            <Button
              fullWidth
              variant={libraryBook?.shelf === 'read' ? 'contained' : 'outlined'}
              startIcon={<CheckCircle />}
              onClick={() => handleAddToShelf('read')}
            >
              Mark as Read
            </Button>
          </Box>

          {/* 🆕 NEW: Where to Read Buttons */}
          <WhereToReadButtons book={book} />
        </Grid>

        {/* Book Details */}
        <Grid item xs={12} md={8}>
          <Typography variant="h3" gutterBottom fontWeight="bold">
            {volumeInfo.title}
          </Typography>

          {volumeInfo.subtitle && (
            <Typography variant="h5" color="text.secondary" gutterBottom>
              {volumeInfo.subtitle}
            </Typography>
          )}

          {/* Authors */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
            <Person color="primary" />
            <Typography variant="h6">
              {formatAuthors(volumeInfo.authors)}
            </Typography>
          </Box>

          {/* Published Date */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
            <CalendarToday color="primary" />
            <Typography variant="body1">
              Published: {formatPublishedDate(volumeInfo.publishedDate)}
            </Typography>
          </Box>

          {/* Pages */}
          {volumeInfo.pageCount && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
              <Description color="primary" />
              <Typography variant="body1">{volumeInfo.pageCount} pages</Typography>
            </Box>
          )}

          {/* Rating */}
          {volumeInfo.averageRating && (
            <Box sx={{ mb: 2 }}>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Average Rating:
              </Typography>
              <RatingStars value={volumeInfo.averageRating} readOnly />
            </Box>
          )}

          {/* Categories */}
          {volumeInfo.categories && (
            <Box sx={{ mb: 3 }}>
              {volumeInfo.categories.map((category, index) => (
                <Chip key={index} label={category} sx={{ mr: 1, mb: 1 }} />
              ))}
            </Box>
          )}

          <Divider sx={{ my: 3 }} />

          {/* Description */}
          <Typography variant="h6" gutterBottom fontWeight="bold">
            Description
          </Typography>
          <Typography
            variant="body1"
            paragraph
            dangerouslySetInnerHTML={{
              __html: volumeInfo.description || 'No description available.',
            }}
          />

          {/* Progress Tracker */}
          {libraryBook?.shelf === 'reading' && (
            <Box sx={{ mt: 4 }}>
              <ProgressTracker book={libraryBook} onUpdateProgress={handleUpdateProgress} />
            </Box>
          )}

          {/* User Review */}
          <Box sx={{ mt: 4 }}>
            <Typography variant="h6" gutterBottom fontWeight="bold">
              Your Review
            </Typography>
            <Box sx={{ mb: 2 }}>
              <Typography variant="body2" gutterBottom>
                Your Rating:
              </Typography>
              <RatingStars value={userRating} onChange={setUserRating} />
            </Box>
            <TextField
              fullWidth
              multiline
              rows={4}
              label="Write your review"
              value={userReview}
              onChange={(e) => setUserReview(e.target.value)}
              sx={{ mb: 2 }}
            />
            <Button variant="contained" onClick={handleSaveReview}>
              Save Review
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Container>
  )
}

export default BookDetailsPage