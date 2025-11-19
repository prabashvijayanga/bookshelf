import { useState, useEffect } from 'react'
import {
  Container,
  Typography,
  Box,
  Grid,
} from '@mui/material'
import {
  MenuBook,
  CheckCircle,
  BookmarkAdd,
  LibraryBooks,
} from '@mui/icons-material'
import StatCard from '../components/StatCard'
import ReadingGoal from '../components/ReadingGoal'
import localStorageService from '../services/localStorage'
import { calculateReadingStats } from '../utils/helpers'

const Statistics = () => {
  const [library, setLibrary] = useState({
    reading: [],
    wantToRead: [],
    read: [],
  })
  const [readingGoal, setReadingGoal] = useState({ target: 12, year: 2025 })

  useEffect(() => {
    loadData()
  }, [])

  const loadData = () => {
    const lib = localStorageService.getLibrary()
    const goal = localStorageService.getReadingGoal()
    setLibrary(lib)
    setReadingGoal(goal)
  }

  const handleUpdateGoal = (newTarget) => {
    localStorageService.saveReadingGoal(newTarget)
    loadData()
  }

  const stats = calculateReadingStats(library)

  return (
    <Container maxWidth="xl" sx={{ py: 6 }}>
      {/* Header */}
      <Box sx={{ mb: 6 }}>
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
          Reading Statistics
        </Typography>
        <Typography variant="h6" color="text.secondary">
          Track your reading progress and achievements
        </Typography>
      </Box>

      {/* Reading Goal */}
      <Box sx={{ mb: 4 }}>
        <ReadingGoal
          goal={readingGoal}
          booksRead={stats.booksRead}
          onUpdateGoal={handleUpdateGoal}
        />
      </Box>

      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            icon={<LibraryBooks sx={{ fontSize: 40 }} />}
            title="Total Books"
            value={stats.totalBooks}
            color="#5c6bc0"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            icon={<CheckCircle sx={{ fontSize: 40 }} />}
            title="Books Read (2025)"
            value={stats.booksRead}
            color="#4caf50"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            icon={<MenuBook sx={{ fontSize: 40 }} />}
            title="Currently Reading"
            value={stats.currentlyReading}
            color="#ff9800"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            icon={<BookmarkAdd sx={{ fontSize: 40 }} />}
            title="Want to Read"
            value={stats.wantToRead}
            color="#ff4081"
          />
        </Grid>
      </Grid>

      {/* Additional Stats */}
      <Box sx={{ textAlign: 'center', py: 8 }}>
        <Typography variant="h4" gutterBottom sx={{ fontSize: '4rem' }}>
          📊
        </Typography>
        <Typography variant="h5" gutterBottom fontWeight="bold">
          Keep Up the Great Work!
        </Typography>
        <Typography variant="body1" color="text.secondary">
          {stats.booksRead >= readingGoal.target
            ? "You've achieved your reading goal! Set a new challenge."
            : `Read ${readingGoal.target - stats.booksRead} more books to reach your goal.`}
        </Typography>
      </Box>
    </Container>
  )
}

export default Statistics