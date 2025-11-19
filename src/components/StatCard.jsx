import { Card, CardContent, Typography, Box } from '@mui/material'

const StatCard = ({ icon, title, value, color = 'primary.main' }) => {
  return (
    <Card
      sx={{
        height: '100%',
        background: `linear-gradient(135deg, ${color}22 0%, ${color}11 100%)`,
        border: `1px solid ${color}44`,
      }}
    >
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
          <Box sx={{ color }}>{icon}</Box>
          <Typography variant="h6" color="text.secondary">
            {title}
          </Typography>
        </Box>
        <Typography variant="h3" fontWeight="bold">
          {value}
        </Typography>
      </CardContent>
    </Card>
  )
}

export default StatCard