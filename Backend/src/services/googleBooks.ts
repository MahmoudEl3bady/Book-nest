export const getGoogleBooks = async (
  API_KEY: string,
  options: {
    query?: string;
    maxResults?: number;
    startIndex?: number;
    orderBy?: string;
    langRestrict?: string;
  }
) => {
  try {
    const {
      query = "",
      maxResults = 40,
      startIndex = 0,
      orderBy = "relevance",
      langRestrict = "en",
    } = options;
    const response = await fetch(
      `https://www.googleapis.com/books/v1/volumes?q=${query}&maxResults=${maxResults}&startIndex=${startIndex}&orderBy=${orderBy}&langRestrict=${langRestrict}&key=${API_KEY}`
    );
    const data = await response.json();
    if (!data.items) {
      return [];
    }
    return data.items.map((item: any) => ({
      googleBooksId: item.id,
      title: item.volumeInfo.title,
      authors: item.volumeInfo.authors || [],
      description: item.volumeInfo.description || "",
      categories: item.volumeInfo.categories || [],
      averageRating: item.volumeInfo.averageRating || 0,
      ratingsCount: item.volumeInfo.ratingsCount || 0,
      imageLinks: item.volumeInfo.imageLinks || {},
      publishedDate: item.volumeInfo.publishedDate,
      publisher: item.volumeInfo.publisher || "",
      pageCount: item.volumeInfo.pageCount || 0,
      isbn: item.volumeInfo.industryIdentifiers
        ? item.volumeInfo.industryIdentifiers.find(
            (id: any) => id.type === "ISBN_13"
          )?.identifier ||
          item.volumeInfo.industryIdentifiers.find(
            (id: any) => id.type === "ISBN_10"
          )?.identifier
        : null,
    }));
  } catch (error) {
    console.error("Error fetching data from Google Books API:", error);
    throw error;
  }
};

// Function to populate your database with popular books by genre/category
export async function fetchBooksByCategory(
  category: string,
  apiKey: string,
  count: number = 100
) {
  const booksData: any[] = [];
  const batchSize = 40; // Max allowed by API
  const iterations = Math.ceil(count / batchSize);

  for (let i = 0; i < iterations; i++) {
    const startIndex = i * batchSize;
    const maxResults = Math.min(batchSize, count - startIndex);

    const books = await getGoogleBooks(apiKey, {
      query: `subject:${category}`,
      startIndex,
      maxResults,
      orderBy: "relevance",
    });

    booksData.push(...books);

    // Prevent rate limiting
    if (i < iterations - 1) {
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
  }

  return booksData;
}

export async function populateDatabase(apiKey: string) {
  const categories = [
    "fiction",
    "fantasy",
    "science fiction",
    "mystery",
    "thriller",
    "romance",
    "biography",
    "history",
    "self-help",
    "business",
    "poetry",
    "young adult",
  ];

  const allBooks: any[] = [];

  for (const category of categories) {
    console.log(`Fetching books in category: ${category}`);
    const books = await fetchBooksByCategory(category, apiKey, 100);
    allBooks.push(...books);

    // Prevent rate limiting
    await new Promise((resolve) => setTimeout(resolve, 2000));
  }

  return allBooks;
}
