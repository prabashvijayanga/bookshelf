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
import { EmojiEvents, Edit } from '@mui/icons-material'

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
      <Paper elevation={2} sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <EmojiEvents color="primary" />
            <Typography variant="h6">
              {goal.year} Reading Goal
            </Typography>
          </Box>
          <Button
            size="small"
            startIcon={<Edit />}
            onClick={() => setOpen(true)}
          >
            Edit
          </Button>
        </Box>

        <Typography variant="h4" fontWeight="bold" sx={{ mb: 1 }}>
          {booksRead} / {goal.target} Books
        </Typography>

        <LinearProgress
          variant="determinate"
          value={progress}
          sx={{ height: 10, borderRadius: 5, mb: 2 }}
        />

        <Typography variant="body2" color="text.secondary">
          {progress >= 100
            ? '🎉 Goal achieved! Keep reading!'
            : `${Math.ceil(goal.target - booksRead)} more to reach your goal`}
        </Typography>
      </Paper>

      {/* Edit Goal Dialog */}
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Set Reading Goal</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Books to read in 2025"
            type="number"
            fullWidth
            value={newGoal}
            onChange={(e) => setNewGoal(Math.max(1, parseInt(e.target.value) || 1))}
            InputProps={{ inputProps: { min: 1 } }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={handleSaveGoal} variant="contained">
            Save Goal
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default ReadingGoal