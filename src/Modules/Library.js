import Book from "./Book.js";

export default class Library {
  constructor(container) {
    this.books = [];
    this.totalBooks = 0;
    this.readBooks = 0;
    this.openBooks = 0;
    this.container = container;
  }

  addBook(title, author, pages, caption, isRead) {
    let newBook = new Book(title, author, pages, caption, isRead);
    this.books.push(newBook);
    this.totalBooks += 1;
    isRead ? (this.readBooks += 1) : (this.openBooks += 1);
    this.renderBook(this.totalBooks - 1);
  }

  removeBook(index) {
    this.books[index].isRead ? (this.readBooks -= 1) : (this.openBooks -= 1);
    this.books.splice(index, 1);
    this.totalBooks -= 1;
  }

  toggleIsRead(index) {
    console.log(index);
    let book = this.books[index];
    book.isRead = !this.books[index].isRead;
    if (book.isRead) {
      book.element
        .getElementsByClassName("content")[0]
        .setAttribute("data-read", "");
      book.element.getElementsByClassName(
        "material-symbols-rounded"
      ).innerText = "close";
    } else {
      book.element
        .getElementsByClassName("content")[0]
        .removeAttribute("data-read");
      book.element.getElementsByClassName(
        "material-symbols-rounded"
      ).innerText = "done";
    }
  }

  renderBook(index) {
    let book = this.books[index];
    let { title, author, caption, pages, isRead } = book;
    console.log(isRead);

    let bookCard = document.createElement("article");

    let content = document.createElement("div");
    content.classList.add("content");
    if (isRead) content.setAttribute("data-read", "");

    let dTitle = document.createElement("h3");
    dTitle.innerText = title;
    let dAuthor = document.createElement("h4");
    dAuthor.innerText = author;
    let dCaption = document.createElement("p");
    dCaption.innerText = caption;

    let bottom = document.createElement("div");
    bottom.classList.add("bottom");
    let dPages = document.createElement("p");
    dPages.innerText = `Pages: ${pages}`;

    let button = document.createElement("button");
    button.classList.add("material-symbols-rounded");
    button.innerText = isRead ? "close" : "done";
    button.onclick = function () {
      this.toggleIsRead(index);
    };

    bottom.append(dPages, button);
    content.append(dTitle, dAuthor, dCaption, bottom);
    bookCard.appendChild(content);

    this.container.appendChild(bookCard);
    book.setElement(bookCard);
  }
}
