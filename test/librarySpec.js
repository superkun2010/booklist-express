var expect = require('chai').expect;
var code = require('../app').booklist
var request = require('supertest')
var locus = require("locus")
var booklist;

beforeEach(function() {
  booklist = {
    "books": [
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
  }
  code.books.add(books[0])
  code.books.add(books[1])
  code.books.add(books[2])
  code.books.add(books[3])
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
        read: false,
        id: code.count.val
      }
    }
    request(code.app)
      .post('/books')
      .type('form')
      .send(newBook)
      .end((err, res) => {
        expect(code.books).to.deep.include.members([booklist.books[1],newBook.book])
        expect(code.books.length).to.equal(5)
        expect(res.redirect).to.equal(true)
        expect(res.status).to.equal(302)
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
        expect(res.text.toLowerCase()).to.contain("the good parts")
        expect(res.text.toLowerCase()).to.contain("douglas crockford")
        expect(res.text.toLowerCase()).to.contain("may 24")
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
        expect(code.books).to.deep.include.members([booklist.books[1]])
        expect(res.text.toLowerCase()).to.contain("the good parts")
        expect(res.text.toLowerCase()).to.contain("douglas crockford")
        expect(res.text.toLowerCase()).to.contain("may 24")
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
        id: 1
      }
    }
    request(code.app)
      .put('/books/1')
      .type('form')
      .send(updatedBook)
      .end((err, res) => {
        expect(code.books).to.deep.include.members([updatedBook.book])
        expect(code.books.length).to.equal(4)
        done();
      })
  })
})

describe('DELETE books/:id', () => {
  it('deletes a book and redirects to /books', (done)=> {
    request(code.app)
      .delete('/books/4')
      .end((err, res) => {
        expect(code.books.length).to.equal(4)
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
