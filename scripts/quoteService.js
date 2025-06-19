const QUOTE_API = "https://favqs.com/api/qotd";

export async function fetchQuoteOfTheDay() {
  try {
    const response = await fetch(QUOTE_API);
    if (!response.ok) {
      const jsonResponse = await response.json();
      console.log({ error: jsonResponse });
      return {
        tags: ["change", "work"],
        favorites_count: 2,
        author: "Peter Drucker",
        body: "Company cultures are like country cultures. Never try to change one. Try, instead, to work with what you've got.",
      };
    }
    const result = await response.json();
  } catch (error) {
    return {
      tags: ["change", "work"],
      favorites_count: 2,
      author: "Peter Drucker",
      body: "Company cultures are like country cultures. Never try to change one. Try, instead, to work with what you've got.",
    };
  }
}
