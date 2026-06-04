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
        sx={{
          color: 'text.primary', // Crisp white for active stars
          '& .MuiRating-iconEmpty': {
            color: 'rgba(255, 255, 255, 0.15)', // Muted outline for inactive stars
          },
        }}
      />
      {value > 0 && (
        <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
          {value.toFixed(1)} / 5
        </Typography>
      )}
    </Box>
  )
}

export default RatingStars