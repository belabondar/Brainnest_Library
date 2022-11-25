import Book from "./Book.js";

//Helper class to deal with books
export default class Library {
  constructor() {
    this.totalBooks = 0;
    this.readBooks = 0;
    this.openBooks = 0;
  }

  createBook(title, author, pages, caption, isRead) {
    let newBook = new Book(title, author, pages, caption, isRead);
    this.totalBooks += 1;
    isRead ? (this.readBooks += 1) : (this.openBooks += 1);
    return newBook;
  }

  removeBook(book) {
    book.isRead ? (this.readBooks -= 1) : (this.openBooks -= 1);
    this.totalBooks -= 1;
    book.element.remove();
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
