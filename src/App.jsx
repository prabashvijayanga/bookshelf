import { Routes, Route } from 'react-router-dom'
import { Box } from '@mui/material'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Search from './pages/Search'
import MyLibrary from './pages/MyLibrary'
import BookDetailsPage from './pages/BookDetailsPage'
import Statistics from './pages/Statistics'
import About from './pages/About'

function App() {
  return (
    <Box sx={{ 
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0a0e27 0%, #1a1f3a 50%, #0a0e27 100%)',
    }}>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/library" element={<MyLibrary />} />
        <Route path="/book/:id" element={<BookDetailsPage />} />
        <Route path="/statistics" element={<Statistics />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Box>
  )
}

export default App