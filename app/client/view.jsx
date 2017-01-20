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
import PersonCard from './personCard.jsx'

export default React.createClass({

  getInitialState() {
    return { data: undefined };
  },

  url: '/persons/',

  componentDidMount() {
    request({ method: 'GET', url: this.url, json: true }, (err, res) => {
      if (err)  {
        console.error(err);
        throw err;
      }
      this.setState({ data: res.body });
    }.bind(this));
  },

  delete(person) {
    request({ method: 'delete', url: this.url + person.id }, (err, res) => {
      if (err) throw err;
      if (res.statusCode !== 200) throw res.statusCode;
      //remove item from in memory list as well
      let data = this.state.data;
      let index = data.findIndex(x => x.id === person.id);
      data.splice(index, 1);
      this.setState({ data: data });
    }.bind(this));
  },

  add() {
    //add new, unsaved person to list
    let data = this.state.data;
    data.unshift({
      id: 0,
      firstname: '',
      lastname: '',
      age: 0
    });
    this.setState({ data: data});
  },

  save(person) {
    if (person.id === 0)
      this.insert(person);
    else
      this.update(person);
  },

  insert(person) {
    request.post({ url: this.url, body: person, json: true }, (err, res) => {
      if (err) throw err;
      if (res.statusCode !== 201) throw res.statusCode;
      //replace object in in-memory list of newly created object
      let data = this.state.data;
      let index = data.findIndex(x => x.id === person.id);
      data[index] = res.body;
      this.setState({ data: data });
    }.bind(this));
  },

  update(person) {
    request.put({ url: this.url + person.id, body: person, json: true }, (err, res) => {
      if (err) throw err;
      if (res.statusCode !== 200) throw res.statusCode;
      this.setState({ data: this.state.data });
    }.bind(this));
  },

  render() {
    let content = <Spinner />
    if (this.state.data)
      content = (
        <div className="page">
          <AppBar title={<span>Cloud Saturday</span>} />
          <br/>
          <FlatButton label="New" secondary={true} onTouchTap={this.add} />
          {this.state.data.map(person => {
            return (
              <div key={person.id}>
                <br/>
                <PersonCard
                  person={person}
                  onDelete={this.delete}
                  onSave={this.save}
                />
              </div>
            );
          })}
        </div>
      );

    return content;
  }
});
