/**
 * REDUCER (РЕДЬЮСЕР)
 * Расширенная версия с поддержкой читателей и операций выдачи/возврата книг
 */

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

import { initialBooks, initialReaders } from "../data/initialData";

const initialState = {
  books: initialBooks,
  readers: initialReaders,
  lastUpdated: new Date().toISOString(),
};

const booksReducer = (state = initialState, action) => {
  switch (action.type) {
    case BOOK_ADD:
      return {
        ...state,
        books: [...state.books, action.payload],
        lastUpdated: new Date().toISOString(),
      };

    case BOOK_REMOVE: {
      const bookToRemove = state.books.find(
        (book) => book.id === action.payload,
      );

      if (!bookToRemove) {
        console.warn(`Book with id ${action.payload} not found`);
        return state;
      }

      if (!bookToRemove.isAvailable) {
        console.error(
          `Cannot remove book "${bookToRemove.title}" - it is currently borrowed`,
        );
        return state;
      }

      return {
        ...state,
        books: state.books.filter((book) => book.id !== action.payload),
        lastUpdated: new Date().toISOString(),
      };
    }

    case BOOK_UPDATE_INFO: {
      const { id, updates } = action.payload;

      const bookToUpdate = state.books.find((book) => book.id === id);

      if (!bookToUpdate) {
        console.warn(`Book with id ${id} not found`);
        return state;
      }

      return {
        ...state,
        books: state.books.map((book) => {
          if (book.id === id) {
            return {
              ...book,
              title: updates.title !== undefined ? updates.title : book.title,
              author:
                updates.author !== undefined ? updates.author : book.author,
              year: updates.year !== undefined ? updates.year : book.year,
            };
          }

          return book;
        }),
        lastUpdated: new Date().toISOString(),
      };
    }

    case BOOK_TOGGLE_AVAILABILITY:
      return {
        ...state,
        books: state.books.map((book) => {
          if (book.id === action.payload) {
            return {
              ...book,
              isAvailable: !book.isAvailable,
            };
          }
          return book;
        }),
        lastUpdated: new Date().toISOString(),
      };

    // ============================================
    // ДЕЙСТВИЯ ДЛЯ ЧИТАТЕЛЕЙ
    // ============================================

    /**
     * ДОБАВЛЕНИЕ ЧИТАТЕЛЯ
     */
    case READER_ADD:
      return {
        ...state,
        readers: [...state.readers, action.payload],
        lastUpdated: new Date().toISOString(),
      };

    /**
     * УДАЛЕНИЕ ЧИТАТЕЛЯ
     *
     * ПРОВЕРКА: Можно удалить только если нет взятых книг
     */
    case READER_REMOVE: {
      const readerToRemove = state.readers.find(
        (reader) => reader.id === action.payload,
      );

      if (!readerToRemove) {
        console.warn(`Reader with id ${action.payload} not found`);
        return state;
      }

      if (readerToRemove.borrowedBooks.length > 0) {
        console.error(
          `Cannot remove reader "${readerToRemove.name}" - they have ${readerToRemove.borrowedBooks.length} borrowed book(s)`,
        );
        return state;
      }

      return {
        ...state,
        readers: state.readers.filter((reader) => reader.id !== action.payload),
        lastUpdated: new Date().toISOString(),
      };
    }

    // ============================================
    // ОПЕРАЦИИ ВЫДАЧИ/ВОЗВРАТА КНИГ
    // ============================================

    /**
     * ВЫДАЧА КНИГИ ЧИТАТЕЛЮ
     *
     * Проверки:
     * 1. Книга существует
     * 2. Книга доступна (isAvailable: true)
     * 3. Читатель существует
     */
    case BOOK_LEND_TO_READER: {
      const { bookId, readerId } = action.payload;

      // Поиск книги
      const book = state.books.find((b) => b.id === bookId);
      if (!book) {
        console.error(`Book with id ${bookId} not found`);
        return state;
      }

      // Проверка доступности книги
      if (!book.isAvailable) {
        console.error(`Book "${book.title}" is already borrowed`);
        return state;
      }

      // Поиск читателя
      const reader = state.readers.find((r) => r.id === readerId);
      if (!reader) {
        console.error(`Reader with id ${readerId} not found`);
        return state;
      }

      // ВСЁ ОК - выполняем выдачу книги
      console.log(`✓ Book "${book.title}" lent to ${reader.name}`);

      return {
        ...state,
        // Обновляем книгу - делаем недоступной
        books: state.books.map((b) =>
          b.id === bookId ? { ...b, isAvailable: false } : b,
        ),
        // Обновляем читателя - добавляем книгу в список взятых
        readers: state.readers.map((r) =>
          r.id === readerId
            ? { ...r, borrowedBooks: [...r.borrowedBooks, bookId] }
            : r,
        ),
        lastUpdated: new Date().toISOString(),
      };
    }

    /**
     * ВОЗВРАТ КНИГИ ОТ ЧИТАТЕЛЯ
     *
     * Проверки:
     * 1. Книга существует
     * 2. Читатель существует
     * 3. У читателя действительно есть эта книга
     */
    case BOOK_RETURN_FROM_READER: {
      const { bookId, readerId } = action.payload;

      // Поиск книги
      const book = state.books.find((b) => b.id === bookId);
      if (!book) {
        console.error(`Book with id ${bookId} not found`);
        return state;
      }

      // Поиск читателя
      const reader = state.readers.find((r) => r.id === readerId);
      if (!reader) {
        console.error(`Reader with id ${readerId} not found`);
        return state;
      }

      // Проверка - есть ли эта книга у читателя
      if (!reader.borrowedBooks.includes(bookId)) {
        console.error(
          `Reader "${reader.name}" doesn't have book "${book.title}"`,
        );
        return state;
      }

      // ВСЁ ОК - выполняем возврат книги
      console.log(`✓ Book "${book.title}" returned by ${reader.name}`);

      return {
        ...state,
        // Обновляем книгу - делаем доступной
        books: state.books.map((b) =>
          b.id === bookId ? { ...b, isAvailable: true } : b,
        ),
        // Обновляем читателя - удаляем книгу из списка взятых
        readers: state.readers.map((r) =>
          r.id === readerId
            ? {
                ...r,
                borrowedBooks: r.borrowedBooks.filter((id) => id !== bookId),
              }
            : r,
        ),
        lastUpdated: new Date().toISOString(),
      };
    }

    default:
      return state;
  }
};

export default booksReducer;
