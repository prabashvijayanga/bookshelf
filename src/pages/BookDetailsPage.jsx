import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import {
  Container,
  Box,
  Typography,
  Grid,
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
      const libBook = localStorageService.getBookFromLibrary(id)
      setLibraryBook(libBook)
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
    localStorageService.saveReview(id, { rating: userRating, text: userReview })
  }

  const handleUpdateProgress = (bookId, progress) => {
    localStorageService.updateBookProgress(bookId, progress)
    loadBookDetails()
  }

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
        <CircularProgress size={30} sx={{ color: 'text.secondary' }} />
      </Box>
    )
  }

  if (error || !book) {
    return (
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Alert severity="error" sx={{ bgcolor: 'transparent', border: '1px solid rgba(255,0,0,0.2)' }}>
          {error || 'System error: Book data could not be retrieved.'}
        </Alert>
        <Button startIcon={<ArrowBack />} onClick={() => navigate(-1)} sx={{ mt: 2, color: 'text.secondary' }}>
          Return
        </Button>
      </Container>
    )
  }

  const volumeInfo = book.volumeInfo || {}

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Button 
        startIcon={<ArrowBack />} 
        onClick={() => navigate(-1)} 
        sx={{ mb: 4, color: 'text.secondary', textTransform: 'none' }}
      >
        Back to previous
      </Button>

      <Grid container spacing={6}>
        {/* Left Column: Cover & Actions */}
        <Grid item xs={12} md={3}>
          <Box
            component="img"
            src={getThumbnail(volumeInfo.imageLinks)?.replace('http:', 'https:')}
            alt={volumeInfo.title}
            sx={{ 
              width: '100%', 
              display: 'block', 
              borderRadius: 2,
              border: '1px solid rgba(255,255,255,0.1)',
              mb: 3
            }}
          />

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
            <Button
              fullWidth
              variant={libraryBook?.shelf === 'wantToRead' ? 'contained' : 'outlined'}
              startIcon={<BookmarkAdd />}
              onClick={() => handleAddToShelf('wantToRead')}
              sx={{ borderColor: 'rgba(255,255,255,0.2)' }}
            >
              Want to Read
            </Button>
            <Button
              fullWidth
              variant={libraryBook?.shelf === 'reading' ? 'contained' : 'outlined'}
              startIcon={<MenuBook />}
              onClick={() => handleAddToShelf('reading')}
              sx={{ borderColor: 'rgba(255,255,255,0.2)' }}
            >
              Reading
            </Button>
            <Button
              fullWidth
              variant={libraryBook?.shelf === 'read' ? 'contained' : 'outlined'}
              startIcon={<CheckCircle />}
              onClick={() => handleAddToShelf('read')}
              sx={{ borderColor: 'rgba(255,255,255,0.2)' }}
            >
              Completed
            </Button>
          </Box>
          <Box sx={{ mt: 3 }}>
            <WhereToReadButtons book={book} />
          </Box>
        </Grid>

        {/* Right Column: Details */}
        <Grid item xs={12} md={9}>
          <Typography variant="h2" gutterBottom fontWeight="700">
            {volumeInfo.title}
          </Typography>

          {volumeInfo.subtitle && (
            <Typography variant="h5" color="text.secondary" gutterBottom sx={{ fontWeight: 400 }}>
              {volumeInfo.subtitle}
            </Typography>
          )}

          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3, mb: 4, mt: 2 }}>
            <Box>
              <Typography variant="body2" color="text.secondary" sx={{ textTransform: 'uppercase', letterSpacing: 1, fontSize: '0.75rem' }}>Author</Typography>
              <Typography variant="body1" fontWeight="500">{formatAuthors(volumeInfo.authors)}</Typography>
            </Box>
            <Box>
              <Typography variant="body2" color="text.secondary" sx={{ textTransform: 'uppercase', letterSpacing: 1, fontSize: '0.75rem' }}>Published</Typography>
              <Typography variant="body1" fontWeight="500">{formatPublishedDate(volumeInfo.publishedDate)}</Typography>
            </Box>
            {volumeInfo.pageCount && (
              <Box>
                <Typography variant="body2" color="text.secondary" sx={{ textTransform: 'uppercase', letterSpacing: 1, fontSize: '0.75rem' }}>Length</Typography>
                <Typography variant="body1" fontWeight="500">{volumeInfo.pageCount} pages</Typography>
              </Box>
            )}
          </Box>

          {volumeInfo.categories && (
            <Box sx={{ mb: 4, display: 'flex', gap: 1, flexWrap: 'wrap' }}>
              {volumeInfo.categories.map((category, index) => (
                <Chip 
                  key={index} 
                  label={category} 
                  size="small" 
                  sx={{ bgcolor: 'rgba(255,255,255,0.05)', color: 'text.secondary', borderRadius: 1 }} 
                />
              ))}
            </Box>
          )}

          <Divider sx={{ my: 4, borderColor: 'rgba(255,255,255,0.05)' }} />

          <Typography variant="h6" gutterBottom fontWeight="600">
            Synopsis
          </Typography>
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ lineHeight: 1.8 }}
            dangerouslySetInnerHTML={{
              __html: volumeInfo.description || 'No summary available for this title.',
            }}
          />

          {libraryBook?.shelf === 'reading' && (
            <Box sx={{ mt: 6 }}>
              <ProgressTracker book={libraryBook} onUpdateProgress={handleUpdateProgress} />
            </Box>
          )}

          <Box sx={{ mt: 6, p: 4, border: '1px solid rgba(255,255,255,0.1)', borderRadius: 2 }}>
            <Typography variant="h6" gutterBottom fontWeight="600">
              Personal Review
            </Typography>
            <Box sx={{ mb: 3 }}>
              <RatingStars value={userRating} onChange={setUserRating} />
            </Box>
            <TextField
              fullWidth
              multiline
              rows={4}
              placeholder="Record your thoughts..."
              value={userReview}
              onChange={(e) => setUserReview(e.target.value)}
              sx={{ 
                mb: 3,
                '& .MuiOutlinedInput-root': {
                  bgcolor: 'rgba(0,0,0,0.2)',
                  '& fieldset': { borderColor: 'rgba(255,255,255,0.1)' },
                  '&:hover fieldset': { borderColor: 'rgba(255,255,255,0.2)' },
                  '&.Mui-focused fieldset': { borderColor: 'text.primary' },
                }
              }}
            />
            <Button variant="contained" onClick={handleSaveReview}>
              Save Note
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Container>
  )
}

export default BookDetailsPage