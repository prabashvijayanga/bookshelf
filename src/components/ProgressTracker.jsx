import { useState } from 'react'
import {
  Box,
  Typography,
  LinearProgress,
  TextField,
  Button,
  Paper,
} from '@mui/material'
import { TrendingUp } from '@mui/icons-material'

const ProgressTracker = ({ book, onUpdateProgress }) => {
  const [currentPage, setCurrentPage] = useState(
    Math.round(((book.progress || 0) * (book.volumeInfo?.pageCount || 0)) / 100)
  )

  const totalPages = book.volumeInfo?.pageCount || 0

  const handleUpdateProgress = () => {
    if (totalPages > 0) {
      const progress = Math.min(Math.round((currentPage / totalPages) * 100), 100)
      onUpdateProgress(book.id, progress)
    }
  }

  return (
    <Paper 
      elevation={0} 
      sx={{ 
        p: 4, 
        bgcolor: 'transparent',
        border: '1px solid rgba(255,255,255,0.1)',
        borderRadius: 2
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 3 }}>
        <TrendingUp sx={{ color: 'text.secondary' }} />
        <Typography variant="h6" fontWeight="600">Reading Progress</Typography>
      </Box>

      <Box sx={{ mb: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1.5 }}>
          <Typography variant="body2" color="text.secondary" sx={{ textTransform: 'uppercase', letterSpacing: 1, fontSize: '0.75rem' }}>
            Completion: {book.progress || 0}%
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ textTransform: 'uppercase', letterSpacing: 1, fontSize: '0.75rem' }}>
            {currentPage} / {totalPages} pages
          </Typography>
        </Box>
        <LinearProgress
          variant="determinate"
          value={book.progress || 0}
          sx={{ 
            height: 6, 
            borderRadius: 3,
            bgcolor: 'rgba(255,255,255,0.05)',
            '& .MuiLinearProgress-bar': {
              bgcolor: 'text.primary', // stark white bar for premium look
            }
          }}
        />
      </Box>

      <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
        <TextField
          type="number"
          placeholder="Current Page"
          value={currentPage}
          onChange={(e) => setCurrentPage(Math.max(0, Math.min(totalPages, parseInt(e.target.value) || 0)))}
          size="small"
          sx={{ 
            flex: 1,
            '& .MuiOutlinedInput-root': {
              bgcolor: 'rgba(0,0,0,0.2)',
              '& fieldset': { borderColor: 'rgba(255,255,255,0.1)' },
              '&:hover fieldset': { borderColor: 'rgba(255,255,255,0.2)' },
              '&.Mui-focused fieldset': { borderColor: 'text.primary' },
            }
          }}
          InputProps={{
            inputProps: { min: 0, max: totalPages },
          }}
        />
        <Button
          variant="contained"
          onClick={handleUpdateProgress}
          disabled={totalPages === 0}
          sx={{ 
            bgcolor: 'text.primary', 
            color: 'background.default',
            '&:hover': { bgcolor: 'rgba(255,255,255,0.8)' },
            '&.Mui-disabled': { bgcolor: 'rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.3)' }
          }}
        >
          Sync
        </Button>
      </Box>
    </Paper>
  )
}

export default ProgressTracker