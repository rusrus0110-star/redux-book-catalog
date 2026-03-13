import {
  BOOK_ADD,
  BOOK_REMOVE,
  BOOK_UPDATE_INFO,
  BOOK_TOGGLE_AVAILABILITY,
} from "./actionTypes";
import { generateBookId } from "../utils/generateBookId";

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
