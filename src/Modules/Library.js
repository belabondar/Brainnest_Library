import Book from "./Book.js";

export default class Library {
  constructor() {
    this.books = [];
    this.totalBooks = 0;
    this.readBooks = 0;
    this.openBooks = 0;
  }

  addBook(title, author, pages, caption, isRead) {
    let newBook = new Book(title, author, pages, caption, isRead);
    this.books.push(newBook);
    this.totalBooks += 1;
    isRead ? (this.readBooks += 1) : (this.openBooks += 1);
    return this.totalBooks - 1;
  }

  removeBook(index) {
    let book = this.books[index];
    book.isRead ? (this.readBooks -= 1) : (this.openBooks -= 1);
    this.books.splice(index, 1);
    this.totalBooks -= 1;
    book.element.remove();
  }

  toggleIsRead(index) {
    let book = this.books[index];
    book.isRead = !this.books[index].isRead;
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
