 
'use strict';

let React = require('react');
let Reflux = require('reflux');

let Header = require('../header/header');
let Items = require('../products/items');


require('./page.css');

// page data
let pages = {
  pagefood : {
    pageClasses : 'page page--food',
    heading : 'Food'
  },
  pagefashion : {
    pageClasses : 'page page--fashion',
    heading : 'Fashion'
  }
};

let Page = React.createClass({
      render: function() {
        //console.log(this.props.params.id);
        return (
          <div className='container'>
            <Header />
            <div className={pages['page'+this.props.params.id].pageClasses}>
              <h1>{pages['page'+this.props.params.id].heading}</h1>
              <Items type={this.props.params.id} />
            </div>
          </div>

          );
        }
      });

module.exports = Page;
