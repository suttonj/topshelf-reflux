'use strict';

let Reflux = require('reflux');
let request = require('superagent');
let actions = require('../actions/app-actions');

let PeopleStore = Reflux.createStore({

  init() {
    //let books = BookApi.getBooks("SteveJobs");
    this.data = {
      people: []
    };
    
    this.listenTo(actions.loadPeopleData, this.loadPeopleData);
  },

  loadPeopleData(category, cached) {
    if(cached !== true || this.data.people.length === 0) {
      request.get('data/seed.json')
        .end((err, res) => {
          this.data.people = JSON.parse(res.text)[0].categories[category].people;
          this.trigger(this.data);
          console.log("Stored " + this.data.people);
        });
    } else {
      this.trigger(this.data);
      console.log("Stored " + this.data.people);
    }
  },

  getInitialState() {
    return this.data;
  }
});

module.exports = PeopleStore;
