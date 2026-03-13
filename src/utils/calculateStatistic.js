export const calculateStatistics = (books, readers) => {
  const totalBooks = books.length;
  const availableBooks = books.filter((book) => book.isAvailable).length;
  const borrowedBooks = books.filter((book) => !book.isAvailable).length;

  const booksByDecade = {};
  books.forEach((book) => {
    const decade = Math.floor(book.year / 10) * 10;
    const decadeKey = `${decade}s`;
    booksByDecade[decadeKey] = (booksByDecade[decadeKey] || 0) + 1;
  });

  const totalReaders = readers.length;
  const activeReadersCount = readers.filter(
    (reader) => reader.borrowedBooks.length > 0,
  ).length;

  const authorCounts = {};
  books.forEach((book) => {
    authorCounts[book.author] = (authorCounts[book.author] || 0) + 1;
  });

  let mostPopularAuthor = { name: "", booksCount: 0 };
  Object.entries(authorCounts).forEach(([author, count]) => {
    if (count > mostPopularAuthor.booksCount) {
      mostPopularAuthor = { name: author, booksCount: count };
    }
  });

  let consistencyCheck = true;
  const consistencyErrors = [];

  if (availableBooks + borrowedBooks !== totalBooks) {
    consistencyCheck = false;
    consistencyErrors.push(
      `Sum mismatch: available (${availableBooks}) + borrowed (${borrowedBooks}) ≠ total (${totalBooks})`,
    );
  }

  const booksWithReaders = readers.reduce(
    (sum, reader) => sum + reader.borrowedBooks.length,
    0,
  );
  if (booksWithReaders !== borrowedBooks) {
    consistencyCheck = false;
    consistencyErrors.push(
      `Borrowed books mismatch: readers have ${booksWithReaders} books, but statistics shows ${borrowedBooks}`,
    );
  }

  if (!consistencyCheck) {
    console.warn("⚠️ CONSISTENCY CHECK FAILED:");
    consistencyErrors.forEach((error) => console.warn(`  - ${error}`));
    console.warn("Current state:", {
      books: books.length,
      readers: readers.length,
    });
  } else {
    console.log("✅ Consistency check passed");
  }

  return {
    totalBooks,
    availableBooks,
    borrowedBooks,
    booksByDecade,
    totalReaders,
    activeReadersCount,
    mostPopularAuthor,
    consistencyCheck,
  };
};
