const bookForm = document.getElementById("book-form");
const bookList = document.getElementById("book-list");
const searchBar = document.getElementById("search-bar");
const historyList = document.getElementById("history-list");

let books = [];
let history = [];

bookForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const title = document.getElementById("book-title").value;
  const author = document.getElementById("book-author").value;
  const category = document.getElementById("book-category").value;

  const newBook = { title, author, category };
  books.push(newBook);

  displayBooks();
  bookForm.reset();
});

function displayBooks() {
  bookList.innerHTML = "";
  books.forEach((book, index) => {
    const bookItem = document.createElement("div");
    bookItem.className = "book-item";
    bookItem.innerHTML = `
      <strong>${book.title}</strong> by ${book.author} <em>[${book.category}]</em>
      <button onclick="borrowBook(${index})">Borrow</button>
    `;
    bookList.appendChild(bookItem);
  });
}

function borrowBook(index) {
  const book = books.splice(index, 1)[0];
  history.push(book);
  displayBooks();
  displayHistory();
}

function displayHistory() {
  historyList.innerHTML = "";
  history.forEach((book) => {
    const historyItem = document.createElement("li");
    historyItem.textContent = `${book.title} by ${book.author} [${book.category}]`;
    historyList.appendChild(historyItem);
  });
}

searchBar.addEventListener("input", (e) => {
  const query = e.target.value.toLowerCase();
  const filteredBooks = books.filter(
    (book) =>
      book.title.toLowerCase().includes(query) ||
      book.author.toLowerCase().includes(query) ||
      book.category.toLowerCase().includes(query)
  );

  bookList.innerHTML = "";
  filteredBooks.forEach((book, index) => {
    const bookItem = document.createElement("div");
    bookItem.className = "book-item";
    bookItem.innerHTML = `
      <strong>${book.title}</strong> by ${book.author} <em>[${book.category}]</em>
      <button onclick="borrowBook(${index})">Borrow</button>
    `;
    bookList.appendChild(bookItem);
  });
});
