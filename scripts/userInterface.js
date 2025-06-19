import { fetchBookById } from "./bookServices.js";
import { getBooksByCategory } from "./dataManagement.js";
import { getLanguageName, shortenWithEllipsis } from "./utilities.js";

export function renderCategoryShelf(categoryName, selector) {
  const books = getBooksByCategory(categoryName);
  const container = document.querySelector(selector);
  container.innerHTML = "";

  const title = document.createElement("h2");
  title.textContent = categoryName;
  title.className = "category-title";

  const body = document.createElement("div");
  body.className = "category-body";
  body.innerHTML = "";

  books.forEach(async (book) => {
    const bookData = await fetchBookById(book.id);
    let article = document.createElement("article");
    article.addEventListener("click", () => {
      window.location.href = `/book-details.html?bookId=${book.id}`;
    });
    article.className = "category-book";
    article.innerHTML = `
        <img src="${bookData.imageLinks.thumbnail}">
        <p class="book-title">${shortenWithEllipsis(bookData.title, 15)}</p>
        <p class="book-author">${bookData.authors}</p>
    `;
    body.appendChild(article);
  });

  container.appendChild(title);
  container.appendChild(body);
}

export function renderSearchResults(results, selector) {
  const container = document.querySelector(selector);
  container.innerHTML = "";

  results.forEach((book) => {
    const link = document.createElement("a");
    link.className = "result-book-card";
    link.href = `/book-details.html?bookId=${book.id}`;
    link.innerHTML = `
        <img class="book-cover" width="128" height="195" src=${
          book.imageLinks?.thumbnail
        }>
        <p class="book-title">${book.title}</p>
        <p class="book-subtitle">${shortenWithEllipsis(book.subtitle, 30)}</p>
        <p>
            <span class="book-author">${
              book.authors?.length
                ? shortenWithEllipsis(book.authors[0], 15)
                : ""
            }</span> 
            <span class="book-publish-date">${book.publishedDate}</span>
        </p>
    `;

    container.appendChild(link);
  });
}

export async function loadHeaderFooter() {
  const headerTemplate = `
    <a href="index.html" class="header-brand">
      <img src="images/logo-light.png" alt="Bookshelf logo" />
      Bookshelf
    </a>
    <a class="profile-link" href="profile.html">
    <img src="images/user.png" alt="" />
    </a>
  `;
  const footerTemplate = `&copy; 2025 Bookshelf`;

  const header = document.querySelector("header");
  const footer = document.querySelector("footer");

  header.innerHTML = headerTemplate;
  footer.innerHTML = footerTemplate;
}

export function renderBookDetails(bookData, selector) {
  const container = document.querySelector(selector);

  container.innerHTML = `
    <img src="${bookData.imageLinks?.small || bookData.imageLinks?.thumbnail}" 
      alt="book cover for ${bookData.title}"/>
    <div>
      <h1 class="book-title">${bookData.title}</h1>
      <p class="book-subtitle">${bookData.subtitle || ""}</p>
      <div class="book-description">${bookData.description}</div>
      <p>Authors: <span class="book-authors">${bookData.authors}</span></p>
      <p>Publisher: <span class="book-publisher">${
        bookData.publisher
      }</span></p>
      <p>Published ${new Date(bookData.publishedDate).getFullYear()}</p>
      <span class="pill">${getLanguageName(bookData.language)}</span>
      <div>
        ${bookData.categories
          .slice(0, 3)
          .map((item) => `<span class="pill">${item}</span>`)
          .join(" ")}
      </div>
  `;
}
