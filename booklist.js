// ============================================================
// PLACE YOUR CODE HERE, IF YOU HAVE NOT FINISHED THE BOOKLIST
// PREVIOUSLY, COMPLETE THE FOLLOWING FUNCTIONS
// ============================================================
 
/** 
 * New BookLists start out empty, so we set the values directly
 * without accepting any parameters.
 */
var BookList = function() {

}

/**
 * Given a Book as a parameter, add it to our booklist. If the
 * book has already been read, then we just add it to this.books.
 * If it has not, we may set it to be the currentBook or nextBook
 * if those values are unset. 
 */
BookList.prototype.add = function(book) {

}

BookList.prototype.finishCurrentBook = function() {

}

/**
 * A new Book must be given some parameters to create a specific
 * book. title, genre, and author must all be strings. 
 * read must be a boolean. 
 * readDate must be a date or null
 *
 * If read is true, then readDate must be a date - otherwise
 * it will be set to right now. 
 */
var Book = function(title, genre, author, read, readDate) {

}

module.exports = {
    Book: Book,
    BookList: BookList
}