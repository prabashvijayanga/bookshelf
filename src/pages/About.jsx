import {
  Container,
  Typography,
  Box,
  Paper,
  Grid,
  Chip,
  Avatar,
  Button,
} from '@mui/material'
import { GitHub, Favorite } from '@mui/icons-material'

const About = () => {
  const techStack = {
    frontend: [
      'React 18',
      'Material UI',
      'React Router',
      'Axios',
      'LocalStorage API',
    ],
    api: ['Google Books API'],
  }

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      {/* Header */}
      <Box sx={{ textAlign: 'center', mb: 6 }}>
        <Typography
          variant="h3"
          gutterBottom
          fontWeight="bold"
          sx={{
            background: 'linear-gradient(45deg, #5c6bc0 30%, #ff4081 90%)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          About BookShelf
        </Typography>
        <Typography variant="h6" color="text.secondary">
          Your personal library manager powered by Google Books
        </Typography>
      </Box>

      {/* Description */}
      <Paper elevation={2} sx={{ p: 4, mb: 4 }}>
        <Typography variant="body1" paragraph>
          BookShelf is a modern, intuitive library management application that helps you organize,
          track, and discover books. Built with React and Material UI, it provides a seamless
          experience for managing your reading journey.
        </Typography>
        <Typography variant="body1" paragraph>
          Search from millions of books using the Google Books API, organize them into custom
          shelves, track your reading progress, set yearly goals, and write personal reviews.
        </Typography>
      </Paper>

      {/* Features */}
      <Paper elevation={2} sx={{ p: 4, mb: 4 }}>
        <Typography variant="h5" gutterBottom fontWeight="bold">
          Key Features
        </Typography>
        <Grid container spacing={2}>
          {[
            '📚 Search millions of books',
            '📖 Organize into custom shelves',
            '📊 Track reading progress',
            '⭐ Rate and review books',
            '🎯 Set yearly reading goals',
            '💾 All data stored locally',
            '🌙 Beautiful dark theme',
            '📱 Fully responsive design',
          ].map((feature, index) => (
            <Grid item xs={12} sm={6} key={index}>
              <Typography variant="body1">• {feature}</Typography>
            </Grid>
          ))}
        </Grid>
      </Paper>

      {/* Tech Stack */}
      <Paper elevation={2} sx={{ p: 4, mb: 4 }}>
        <Typography variant="h5" gutterBottom fontWeight="bold">
          Technology Stack
        </Typography>
        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" color="primary" gutterBottom>
            Frontend
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {techStack.frontend.map((tech) => (
              <Chip key={tech} label={tech} color="primary" variant="outlined" />
            ))}
          </Box>
        </Box>
        <Box>
          <Typography variant="h6" color="secondary" gutterBottom>
            API
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {techStack.api.map((tech) => (
              <Chip key={tech} label={tech} color="secondary" variant="outlined" />
            ))}
          </Box>
        </Box>
      </Paper>

      {/* Author */}
      <Paper elevation={2} sx={{ p: 4, textAlign: 'center' }}>
        <Avatar
          sx={{
            width: 100,
            height: 100,
            mx: 'auto',
            mb: 2,
            bgcolor: 'primary.main',
            fontSize: '3rem',
          }}
        >
          👨‍💻
        </Avatar>
        <Typography variant="h5" gutterBottom fontWeight="bold">
          Prabash Vijayanga
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          Full Stack Developer | React Enthusiast | Book Lover
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 1, mb: 2 }}>
          <Favorite color="error" />
          <Typography variant="body2" color="text.secondary">
            Built with love for book enthusiasts
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<GitHub />}
          href="https://github.com/prabashvijayanga"
          target="_blank"
          rel="noopener noreferrer"
        >
          View on GitHub
        </Button>
      </Paper>
    </Container>
  )
}

export default About