import { createSlice, createSelector } from "@reduxjs/toolkit";
import booksData from "../booksDatabase/booksDatabase.json";

const initialState = {
  books: booksData,
};

const booksSlice = createSlice({
  name: "books",
  initialState,
  reducers: {},
});

export const selectBooks = (state) => state.books.books;

export const selectHorrorBooks = createSelector(
  [selectBooks],
  (books) => books.filter((book) => book.genre === "Horror")
);

export const selectFantasyBooks = createSelector(
  [selectBooks],
  (books) => books.filter((book) => book.genre === "Fantasy")
);

export const selectScienceFictionBooks = createSelector(
  [selectBooks],
  (books) => books.filter((book) => book.genre === "Science Fiction")
);

export default booksSlice.reducer;
