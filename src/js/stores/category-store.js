'use strict';

let Reflux = require('reflux');
let request = require('superagent');
let actions = require('../actions/app-actions');

let CategoryStore = Reflux.createStore({

  init() {
    //let books = BookApi.getBooks("SteveJobs");
    this.data = {
      categories: []
    };
    
    this.listenTo(actions.loadCategoryData, this.loadCategoryData);
  },

  loadCategoryData(cat, cached) {
    if(cached !== true || this.data.categories.length === 0) {
      request.get('data/categories.json')
        .end((err, res) => {
          this.data.categories = JSON.parse(res.text)[0].categories;
          this.trigger(this.data);
          console.log("Stored " + this.data.categories);
        });
    } else {
      this.trigger(this.data);
      console.log("Stored " + this.data.categories);
    }
  },

  getInitialState() {
    return this.data;
  }
});

module.exports = CategoryStore;
