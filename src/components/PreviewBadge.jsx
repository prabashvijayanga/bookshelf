import { Chip } from '@mui/material'
import { Visibility, MenuBook, Public } from '@mui/icons-material'
import { hasPreview, isPublicDomain } from '../utils/helpers'

const PreviewBadge = ({ book, sx = {} }) => {
  const accessInfo = book.accessInfo || {}
  const hasPreviewAvailable = hasPreview(accessInfo)
  const isPublicDomainBook = isPublicDomain(accessInfo)

  if (isPublicDomainBook) {
    return (
      <Chip
        icon={<Public />}
        label="Free to Read"
        size="small"
        color="success"
        sx={{ ...sx }}
      />
    )
  }

  if (hasPreviewAvailable) {
    return (
      <Chip
        icon={<Visibility />}
        label="Preview Available"
        size="small"
        color="info"
        sx={{ ...sx }}
      />
    )
  }

  return null
}

export default PreviewBadge