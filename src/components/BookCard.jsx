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
  Visibility,
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
  const thumbnail = getThumbnail(volumeInfo.imageLinks)
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
        transition: 'all 0.3s ease',
        cursor: 'pointer',
        '&:hover': {
          transform: 'translateY(-8px)',
          boxShadow: '0 12px 24px rgba(92, 107, 192, 0.4)',
        },
      }}
      onClick={handleViewDetails}
    >
      <Box sx={{ position: 'relative' }}>
        <CardMedia
          component="img"
          height="280"
          image={thumbnail}
          alt={title}
          sx={{ objectFit: 'cover' }}
        />
        {showShelf && currentShelf && (
          <Chip
            label={currentShelf === 'wantToRead' ? 'Want to Read' : currentShelf === 'reading' ? 'Reading' : 'Read'}
            size="small"
            color={currentShelf === 'read' ? 'success' : 'primary'}
            sx={{ position: 'absolute', top: 8, left: 8 }}
          />
        )}
        {/* 🆕 NEW: Preview Badge */}
        <PreviewBadge 
          book={book} 
          sx={{ position: 'absolute', top: 8, right: showShelf ? 8 : 50 }}
        />
        <IconButton
          onClick={handleMenuOpen}
          sx={{
            position: 'absolute',
            top: 8,
            right: 8,
            backgroundColor: 'rgba(0, 0, 0, 0.6)',
            color: 'white',
            '&:hover': {
              backgroundColor: 'rgba(0, 0, 0, 0.8)',
            },
          }}
        >
          <MoreVert />
        </IconButton>
      </Box>

      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h6" component="div" noWrap>
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          {authors}
        </Typography>
        {averageRating > 0 && (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
            <Rating value={averageRating} precision={0.5} size="small" readOnly />
            <Typography variant="caption" color="text.secondary">
              ({averageRating})
            </Typography>
          </Box>
        )}
        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
          {description}
        </Typography>
        {pageCount && (
          <Typography variant="caption" color="text.secondary">
            {pageCount} pages
          </Typography>
        )}
      </CardContent>

      <CardActions>
        <Button
          size="small"
          startIcon={<Visibility />}
          onClick={handleViewDetails}
          fullWidth
        >
          View Details
        </Button>
      </CardActions>

      {/* Shelf Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        onClick={(e) => e.stopPropagation()}
      >
        <MenuItem onClick={() => handleAddToShelf('wantToRead')}>
          <BookmarkAdd sx={{ mr: 1 }} fontSize="small" />
          Want to Read
        </MenuItem>
        <MenuItem onClick={() => handleAddToShelf('reading')}>
          <MenuBook sx={{ mr: 1 }} fontSize="small" />
          Currently Reading
        </MenuItem>
        <MenuItem onClick={() => handleAddToShelf('read')}>
          <CheckCircle sx={{ mr: 1 }} fontSize="small" />
          Already Read
        </MenuItem>
      </Menu>
    </Card>
  )
}

export default BookCard