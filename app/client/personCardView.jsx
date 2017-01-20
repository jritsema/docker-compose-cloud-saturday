import React from 'react'
import AppBar from 'material-ui/lib/app-bar'
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

export default React.createClass({

  delete(person, event) {
    this.props.onDelete(person);
  },

  update() {
    this.props.onUpdate();
  },

  render() {
    return (
      <Card initiallyExpanded={true}>
        <CardHeader
          title={this.props.person.firstname + ' ' + this.props.person.lastname}
          subtitle={'Age ' + this.props.person.age}
          actAsExpander={true}
          showExpandableButton={true}>
        </CardHeader>
        <CardActions expandable={true}>
          <FlatButton
            label="Edit"
            secondary={true}
            onTouchTap={this.update}
          />
          <FlatButton
            label="Delete"
            primary={true}
            onTouchTap={this.delete.bind(this, this.props.person)}
          />
        </CardActions>
      </Card>
    );
  }
});
