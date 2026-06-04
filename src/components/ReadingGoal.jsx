import { useState } from 'react'
import {
  Paper,
  Typography,
  Box,
  LinearProgress,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material'
import { TrackChanges, Edit } from '@mui/icons-material'

const ReadingGoal = ({ goal, booksRead, onUpdateGoal }) => {
  const [open, setOpen] = useState(false)
  const [newGoal, setNewGoal] = useState(goal.target)

  const progress = Math.min((booksRead / goal.target) * 100, 100)

  const handleSaveGoal = () => {
    onUpdateGoal(newGoal)
    setOpen(false)
  }

  return (
    <>
      <Paper 
        elevation={0} 
        sx={{ 
          p: 4, 
          bgcolor: 'transparent',
          border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: 2
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <TrackChanges sx={{ color: 'text.secondary' }} />
            <Typography variant="h6" fontWeight="600">
              {goal.year} Objective
            </Typography>
          </Box>
          <Button
            size="small"
            startIcon={<Edit fontSize="small" />}
            onClick={() => setOpen(true)}
            sx={{ color: 'text.secondary', '&:hover': { color: 'text.primary', bgcolor: 'transparent' } }}
          >
            Adjust
          </Button>
        </Box>

        <Typography variant="h3" fontWeight="800" sx={{ mb: 1, letterSpacing: '-0.02em' }}>
          {booksRead} <Typography component="span" variant="h5" color="text.secondary">/ {goal.target} Volumes</Typography>
        </Typography>

        <LinearProgress
          variant="determinate"
          value={progress}
          sx={{ 
            height: 6, 
            borderRadius: 3, 
            my: 3,
            bgcolor: 'rgba(255,255,255,0.05)',
            '& .MuiLinearProgress-bar': { bgcolor: 'text.primary' }
          }}
        />

        <Typography variant="body2" color="text.secondary" sx={{ textTransform: 'uppercase', letterSpacing: 1, fontSize: '0.75rem' }}>
          {progress >= 100
            ? 'Target acquired. Excellent work.'
            : `${Math.ceil(goal.target - booksRead)} volumes remaining to reach target.`}
        </Typography>
      </Paper>

      {/* Modernized Edit Goal Dialog */}
      <Dialog 
        open={open} 
        onClose={() => setOpen(false)}
        PaperProps={{
          sx: {
            bgcolor: '#09090b',
            border: '1px solid rgba(255,255,255,0.1)',
            backgroundImage: 'none',
            minWidth: '300px'
          }
        }}
      >
        <DialogTitle sx={{ fontWeight: 600, borderBottom: '1px solid rgba(255,255,255,0.05)', mb: 2 }}>
          Update Target
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Annual Volume Target"
            type="number"
            fullWidth
            value={newGoal}
            onChange={(e) => setNewGoal(Math.max(1, parseInt(e.target.value) || 1))}
            InputProps={{ inputProps: { min: 1 } }}
            sx={{ 
              mt: 1,
              '& .MuiOutlinedInput-root': {
                '& fieldset': { borderColor: 'rgba(255,255,255,0.1)' },
                '&:hover fieldset': { borderColor: 'rgba(255,255,255,0.2)' },
                '&.Mui-focused fieldset': { borderColor: 'text.primary' },
              }
            }}
          />
        </DialogContent>
        <DialogActions sx={{ p: 2, pt: 0 }}>
          <Button onClick={() => setOpen(false)} sx={{ color: 'text.secondary' }}>Cancel</Button>
          <Button onClick={handleSaveGoal} variant="contained" sx={{ bgcolor: 'text.primary', color: 'background.default', '&:hover': { bgcolor: 'rgba(255,255,255,0.8)' } }}>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default ReadingGoal