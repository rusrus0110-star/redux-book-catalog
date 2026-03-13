import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  addBook,
  removeBook,
  updateBookInfo,
  addReader,
  removeReader,
  lendBookToReader,
  returnBookFromReader,
} from "./redux/actions";
import "./App.css";

function App() {
  const books = useSelector((state) => state.books);
  const readers = useSelector((state) => state.readers);
  const lastUpdated = useSelector((state) => state.lastUpdated);
  const dispatch = useDispatch();

  const [newBook, setNewBook] = useState({
    title: "",
    author: "",
    year: "",
  });

  const [newReader, setNewReader] = useState({
    name: "",
    email: "",
  });

  const [lendForm, setLendForm] = useState({
    bookId: "",
    readerId: "",
  });

  const [returnForm, setReturnForm] = useState({
    bookId: "",
    readerId: "",
  });

  const [updateForm, setUpdateForm] = useState({
    id: "",
    title: "",
    author: "",
    year: "",
  });

  const [removeReaderForm, setRemoveReaderForm] = useState({
    readerId: "",
  });

  const handleAddBook = (e) => {
    e.preventDefault();
    if (newBook.title && newBook.author && newBook.year) {
      dispatch(
        addBook({
          title: newBook.title,
          author: newBook.author,
          year: parseInt(newBook.year),
        }),
      );
      setNewBook({ title: "", author: "", year: "" });
    }
  };

  const handleAddReader = (e) => {
    e.preventDefault();
    if (newReader.name && newReader.email) {
      dispatch(
        addReader({
          name: newReader.name,
          email: newReader.email,
        }),
      );
      setNewReader({ name: "", email: "" });
    }
  };

  const handleLendBook = (e) => {
    e.preventDefault();
    if (lendForm.bookId && lendForm.readerId) {
      dispatch(lendBookToReader(lendForm.bookId, lendForm.readerId));
      setLendForm({ bookId: "", readerId: "" });
    }
  };

  const handleReturnBook = (e) => {
    e.preventDefault();
    if (returnForm.bookId && returnForm.readerId) {
      dispatch(returnBookFromReader(returnForm.bookId, returnForm.readerId));
      setReturnForm({ bookId: "", readerId: "" });
    }
  };

  const handleUpdateBook = (e) => {
    e.preventDefault();
    if (updateForm.id) {
      const updates = {};
      if (updateForm.title) updates.title = updateForm.title;
      if (updateForm.author) updates.author = updateForm.author;
      if (updateForm.year) updates.year = parseInt(updateForm.year);

      dispatch(updateBookInfo(updateForm.id, updates));
      setUpdateForm({ id: "", title: "", author: "", year: "" });
    }
  };

  const handleRemoveReader = (e) => {
    e.preventDefault();
    if (removeReaderForm.readerId) {
      dispatch(removeReader(removeReaderForm.readerId));
      setRemoveReaderForm({ readerId: "" });
    }
  };

  const getReaderWithBook = (bookId) => {
    return readers.find((r) => r.borrowedBooks.includes(bookId));
  };

  return (
    <div className="App">
      <header className="app-header">
        <h1>📚 Library Management System</h1>
      </header>

      <main className="app-main">
        {lastUpdated && (
          <div className="last-updated">
            <strong>Last Updated:</strong>{" "}
            {new Date(lastUpdated).toLocaleString()}
          </div>
        )}

        <div className="forms-container">
          <section className="form-section">
            <h2>➕ Add New Book</h2>
            <form onSubmit={handleAddBook} className="form-grid form-grid--3">
              <input
                type="text"
                placeholder="Title"
                value={newBook.title}
                onChange={(e) =>
                  setNewBook({ ...newBook, title: e.target.value })
                }
                required
              />
              <input
                type="text"
                placeholder="Author"
                value={newBook.author}
                onChange={(e) =>
                  setNewBook({ ...newBook, author: e.target.value })
                }
                required
              />
              <input
                type="number"
                placeholder="Year"
                value={newBook.year}
                onChange={(e) =>
                  setNewBook({ ...newBook, year: e.target.value })
                }
                required
              />
              <button type="submit">Add Book</button>
            </form>
          </section>

          <section className="form-section">
            <h2>✏️ Update Book</h2>
            <form
              onSubmit={handleUpdateBook}
              className="form-grid form-grid--4"
            >
              <select
                value={updateForm.id}
                onChange={(e) =>
                  setUpdateForm({ ...updateForm, id: e.target.value })
                }
                required
              >
                <option value="">Select Book...</option>
                {books.map((book) => (
                  <option key={book.id} value={book.id}>
                    {book.title}
                  </option>
                ))}
              </select>
              <input
                type="text"
                placeholder="New Title"
                value={updateForm.title}
                onChange={(e) =>
                  setUpdateForm({ ...updateForm, title: e.target.value })
                }
              />
              <input
                type="text"
                placeholder="New Author"
                value={updateForm.author}
                onChange={(e) =>
                  setUpdateForm({ ...updateForm, author: e.target.value })
                }
              />
              <input
                type="number"
                placeholder="New Year"
                value={updateForm.year}
                onChange={(e) =>
                  setUpdateForm({ ...updateForm, year: e.target.value })
                }
              />
              <button type="submit">Update</button>
            </form>
          </section>

          <section className="form-section">
            <h2>👤 Register Reader</h2>
            <form onSubmit={handleAddReader} className="form-grid form-grid--2">
              <input
                type="text"
                placeholder="Full Name"
                value={newReader.name}
                onChange={(e) =>
                  setNewReader({ ...newReader, name: e.target.value })
                }
                required
              />
              <input
                type="email"
                placeholder="Email"
                value={newReader.email}
                onChange={(e) =>
                  setNewReader({ ...newReader, email: e.target.value })
                }
                required
              />
              <button type="submit">Register</button>
            </form>
          </section>

          <section className="form-section">
            <h2>🗑️ Remove Reader</h2>
            <form
              onSubmit={handleRemoveReader}
              className="form-grid form-grid--1"
            >
              <select
                value={removeReaderForm.readerId}
                onChange={(e) =>
                  setRemoveReaderForm({ readerId: e.target.value })
                }
                required
              >
                <option value="">Select Reader...</option>
                {readers.map((reader) => (
                  <option key={reader.id} value={reader.id}>
                    {reader.name} ({reader.borrowedBooks.length} book
                    {reader.borrowedBooks.length !== 1 ? "s" : ""})
                  </option>
                ))}
              </select>
              <button type="submit">Remove Reader</button>
            </form>
          </section>

          <section className="form-section">
            <h2>📤 Lend Book</h2>
            <form onSubmit={handleLendBook} className="form-grid form-grid--2">
              <select
                value={lendForm.bookId}
                onChange={(e) =>
                  setLendForm({ ...lendForm, bookId: e.target.value })
                }
                required
              >
                <option value="">Select Book...</option>
                {books
                  .filter((book) => book.isAvailable)
                  .map((book) => (
                    <option key={book.id} value={book.id}>
                      {book.title}
                    </option>
                  ))}
              </select>
              <select
                value={lendForm.readerId}
                onChange={(e) =>
                  setLendForm({ ...lendForm, readerId: e.target.value })
                }
                required
              >
                <option value="">Select Reader...</option>
                {readers.map((reader) => (
                  <option key={reader.id} value={reader.id}>
                    {reader.name}
                  </option>
                ))}
              </select>
              <button type="submit">Lend</button>
            </form>
          </section>

          <section className="form-section">
            <h2>📥 Return Book</h2>
            <form
              onSubmit={handleReturnBook}
              className="form-grid form-grid--2"
            >
              <select
                value={returnForm.bookId}
                onChange={(e) => {
                  const bookId = e.target.value;
                  const reader = getReaderWithBook(bookId);
                  setReturnForm({
                    bookId,
                    readerId: reader ? reader.id : "",
                  });
                }}
                required
              >
                <option value="">Select Book...</option>
                {books
                  .filter((book) => !book.isAvailable)
                  .map((book) => {
                    const reader = getReaderWithBook(book.id);
                    return (
                      <option key={book.id} value={book.id}>
                        {book.title} (borrowed by{" "}
                        {reader ? reader.name : "Unknown"})
                      </option>
                    );
                  })}
              </select>
              <select
                value={returnForm.readerId}
                onChange={(e) =>
                  setReturnForm({ ...returnForm, readerId: e.target.value })
                }
                required
                disabled={!returnForm.bookId}
              >
                <option value="">Select Reader...</option>
                {returnForm.bookId &&
                  (() => {
                    const reader = getReaderWithBook(returnForm.bookId);
                    return reader ? (
                      <option key={reader.id} value={reader.id}>
                        {reader.name}
                      </option>
                    ) : null;
                  })()}
              </select>
              <button type="submit">Return</button>
            </form>
          </section>
        </div>

        <section className="books-container">
          <h2>📖 Books in Catalog ({books.length})</h2>

          {books.length === 0 ? (
            <p className="empty-message">No books in catalog. Add one above!</p>
          ) : (
            <div className="books-grid">
              {books.map((book) => {
                const reader = getReaderWithBook(book.id);

                return (
                  <div
                    key={book.id}
                    className={`book-card ${!book.isAvailable ? "unavailable" : ""}`}
                  >
                    <h3>{book.title}</h3>
                    <p className="author">by {book.author}</p>
                    <p className="year">Published: {book.year}</p>

                    <div className="availability">
                      <span
                        className={`status ${book.isAvailable ? "available" : "borrowed"}`}
                      >
                        {book.isAvailable ? "✓ Available" : "✗ Borrowed"}
                      </span>
                      {!book.isAvailable && reader && (
                        <p className="borrowed-by">by {reader.name}</p>
                      )}
                    </div>

                    <div className="book-actions">
                      <button
                        onClick={() => dispatch(removeBook(book.id))}
                        className="btn-remove"
                        disabled={!book.isAvailable}
                      >
                        🗑️ Remove
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>
      </main>

      {/* Футер */}
      <footer className="app-footer">
        <div className="footer-divider"></div>
        <p>📚 Library Management System</p>
        <p>
          Built with{" "}
          <a href="https://react.dev" target="_blank" rel="noopener noreferrer">
            React
          </a>{" "}
          &{" "}
          <a
            href="https://redux.js.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Redux
          </a>
        </p>
        <p className="footer-tech">Vite • Redux • Modern JavaScript</p>
        <p style={{ fontSize: "0.75rem", marginTop: "10px", opacity: 0.6 }}>
          © 2026 • All rights reserved
        </p>
      </footer>
    </div>
  );
}

export default App;
