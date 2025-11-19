const STORAGE_KEYS = {
  LIBRARY: 'bookshelf_library',
  READING_GOAL: 'bookshelf_reading_goal',
  QUOTES: 'bookshelf_quotes',
  REVIEWS: 'bookshelf_reviews',
}

export const localStorageService = {
  getLibrary: () => {
    const library = localStorage.getItem(STORAGE_KEYS.LIBRARY)
    return library ? JSON.parse(library) : {
      reading: [],
      wantToRead: [],
      read: [],
    }
  },

  saveLibrary: (library) => {
    localStorage.setItem(STORAGE_KEYS.LIBRARY, JSON.stringify(library))
  },

  addBookToShelf: (book, shelf) => {
    const library = localStorageService.getLibrary()
    
    Object.keys(library).forEach(key => {
      library[key] = library[key].filter(b => b.id !== book.id)
    })

    if (!library[shelf].find(b => b.id === book.id)) {
      library[shelf].push({
        ...book,
        addedDate: new Date().toISOString(),
        progress: shelf === 'read' ? 100 : 0,
      })
    }

    localStorageService.saveLibrary(library)
    return library
  },

  removeBookFromLibrary: (bookId) => {
    const library = localStorageService.getLibrary()
    Object.keys(library).forEach(key => {
      library[key] = library[key].filter(b => b.id !== bookId)
    })
    localStorageService.saveLibrary(library)
    return library
  },

  updateBookProgress: (bookId, progress) => {
    const library = localStorageService.getLibrary()
    Object.keys(library).forEach(shelf => {
      const book = library[shelf].find(b => b.id === bookId)
      if (book) {
        book.progress = progress
        if (progress === 100 && shelf === 'reading') {
          library.read.push({ ...book, finishedDate: new Date().toISOString() })
          library.reading = library.reading.filter(b => b.id !== bookId)
        }
      }
    })
    localStorageService.saveLibrary(library)
    return library
  },

  getBookFromLibrary: (bookId) => {
    const library = localStorageService.getLibrary()
    for (const shelf of Object.keys(library)) {
      const book = library[shelf].find(b => b.id === bookId)
      if (book) return { ...book, shelf }
    }
    return null
  },

  getReviews: () => {
    const reviews = localStorage.getItem(STORAGE_KEYS.REVIEWS)
    return reviews ? JSON.parse(reviews) : {}
  },

  saveReview: (bookId, review) => {
    const reviews = localStorageService.getReviews()
    reviews[bookId] = {
      ...review,
      date: new Date().toISOString(),
    }
    localStorage.setItem(STORAGE_KEYS.REVIEWS, JSON.stringify(reviews))
    return reviews
  },

  getReview: (bookId) => {
    const reviews = localStorageService.getReviews()
    return reviews[bookId] || null
  },

  getReadingGoal: () => {
    const goal = localStorage.getItem(STORAGE_KEYS.READING_GOAL)
    return goal ? JSON.parse(goal) : { target: 12, year: new Date().getFullYear() }
  },

  saveReadingGoal: (target) => {
    const goal = { target, year: new Date().getFullYear() }
    localStorage.setItem(STORAGE_KEYS.READING_GOAL, JSON.stringify(goal))
    return goal
  },
}

export default localStorageService