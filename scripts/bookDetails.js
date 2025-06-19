import { fetchBookById } from "./BookServices.mjs";
import { getBookById, saveBook } from "./dataManagement.mjs";
import { renderBookDetails } from "./UserInterface.mjs";

let url = new URL(window.location.href);
const params = new URLSearchParams(url.search);

const categoryRadioButtons = document.querySelectorAll('input[name="category"');

const bookId = params.get("bookId");

displayBookDetails(bookId);

for (let i = 0; i < categoryRadioButtons.length; i++) {
  const radio = categoryRadioButtons[i];
  radio.addEventListener("click", () => {
    saveBook(radio.value, bookId);
  });
}

async function displayBookDetails(bookId) {
  const bookDetails = await fetchBookById(bookId);
  renderBookDetails(bookDetails, "#book-details-container");
}
