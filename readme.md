# Express Booklist!

Using your existing booklist project, you're going to refactor the whole thing into something that can be served by a server, and uses AJAX to make calls to your own API. This is going to happen in stages throughout the second module, and you'll be continually refactoring your code. You'll be pairing with the same person the entire time, so make sure to pair with someone you like.

### Start here

Your first task is to build an application that has full CRUD on books. You should use an instance of `Booklist` as your way of storing book objects. Your server will start with one booklist. You should be using RESTful routing and ensure that you have a catch-all route for 404 errors.

#### Step 1

Start by taking your `Book()` and `Booklist()` classes from your front-end project. Put them in a file called `books.js`. Put that in a folder called `models`. Make sure to export them so that the file can be included on your server.
Make sure your Booklist meets these requirements:
 * `add()` method
 * `finishCurrentBook` method
 * `currentBook`, `previousBook` and `nextBook` properties.
 * array of `Books` is called "`books`", not "`allBooks`"

#### Step 2

Create the routes in the table below. Make sure to use a catchall route (by using `next()`) for anything that requires a 404, so that you results are consistent.

<table class="data-table">
    <tr>
        <th class="border-bottom">Request Method</th>
        <th class="border-bottom">Request URL</th>
        <th class="border-bottom">Response Status</th>
        <th class="border-bottom">Response Content-Type</th>
        <th class="border-bottom">Response Body</th>
    </tr>
    <tr>
        <td>`GET`&nbsp;</td>
        <td>`/books`</td>
        <td>200</td>
        <td>`application/json`</td>
        <td>{<br/>&nbsp; "books": [<br/>&nbsp; &nbsp; &nbsp; {<br/>&nbsp; &nbsp; &nbsp; &nbsp; "title": "Eloquent JS",<br/>&nbsp; &nbsp; &nbsp; &nbsp; "author": "Marijn Haverbeke",<br/>&nbsp; &nbsp; &nbsp; &nbsp; "read": true,&nbsp;<br/>&nbsp; &nbsp; &nbsp; &nbsp; "date": "Tue May 24 2016 15:28:01 GMT-0700 (PDT)"<br/>&nbsp; &nbsp; &nbsp; },<br/>&nbsp; &nbsp; &nbsp; {<br/>&nbsp; &nbsp; &nbsp; &nbsp; "title": "Javascript: The Good Parts",<br/>&nbsp; &nbsp; &nbsp; &nbsp; "author": "Douglas Crockford",<br/>&nbsp; &nbsp; &nbsp; &nbsp; "read": true,&nbsp;<br/>&nbsp; &nbsp; &nbsp; &nbsp; "date": "Tue May 24 2016 17:28:01 GMT-0700 (PDT)"<br/>&nbsp; &nbsp; &nbsp; },<br/>&nbsp; &nbsp; &nbsp; {<br/>&nbsp; &nbsp; &nbsp; &nbsp; "title": "Think Python",<br/>&nbsp; &nbsp; &nbsp; &nbsp; "author": "Allen B. Downey",<br/>&nbsp; &nbsp; &nbsp; &nbsp; "read": false,&nbsp;<br/>&nbsp; &nbsp; &nbsp; &nbsp; "date": null<br/>&nbsp; &nbsp; &nbsp; },<br/>&nbsp; &nbsp; &nbsp; {<br/>&nbsp; &nbsp; &nbsp; &nbsp; "title": "The Art of Deception: Controlling the Human Element of Security",<br/>&nbsp; &nbsp; &nbsp; &nbsp; "author": "Kevin Mitnick",<br/>&nbsp; &nbsp; &nbsp; &nbsp; "read": false,&nbsp;<br/>&nbsp; &nbsp; &nbsp; &nbsp; "date": null<br/>&nbsp; &nbsp; &nbsp; }<br/>&nbsp; &nbsp; ],<br/>&nbsp; &nbsp; "currentBook": "/books/2",<br/>&nbsp; &nbsp; "previousBook": "/books/1",<br/>&nbsp; &nbsp; "nextBook" : "/books/3",<br/>}</td>
    </tr>
    <tr>
        <td class="border-bottom">`GET`&nbsp;</td>
        <td class="border-bottom">`/books/0`</td>
        <td class="border-bottom">200</td>
        <td class="border-bottom">`application/json`</td>
        <td class="border-bottom">{<br/>&nbsp; &nbsp; &nbsp; &nbsp; "title": "Eloquent JS",<br/>&nbsp; &nbsp; &nbsp; &nbsp; "author": "Marijn Haverbeke",<br/>&nbsp; &nbsp; &nbsp; &nbsp; "read": true,&nbsp;<br/>&nbsp; &nbsp; &nbsp; &nbsp; "date": "Tue May 24 2016 15:28:01 GMT-0700 (PDT)"<br/>&nbsp; &nbsp; &nbsp; }</td>
    </tr>
    <tr>
        <td>`GET`&nbsp;</td>
        <td>`/books/1`</td>
        <td>200</td>
        <td>`application/json`</td>
        <td>{<br/>&nbsp; &nbsp; &nbsp; &nbsp; "title": "Javascript: The Good Parts",<br/>&nbsp; &nbsp; &nbsp; &nbsp; "author": "Douglas Crockford",<br/>&nbsp; &nbsp; &nbsp; &nbsp; "read": true,&nbsp;<br/>&nbsp; &nbsp; &nbsp; &nbsp; "date": "Tue May 24 2016 17:28:01 GMT-0700 (PDT)"<br/>&nbsp; &nbsp; &nbsp; }</td>
    </tr>
    <tr>
        <td class="border-bottom">`GET`&nbsp;</td>
        <td class="border-bottom">`/books/next`</td>
        <td class="border-bottom">200</td>
        <td class="border-bottom">`application/json`</td>
        <td class="border-bottom">{<br/>&nbsp; &nbsp; &nbsp; &nbsp; "title": "The Art of Deception: Controlling the Human Element of Security / Edition 1<br/>&nbsp; The Art of Deception: Controlling the Human Element of Security",<br/>&nbsp; &nbsp; &nbsp; &nbsp; "author": "Kevin Mitnick",<br/>&nbsp; &nbsp; &nbsp; &nbsp; "read": false,&nbsp;<br/>&nbsp; &nbsp; &nbsp; &nbsp; "date": null<br/>&nbsp; &nbsp; &nbsp; }</td>
    </tr>
    <tr>
        <td>`GET`&nbsp;</td>
        <td>`/books/current`</td>
        <td>200</td>
        <td>`application/json`</td>
        <td>{<br/>&nbsp; &nbsp; &nbsp; &nbsp; "title": "Think Python",<br/>&nbsp; &nbsp; &nbsp; &nbsp; "author": "Allen B. Downey",<br/>&nbsp; &nbsp; &nbsp; &nbsp; "read": false,&nbsp;<br/>&nbsp; &nbsp; &nbsp; &nbsp; "date": null<br/>&nbsp; &nbsp; &nbsp; }</td>
    </tr>
    <tr>
        <td>`GET`&nbsp;</td>
        <td>`/books/previous`</td>
        <td>200</td>
        <td>`application/json`</td>
        <td>{<br/>&nbsp; &nbsp; &nbsp; &nbsp; "title": "Javascript: The Good Parts",<br/>&nbsp; &nbsp; &nbsp; &nbsp; "author": "Douglas Crockford",<br/>&nbsp; &nbsp; &nbsp; &nbsp; "read": true,&nbsp;<br/>&nbsp; &nbsp; &nbsp; &nbsp; "date": "Tue May 24 2016 17:28:01 GMT-0700 (PDT)"<br/>&nbsp; &nbsp; &nbsp; }</td>
    </tr>
    <tr>
        <td>`GET`&nbsp;</td>
        <td>`/books/37`</td>
        <td>404</td>
        <td>`text/plain`&nbsp;</td>
        <td></td>
    </tr>
</table>

### Getting Started

- Fork and clone, run `npm test` or `mocha` to see the tests. Make sure you install all the necessary dependencies including `mocha`, `chai` and `supertest`

### Bonus

- if you examine all of your views, you will see that you are repeating yourself, research what partials are in express and how to include them - use partials to refactor and clean up your code.
- add an additional route that allows the user to sort all of the books alphabetically

### Super Bonus

Use AJAX and don't do a full page refresh when adding, updating or deleting books. Research `res.json` so that you can respond using json instead of ejs. Once you are rendering JSON, use AJAX to communicate with your server.
