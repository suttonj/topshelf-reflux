'use strict';

let Reflux = require('reflux');
let request = require('superagent');
let actions = require('../actions/app-actions');

let ItemStore = Reflux.createStore({

  init() {
    this.data = {
      items: {
        books: [],
        categories: [],
        people: []
      }
    };

    this.listenTo(actions.loadPage, this.loadPage);
  },

  loadPage(itemType,cached) {
    if (!this.data.items[itemType])
      return;
    
    if(cached !== true || this.data.items[itemType].length === 0) {
      request.get('data/' + itemType +'.json')
        .end((err, res) => {
            this.data.items[itemType] = JSON.parse(res.text)[0].items;
            this.trigger(this.data);
        });
    } else {
      this.trigger(this.data);
    }
  },

  getInitialState() {
    return this.data;
  }
});

module.exports = ItemStore;
