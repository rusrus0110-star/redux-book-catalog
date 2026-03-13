import {
  BOOK_ADD,
  BOOK_REMOVE,
  BOOK_UPDATE_INFO,
  BOOK_TOGGLE_AVAILABILITY
} from './actionTypes';

const initialState = {
  books: [
    {
      id: '1710000000000-001',
      title: '1984',
      author: 'George Orwell',
      year: 1949,
      isAvailable: true
    },
    {
      id: '1710000000000-002',
      title: 'Harry Potter and the Philosopher\'s Stone',
      author: 'J.K. Rowling',
      year: 1997,
      isAvailable: true
    },
    {
      id: '1710000000000-003',
      title: 'To Kill a Mockingbird',
      author: 'Harper Lee',
      year: 1960,
      isAvailable: false
    }
  ],
  lastUpdated: new Date().toISOString()
};

const booksReducer = (state = initialState, action) => {
  switch (action.type) {
    
    case BOOK_ADD:
      return {
        ...state,
        books: [...state.books, action.payload],
        lastUpdated: new Date().toISOString()
      };
    
    case BOOK_REMOVE: {
  const bookToRemove = state.books.find(
    (book) => book.id === action.payload
  );

  if (!bookToRemove) {
    console.warn(`Book with id ${action.payload} not found`);
    return state;
  }

  if (!bookToRemove.isAvailable) {
    console.error(
      `Cannot remove book "${bookToRemove.title}" - it is currently unavailable (checked out)`
    );
    return state;
  }

  return {
    ...state,
    books: state.books.filter((book) => book.id !== action.payload),
    lastUpdated: new Date().toISOString(),
  };
}
    case BOOK_UPDATE_INFO:
      return {
        ...state,
        books: state.books.map(book => {
          if (book.id === action.payload.id) {
            return {
              ...book,
              ...action.payload.updates
            };
          }
          return book;
        }),
        lastUpdated: new Date().toISOString()
      };
    
    case BOOK_TOGGLE_AVAILABILITY:
      return {
        ...state,
        books: state.books.map(book => {
          if (book.id === action.payload) {
            return {
              ...book,
              isAvailable: !book.isAvailable
            };
          }
          return book;
        }),
        lastUpdated: new Date().toISOString()
      };
    
    default:
      return state;
  }
};

export default booksReducer;