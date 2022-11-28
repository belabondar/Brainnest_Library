import Book from "./Book.js";

//Helper class to deal with books
export default class Library {
  constructor() {
    this.books = [];
    this.totalBooks = 0;
    this.readBooks = 0;
    this.openBooks = 0;
  }

  createBook(title, author, pages, caption, isRead) {
    let newBook = new Book(title, author, pages, caption, isRead);
    if (!this.inLibrary(newBook)) {
      this.books.push(newBook);
      this.totalBooks += 1;
      isRead ? (this.readBooks += 1) : (this.openBooks += 1);
      return newBook;
    } else {
      return null;
    }
  }

  removeBook(book) {
    let bookIndex = this.findInLibrary(book);
    if (bookIndex === -1) {
      return;
    }

    book.isRead ? (this.readBooks -= 1) : (this.openBooks -= 1);
    this.books.splice(bookIndex, 1);
    this.totalBooks -= 1;
    if (book.element) book.element.remove();
  }

  inLibrary(book) {
    let compareValues = ["author", "title", "pages"];

    for (let x = 0; x < this.books.length; x++) {
      let libraryBook = this.books[x];
      if (this.equalsBookRestricted(libraryBook, book, compareValues))
        return true;
    }
    return false;
  }

  findInLibrary(book) {
    for (let x = 0; x < this.totalBooks; x++) {
      let libraryBook = this.books[x];
      if (this.equalsBook(libraryBook, book)) {
        return x;
      }
    }
    return -1;
  }

  equalsBook(book1, book2) {
    for (let [key] of Object.entries(book1)) {
      if (book1[key] !== book2[key]) return false;
    }
    return true;
  }

  equalsBookRestricted(book1, book2, restriction) {
    for (let key of restriction) {
      if (book1[key] !== book2[key]) return false;
    }
    return true;
  }

  toggleIsRead(book) {
    if (typeof book.isRead !== "boolean") return;
    book.isRead = !book.isRead;

    //If html element is not set properly
    if (book.element.classList === undefined) return;
    if (book.isRead) {
      book.element.classList.add("read");
      book.element.getElementsByClassName(
        "material-symbols-rounded"
      )[1].innerText = "close";
    } else {
      book.element.classList.remove("read");
      book.element.getElementsByClassName(
        "material-symbols-rounded"
      )[1].innerText = "done";
    }
  }
}
