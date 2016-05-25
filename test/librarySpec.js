var expect = require('chai').expect;
var code = require('../app');
var bookModels = require('../models/books.js')
var request = require('supertest');
var locus = require("locus");
var books;

before(function() {

  books =  [
    {
      "title": "Eloquent JS",
      "author": "Marijn Haverbeke",
      "read": true,
      "date": "Tue May 24 2016 15:28:01 GMT-0700 (PDT)"
    },
    {
      "title": "Javascript: The Good Parts",
      "author": "Douglas Crockford",
      "read": true,
      "date": "Tue May 24 2016 17:28:01 GMT-0700 (PDT)"
    },
    {
      "title": "Think Python",
      "author": "Allen B. Downey",
      "read": false,
      "date": null
    },
    {
      "title": "The Art of Deception: Controlling the Human Element of Security ",
      "author": "Kevin Mitnick",
      "read": false,
      "date": null
    }
  ]

  code.booklist.add(books[0])
  code.booklist.add(books[1])
  code.booklist.add(books[2])
  code.booklist.add(books[3])
});

after(function() {
   code.booklist = new bookModels.Booklist();
});

describe('GET /', () => {
  it('redirects to /books', (done)=> {
    request(code.app)
      .get('/')
      .end((err, res) => {
        expect(res.status).to.equal(302)
        expect(res.redirect).to.equal(true)
        done();
      })
  })
})

describe('GET /books', () => {
  it('displays all of the books', (done)=> {
    request(code.app)
      .get('/books')
      .expect(200)
      .end((err, res) => {
        expect(res.text.to.contain(JSON.stringify(books.books)))
        expect(res.text.to.contain('/books/2'))
        expect(res.redirect).to.equal(false)
        done();
      })
  })
})


describe('GET books/:id', () => {
  it('responds with the book with the corresponding index - 1', (done)=> {
    request(code.app)
      .get('/books/1')
      .expect(200)
      .end((err, res) => {
        expect(res.text.toLowerCase()).to.contain(books[1].title.toLowerCase())
        // expect(res.text.toLowerCase()).to.contain("douglas crockford")
        // expect(res.text.toLowerCase()).to.contain("may 24")
        done();
      })
  })

  it('responds with the book with the corresponding index - 2', (done)=> {
    request(code.app)
      .get('/books/2')
      .expect(200)
      .end((err, res) => {
        expect(res.text.toLowerCase()).to.contain(books[2].title.toLowerCase())
        // expect(res.text.toLowerCase()).to.contain("douglas crockford")
        // expect(res.text.toLowerCase()).to.contain("may 24")
        done();
      })
  })
})

describe('GET /books/current', () => {
  it('Gives us the book currently being read', (done)=> {
    request(code.app)
      .get('/books/current')
      .end((err, res) => {
        expect(res.status).to.equal(200)
        expect(res.text.toLowerCase()).to.contain("think python")
        expect(res.text.toLowerCase()).to.contain("allen b. downey")
        done();
      })
  })
})

describe('GET /books/next ', () => {
  it('Gives us the book currently being read', (done)=> {
    request(code.app)
      .get('/books/next')
      .end((err, res) => {
        expect(res.status).to.equal(200)
        expect(res.text.toLowerCase()).to.contain("the art of deception")
        expect(res.text.toLowerCase()).to.contain("kevin mitnick")
        done();
      })
  })
})

describe('GET /books/previous', () => {
  it('Gives us the book currently being read', (done)=> {
    request(code.app)
    .get('/books/previous')
    .end((err, res) => {
      expect(res.status).to.equal(200)
      expect(res.text.toLowerCase()).to.contain("the good parts")
      expect(res.text.toLowerCase()).to.contain("douglas crockford")
      done();
    })
  })
})

describe('GET books/37', () => {
  it('renders the not found page', (done)=> {
    request(code.app)
      .get('/books/37')
      .expect(404)
      .end((err, res) => {
        expect(res.text.toLowerCase()).to.contain("not found")
        done();
      })
  })
})

describe('POST /books - BONUS', () => {
  it('creates a book', (done)=> {
    var book = new bookModels.Book({
      title: "New Book",
      author: "Testing"
    });
    request(code.app)
    .post('/books')
    .type('form')
    .send(book)
    .end((err, res) => {
      expect(code.booklist.books[4].title).to.contain(book.title)
      expect(code.booklist.books[4].author).to.contain(book.author)
      expect(code.booklist.books.length).to.equal(5)
      expect(res.redirect).to.equal(true)
      expect(res.status).to.equal(302)
      done();
    })
  })
})

describe('PUT books/:id - BONUS', () => {
  it('updates a book and redirects to /books', (done) => {
    var updatedBook = {
      title: "Updated Book",
      author: "Tester"
    }
    request(code.app)
      .put('/books/1')
      .type('form')
      .send(updatedBook)
      .end((err, res) => {
        expect(code.booklist.books[1].title).to.equal(updatedBook.title)
        expect(code.booklist.books[1].author).to.equal(updatedBook.author)
        expect(code.booklist.books.length).to.equal(5)
        done();
      })
  })
})

describe('DELETE books/:id', () => {
  it('deletes a book and redirects to /books', (done)=> {
    request(code.app)
      .delete('/books/4')
      .end((err, res) => {
        expect(code.booklist.books.length).to.equal(4)
        expect(res.redirect).to.equal(true)
        expect(res.status).to.equal(302)
        done();
      })
  })
})
