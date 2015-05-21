'use strict';

let React = require('react');
let Reflux = require('reflux');


let Items = require('../items/items');

require('./page.css');

// page data
let pages = {
  home : {
    pageClasses : 'page page--home',
    heading : 'Browse Reading Lists by Category'
  },
  categories : {
    pageClasses: 'page page--categories',
    heading: 'Categories'
  },
  people : {
    pageClasses: 'page page--people',
    heading: 'People'
  },
  books : {
    pageClasses: 'page page--books',
    heading: 'Reading List'
  },
};

let Page = React.createClass({
      render: function() {
        let pageName = this.props.params.pathname.slice(1);
        let itemType = pageName;
        if (pageName == null || pageName == "")
          pageName = "home";
        if (pageName == "home")
          itemType = "categories";
        console.log(pageName);
        return (
          <div className='container'>
              <div className={pages[pageName].pageClasses}>
                <h1>{pages[pageName].heading}</h1>
                <Items type={itemType} />
              </div>
          </div>
          );
        }
      });

module.exports = Page;
