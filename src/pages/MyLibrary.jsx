import { useState, useEffect } from 'react'
import {
  Container,
  Typography,
  Box,
  Tabs,
  Tab,
  Grid,
  Alert,
  Button,
} from '@mui/material'
import { MenuBook, BookmarkAdd, CheckCircle, Add } from '@mui/icons-material'
import { Link } from 'react-router-dom'
import BookCard from '../components/BookCard'
import localStorageService from '../services/localStorage'

const MyLibrary = () => {
  const [activeTab, setActiveTab] = useState(0)
  const [library, setLibrary] = useState({
    reading: [],
    wantToRead: [],
    read: [],
  })

  useEffect(() => {
    loadLibrary()
  }, [])

  const loadLibrary = () => {
    const lib = localStorageService.getLibrary()
    setLibrary(lib)
  }

  const handleAddToShelf = (book, shelf) => {
    localStorageService.addBookToShelf(book, shelf)
    loadLibrary()
  }

  const handleRemoveBook = (bookId) => {
    localStorageService.removeBookFromLibrary(bookId)
    loadLibrary()
  }

  const tabs = [
    { label: 'Currently Reading', icon: <MenuBook />, key: 'reading' },
    { label: 'Want to Read', icon: <BookmarkAdd />, key: 'wantToRead' },
    { label: 'Read', icon: <CheckCircle />, key: 'read' },
  ]

  const currentShelf = tabs[activeTab].key
  const currentBooks = library[currentShelf]

  return (
    <Container maxWidth="xl" sx={{ py: 6 }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
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
          My Library
        </Typography>
        <Typography variant="h6" color="text.secondary">
          Organize and track your reading collection
        </Typography>
      </Box>

      {/* Tabs */}
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 4 }}>
        <Tabs
          value={activeTab}
          onChange={(e, newValue) => setActiveTab(newValue)}
          variant="scrollable"
          scrollButtons="auto"
        >
          {tabs.map((tab, index) => (
            <Tab
              key={tab.key}
              icon={tab.icon}
              label={`${tab.label} (${library[tab.key].length})`}
              iconPosition="start"
            />
          ))}
        </Tabs>
      </Box>

      {/* Books Grid */}
      {currentBooks.length === 0 ? (
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <Typography variant="h4" gutterBottom sx={{ fontSize: '4rem' }}>
            📚
          </Typography>
          <Typography variant="h6" gutterBottom>
            No books in this shelf yet
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
            Start building your library by searching for books
          </Typography>
          <Button
            component={Link}
            to="/search"
            variant="contained"
            startIcon={<Add />}
            size="large"
          >
            Add Books
          </Button>
        </Box>
      ) : (
        <Grid container spacing={3}>
          {currentBooks.map((book) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={book.id}>
              <BookCard
                book={book}
                onAddToShelf={handleAddToShelf}
                showShelf
                currentShelf={currentShelf}
              />
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  )
}

export default MyLibrary