'use strict';

let Reflux = require('reflux');
let request = require('superagent');
let actions = require('../actions/app-actions');
let BookApi = require('../api/books');

let BookStore = Reflux.createStore({

  init() {
    //let books = BookApi.getBooks("SteveJobs");
    this.data = {
      books: []
    };
    
    this.listenTo(actions.loadBookList, this.loadBookList);
  },

  loadBookList(name, cached) {
    if(cached !== true || this.data.books.length === 0 || this.data.books[name].length === 0) {
      let books = BookApi.getBooks(name);
      request.get('data/books.json')
        .end((err, res) => {
          this.data.books = JSON.parse(res.text)[0].books[name];
          this.trigger(this.data);
          console.log("Stored " + this.data.books);
        });
    } else {
      this.trigger(this.data);
      console.log("Stored " + this.data.books);
    }
  },

  getInitialState() {
    return this.data;
  }
});

module.exports = BookStore;
