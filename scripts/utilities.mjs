export function shortenWithEllipsis(text, max) {
  if (!text) return "";
  if (text.length <= max) {
    return text;
  }
  return text.substr(0, max - 3) + "...";
}

export async function loadTemplate(path) {
  const response = await fetch(path);
  if (!response.ok) {
    console.error(response);
  }
  const htmlString = await response.text();
  return htmlString;
}
export function getLanguageName(languageCode) {
  const displayLocale = "en";
  try {
    const displayNames = new Intl.DisplayNames([displayLocale], {
      type: "language",
    });
    return displayNames.of(languageCode);
  } catch (error) {
    console.error("Error getting language name:", error);
    return null; // Or handle the error as appropriate
  }
}
