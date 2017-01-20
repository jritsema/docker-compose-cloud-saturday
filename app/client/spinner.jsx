import React from 'react'
import CircularProgress from 'material-ui/lib/circular-progress'

export default React.createClass({
  render() {
    return (
      <div>
        <br/>
        <CircularProgress mode="indeterminate" />
      </div>
    );
  }
});
