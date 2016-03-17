var expect = require('chai').expect;
var code = require('../app')
var request = require('supertest')
var locus = require("locus")
var initialBook;

beforeEach(function() {
  initialBook = {
    title: "Great Gatsby",
    author: "F Scott Fitzgerald",
    year: 1954,
    id: code.count.val
  }
  code.books.push(initialBook)
  code.count.val++
});

afterEach(function() {
   code.count.val = 1
   code.books.shift();
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
        expect(res.redirect).to.equal(false)
        done();
      })
  })
})

describe('POST /books', () => {
  it('creates a book', (done)=> {
    var newBook = {
      book: {
        title: "New Book",
        author: "Testing",
        year: "2015",
        id: code.count.val
      }
    }
    request(code.app)
      .post('/books')
      .type('form')
      .send(newBook)
      .end((err, res) => {
        expect(code.books).to.deep.include.members([initialBook,newBook.book])
        expect(code.books.length).to.equal(2)
        expect(code.count.val).to.equal(3)
        expect(res.redirect).to.equal(true)
        expect(res.status).to.equal(302)
        code.books.pop(); // remove the book we just made for testing
        done();
      })
  })
})

describe('GET books/:id', () => {
  it('renders the show page', (done)=> {
    request(code.app)
      .get('/books/1')
      .expect(200)
      .end((err, res) => {
        expect(res.text.toLowerCase()).to.contain("great gatsby")
        expect(res.text.toLowerCase()).to.contain("f scott fitzgerald")
        expect(res.text.toLowerCase()).to.contain("1954")
        done();
      })
  })
})

describe('GET books/:id/edit', () => {
  it('renders the edit page', (done)=> {
    request(code.app)
      .get('/books/1/edit')
      .expect(200)
      .end((err, res) => {
        expect(code.books).to.deep.include.members([initialBook])
        expect(res.text.toLowerCase()).to.contain("great gatsby")
        expect(res.text.toLowerCase()).to.contain("f scott fitzgerald")
        expect(res.text.toLowerCase()).to.contain("1954")
        done();
      })
  })
})

describe('PUT books/:id', () => {
  it('updates a book and redirects to /books', (done) => {
    var updatedBook = {
      book: {
        title: "Updated Book",
        author: "Tester",
        year: "1974",
        id: 1
      }
    }
    request(code.app)
      .put('/books/1')
      .type('form')
      .send(updatedBook)
      .end((err, res) => {
        expect(code.books).to.deep.include.members([updatedBook.book])
        expect(code.books.length).to.equal(1)
      done();
      })
  })
})

describe('DELETE books/:id', () => {
  it('deletes a book and redirects to /books', (done)=> {
    request(code.app)
      .delete('/books/1')
      .end((err, res) => {
        expect(code.books.length).to.equal(0)
      done();
      })
  })
})

describe('GET /random', () => {
  it('renders the 404 page', (done)=> {
    request(code.app)
      .get('/awesome')
      .end((err, res) => {
        expect(res.status).to.equal(404)
        expect(res.redirect).to.equal(false)
        done();
      })
  })
})