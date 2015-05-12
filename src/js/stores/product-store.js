'use strict';

let Reflux = require('reflux');
let request = require('superagent');
let actions = require('../actions/app-actions');

let ProductStore = Reflux.createStore({

  init() {
    this.data = {
      items: {
        food: [],
        fashion: []
      }
    };

    this.listenTo(actions.loadPage, this.loadPage);
  },

  loadPage(productType,cached) {
    if (!this.data.items[productType])
      return;
      
    if(cached !== true || this.data.items[productType].length === 0) {
      request.get('data/' + productType +'.json')
        .end((err, res) => {
            this.data.items[productType] = JSON.parse(res.text)[0].items;
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

module.exports = ProductStore;
