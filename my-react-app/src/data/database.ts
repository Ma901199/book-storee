export type Book = {
  id: string;
  title: string;
  author: string;
  price: number;
  genre: string;
  pages: number;
  description: string;
  image: string;
};

export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
};

export type Database = {
  users: User[];
  books: Book[];
};

export const initialDatabase: Database = {
  users: [],
  books: [
    {
      id: "1",
      title: "The Hobbit",
      author: "J. R. R. Tolkien",
      price: 14.99,
      genre: "Fantasy",
      pages: 310,
      description: "A hobbit leaves his home for an unforgettable adventure.",
      image: "https://covers.openlibrary.org/b/title/The%20Hobbit-L.jpg"
    },
    {
      id: "2",
      title: "Dune",
      author: "Frank Herbert",
      price: 18.5,
      genre: "Science Fiction",
      pages: 688,
      description: "A young heir discovers his destiny on a desert planet.",
      image: "https://covers.openlibrary.org/b/title/Dune-L.jpg"
    },
    {
      id: "3",
      title: "The Little Prince",
      author: "Antoine de Saint-Exupéry",
      price: 9.99,
      genre: "Classic",
      pages: 96,
      description: "A poetic journey about friendship and imagination.",
      image: "https://covers.openlibrary.org/b/title/The%20Little%20Prince-L.jpg"
    },
    {
      id: "4",
      title: "1984",
      author: "George Orwell",
      price: 12.99,
      genre: "Classic",
      pages: 328,
      description: "A dystopian novel about surveillance and freedom.",
      image: "https://covers.openlibrary.org/b/title/1984-L.jpg"
    },
    {
      id: "5",
      title: "Harry Potter",
      author: "J. K. Rowling",
      price: 16.99,
      genre: "Fantasy",
      pages: 352,
      description: "A young wizard discovers a magical world.",
      image: "https://covers.openlibrary.org/b/title/Harry%20Potter-L.jpg"
    },
    {
      id: "6",
      title: "The Martian",
      author: "Andy Weir",
      price: 15.49,
      genre: "Science Fiction",
      pages: 384,
      description: "An astronaut must survive on Mars using science.",
      image: "https://covers.openlibrary.org/b/title/The%20Martian-L.jpg"
    },
    {
      id: "7",
      title: "Pride and Prejudice",
      author: "Jane Austen",
      price: 10.5,
      genre: "Romance",
      pages: 432,
      description: "A classic story about family and relationships.",
      image: "https://covers.openlibrary.org/b/title/Pride%20and%20Prejudice-L.jpg"
    },
    {
      id: "8",
      title: "The Name of the Wind",
      author: "Patrick Rothfuss",
      price: 17.99,
      genre: "Fantasy",
      pages: 662,
      description: "A gifted musician tells the story of his extraordinary life.",
      image: "https://covers.openlibrary.org/b/title/The%20Name%20of%20the%20Wind-L.jpg"
    },
    {
      id: "9",
      title: "Murder on the Orient Express",
      author: "Agatha Christie",
      price: 11.99,
      genre: "Mystery",
      pages: 256,
      description: "Detective Poirot investigates a murder aboard a train.",
      image: "https://covers.openlibrary.org/b/title/Murder%20on%20the%20Orient%20Express-L.jpg"
    },
    {
      id: "10",
      title: "Atomic Habits",
      author: "James Clear",
      price: 19.99,
      genre: "Non-fiction",
      pages: 320,
      description: "A practical guide to building helpful habits.",
      image: "https://covers.openlibrary.org/b/title/Atomic%20Habits-L.jpg"
    }
  ]
};