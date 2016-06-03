
var BookList = function (config) {
	if (!config) {
		config = {};
	}
	this.booksRead = config.booksRead || 0;
	this.booksNotRead = config.booksNotRead || 0;
	this.nextBook = config.nextBook || null;
	this.currentBook = config.currentBook || null;
	this.lastBook = config.lastBook || null;
	this.allBooks = config.allBooks || new Array; 
	
//handles cases where config.allBooks provides an array of books
	for (var i = 0; i < this.allBooks.length; i++) {
		if (this.allBooks[i].haveRead) {
			this.booksRead++;
		} else {
			this.booksNotRead++;
		}
	}
}

BookList.prototype.add = function (book) {
	this.allBooks.push(book);
	if (!this.currentBook && !book.haveRead) {
		this.currentBook = book;
		this.booksNotRead++;
	} else if (!this.nextBook && !book.haveRead) {
		this.nextBook = book;
		this.booksNotRead++;
	} else if (book.haveRead) {
		this.booksRead++;
	} else {
		this.booksNotRead++;
	}
}	

BookList.prototype.finishCurrentBook = function () {
	this.currentBook.haveRead = true;
	this.currentBook.readDate = new Date();
	this.lastBook = this.currentBook;
	this.currentBook = this.nextBook;
	this.booksRead++
	this.booksNotRead--
	for (var i = 0; i < this.allBooks.length; i++) {
		if (!this.allBooks[i].haveRead) {
			this.nextBook = this.allBooks[i];
			break;
		}
	}
}

var Book = function (config) {
	if (!config) {
		config = {};
	}
	this.title = config.title || null;
	this.genre = config.genre || null;
	this.author = config.author || null;
	this.haveRead = config.haveRead || false;
	this.readDate = config.readDate || null;
}


// var kunsBookList = new BookList({});
// var bookOne = new Book({});
// kunsBookList.add(bookOne);
// kunsBookList.finishCurrentBook();