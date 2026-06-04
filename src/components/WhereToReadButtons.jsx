import { Box, Button, Stack, Typography, Paper } from '@mui/material'
import {
  ShoppingCartOutlined,
  MenuBookOutlined,
  LocalLibraryOutlined,
  VisibilityOutlined,
  PublicOutlined,
  ImportContactsOutlined,
} from '@mui/icons-material'
import { getReadingLinks } from '../utils/helpers'
import { useNavigate } from 'react-router-dom'

const WhereToReadButtons = ({ book }) => {
  const navigate = useNavigate()
  
  const links = getReadingLinks(book)

  if (Object.keys(links).length === 0) {
    return null
  }

  // Unified button style to kill the rainbow "AI" look
  const actionBtnStyle = {
    color: 'text.primary',
    borderColor: 'rgba(255,255,255,0.1)',
    justifyContent: 'flex-start',
    px: 2,
    py: 1.5,
    '&:hover': {
      borderColor: 'text.primary',
      backgroundColor: 'rgba(255,255,255,0.05)',
    },
  }

  return (
    <Paper 
      elevation={0} 
      sx={{ 
        p: 3, 
        mt: 3, 
        bgcolor: 'transparent',
        border: '1px solid rgba(255,255,255,0.1)',
        borderRadius: 2
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 3 }}>
        <ImportContactsOutlined sx={{ color: 'text.secondary' }} />
        <Typography variant="h6" fontWeight="600">
          Acquisition Links
        </Typography>
      </Box>

      <Stack spacing={1.5}>
        {/* Google Books Preview/Web Reader */}
        {links.webReader && (
          <Button
            variant="outlined"
            startIcon={<MenuBookOutlined />}
            href={links.webReader}
            target="_blank"
            rel="noopener noreferrer"
            fullWidth
            sx={actionBtnStyle}
          >
            Google Books Reader
          </Button>
        )}

        {links.googlePreview && !links.webReader && (
          <Button
            variant="outlined"
            startIcon={<VisibilityOutlined />}
            href={links.googlePreview}
            target="_blank"
            rel="noopener noreferrer"
            fullWidth
            sx={actionBtnStyle}
          >
            Preview Excerpt
          </Button>
        )}

        {/* Google Play Books */}
        {links.googlePlay && (
          <Button
            variant="outlined"
            startIcon={<ShoppingCartOutlined />}
            href={links.googlePlay}
            target="_blank"
            rel="noopener noreferrer"
            fullWidth
            sx={actionBtnStyle}
          >
            Google Play Store
          </Button>
        )}

        {/* Amazon */}
        {links.amazon && (
          <Button
            variant="outlined"
            startIcon={<ShoppingCartOutlined />}
            href={links.amazon}
            target="_blank"
            rel="noopener noreferrer"
            fullWidth
            sx={actionBtnStyle}
          >
            Amazon Listing
          </Button>
        )}

        {/* Project Gutenberg / Public Domain - IN APP READER */}
        {links.gutenberg && (
          <Button
            variant="contained"
            startIcon={<ImportContactsOutlined />}
            onClick={() => {
              // Get the real EPUB link from Google Books API
              const realEpubLink = book.accessInfo?.epub?.downloadLink;
              
              // කෙටි ලින්ක් එක පාවිච්චි කරන්න, මොකද දැන් සේරම එකම තැන නිසා
              const proxiedLink = realEpubLink 
                ? `/api/proxy?url=${encodeURIComponent(realEpubLink)}` 
                : null;
              
              navigate(`/read/${book.id}`, { 
                state: { 
                  title: book.volumeInfo?.title,
                  epubUrl: proxiedLink 
                } 
              })
            }}
            fullWidth
            sx={{
              bgcolor: 'text.primary',
              color: 'background.default',
              borderColor: 'transparent',
              justifyContent: 'flex-start',
              px: 2,
              py: 1.5,
              '&:hover': {
                bgcolor: 'rgba(255,255,255,0.8)',
              },
            }}
          >
            Read Now in BookShelf
          </Button>
        )}

        {/* Library Link */}
        {links.worldcat && (
          <Button
            variant="outlined"
            startIcon={<LocalLibraryOutlined />}
            href={`https://www.worldcat.org/search?q=${encodeURIComponent(book.volumeInfo?.title || '')}`}
            target="_blank"
            rel="noopener noreferrer"
            fullWidth
            sx={actionBtnStyle}
          >
            Local Library Search
          </Button>
        )}
      </Stack>

      <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 3, lineHeight: 1.5 }}>
        External acquisition links open in a new tab. System is not affiliated with these providers.
      </Typography>
    </Paper>
  )
}

export default WhereToReadButtons