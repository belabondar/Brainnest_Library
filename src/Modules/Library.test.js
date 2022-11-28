import Book from "./Book";
import Library from "./Library.js";

let title = "Title";
let author = "Author";
let pages = 5;
let caption = "String";
let isRead = true;

let book = new Book(title, author, pages, caption, isRead);

//Create book
test("Adding a book to library should return the book", () => {
  let library = new Library();
  expect(
    library.createBook(title, author, pages, caption, isRead)
  ).toStrictEqual(book);
});

test(`Adding a already existing book to the library should return null`, () => {
  let library = new Library();
  library.createBook(title, author, pages, caption, isRead);
  expect(library.createBook(title, author, pages, caption, isRead)).toBeNull();
});

//Remove Book
test(`remove book should remove the book from the book array`, () => {
  let library = new Library();
  library.createBook(title, author, pages, caption, isRead);
  library.removeBook(book);
  expect(library.books.length).toBe(0);
});

test(`remove book should reduce the amount of books in library by one`, () => {
  let library = new Library();
  library.createBook(title, author, pages, caption, isRead);
  let oldTotal = library.totalBooks;
  library.removeBook(book);
  expect(library.totalBooks).toBe(oldTotal - 1);
});

test(`remove book should only remove existing books`, () => {
  let library = new Library();
  library.createBook(title, author, pages, caption, isRead);
  let oldTotal = library.totalBooks;

  let bookCopy = structuredClone(book);
  bookCopy.author = "me";

  library.removeBook(bookCopy);

  expect(library.totalBooks).toBe(oldTotal);
});

//book compare methods
test(`comparing the same book should result in true`, () => {
  let library = new Library();
  expect(library.equalsBook(book, book)).toBeTruthy();
});

test(`comparing two different books should result in false`, () => {
  let library = new Library();
  let newBook = new Book("Test", "Test", 5);
  expect(library.equalsBook(book, newBook)).toBeFalsy();
});

test(`comparing two books passing only the required keys to match should only match those keys`, () => {
  let library = new Library();
  let newBook = new Book(title, author, pages, "new caption");
  expect(
    library.equalsBookRestricted(book, newBook, ["title", "author", "pages"])
  ).toBeTruthy();
});

test(`comparing two books with requirements array should return false if the required values dont match`, () => {
  let library = new Library();
  let newBook = new Book(title, "Test", pages, "new caption");
  expect(
    library.equalsBookRestricted(book, newBook, ["title", "author", "pages"])
  ).toBeFalsy();
});

//In Library
test(`return true if a book with the same title, author and pages is already in the library`, () => {
  let library = new Library();
  library.createBook(title, author, pages, caption, isRead);
  expect(library.inLibrary(book)).toBeTruthy();
});

test(`return false there is no book with the same title, author and pages in the library`, () => {
  let library = new Library();
  expect(library.inLibrary(book)).toBeFalsy();
});

//findInLibrary
test(`if the book exists in the library, return the index`, () => {
  let library = new Library();
  library.createBook(title, author, pages, caption, isRead);
  expect(library.findInLibrary(book)).toBe(0);
});

test(`if the book doesnt exist in the library, return -1`, () => {
  let library = new Library();
  expect(library.findInLibrary(book)).toBe(-1);
});

//Toggle is Read
test(`if isRead is a boolean, revert it`, () => {
  let library = new Library();
  let newBook = structuredClone(book);
  newBook.isRead = true;
  library.toggleIsRead(newBook);
  expect(newBook.isRead).toBe(false);
});

test(`if isRead is not a boolean, do nothing`, () => {
  let library = new Library();
  let newBook = structuredClone(book);
  newBook.isRead = "Test";
  let oldValue = newBook.isRead;
  library.toggleIsRead(newBook);
  expect(newBook.isRead).toBe(oldValue);
});
