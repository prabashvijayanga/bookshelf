import { Card, CardContent, Typography, Box } from '@mui/material'

const StatCard = ({ icon, title, value }) => {
  return (
    <Card
      sx={{
        height: '100%',
        bgcolor: 'transparent',
        border: '1px solid rgba(255,255,255,0.05)',
        boxShadow: 'none',
        transition: 'border-color 0.2s',
        '&:hover': {
          borderColor: 'rgba(255,255,255,0.2)'
        }
      }}
    >
      <CardContent sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 3 }}>
          <Box sx={{ color: 'text.secondary', display: 'flex' }}>{icon}</Box>
          <Typography variant="body2" color="text.secondary" sx={{ textTransform: 'uppercase', letterSpacing: 1, fontWeight: 500 }}>
            {title}
          </Typography>
        </Box>
        <Typography variant="h3" fontWeight="800" sx={{ letterSpacing: '-0.02em', color: 'text.primary' }}>
          {value}
        </Typography>
      </CardContent>
    </Card>
  )
}

export default StatCard