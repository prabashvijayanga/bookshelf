export const formatAuthors = (authors) => {
  if (!authors || authors.length === 0) return 'Unknown Author'
  if (authors.length === 1) return authors[0]
  if (authors.length === 2) return authors.join(' & ')
  return `${authors[0]} and ${authors.length - 1} others`
}

export const formatPublishedDate = (dateString) => {
  if (!dateString) return 'Unknown'
  try {
    const date = new Date(dateString)
    return date.getFullYear()
  } catch {
    return dateString
  }
}

export const getThumbnail = (imageLinks) => {
  if (!imageLinks) return 'https://via.placeholder.com/128x192?text=No+Cover'
  return imageLinks.thumbnail || imageLinks.smallThumbnail || 'https://via.placeholder.com/128x192?text=No+Cover'
}

export const truncateText = (text, maxLength = 150) => {
  if (!text) return ''
  if (text.length <= maxLength) return text
  return text.substring(0, maxLength) + '...'
}

export const calculateReadingStats = (library) => {
  const currentYear = new Date().getFullYear()
  
  const totalBooks = Object.values(library).flat().length
  const booksRead = library.read.filter(book => {
    const finishedDate = new Date(book.finishedDate || book.addedDate)
    return finishedDate.getFullYear() === currentYear
  }).length
  
  const currentlyReading = library.reading.length
  const wantToRead = library.wantToRead.length

  return { totalBooks, booksRead, currentlyReading, wantToRead }
}

// 🆕 NEW: Check if book has preview available
export const hasPreview = (accessInfo) => {
  if (!accessInfo) return false
  return accessInfo.viewability === 'PARTIAL' || accessInfo.viewability === 'ALL_PAGES'
}

// 🆕 NEW: Check if book is public domain
export const isPublicDomain = (accessInfo) => {
  if (!accessInfo) return false
  return accessInfo.publicDomain === true || accessInfo.accessViewStatus === 'FULL_PUBLIC_DOMAIN'
}

// 🆕 NEW: Get reading links for a book
export const getReadingLinks = (book) => {
  const volumeInfo = book.volumeInfo || {}
  const accessInfo = book.accessInfo || {}
  const saleInfo = book.saleInfo || {}
  
  const links = {}

  // Google Books preview/read link
  if (volumeInfo.previewLink) {
    links.googlePreview = volumeInfo.previewLink
  }

  // Google Play Books (if available for purchase)
  if (saleInfo.buyLink) {
    links.googlePlay = saleInfo.buyLink
  }

  // Amazon link (constructed from ISBN if available)
  const isbn = volumeInfo.industryIdentifiers?.find(
    id => id.type === 'ISBN_13' || id.type === 'ISBN_10'
  )
  if (isbn) {
    links.amazon = `https://www.amazon.com/dp/${isbn.identifier}`
  }

  // Direct web reader link (if available)
  if (accessInfo.webReaderLink) {
    links.webReader = accessInfo.webReaderLink
  }

  // Project Gutenberg (for public domain books)
  if (isPublicDomain(accessInfo)) {
    const title = volumeInfo.title?.toLowerCase().replace(/[^a-z0-9]/g, '-')
    links.gutenberg = `https://www.gutenberg.org/ebooks/search/?query=${encodeURIComponent(volumeInfo.title)}`
  }

  return links
}

// 🆕 NEW: Format book for library with reading status
export const formatBookForLibrary = (bookData) => {
  return {
    id: bookData.id,
    volumeInfo: {
      title: bookData.volumeInfo?.title || 'Untitled',
      authors: bookData.volumeInfo?.authors || [],
      imageLinks: bookData.volumeInfo?.imageLinks || {},
      publishedDate: bookData.volumeInfo?.publishedDate || '',
      pageCount: bookData.volumeInfo?.pageCount || 0,
      categories: bookData.volumeInfo?.categories || [],
      description: bookData.volumeInfo?.description || '',
      previewLink: bookData.volumeInfo?.previewLink || '',
    },
    accessInfo: bookData.accessInfo || {},
    saleInfo: bookData.saleInfo || {},
  }
}