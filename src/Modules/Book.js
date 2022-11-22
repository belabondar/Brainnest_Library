export default class Book {
  constructor(title, author, pages, caption, isRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.caption = caption;
    this.isRead = isRead;
    this.element = "";
  }

  setElement(element) {
    this.element = element;
  }
}
