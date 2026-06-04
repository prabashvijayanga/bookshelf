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
  InsightsOutlined,
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
  
  // Use current year dynamically
  const currentYear = new Date().getFullYear()
  const [readingGoal, setReadingGoal] = useState({ target: 12, year: currentYear })

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
    <Container maxWidth="xl" sx={{ py: { xs: 6, md: 10 } }}>
      {/* Header */}
      <Box sx={{ mb: 8 }}>
        <Typography variant="h2" gutterBottom fontWeight="800">
          Telemetry & Stats
        </Typography>
        <Typography variant="h6" color="text.secondary" sx={{ fontWeight: 400 }}>
          Monitor your reading trajectory.
        </Typography>
      </Box>

      {/* Reading Goal */}
      <Box sx={{ mb: 6 }}>
        <ReadingGoal
          goal={readingGoal}
          booksRead={stats.booksRead}
          onUpdateGoal={handleUpdateGoal}
        />
      </Box>

      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 8 }}>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            icon={<LibraryBooks sx={{ fontSize: 32 }} />}
            title="Total Volumes"
            value={stats.totalBooks}
            color="#ffffff"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            icon={<CheckCircle sx={{ fontSize: 32 }} />}
            title={`Completed (${currentYear})`}
            value={stats.booksRead}
            color="#ffffff"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            icon={<MenuBook sx={{ fontSize: 32 }} />}
            title="Active Reading"
            value={stats.currentlyReading}
            color="#ffffff"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            icon={<BookmarkAdd sx={{ fontSize: 32 }} />}
            title="Backlog"
            value={stats.wantToRead}
            color="#ffffff"
          />
        </Grid>
      </Grid>

      {/* Additional Stats */}
      <Box sx={{ 
        textAlign: 'center', 
        py: 8, 
        border: '1px solid rgba(255,255,255,0.05)', 
        borderRadius: 2 
      }}>
        <InsightsOutlined sx={{ fontSize: 48, color: 'rgba(255,255,255,0.2)', mb: 3 }} />
        <Typography variant="h5" gutterBottom fontWeight="600">
          Target Status
        </Typography>
        <Typography variant="body1" color="text.secondary">
          {stats.booksRead >= readingGoal.target
            ? "Annual objective completed. Consider expanding your target."
            : `Delta to annual goal: ${readingGoal.target - stats.booksRead} volumes.`}
        </Typography>
      </Box>
    </Container>
  )
}

export default Statistics