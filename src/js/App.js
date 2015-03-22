
'use strict';

let React = require('react');
let Router = require('react-router');

let { Route, DefaultRoute, RouteHandler, Link } = Router;
let ReactCSSTransitionGroup = require('react/lib/ReactCSSTransitionGroup');

let Page = require('./components/page/page');

let App = React.createClass({
  render: function () {
    return (
      <div>
        <ReactCSSTransitionGroup component="div" transitionName="transition">
          <RouteHandler key={name} {...this.props} />
        </ReactCSSTransitionGroup>
      </div>
    );
  }
});

let RedirectTo = React.createClass({
  statics: {
    willTransitionTo (transition) {
      transition.redirect('/shop/food');
    }
  },
  render () {}
});

var routes = (
  <Route name="app" path="/" handler={App}>
    <DefaultRoute handler={RedirectTo}/>
    <Route name="shop" path="shop/:id" handler={Page}/>
  </Route>
);

Router.run(routes, function(Handler, state) {
  var params = state.params;
  React.render(<Handler params={params}/> , document.getElementById('app'));
});

module.exports = App;
