import React from 'react'
import ReactDOM from 'react-dom'
import View from './view.jsx'
import injectTapEventPlugin from 'react-tap-event-plugin';

// Needed for onTouchTap
// Can go away when react 1.0 release
// Check this repo:
// https://github.com/zilverline/react-tap-event-plugin
injectTapEventPlugin();

var App = React.createClass({
  render: function() {
    return <View />
  }
});

ReactDOM.render(<App />, document.querySelector('#content'))
