// render book categories

import { fetchBooksBySearchOptions } from "./bookServices.js";
import { renderCategoryShelf, renderSearchResults } from "./userInterface.js";

const searchOptions = {};
const searchForm = document.querySelector("#search-form");
const searchInputs = searchForm.querySelectorAll("input");
const clearButton = searchForm.querySelector("button");

clearButton.addEventListener("click", () => {
  for (const input of searchInputs) {
    input.value = "";
    Object.keys(searchOptions).forEach((key) => (searchOptions[key] = ""));
    renderSearchResults([], "#search-results");
  }
});
for (let i = 0; i < searchInputs.length; i++) {
  const input = searchInputs[i];
  input.addEventListener("input", async () => {
    searchOptions[input.name] = input.value.trim();
    handleSearch();
  });
}

renderCategoryShelf("reading", "#reading-category");
renderCategoryShelf("wishlist", "#wishlist-category");
renderCategoryShelf("completed", "#completed-category");

async function handleSearch() {
  const results = await fetchBooksBySearchOptions(searchOptions);
  renderSearchResults(results, "#search-results");
}
