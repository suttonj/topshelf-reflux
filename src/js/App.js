
'use strict';

let React = require('react');
let ReactCSSTransitionGroup = require('react/lib/ReactCSSTransitionGroup');
let Router = require('react-router');
let { Route, DefaultRoute, RouteHandler, Link } = Router;
require('./App.css');

let Header = require('./components/header/header');

let Food = require('./components/page/page');
let Fashion = require('./components/page/page');

let App = React.createClass({
  mixins: [ Router.State ],

  render: function () {
    let name = this.getRoutes().slice(0).reverse()[0].name;

    return (
      <div>
        <Header />
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
      transition.redirect('/food');
    }
  },
  render () {}
});

let routes = (
  <Route handler={App}>
    <DefaultRoute handler={RedirectTo}/>
      <Route name="food" handler={Food} addHandlerKey={true} />
      <Route name="fashion" handler={Fashion} addHandlerKey={true} />
  </Route>
);

Router.run(routes, function (Handler, state) {
  //let params = state.params;

  React.render(<Handler params={state} />, document.getElementById('app'));
});

module.exports = App;
