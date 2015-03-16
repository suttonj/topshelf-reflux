
'use strict';

let React = require('react');
let Reflux = require('reflux');

let basketStore = require('../../stores/basket-store');
let actions = require('../../actions/app-actions');

let AddToBasket = require('../basket/add-to-basket.js');
let RemoveFromBasket = require('../basket/remove-from-basket.js');

require('./basket.css');

let Basket = React.createClass({

  mixins: [Reflux.connect(basketStore), Reflux.ListenerMixin],

  getBasketTotals() {
    return basketStore.getBasketTotals();
  },

  getBasketData() {
    return basketStore.getBasketData();
  },

  onBasketChange() {
    this.setState(this.getBasketTotals());
  },

  componentDidMount() {
    this.setState(this.getBasketTotals());
    this.listenTo(actions.addItem, this.onBasketChange);
    this.listenTo(actions.removeItem, this.onBasketChange);
  },

  render() {
    var statusClassName = this.state.qty === 0 ? 'appBasket--is-empty ' : '';
    var list = this.getBasketData().map((item,n)=> {
      return (
        <li key={n} className="pure-g">
          <div className="pure-u-2-5">{item.name} | £{item.price}</div>
          <div className="pure-u-1-5 appBasket-qty">x {item.qty}</div>
          <div className="pure-u-1-5">
            <AddToBasket text="+" item={item} />
            <RemoveFromBasket item={item} />
          </div>
        </li>);
    });
    return (
      <div className={"appBasket pure-u-1 pure-u-md-1-3 " + statusClassName}>
        <span className="appBasket-label">Basket</span>
        <span className="appBasket-nrItems">{this.state.qty}</span>
        <span className="appBasket-total">£{this.state.total}</span>
        <ul className="basketList list-reset">{list}</ul>
      </div>
    );
  }
});

module.exports = Basket;
