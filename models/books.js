var Book = function (config) {
	if (!config) {
		config = {};
	}
	this.title = config.title || null;
	this.genre = config.genre || null;
	this.author = config.author || null;
	this.read = config.read || false;
	this.readDate = config.readDate || null;
}

module.exports = {
	Book: Book
};
// var kunsBookList = new BookList({});
// var bookOne = new Book({});
// kunsBookList.add(bookOne);
// kunsBookList.finishCurrentBook();