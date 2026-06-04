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
  
  // පින්තූරෙ ලින්ක් එක අරගෙන ඒකේ http තියෙනවා නම් https කරනවා (Mixed Content Error එක විසඳන්න)
  const imageUrl = imageLinks.thumbnail || imageLinks.smallThumbnail || 'https://via.placeholder.com/128x192?text=No+Cover'
  
  return imageUrl.replace('http:', 'https:')
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

// Check if book has preview available
export const hasPreview = (accessInfo) => {
  if (!accessInfo) return false
  return accessInfo.viewability === 'PARTIAL' || accessInfo.viewability === 'ALL_PAGES'
}

// Check if book is public domain
export const isPublicDomain = (accessInfo) => {
  if (!accessInfo) return false
  return accessInfo.publicDomain === true || accessInfo.accessViewStatus === 'FULL_PUBLIC_DOMAIN'
}

// 🆕 අලුතින් එකතු කරන Function එක (Gutendex API එකෙන් EPUB ලින්ක් එක ගන්න)
export const getGutendexEpubLink = async (title) => {
  try {
    // පොතේ නම හරියටම search වෙන්න, title එකේ තියෙන subtitles අයින් කරලා clean කරනවා
    const cleanTitle = title.split(':')[0].trim();
    const response = await fetch(`https://gutendex.com/books/?search=${encodeURIComponent(cleanTitle)}`);
    const data = await response.json();

    if (data.results && data.results.length > 0) {
      // පළවෙනි result එකේ තියෙන සැබෑ EPUB ලින්ක් එක ගන්නවා
      const epubUrl = data.results[0].formats['application/epub+zip'];
      if (epubUrl) {
        return epubUrl;
      }
    }
    return null;
  } catch (error) {
    console.error("Gutendex API Error:", error);
    return null;
  }
}

// Get reading links for a book
export const getReadingLinks = (book) => {
  const volumeInfo = book.volumeInfo || {}
  const accessInfo = book.accessInfo || {}
  const saleInfo = book.saleInfo || {}
  
  const links = {}

  if (volumeInfo.previewLink) links.googlePreview = volumeInfo.previewLink
  if (saleInfo.buyLink) links.googlePlay = saleInfo.buyLink

  const isbn = volumeInfo.industryIdentifiers?.find(
    id => id.type === 'ISBN_13' || id.type === 'ISBN_10'
  )
  if (isbn) {
    links.amazon = `https://www.amazon.com/dp/${isbn.identifier}`
  }

  if (accessInfo.webReaderLink) {
    links.webReader = accessInfo.webReaderLink
  }

  // Public Domain පොත් සඳහා
  if (isPublicDomain(accessInfo)) {
    // ⚠️ Hardcoded ලින්ක් එක අයින් කරලා, In-App Reader එක පෙන්නන්න boolean true එකක් දානවා
    links.inAppEpub = true; 
    links.gutenbergSearch = `https://www.gutenberg.org/ebooks/search/?query=${encodeURIComponent(volumeInfo.title || '')}`;
  }

  return links
}

// Format book for library with reading status
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