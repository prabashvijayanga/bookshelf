import { Chip } from '@mui/material'
import { Visibility, Public } from '@mui/icons-material'
import { hasPreview, isPublicDomain } from '../utils/helpers'

const PreviewBadge = ({ book, sx = {} }) => {
  const accessInfo = book.accessInfo || {}
  const hasPreviewAvailable = hasPreview(accessInfo)
  const isPublicDomainBook = isPublicDomain(accessInfo)

  const commonStyles = {
    bgcolor: 'rgba(0, 0, 0, 0.7)',
    backdropFilter: 'blur(4px)',
    border: '1px solid rgba(255,255,255,0.15)',
    color: 'text.primary',
    fontWeight: 600,
    fontSize: '0.7rem',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    ...sx
  }

  if (isPublicDomainBook) {
    return (
      <Chip
        icon={<Public sx={{ color: 'text.secondary', fontSize: '1rem !important' }} />}
        label="Public Domain"
        size="small"
        variant="outlined"
        sx={commonStyles}
      />
    )
  }

  if (hasPreviewAvailable) {
    return (
      <Chip
        icon={<Visibility sx={{ color: 'text.secondary', fontSize: '1rem !important' }} />}
        label="Preview Available"
        size="small"
        variant="outlined"
        sx={commonStyles}
      />
    )
  }

  return null
}

export default PreviewBadge