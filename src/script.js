import Library from "./Modules/Library.js";

let bookShelf = document.getElementsByClassName("bookWrapper")[0];

let input = document.getElementsByClassName("bookForm")[0];
console.log(input);
input.addEventListener("submit", addBook);

let library = new Library(bookShelf);

function addBook(event) {
  event.preventDefault();
  let author = input[0].value;
  let title = input[1].value;
  let pages = input[2].value;
  let caption = input[3].value;
  let isRead = input[4].checked;
  library.addBook(title, author, pages, caption, isRead);
  return false;
}
