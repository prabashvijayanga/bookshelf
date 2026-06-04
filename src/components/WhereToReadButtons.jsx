import { useState } from 'react' // 🆕 useState import කරන්න
import { Box, Button, Stack, Typography, Paper, Divider, CircularProgress } from '@mui/material'
import {
  ShoppingCartOutlined,
  MenuBookOutlined,
  ImportContactsOutlined,
  TravelExploreOutlined,
  VisibilityOutlined
} from '@mui/icons-material'
import { getReadingLinks, getGutendexEpubLink } from '../utils/helpers' // 🆕 Helper එක import කරන්න
import { useNavigate } from 'react-router-dom'

const WhereToReadButtons = ({ book }) => {
  const navigate = useNavigate()
  const links = getReadingLinks(book)
  const [isLoadingReader, setIsLoadingReader] = useState(false) // 🆕 Loading state එක

  if (Object.keys(links).length === 0) {
    return null
  }

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

  // 🆕 Button Click Handler එක
  const handleOpenInAppReader = async () => {
    setIsLoadingReader(true);
    try {
      const title = book.volumeInfo?.title;
      // 1. Gutendex එකෙන් සැබෑ ලින්ක් එක ගන්නවා
      const rawEpubUrl = await getGutendexEpubLink(title);
      
      if (rawEpubUrl) {
        // 2. ඒ ලින්ක් එක අපේ Vercel Proxy එක හරහා යන්න හදනවා (CORS බයිපාස් කරන්න)
        const proxiedUrl = `/api/proxy?url=${encodeURIComponent(rawEpubUrl)}`;
        
        // 3. Reader පිටුවට යවනවා
        navigate(`/read/${book.id}`, { 
          state: { 
            title: title,
            epubUrl: proxiedUrl 
          } 
        });
      } else {
        alert("Sorry, we couldn't find the EPUB file for this specific book on Project Gutenberg.");
      }
    } catch (error) {
      console.error(error);
      alert("Error loading the book.");
    } finally {
      setIsLoadingReader(false);
    }
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
        
        {/* 🌟 IN-APP READER (Dynamic) 🌟 */}
        {links.inAppEpub && (
          <>
            <Button
              variant="contained"
              disabled={isLoadingReader}
              startIcon={isLoadingReader ? <CircularProgress size={20} color="inherit" /> : <ImportContactsOutlined />}
              onClick={handleOpenInAppReader}
              fullWidth
              sx={{
                bgcolor: 'text.primary',
                color: 'background.default',
                borderColor: 'transparent',
                justifyContent: 'flex-start',
                px: 2,
                py: 1.5,
                mb: 1,
                '&:hover': {
                  bgcolor: 'rgba(255,255,255,0.8)',
                },
              }}
            >
              {isLoadingReader ? 'Finding Book...' : 'Read in BookShelf Reader'}
            </Button>
            <Divider sx={{ borderColor: 'rgba(255,255,255,0.05)', my: 1 }} />
          </>
        )}

        {/* Google Books Web Reader */}
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
            Read on Google Books
          </Button>
        )}

        {/* Google Books Preview */}
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
            Google Books Preview
          </Button>
        )}

        {/* Project Gutenberg Search */}
        {links.gutenbergSearch && (
          <Button
            variant="outlined"
            startIcon={<TravelExploreOutlined />}
            href={links.gutenbergSearch}
            target="_blank"
            rel="noopener noreferrer"
            fullWidth
            sx={actionBtnStyle}
          >
            Search on Project Gutenberg
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

        {/* Google Play Store */}
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

      </Stack>

      <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 3, lineHeight: 1.5 }}>
        External acquisition links open in a new tab. System is not affiliated with these providers.
      </Typography>
    </Paper>
  )
}

export default WhereToReadButtons