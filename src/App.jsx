import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  addBook,
  removeBook,
  updateBookInfo,
  toggleBookAvailability,
} from "./redux/actions";
import "./App.css";

function App() {
  const books = useSelector((state) => state.books);
  const lastUpdated = useSelector((state) => state.lastUpdated);
  const dispatch = useDispatch();

  const [newBook, setNewBook] = useState({
    title: "",
    author: "",
    year: "",
  });

  const [updateForm, setUpdateForm] = useState({
    id: "",
    title: "",
    author: "",
    year: "",
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

  const handleRemoveBook = (id) => {
    dispatch(removeBook(id));
  };

  const handleToggleAvailability = (id) => {
    dispatch(toggleBookAvailability(id));
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

  return (
    <div className="App">
      <header className="app-header">
        <h1>📚 Book Catalog</h1>
      </header>

      <main className="app-main">
        {lastUpdated && (
          <div className="last-updated">
            <strong>Last Updated:</strong>{" "}
            {new Date(lastUpdated).toLocaleString()}
          </div>
        )}

        <section className="form-section">
          <h2>➕ Add New Book</h2>
          <form onSubmit={handleAddBook} className="book-form">
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
              onChange={(e) => setNewBook({ ...newBook, year: e.target.value })}
              required
            />
            <button type="submit">Add Book</button>
          </form>
        </section>

        <section className="form-section">
          <h2>✏️ Update Book</h2>
          <form onSubmit={handleUpdateBook} className="book-form">
            <select
              value={updateForm.id}
              onChange={(e) =>
                setUpdateForm({ ...updateForm, id: e.target.value })
              }
              required
            >
              <option value="">Select a book...</option>
              {books.map((book) => (
                <option key={book.id} value={book.id}>
                  {book.title} by {book.author}
                </option>
              ))}
            </select>
            <input
              type="text"
              placeholder="New Title (optional)"
              value={updateForm.title}
              onChange={(e) =>
                setUpdateForm({ ...updateForm, title: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="New Author (optional)"
              value={updateForm.author}
              onChange={(e) =>
                setUpdateForm({ ...updateForm, author: e.target.value })
              }
            />
            <input
              type="number"
              placeholder="New Year (optional)"
              value={updateForm.year}
              onChange={(e) =>
                setUpdateForm({ ...updateForm, year: e.target.value })
              }
            />
            <button type="submit">Update Book</button>
          </form>
        </section>

        <section className="books-container">
          <h2>📖 Books in Catalog ({books.length})</h2>

          {books.length === 0 ? (
            <p className="empty-message">No books in catalog. Add one above!</p>
          ) : (
            <div className="books-grid">
              {books.map((book) => (
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
                  </div>

                  <div className="book-actions">
                    <button
                      onClick={() => handleToggleAvailability(book.id)}
                      className="btn-toggle"
                    >
                      {book.isAvailable ? "📤 Borrow" : "📥 Return"}
                    </button>
                    <button
                      onClick={() => handleRemoveBook(book.id)}
                      className="btn-remove"
                    >
                      🗑️ Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

export default App;
