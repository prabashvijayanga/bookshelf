import {
  Container,
  Typography,
  Box,
  Grid,
  Chip,
  Avatar,
  Button,
} from '@mui/material'
import { GitHub } from '@mui/icons-material'

const About = () => {
  const techStack = {
    frontend: ['React 18', 'Material UI', 'React Router', 'Axios', 'LocalStorage API'],
    api: ['Google Books API'],
  }

  return (
    <Container maxWidth="md" sx={{ py: 8 }}>
      {/* Header */}
      <Box sx={{ mb: 8 }}>
        <Typography variant="h2" gutterBottom fontWeight="800">
          About BookShelf
        </Typography>
        <Typography variant="h6" color="text.secondary" sx={{ fontWeight: 400 }}>
          A modern library management architecture.
        </Typography>
      </Box>

      {/* Description */}
      <Box sx={{ mb: 8, borderLeft: '2px solid rgba(255,255,255,0.1)', pl: 3 }}>
        <Typography variant="body1" paragraph color="text.secondary" sx={{ fontSize: '1.1rem', lineHeight: 1.8 }}>
          BookShelf is a privacy-first application built to help you track, organize, and discover books without the noise of social networks. Leveraging the Google Books API, it provides a seamless and persistent local experience for managing your reading journey.
        </Typography>
      </Box>

      {/* Tech Stack */}
      <Box sx={{ mb: 8 }}>
        <Typography variant="h6" gutterBottom fontWeight="600" sx={{ mb: 3 }}>
          System Architecture
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Typography variant="body2" color="text.secondary" gutterBottom sx={{ textTransform: 'uppercase', letterSpacing: 1 }}>
              Client Layer
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {techStack.frontend.map((tech) => (
                <Chip 
                  key={tech} 
                  label={tech} 
                  variant="outlined" 
                  size="small"
                  sx={{ borderColor: 'rgba(255,255,255,0.1)', color: 'text.secondary' }} 
                />
              ))}
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="body2" color="text.secondary" gutterBottom sx={{ textTransform: 'uppercase', letterSpacing: 1 }}>
              Data Layer
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {techStack.api.map((tech) => (
                <Chip 
                  key={tech} 
                  label={tech} 
                  variant="outlined" 
                  size="small"
                  sx={{ borderColor: 'rgba(255,255,255,0.1)', color: 'text.secondary' }} 
                />
              ))}
            </Box>
          </Grid>
        </Grid>
      </Box>

      {/* Author */}
      <Box sx={{ p: 4, border: '1px solid rgba(255,255,255,0.1)', borderRadius: 2, display: 'flex', alignItems: 'center', gap: 3, flexWrap: 'wrap' }}>
        <Avatar
          sx={{
            width: 72,
            height: 72,
            bgcolor: '#ffffff',
            color: '#000000',
            fontWeight: 'bold',
            fontSize: '1.5rem'
          }}
        >
          PV
        </Avatar>
        <Box sx={{ flexGrow: 1 }}>
          <Typography variant="h6" fontWeight="bold">
            Prabash Vijayanga
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Full Stack Developer
          </Typography>
        </Box>
        <Button
          variant="outlined"
          startIcon={<GitHub />}
          href="https://github.com/prabashvijayanga"
          target="_blank"
          rel="noopener noreferrer"
          sx={{ borderColor: 'rgba(255,255,255,0.2)', color: 'text.primary' }}
        >
          GitHub Profile
        </Button>
      </Box>
    </Container>
  )
}

export default About