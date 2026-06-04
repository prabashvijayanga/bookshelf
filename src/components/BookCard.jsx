import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Button,
  Box,
  Chip,
  IconButton,
  Menu,
  MenuItem,
  Rating,
} from '@mui/material'
import {
  MoreVert,
  MenuBook,
  BookmarkAdd,
  CheckCircle,
  ArrowOutward,
} from '@mui/icons-material'
import { getThumbnail, formatAuthors, truncateText } from '../utils/helpers'
import PreviewBadge from './PreviewBadge'

const BookCard = ({ book, onAddToShelf, showShelf = false, currentShelf }) => {
  const [anchorEl, setAnchorEl] = useState(null)
  const navigate = useNavigate()

  const handleMenuOpen = (event) => {
    event.stopPropagation()
    setAnchorEl(event.currentTarget)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
  }

  const handleAddToShelf = (shelf) => {
    onAddToShelf(book, shelf)
    handleMenuClose()
  }

  const handleViewDetails = () => {
    navigate(`/book/${book.id}`)
  }

  const volumeInfo = book.volumeInfo || {}
  const thumbnail = getThumbnail(volumeInfo.imageLinks)?.replace('http:', 'https:')
  const authors = formatAuthors(volumeInfo.authors)
  const title = volumeInfo.title || 'Untitled'
  const description = truncateText(volumeInfo.description, 100)
  const pageCount = volumeInfo.pageCount
  const averageRating = volumeInfo.averageRating || 0

  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        bgcolor: 'transparent',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        borderRadius: 2,
        transition: 'all 0.2s ease-in-out',
        cursor: 'pointer',
        boxShadow: 'none',
        '&:hover': {
          borderColor: 'rgba(255, 255, 255, 0.2)',
          bgcolor: 'rgba(255, 255, 255, 0.02)',
        },
      }}
      onClick={handleViewDetails}
    >
      <Box sx={{ position: 'relative', overflow: 'hidden' }}>
        <CardMedia
          component="img"
          height="260"
          image={thumbnail}
          alt={title}
          sx={{ 
            objectFit: 'cover',
            borderBottom: '1px solid rgba(255, 255, 255, 0.05)'
          }}
        />
        {showShelf && currentShelf && (
          <Chip
            label={currentShelf === 'wantToRead' ? 'Want to Read' : currentShelf === 'reading' ? 'Reading' : 'Completed'}
            size="small"
            variant="outlined"
            sx={{ 
              position: 'absolute', 
              top: 12, 
              left: 12,
              bgcolor: 'rgba(0, 0, 0, 0.7)',
              backdropFilter: 'blur(4px)',
              borderColor: 'rgba(255,255,255,0.2)',
              color: 'text.primary',
              fontWeight: 500,
              fontSize: '0.7rem',
              textTransform: 'uppercase',
              letterSpacing: 0.5
            }}
          />
        )}
        <PreviewBadge 
          book={book} 
          sx={{ position: 'absolute', top: 12, right: showShelf ? 12 : 48 }}
        />
        <IconButton
          onClick={handleMenuOpen}
          size="small"
          sx={{
            position: 'absolute',
            top: 8,
            right: 8,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            backdropFilter: 'blur(4px)',
            color: 'white',
            '&:hover': {
              backgroundColor: 'rgba(0, 0, 0, 0.8)',
            },
          }}
        >
          <MoreVert fontSize="small" />
        </IconButton>
      </Box>

      <CardContent sx={{ flexGrow: 1, p: 2.5 }}>
        <Typography gutterBottom variant="h6" component="div" noWrap sx={{ fontWeight: 600, fontSize: '1.1rem' }}>
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom sx={{ mb: 1.5 }}>
          {authors}
        </Typography>
        
        {averageRating > 0 && (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
            <Rating 
              value={averageRating} 
              precision={0.5} 
              size="small" 
              readOnly 
              sx={{ '& .MuiRating-iconEmpty': { color: 'rgba(255,255,255,0.2)' } }}
            />
            <Typography variant="caption" color="text.secondary">
              {averageRating}
            </Typography>
          </Box>
        )}
        
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2, lineHeight: 1.6, fontSize: '0.85rem' }}>
          {description}
        </Typography>
        
        {pageCount && (
          <Typography variant="caption" color="text.secondary" sx={{ textTransform: 'uppercase', letterSpacing: 0.5 }}>
            {pageCount} pages
          </Typography>
        )}
      </CardContent>

      <CardActions sx={{ p: 2.5, pt: 0 }}>
        <Button
          size="small"
          endIcon={<ArrowOutward fontSize="small" />}
          onClick={handleViewDetails}
          fullWidth
          sx={{ 
            color: 'text.primary', 
            justifyContent: 'space-between',
            borderTop: '1px solid rgba(255,255,255,0.05)',
            pt: 2,
            borderRadius: 0,
            '&:hover': { bgcolor: 'transparent', color: 'text.secondary' }
          }}
        >
          View Record
        </Button>
      </CardActions>

      {/* Modern Context Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        onClick={(e) => e.stopPropagation()}
        PaperProps={{
          sx: {
            bgcolor: '#09090b',
            border: '1px solid rgba(255,255,255,0.1)',
            boxShadow: '0 4px 20px rgba(0,0,0,0.5)',
            backgroundImage: 'none',
          }
        }}
      >
        <MenuItem onClick={() => handleAddToShelf('wantToRead')} sx={{ fontSize: '0.9rem' }}>
          <BookmarkAdd sx={{ mr: 1.5, color: 'text.secondary' }} fontSize="small" />
          Want to Read
        </MenuItem>
        <MenuItem onClick={() => handleAddToShelf('reading')} sx={{ fontSize: '0.9rem' }}>
          <MenuBook sx={{ mr: 1.5, color: 'text.secondary' }} fontSize="small" />
          Currently Reading
        </MenuItem>
        <MenuItem onClick={() => handleAddToShelf('read')} sx={{ fontSize: '0.9rem' }}>
          <CheckCircle sx={{ mr: 1.5, color: 'text.secondary' }} fontSize="small" />
          Mark Completed
        </MenuItem>
      </Menu>
    </Card>
  )
}

export default BookCard