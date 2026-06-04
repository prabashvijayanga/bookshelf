import { Box, Button, Stack, Typography, Paper, Divider } from '@mui/material'
import {
  ShoppingCartOutlined,
  MenuBookOutlined,
  LocalLibraryOutlined,
  VisibilityOutlined,
  ImportContactsOutlined,
  TravelExploreOutlined,
} from '@mui/icons-material'
import { getReadingLinks } from '../utils/helpers'
import { useNavigate } from 'react-router-dom'

const WhereToReadButtons = ({ book }) => {
  const navigate = useNavigate()
  const links = getReadingLinks(book)

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
        
        {/* 🌟 IN-APP READER (Public Domain නම් විතරක් පෙන්නනවා) 🌟 */}
        {links.inAppEpub && (
          <>
            <Button
              variant="contained"
              startIcon={<ImportContactsOutlined />}
              onClick={() => {
                navigate(`/read/${book.id}`, { 
                  state: { 
                    title: book.volumeInfo?.title,
                    epubUrl: links.inAppEpub // කෙලින්ම වැඩ කරන EPUB ලින්ක් එක යවනවා
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
                mb: 1,
                '&:hover': {
                  bgcolor: 'rgba(255,255,255,0.8)',
                },
              }}
            >
              Read in BookShelf Reader
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