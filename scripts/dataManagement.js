const CATEGORIES = ["completed", "reading", "wishlist"];

// retrieve data from localstorage
function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}

// save data to local storage
function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

export function saveBook(category, bookId) {
  if (!CATEGORIES.includes(category)) {
    throw new Error(`${category} is not a valid category`);
  }
  const savedBooks = getLocalStorage("saved-books") || [];
  const index = savedBooks.findIndex((book) => book.id == bookId);

  if (index == -1) {
    savedBooks.push({ id: bookId, notes: "", category: category });
  } else {
    savedBooks[index].category = category;
  }

  setLocalStorage("saved-books", savedBooks);
}

export function getBooksByCategory(category) {
  if (!CATEGORIES.includes(category)) {
    throw new Error(`${category} is not a valid category`);
  }
  const savedBooks = getLocalStorage("saved-books") || [];
  return savedBooks.filter((book) => book.category == category);
}

export function getBookById(bookId) {
  const savedBooks = getLocalStorage("saved-books") || [];
  const index = savedBooks.findIndex((book) => book.id == bookId);
  return savedBooks[index];
}

export function removeBook(bookId) {
  const savedBooks = getLocalStorage("saved-books") || [];
  const index = savedBooks.findIndex((book) => book.id == bookId);
  savedBooks.splice(index, 1);
  setLocalStorage("saved-books", savedBooks);
}

export function getBookNotes(bookId) {
  const savedBooks = getLocalStorage("saved-books") || [];
  const index = savedBooks.findIndex((book) => book.id == bookId);
  return savedBooks[index].notes;
}

export function updateBookNotes(bookId, notes) {
  const savedBooks = getLocalStorage("saved-books") || [];
  const index = savedBooks.findIndex((book) => book.id == bookId);
  savedBooks[index].notes = notes;
  setLocalStorage("saved-books", savedBooks);
}
