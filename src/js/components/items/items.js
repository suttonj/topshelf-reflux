'use strict';

let React = require('react');
let Reflux = require('reflux');

let store = require('../../stores/item-store');
// let bookStore = require('../../stores/book-store');
// let categoryStore = require('../../stores/category-store');
let actions = require('../../actions/app-actions');

let Item = require('./item.js');

let Items = React.createClass({

  mixins: [Reflux.connect(store), Reflux.ListenerMixin],

  refreshPage() {
    debugger;
    this.setState({
      itemType: this.props.type
    });
    actions.pageChange(this.props.type);
  },
  
  refreshBookList() {
    debugger;
    this.setState({
      itemType: this.props.type
    });
  },

  componentDidMount: function() {
    this.listenTo(store, this.refreshPage);
    //this.listenTo(bookStore, this.refreshPage);
    //this.listenTo(categoryStore, this.refreshPage);
    actions.loadPage(this.props.type, true);
    //actions.loadBookList("SteveJobs", true);
    //actions.loadCategoryData("dummy", true);
  },

  render: function() {
    // if (this.props.type == 'books') {
    //   var items = this.state.books.map((item,i) => {
    //     item.type = 'book'
    //     return <Item key={item.id} item={item} index={i} />;
    //   });
    // }
    // else if (this.props.type == 'categories') {
    //   var items = this.state.categories.map((item,i) => {
    //     item.type = 'category'
    //     return <Item key={item.id} item={item} index={i} />;
    //   });
    // }
    // else if (this.props.type == 'people') {
    //   var items = this.state.people.map((item,i) => {
    //     item.type = 'people'
    //     return <Item key={item.id} item={item} index={i} />;
    //   });
    // }
    // else {
      var items = this.state.items[this.props.type].map((item,i) => {
        item.type = this.state.itemType;
        return <Item key={item.id} item={item} index={i} />;
      });
    // }
      return (
        <div>
          <ul component="ul" className="pure-g appItems list-reset">
            {items}
          </ul>
        </div>
     );
  }
});

module.exports = Items;
