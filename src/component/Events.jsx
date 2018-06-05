import React from 'react';
import ReactCSSTransitionGroup from 'react-transition-group/CSSTransitionGroup'

class Events extends React.Component {

  state = {
    year: this.props.year,
    month: this.props.month,
    events: this.props.monthEvents,
    time: this.props.time
  }
  
  render() {

    let filterEvent = this.props.monthEvents.filter((eve) => {
      return eve.month == this.props.month && eve.year == this.props.year
    });
    
    return (
      <div className="event-wrapper">
        <div className="header">
          <h1>Events Available In <span>{this.props.month + ' ' + this.props.year}</span></h1>
        </div>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Events</th>
              <th>Actions</th>
            </tr>
          </thead>
          <ReactCSSTransitionGroup
              component = 'tbody'
              transitionName = 'example'
              transitionEnterTimeout = {500}
              transitionLeaveTimeout = {300}>
          {filterEvent.map(eve => (
              <tr key={eve.id}>
                <td className="ta-center">{eve.month + ' ' + eve.day + ' at ' + eve.time + ' - ' + eve.event}</td>
                <td className="ta-center"><button className="btn btn-sm btn-primary" onClick={() => this.props.completeEvent(eve.id)}>complete</button></td>
              </tr>
          ))}
          </ReactCSSTransitionGroup>
        </table>
      </div>
    )
  }
  
};

export default Events