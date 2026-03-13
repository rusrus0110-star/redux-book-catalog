import {
  BOOK_ADD,
  BOOK_REMOVE,
  BOOK_UPDATE_INFO,
  BOOK_TOGGLE_AVAILABILITY,
  READER_ADD,
  READER_REMOVE,
  BOOK_LEND_TO_READER,
  BOOK_RETURN_FROM_READER,
} from "./actionTypes";
import { generateBookId } from "../utils/generateBookId";
import { generateReaderId } from "../utils/generateReaderId";

export const addBook = (bookData) => {
  const id = generateBookId();
  return {
    type: BOOK_ADD,
    payload: {
      ...bookData,
      id,
      isAvailable: true,
    },
  };
};

export const removeBook = (bookId) => ({
  type: BOOK_REMOVE,
  payload: bookId,
});

export const updateBookInfo = (bookId, updates) => {
  const { title, author, year } = updates;

  const allowedUpdates = {};
  if (title !== undefined) allowedUpdates.title = title;
  if (author !== undefined) allowedUpdates.author = author;
  if (year !== undefined) allowedUpdates.year = year;

  return {
    type: BOOK_UPDATE_INFO,
    payload: {
      id: bookId,
      updates: allowedUpdates,
    },
  };
};

export const toggleBookAvailability = (bookId) => ({
  type: BOOK_TOGGLE_AVAILABILITY,
  payload: bookId,
});

export const addReader = (readerData) => {
  const id = generateReaderId();

  return {
    type: READER_ADD,
    payload: {
      ...readerData,
      id,
      borrowedBooks: [], // Пустой массив взятых книг
    },
  };
};

/**
 * Удаление ч��тателя
 *
 * @param {string} readerId - ID читателя для удаления
 * @returns {Object} Action объект
 */
export const removeReader = (readerId) => ({
  type: READER_REMOVE,
  payload: readerId,
});

// ============================================
// ДЕЙСТВИЯ ДЛЯ ВЫДАЧИ/ВОЗВРАТА КНИГ
// ============================================

/**
 * Выдача книги читателю
 *
 * @param {string} bookId - ID книги
 * @param {string} readerId - ID читателя
 * @returns {Object} Action объект
 */
export const lendBookToReader = (bookId, readerId) => ({
  type: BOOK_LEND_TO_READER,
  payload: {
    bookId,
    readerId,
  },
});

/**
 * Возврат книги от читателя
 *
 * @param {string} bookId - ID книги
 * @param {string} readerId - ID читателя
 * @returns {Object} Action объект
 */
export const returnBookFromReader = (bookId, readerId) => ({
  type: BOOK_RETURN_FROM_READER,
  payload: {
    bookId,
    readerId,
  },
});
