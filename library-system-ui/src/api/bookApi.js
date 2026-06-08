import api from "./api";

export const getBooks = () => api.get("/books");

export const createBook = (book) =>
  api.post("/books", book);

export const deleteBook = (id) =>
  api.delete(`/books/${id}`);