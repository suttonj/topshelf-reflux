'use strict';

let React = require('react');
let Reflux = require('reflux');


let Items = require('../items/items');

require('./page.css');

// page data
let pages = {
  food : {
    pageClasses : 'page page--food',
    heading : 'Food'
  },
  fashion : {
    pageClasses : 'page page--fashion',
    heading : 'Fashion'
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
        console.log(pageName);
        return (
          <div className='container'>
              <div className={pages[pageName].pageClasses}>
                <h1>{pages[pageName].heading}</h1>
                <Items type={pageName} />
              </div>
          </div>
          );
        }
      });

module.exports = Page;
