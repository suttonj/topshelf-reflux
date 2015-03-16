 
'use strict';

let Reflux = require('reflux');

// REFLUX actions
let AppActions = Reflux.createActions(
  [
  'loadPage',
  'addItem',
  'removeItem',
  'decreaseItem',
  'increaseItem',
  'pageChange'
  ]
);

module.exports = AppActions;
