
'use strict';

let Reflux = require('reflux');

// REFLUX actions
let AppActions = Reflux.createActions(
  [
  'loadPage',
  'addItem',
  'removeItem',
  'pageChange',
  
  'loadCategoryData',
  'loadBookList'
  ]
);

module.exports = AppActions;
