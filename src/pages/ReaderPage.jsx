import { useState, useRef, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { Box, Button, Typography, CircularProgress, IconButton, Paper } from '@mui/material'
import { 
  ArrowBack, 
  LightMode, 
  DarkMode, 
  NavigateBefore, 
  NavigateNext 
} from '@mui/icons-material'
import { ReactReader } from 'react-reader'

const ReaderPage = () => {
  const navigate = useNavigate()
  const location = useLocation()
  
  // Public domain demo URL
  const epubUrl = location.state?.epubUrl || 'https://react-reader.metabits.no/files/alice.epub'
  const bookTitle = location.state?.title || 'Reading'

  const [locationInBook, setLocationInBook] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  
  // Theme and Rendition state
  const [theme, setTheme] = useState('dark')
  const renditionRef = useRef(null)

  // Dynamic theme definitions for the EPUB iframe
  const lightTheme = {
    body: { background: '#ffffff', color: '#18181b' },
    p: { color: '#18181b', fontSize: '1.1rem', lineHeight: '1.6' },
    h1: { color: '#09090b' },
    h2: { color: '#09090b' },
    a: { color: '#3b82f6' }
  }

  const darkTheme = {
    body: { background: '#09090b', color: '#fafafa' },
    p: { color: '#fafafa', fontSize: '1.1rem', lineHeight: '1.6' },
    h1: { color: '#ffffff' },
    h2: { color: '#ffffff' },
    a: { color: '#60a5fa' }
  }

  // Update the theme dynamically when the toggle is clicked
  useEffect(() => {
    if (renditionRef.current) {
      renditionRef.current.themes.select(theme)
    }
  }, [theme])

  const handleLocationChanged = (epubcifi) => {
    setLocationInBook(epubcifi)
  }

  // Custom navigation functions
  const handlePrev = () => renditionRef.current?.prev()
  const handleNext = () => renditionRef.current?.next()
  const toggleTheme = () => setTheme(prev => prev === 'dark' ? 'light' : 'dark')

  // UI Theme variables for the wrapper
  const isDark = theme === 'dark'
  const bgColor = isDark ? '#09090b' : '#ffffff'
  const textColor = isDark ? '#fafafa' : '#09090b'
  const borderColor = isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'
  const barBgColor = isDark ? 'rgba(9, 9, 11, 0.95)' : 'rgba(255, 255, 255, 0.95)'

  return (
    <Box 
      sx={{ 
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        bgcolor: bgColor,
        color: textColor,
        zIndex: 9999,
        display: 'flex',
        flexDirection: 'column',
        transition: 'background-color 0.3s, color 0.3s'
      }}
    >
      {/* Top Bar */}
      <Box 
        sx={{ 
          height: 60, 
          display: 'flex', 
          alignItems: 'center', 
          px: 3, 
          borderBottom: `1px solid ${borderColor}`,
          bgcolor: barBgColor,
          backdropFilter: 'blur(8px)',
          zIndex: 10
        }}
      >
        <Button 
          startIcon={<ArrowBack />} 
          onClick={() => navigate(-1)}
          sx={{ color: 'text.secondary', textTransform: 'none', '&:hover': { color: textColor, bgcolor: 'transparent' } }}
        >
          Exit Reader
        </Button>

        <Typography variant="body2" sx={{ ml: 'auto', mr: 2, color: 'text.secondary', fontWeight: 600 }}>
          {bookTitle}
        </Typography>

        {/* Theme Toggle Button */}
        <IconButton onClick={toggleTheme} sx={{ color: textColor }}>
          {isDark ? <LightMode fontSize="small" /> : <DarkMode fontSize="small" />}
        </IconButton>
      </Box>

      {/* Reader Container */}
      <Box sx={{ flexGrow: 1, position: 'relative' }}>
        {isLoading && (
          <Box sx={{ position: 'absolute', inset: 0, display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 5 }}>
            <CircularProgress size={30} sx={{ color: 'text.secondary' }} />
          </Box>
        )}
        
        <ReactReader
          url={epubUrl}
          location={locationInBook}
          locationChanged={handleLocationChanged}
          epubInitOptions={{ openAs: 'epub' }}
          epubOptions={{
            flow: 'paginated',
            manager: 'continuous'
          }}
          getRendition={(rendition) => {
            renditionRef.current = rendition
            
            // Register both themes into epub.js
            rendition.themes.register('dark', darkTheme)
            rendition.themes.register('light', lightTheme)
            rendition.themes.select(theme)
            
            setIsLoading(false)
          }}
        />
      </Box>

      {/* 🆕 NEW: Bottom Navigation Controller */}
      <Paper 
        elevation={0}
        sx={{ 
          height: 70, 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          gap: 4,
          borderTop: `1px solid ${borderColor}`,
          bgcolor: barBgColor,
          backdropFilter: 'blur(8px)',
          borderRadius: 0,
          zIndex: 10
        }}
      >
        <Button 
          variant="outlined"
          startIcon={<NavigateBefore />}
          onClick={handlePrev}
          sx={{ borderColor, color: textColor, '&:hover': { borderColor: textColor } }}
        >
          Previous Page
        </Button>
        <Button 
          variant="outlined"
          endIcon={<NavigateNext />}
          onClick={handleNext}
          sx={{ borderColor, color: textColor, '&:hover': { borderColor: textColor } }}
        >
          Next Page
        </Button>
      </Paper>
    </Box>
  )
}

export default ReaderPage