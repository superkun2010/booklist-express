
var BookList = function (config) {
	if (!config) {
		config = {};
	}
	this.booksRead = config.booksRead || 0;
	this.booksNotRead = config.booksNotRead || 0;
	this.nextBook = config.nextBook || null;
	this.currentBook = config.currentBook || null;
	this.previousBook = config.previousBook || null;
	this.books = config.books || new Array; 
	
//handles cases where config.books provides an array of books
	for (var i = 0; i < this.books.length; i++) {
		if (this.books[i].read) {
			this.booksRead++;
		} else {
			this.booksNotRead++;
		}
	}
}

BookList.prototype.add = function (book) {
	this.books.push(book);
	if (!this.currentBook && !book.read) {
		this.currentBook = book;
		this.booksNotRead++;
	} else if (!this.nextBook && !book.read) {
		this.nextBook = book;
		this.booksNotRead++;
	} else if (book.read) {
		this.booksRead++;
	} else {
		this.booksNotRead++;
	}
}	

BookList.prototype.finishCurrentBook = function () {
	this.currentBook.read = true;
	this.currentBook.readDate = new Date();
	this.previousBook = this.currentBook;
	this.currentBook = this.nextBook;
	this.booksRead++
	this.booksNotRead--
	for (var i = 0; i < this.books.length; i++) {
		if (!this.books[i].read) {
			this.nextBook = this.books[i];
			break;
		}
	}
}

module.exports = {
	BookList: BookList,
};