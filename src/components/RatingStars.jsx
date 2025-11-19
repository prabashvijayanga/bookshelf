import { Box, Rating, Typography } from '@mui/material'

const RatingStars = ({ value, onChange, readOnly = false, size = 'large' }) => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
      <Rating
        value={value}
        onChange={(event, newValue) => onChange && onChange(newValue)}
        readOnly={readOnly}
        size={size}
        precision={0.5}
      />
      {value > 0 && (
        <Typography variant="body2" color="text.secondary">
          {value.toFixed(1)} / 5
        </Typography>
      )}
    </Box>
  )
}

export default RatingStars