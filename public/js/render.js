

// //Create a new BookList
// var kunsList = new BookList ();
// //Create some Books
// kunsList.add({title:"the programming adventures of Kun", genre:"fiction", author:"Kun Hsu", read: true})
// kunsList.add({title:"good morning computer", genre:"non-fiction", author:"Kun Hsu"})
// kunsList.add({title:"try and catch this error", genre:"fiction", author:"Kun Hsu"})
// //Add the Books to the BookList



$.ajax({
  url: 'http://localhost:8080/books',
  method: 'GET',
  success: function (data) {
    console.log(data);
    var bookListContent = document.getElementsByClassName('bookListContents');
    var bookListUl = document.createElement('ul');
    bookListContent[0].appendChild(bookListUl);
    for (var i =0; i<data.length; i++) {
      var eachBook = document.createElement('li');
      if (data[i].read) {
        eachBook.style.textDecoration = "line-through";
      }
      var eachTitle = document.createElement('strong');
      eachTitle.innerText = data[i].title + ' -- ';
      eachBook.appendChild(eachTitle);
      var eachAuthor = document.createElement('em');
      eachAuthor.innerText = data[i].author;
      eachBook.appendChild(eachAuthor);
      bookListUl.appendChild(eachBook);
    }
  }
});


