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
    <Paper elevation={2} sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
        <TrendingUp color="primary" />
        <Typography variant="h6">Reading Progress</Typography>
      </Box>

      <Box sx={{ mb: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
          <Typography variant="body2" color="text.secondary">
            Progress: {book.progress || 0}%
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {currentPage} / {totalPages} pages
          </Typography>
        </Box>
        <LinearProgress
          variant="determinate"
          value={book.progress || 0}
          sx={{ height: 10, borderRadius: 5 }}
        />
      </Box>

      <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
        <TextField
          type="number"
          label="Current Page"
          value={currentPage}
          onChange={(e) => setCurrentPage(Math.max(0, Math.min(totalPages, parseInt(e.target.value) || 0)))}
          size="small"
          sx={{ flex: 1 }}
          InputProps={{
            inputProps: { min: 0, max: totalPages },
          }}
        />
        <Button
          variant="contained"
          onClick={handleUpdateProgress}
          disabled={totalPages === 0}
        >
          Update
        </Button>
      </Box>
    </Paper>
  )
}

export default ProgressTracker