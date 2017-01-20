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
import TextField from 'material-ui/lib/text-field'
import request from 'browser-request'
import Spinner from './spinner.jsx'

export default React.createClass({

  getInitialState() {
    return { person: undefined };
  },

  componentDidMount() {
    this.setState({ person: this.props.person });
  },

  save(person, event) {
    this.props.onSave(this.state.person);
  },

  cancel(person, event) {
    this.props.onCancel();
  },

  onFirstNameChanged(event) {
    let p = this.state.person;
    p.firstname = event.target.value;
    this.setState({ person: p });
  },

  onLastNameChanged(event) {
    let p = this.state.person;
    p.lastname = event.target.value;
    this.setState({ person: p });
  },

  onAgeChanged(event) {
    let p = this.state.person;
    p.age = event.target.value;
    this.setState({ person: p });
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
          <TextField
            floatingLabelText="First Name"
            defaultValue={this.props.person.firstname}
            onChange={this.onFirstNameChanged}
          />
          <br/>
          <TextField
            floatingLabelText="Last Name"
            defaultValue={this.props.person.lastname}
            onChange={this.onLastNameChanged}
          />
          <br/>
          <TextField
            floatingLabelText="Age"
            defaultValue={this.props.person.age.toString()}
            onChange={this.onAgeChanged}
          />
          <br/>
          <br/>
          <FlatButton
            label="Cancel"
            secondary={true}
            onTouchTap={this.cancel.bind(this, this.props.person)}
          />
          <FlatButton
            label="Save"
            secondary={true}
            onTouchTap={this.save.bind(this, this.props.person)}
          />
        </CardActions>
      </Card>
    );
  }
});
