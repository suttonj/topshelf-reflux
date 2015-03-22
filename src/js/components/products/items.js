
'use strict';

let React = require('react');
let Reflux = require('reflux');
let ReactCSSTransitionGroup = require('react/lib/ReactCSSTransitionGroup');

let store = require('../../stores/product-store');
let actions = require('../../actions/app-actions');

let Item = require('./item.js');

let Items = React.createClass({

  mixins: [Reflux.connect(store), Reflux.ListenerMixin],

  refreshPage() {
    this.setState({productType: this.props.type});
  },

  componentDidMount: function() {
    this.listenTo(store, this.refreshPage);
    actions.loadPage(this.props.type);
  },

  componentWillReceiveProps: function(nextProps) {
    if(typeof(nextProps.type) !== "undefined") {
      console.log('nextProps.type',nextProps.type);
      this.setState({productType: nextProps.type});
      actions.pageChange(nextProps.type);
      actions.loadPage(nextProps.type,true);
     }
  },

  render: function() {
      //console.log( this.state.productType);

      var items = this.state.products[this.props.type].map((item,i) => {
          item.type = this.state.productType;
          return <Item key={item.id} item={item} index={i} />;
        });
        return (
          <div>
            <ReactCSSTransitionGroup component="ul" className="pure-g appItems list-reset"  transitionName="example">
            {items}
          </ReactCSSTransitionGroup>
          </div>
       );
  }
});

module.exports = Items;
