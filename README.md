# 📚 Library Management System

A modern library management application built with **React** and **Redux** for state management. This project demonstrates advanced Redux patterns including automated statistics calculation and data consistency checks.

## 🌟 Features

### Part 1: Books Management

- ✅ Add new books to the catalog
- ✅ Update book information (title, author, year)
- ✅ Remove books (only available ones)
- ✅ Toggle book availability status
- ✅ Automatic ID generation for books
- ✅ Data validation and error handling

### Part 2: Readers & Lending System

- ✅ Register new readers with name and email
- ✅ Remove readers (only without borrowed books)
- ✅ Lend books to registered readers
- ✅ Return books from readers
- ✅ Track which reader has which book
- ✅ Prevent lending already borrowed books
- ✅ Display borrower information on book cards

### Part 3: Advanced Statistics

- ✅ **Automatic statistics recalculation** after every action
- ✅ Real-time metrics:
  - Total books in catalog
  - Available books
  - Borrowed books
  - Total registered readers
  - Active readers (with borrowed books)
  - Most popular author
  - Books grouped by decade
- ✅ **Data consistency checks**:
  - Validates that available + borrowed = total books
  - Verifies reader book counts match statistics
  - Console warnings for inconsistencies
- ✅ Beautiful animated statistics dashboard
