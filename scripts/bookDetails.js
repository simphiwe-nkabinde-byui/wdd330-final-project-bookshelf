import { fetchBookById } from "./bookServices.js";
import { getBookById, removeBook, saveBook } from "./dataManagement.js";
import { renderBookDetails } from "./userInterface.js";

// get book id from url search params
let url = new URL(window.location.href);
const params = new URLSearchParams(url.search);
const bookId = params.get("bookId");

const categoryRadioButtons = document.querySelectorAll('input[name="category"');
const deleteButton = document.querySelector("#remove-book");

// fetch and display book info
displayBookDetails(bookId);

// add functionality to the category buttons
for (let i = 0; i < categoryRadioButtons.length; i++) {
  const radio = categoryRadioButtons[i];
  const storedBook = getBookById(bookId);
  if (storedBook?.category == radio.value) {
    radio.checked = true;
  } else {
    radio.checked = false;
  }
  radio.addEventListener("click", () => {
    saveBook(radio.value, bookId);
  });
}
deleteButton.addEventListener("click", () => {
  removeBook(bookId);
  window.location.reload();
});

async function displayBookDetails(bookId) {
  const bookDetails = await fetchBookById(bookId);
  renderBookDetails(bookDetails, "#book-details-container");
}
