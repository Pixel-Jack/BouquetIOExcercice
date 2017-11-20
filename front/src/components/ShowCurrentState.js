import React from 'react';
import { Card } from 'reactstrap';
import PropTypes from 'prop-types';

class ShowCurrentState extends React.Component {
  render() {
    let show = [];
    Object.keys(this.props.state).forEach(key => {
      let value = this.props.state[key];
      show.push(
        <div key={key}>
          {key} : {  value===null || !value || value.toString() === ''? 'vide' : value.toString()}
        </div>
      );
    });
    return (
      <Card inverse color={'info'}>
        {show}
      </Card>
    );
  }
}

ShowCurrentState.PropTypes = {
  state: PropTypes.object.isRequired
};

export default ShowCurrentState;