import React from 'react'
import AppBar from 'material-ui/lib/app-bar'
import Table from 'material-ui/lib/table/table'
import Card from 'material-ui/lib/card/card'
import CardActions from 'material-ui/lib/card/card-actions'
import CardExpandable from 'material-ui/lib/card/card-expandable'
import CardHeader from 'material-ui/lib/card/card-header'
import CardMedia from 'material-ui/lib/card/card-media'
import CardText from 'material-ui/lib/card/card-text'
import CardTitle from 'material-ui/lib/card/card-title'
import FlatButton from 'material-ui/lib/flat-button'
import request from 'browser-request'
import Spinner from './spinner.jsx'
import PersonCardView from './personCardView.jsx'
import PersonCardEdit from './personCardEdit.jsx'

export default React.createClass({

  getInitialState() {
    return { mode: 'view' };
  },

  setMode(value) {
    this.setState({ mode: value });
  },

  componentDidMount() {
    if (this.props.person.id === 0)
      this.setMode('edit');
  },

  delete(person, event) {
    this.props.onDelete(person);
  },

  save(person, event) {
    this.props.onSave(person);
    this.setMode('view');
  },

  update() {
    this.setMode('edit');
  },

  cancel() {
    this.setMode('view');
  },

  render() {
    if (this.state.mode === 'edit') {
      var card = (
        <PersonCardEdit
          person={this.props.person}
          onSave={this.save}
          onCancel={this.cancel}
        />
      );
    }
    else if (this.state.mode === 'view') {
      var card = (
        <PersonCardView
          person={this.props.person}
          onDelete={this.delete}
          onUpdate={this.update}
        />
      );
    }
    return card;
  }
});
