
'use strict';

//let React = require('react');
let Reflux = require('reflux');
let request = require('superagent');
let actions = require('../actions/app-actions');
let _ = require('lodash');

let ProductStore = Reflux.createStore({

  init() {
    this.data = {
      products: {
        food: [],
        fashion: []
      }
    };

    this.listenTo(actions.loadPage, this.loadPage);
    //this.listenTo(actions.addItem, this.onAddItem);
    //this.listenTo(actions.removeItem, this.onRemoveItem);
  },

/*  onAddItem(item) {
    console.log('additem');
    var toUpdate = _.findWhere(this.data.products[item.type], { 'id': item.id });
    toUpdate.inBasket = item.inBasket;
    this.trigger(this.data);
    //debugger;
  },*/


  loadPage(productType,cached) {
    if(cached !== true || this.data.products[productType].length === 0) {
      //var productType = arguments[0];
      request.get('data/' + productType +'.json')
        .end((err, res) => {
          this.data.products[productType] = JSON.parse(res.text)[0].products;
          this.trigger(this.data);
        });
    }
  },

  getInitialState() {
    return this.data;
  }
});

module.exports = ProductStore;
