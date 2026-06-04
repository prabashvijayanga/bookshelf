import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { Box } from '@mui/material'
import { useEffect } from 'react'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Search from './pages/Search'
import MyLibrary from './pages/MyLibrary'
import BookDetailsPage from './pages/BookDetailsPage'
import Statistics from './pages/Statistics'
import About from './pages/About'
import ReaderPage from './pages/ReaderPage'

function App() {
  const location = useLocation()

  // Ensure we're always on a hash route
  useEffect(() => {
    if (location.pathname === '/' && !location.hash) {
      window.location.hash = '#/'
    }
  }, [location])

  return (
    <Box sx={{ 
      minHeight: '100vh',
      bgcolor: 'background.default', // Pulls the solid dark zinc from theme
      display: 'flex',
      flexDirection: 'column'
    }}>
      <Navbar />
      
      {/* Centralized content wrapper for modern layout */}
      <Box 
        component="main" 
        sx={{ 
          flexGrow: 1, 
          width: '100%', 
          maxWidth: '1200px', 
          mx: 'auto', 
          p: { xs: 2, md: 4 } 
        }}
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/library" element={<MyLibrary />} />
          <Route path="/book/:id" element={<BookDetailsPage />} />
          <Route path="/statistics" element={<Statistics />} />
          <Route path="/about" element={<About />} />
          <Route path="/read/:id" element={<ReaderPage />} />

          {/* Catch-all route - redirect to home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Box>
    </Box>
  )
}

export default App