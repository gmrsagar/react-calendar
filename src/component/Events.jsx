import React from 'react';

class Events extends React.Component {

  state = {
    year: this.props.year,
    month: this.props.month,
    events: this.props.monthEvents
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
          <tbody>
          {filterEvent.map(eve => (
            <tr key={eve.id}>
              <td className="ta-center">{eve.year +' '+ eve.month + ' ' + eve.day + ' - ' + eve.event}</td>
              <td className="ta-center"><button className="btn btn-sm btn-primary" onClick={() => this.props.completeEvent(eve.id)}>complete</button></td>
            </tr>
          ))}
          </tbody>
        </table>
      </div>
    )
  }
  
};

export default Events