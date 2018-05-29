import React, { Component }  from 'react';

class Cell extends Component {
  render() {
    return (
      <div onClick={() => this.props.getSec()} className="date-cell">{ this.props.date }</div>
    )
  }
}

export default Cell;