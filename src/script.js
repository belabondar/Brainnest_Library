import Library from "./Modules/Library.js";

let bookShelf = document.getElementsByClassName("bookWrapper")[0];

let input = document.getElementsByClassName("bookForm")[0];
input.addEventListener("submit", addBook);

let library = new Library(bookShelf);

function addBook(event) {
  event.preventDefault();
  let author = input[0].value;
  let title = input[1].value;
  let pages = input[2].value;
  let caption = input[3].value;
  let isRead = input[4].checked;
  renderBook(library.addBook(title, author, pages, caption, isRead));
}

//Had an issue doing this in the library class
function renderBook(index) {
  let book = library.books[index];
  let { title, author, caption, pages, isRead } = book;

  let bookCard = document.createElement("article");

  let content = document.createElement("div");
  content.classList.add("content");
  if (isRead) bookCard.classList.add("read");

  let top = document.createElement("div");
  top.classList.add("flex");
  let dTitle = document.createElement("h3");
  dTitle.innerText = title;
  let deleteButton = document.createElement("button");
  deleteButton.classList.add("material-symbols-rounded", "delete");
  deleteButton.innerText = "delete";
  deleteButton.onclick = function () {
    library.removeBook(index);
  };

  let dAuthor = document.createElement("h4");
  dAuthor.innerText = author;
  let dCaption = document.createElement("p");
  dCaption.innerText = caption;

  let bottom = document.createElement("div");
  bottom.classList.add("flex");
  let dPages = document.createElement("p");
  dPages.innerText = `Pages: ${pages}`;

  let button = document.createElement("button");
  button.classList.add("material-symbols-rounded");
  button.innerText = isRead ? "close" : "done";
  button.onclick = function () {
    library.toggleIsRead(index);
  };

  top.append(dTitle, deleteButton);
  bottom.append(dPages, button);
  content.append(top, dAuthor, dCaption, bottom);
  bookCard.appendChild(content);

  bookShelf.appendChild(bookCard);
  book.setElement(bookCard);
}
