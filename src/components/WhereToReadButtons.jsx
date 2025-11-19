import { Box, Button, Chip, Stack, Typography, Paper } from '@mui/material'
import {
  ShoppingCart,
  MenuBook,
  LocalLibrary,
  Visibility,
  Public,
  AutoStories,
} from '@mui/icons-material'
import { getReadingLinks, hasPreview, isPublicDomain } from '../utils/helpers'

const WhereToReadButtons = ({ book }) => {
  const links = getReadingLinks(book)
  const hasPreviewAvailable = hasPreview(book.accessInfo)
  const isPublicDomainBook = isPublicDomain(book.accessInfo)

  if (Object.keys(links).length === 0) {
    return null
  }

  return (
    <Paper elevation={2} sx={{ p: 3, mt: 3 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
        <AutoStories color="primary" />
        <Typography variant="h6" fontWeight="bold">
          Where to Read
        </Typography>
      </Box>

      {isPublicDomainBook && (
        <Chip
          icon={<Public />}
          label="Public Domain - Free to Read"
          color="success"
          sx={{ mb: 2 }}
        />
      )}

      {hasPreviewAvailable && (
        <Chip
          icon={<Visibility />}
          label="Preview Available"
          color="info"
          sx={{ mb: 2, ml: isPublicDomainBook ? 1 : 0 }}
        />
      )}

      <Stack spacing={2}>
        {/* Google Books Preview/Web Reader */}
        {links.webReader && (
          <Button
            variant="contained"
            startIcon={<MenuBook />}
            href={links.webReader}
            target="_blank"
            rel="noopener noreferrer"
            fullWidth
            sx={{
              background: 'linear-gradient(45deg, #4285f4 30%, #34a853 90%)',
              '&:hover': {
                background: 'linear-gradient(45deg, #3367d6 30%, #2d8f47 90%)',
              },
            }}
          >
            {isPublicDomainBook ? 'Read Free on Google Books' : 'Read Preview on Google Books'}
          </Button>
        )}

        {links.googlePreview && !links.webReader && (
          <Button
            variant="outlined"
            startIcon={<Visibility />}
            href={links.googlePreview}
            target="_blank"
            rel="noopener noreferrer"
            fullWidth
            color="primary"
          >
            Preview on Google Books
          </Button>
        )}

        {/* Google Play Books */}
        {links.googlePlay && (
          <Button
            variant="outlined"
            startIcon={<ShoppingCart />}
            href={links.googlePlay}
            target="_blank"
            rel="noopener noreferrer"
            fullWidth
            color="primary"
          >
            Buy on Google Play Books
          </Button>
        )}

        {/* Amazon */}
        {links.amazon && (
          <Button
            variant="outlined"
            startIcon={<ShoppingCart />}
            href={links.amazon}
            target="_blank"
            rel="noopener noreferrer"
            fullWidth
            sx={{
              color: '#FF9900',
              borderColor: '#FF9900',
              '&:hover': {
                borderColor: '#FF9900',
                backgroundColor: 'rgba(255, 153, 0, 0.1)',
              },
            }}
          >
            View on Amazon
          </Button>
        )}

        {/* Project Gutenberg (Public Domain) */}
        {links.gutenberg && (
          <Button
            variant="contained"
            startIcon={<Public />}
            href={links.gutenberg}
            target="_blank"
            rel="noopener noreferrer"
            fullWidth
            color="success"
          >
            Read Free on Project Gutenberg
          </Button>
        )}

        {/* Library Link */}
        <Button
          variant="outlined"
          startIcon={<LocalLibrary />}
          href={`https://www.worldcat.org/search?q=${encodeURIComponent(book.volumeInfo?.title || '')}`}
          target="_blank"
          rel="noopener noreferrer"
          fullWidth
          sx={{
            color: '#7c3aed',
            borderColor: '#7c3aed',
            '&:hover': {
              borderColor: '#7c3aed',
              backgroundColor: 'rgba(124, 58, 237, 0.1)',
            },
          }}
        >
          Find at Your Local Library
        </Button>
      </Stack>

      <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 2 }}>
        Links open in a new tab. We are not affiliated with these services.
      </Typography>
    </Paper>
  )
}

export default WhereToReadButtons