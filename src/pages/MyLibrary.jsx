import { useState, useEffect } from 'react'
import {
  Container,
  Typography,
  Box,
  Tabs,
  Tab,
  Grid,
  Button,
} from '@mui/material'
import { MenuBook, BookmarkAdd, CheckCircle, Add, AutoStoriesOutlined } from '@mui/icons-material'
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

  const tabs = [
    { label: 'Currently Reading', icon: <MenuBook />, key: 'reading' },
    { label: 'Want to Read', icon: <BookmarkAdd />, key: 'wantToRead' },
    { label: 'Completed', icon: <CheckCircle />, key: 'read' },
  ]

  const currentShelf = tabs[activeTab].key
  const currentBooks = library[currentShelf]

  return (
    <Container maxWidth="xl" sx={{ py: { xs: 6, md: 10 } }}>
      {/* Header */}
      <Box sx={{ mb: 6 }}>
        <Typography variant="h2" gutterBottom fontWeight="800">
          My Library
        </Typography>
        <Typography variant="h6" color="text.secondary" sx={{ fontWeight: 400 }}>
          Manage your personal reading collection.
        </Typography>
      </Box>

      {/* Tabs */}
      <Box sx={{ borderBottom: '1px solid rgba(255,255,255,0.05)', mb: 6 }}>
        <Tabs
          value={activeTab}
          onChange={(e, newValue) => setActiveTab(newValue)}
          variant="scrollable"
          scrollButtons="auto"
          sx={{
            '& .MuiTab-root': {
              textTransform: 'none',
              fontWeight: 500,
              fontSize: '1rem',
              color: 'text.secondary',
              minHeight: 64,
            },
            '& .Mui-selected': {
              color: 'text.primary !important',
            },
            '& .MuiTabs-indicator': {
              backgroundColor: 'text.primary',
              height: 2,
            }
          }}
        >
          {tabs.map((tab) => (
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
        <Box sx={{ 
          textAlign: 'center', 
          py: 12, 
          border: '1px dashed rgba(255,255,255,0.1)', 
          borderRadius: 2 
        }}>
          <AutoStoriesOutlined sx={{ fontSize: 64, color: 'rgba(255,255,255,0.2)', mb: 3 }} />
          <Typography variant="h6" gutterBottom fontWeight="600">
            This shelf is empty
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
            Search the index to start populating your collection.
          </Typography>
          <Button
            component={Link}
            to="/search"
            variant="outlined"
            startIcon={<Add />}
            sx={{ borderColor: 'rgba(255,255,255,0.2)', color: 'text.primary' }}
          >
            Add Titles
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