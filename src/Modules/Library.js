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
    book.isRead ? (this.readBooks -= 1) : (this.openBooks -= 1);
    this.totalBooks -= 1;
    book.element.remove();
  }

  inLibrary(book) {
    let compareValues = ["author", "title", "pages"];

    for (let x = 0; x < this.totalBooks; x++) {
      let matches = 0;
      let libraryBook = this.books[x];
      for (let i = 0; i < compareValues.length; i++) {
        if (book[compareValues[i]] === libraryBook[compareValues[i]]) {
          matches += 1;
        }
      }
      if (matches === compareValues.length) {
        return true;
      }
    }
    return false;
  }

  toggleIsRead(book) {
    book.isRead = !book.isRead;
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
