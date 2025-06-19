const GOOGLE_API = "https://www.googleapis.com/books/v1/volumes";

export async function fetchBookById(id) {
  const response = await fetch(`${GOOGLE_API}/${id}`);
  if (!response.ok) {
    const jsonResponse = await response.json();
    throw { name: "bookServiceError", message: jsonResponse };
  }
  const result = await response.json();
  return { ...result.volumeInfo, id: result.id };
}
export async function fetchBooksBySearchOptions(searchOptions) {
  const { title, author, category, publisher, isbn } = searchOptions;

  let queryString = "q=";
  if (title) {
    queryString += `intitle:${title}+`;
  }
  if (author) {
    queryString += `inauthor:${author}+`;
  }
  if (category) {
    queryString += `subject:${category}+`;
  }
  if (publisher) {
    queryString += `inpublisher:${publisher}+`;
  }
  if (isbn) {
    queryString += `isbn:${isbn}`;
  }

  if (queryString == "q=") return [];

  const response = await fetch(`${GOOGLE_API}?${queryString}`);
  if (!response.ok) {
    const jsonResponse = await response.json();
    throw { name: "bookServiceError", message: jsonResponse };
  }
  const result = await response.json();
  if (!result.items) return [];
  return result.items.map((item) => ({ ...item.volumeInfo, id: item.id }));
}
