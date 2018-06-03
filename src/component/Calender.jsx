import React, { Component } from 'react';
import moment from 'moment';
import YearNav from './YearNav';
import MonthNav from './MonthNav';
import Events from './Events';
// import Popup from 'react-popup';
import { bake_cookie, read_cookie, delete_cookie } from 'sfcookies';
// import Prompt from './Prompt';

class Calender extends Component {

  state = {
    dateContext: moment(), //initialize date in state using moment.js
    today: moment(),
    showMonthPopup: false,
    showForm: false,
    eventBody: '',
    eventDay : '',
    eventTitle: '',
    mouseX: '',
    mouseY: '',
    monthEvents: read_cookie('events')
  }

  weekdays = moment.weekdays(); //[sunday, monday] array returned
  weekdaysShort = moment.weekdaysShort(); //[sun, mon] array returned
  months = moment.months();

  /**
   * Get the general date information from moment.js
   */
  year = () => {
    return this.state.dateContext.format('Y');
  }

  month = () => {
    return this.state.dateContext.format('MMMM');
  }

  daysInMonth = () => {
    return this.state.dateContext.daysInMonth();
  }

  currentDate = () => {
    return this.state.dateContext.get('date');
  }

  currentDay = () => {
    return this.state.dateContext.format('D');
  }

  firstDayOfMonth = () => {
    let dateContext = this.state.dateContext;
    let firstDay = moment(dateContext).startOf('month').format('d');
    return firstDay;
  }

  lastDayOfMonth = () => {
    let dateContext = this.state.dateContext;
    let lastDay = moment(dateContext).endOf('month').format('d');
    return lastDay;
  }

  nextMonth = () => {
    let dateContext = Object.assign({}, this.state.dateContext);
    dateContext = moment(dateContext).add(1, 'month');
    this.setState({
      dateContext: dateContext
    })
  }

  previouMonth = () => {
    let dateContext = Object.assign({}, this.state.dateContext);
    dateContext = moment(dateContext).subtract(1, 'month');
    this.setState({
      dateContext: dateContext
    })
  }

  nextYear = () => {
    let dateContext = Object.assign({}, this.state.dateContext);
    dateContext = moment(dateContext).add(1, 'year');
    this.setState({
      dateContext: dateContext
    })
  }

  previousYear = () => {
    let dateContext = Object.assign({}, this.state.dateContext);
    dateContext = moment(dateContext).subtract(1, 'year');
    this.setState({
      dateContext: dateContext
    })
  }

  onChangeMonth = (e, month) => {
    this.setState({
      showMonthPopup: !this.state.showMonthPopup
    })
  }

  propMe = (idx) => {
    this.setState({
      showForm: !this.state.showForm,
      eventDay: idx
    })
  }

  eventCreator = (e) => {
    if(e) e.preventDefault();
    
    let monthEvents = this.state.monthEvents;
    let body = this.state.eventTitle;
    let year = this.year()
    let month = this.month()
    let day = this.state.eventDay
    let id = monthEvents.length + 1;

    monthEvents.push(
      {
        id: id,
        year: year,
        month: month,
        event: body,
        day: day
      }
    )

    bake_cookie('events', monthEvents)

    this.setState({
      showForm: !this.state.showForm,
      monthEvents : monthEvents,
      eventTitle: ''
    })
  }

  _onMouseMove = (e) => {
    this.setState({
      mouseX: e.screenX,
      mouseY: e.screenY
    })
  }

  completeEvent = (id) => {
    let monthEvents = this.state.monthEvents
    monthEvents = monthEvents.filter(eve => eve.id !== id)
    this.setState({
      monthEvents: monthEvents
    })
    delete_cookie('events')
    bake_cookie('events', monthEvents)
  }

  render() {
    //Map weekdays short and create tr
    let weekdays = this.weekdaysShort.map((day) => {
      return (
        <td key={day} className="week-day">{day}</td>
      )
    });


    /**
     * Get the starting day of the month.
     * 
     * Calculate the blanks in the month's first week
     */
    let blanks = [];
    let prevMonth = Object.assign({}, this.state.dateContext); //create a new moment object
    prevMonth = moment(prevMonth).subtract(1, 'month'); //switch to previous month

    //get days in month from previous object and add 1 for printing purposes
    let oldMonth = prevMonth.daysInMonth() + 1;

    //retrieve the dates to fill in the blanks for new month
    oldMonth = oldMonth - this.firstDayOfMonth();
    if( this.firstDayOfMonth() == 0 ) {
      oldMonth = oldMonth - 8;
      for( let i = 1; i <= 7; i++ ) {
        let blankMonth = oldMonth + i;
        blanks.push(<td key={i*8.8} className="emptySlot">{blankMonth}</td>)
      }
    }

    for( let i = 0; i < this.firstDayOfMonth(); i++ ) {
      let blankMonth = oldMonth + i;
      blanks.push(<td key={i*4.6} className="emptySlot">{blankMonth}</td>);
    }

    /**
     * Grab all the days in a month
     */
    let daysInMonth = [];
    let lastDay = 6 - this.lastDayOfMonth();
    for(let d = 1; d <= this.daysInMonth(); d++) {
      let className = (d == this.currentDay()) ? "day current-day" : "day";
      daysInMonth.push(
        <td key={d} onClick={() => this.propMe(d)} className={className}>
          <span>{d}</span>
        </td>
      );
    }

    if( this.lastDayOfMonth() >= 2 ) {
      lastDay = lastDay + 7;
      
      for(let d = 1; d <= lastDay; d++) {
        daysInMonth.push(
          <td key={d} className="emptySlot">
            <span>{d}</span>
          </td>
        )
      }

    } else {

      for(let d = 1; d <= lastDay; d++) {
        daysInMonth.push(
          <td key={d} className="emptySlot">
            <span>{d}</span>
          </td>
        )
      }

    }

    

    /**
     * Add blank days and total days
     */
    let totalSlots = [...blanks, ...daysInMonth];
    let rows = [];
    let cells = [];
    
    /**
     * Create calender rows/weeks by adding 7 days in an array and create <td> of each day
     */
    totalSlots.forEach((row, i) => {
      if((i % 7) != 0) {
        cells.push(row);
      } else {
        let insertRow = cells.slice();
        rows.push(insertRow);
        cells = [];
        cells.push(row);
      }
      if( i == totalSlots.length - 1) {
        let insertRow = cells.slice();
        rows.push(insertRow);
      }
    });

    /**
     * Finally create proper <tr> with the <td> of days
     */
    let trElems = rows.map((d, i) => {
      return (
        <tr key={i*100}>
          {d}
        </tr>
      )
    })

    let contentMenuStyle = {
      position: 'absolute', 
      left: this.state.mouseX,
      top: this.state.mouseY - 60
  };
  
    return (
      <div>
        <div className="calender-wrapper">
          <table className="calender table table-borderless">
            <thead>
              <tr className="calender-header">
                <MonthNav month={this.month} previousMonth={this.previouMonth} nextMonth={this.nextMonth} />
                <YearNav year={this.year} previousYear={this.previousYear} nextYear={this.nextYear} />
              </tr>
            </thead>
            <tbody onClick= {this._onMouseMove}>
              <tr>
                {weekdays}
              </tr>
              {trElems}
            </tbody>
          </table>
        </div>
        { this.state.showForm
          ?
          <div className="task-form" style={contentMenuStyle}>
            <div>
              <h2>Create an event</h2>
              <small>Event for {this.state.eventDay + ' ' + this.month() + ' ' + this.year()}</small>
            </div>
            <form onSubmit={this.eventCreator}>
              <input
                className="text-input"
                onChange={(e) => this.setState({ eventTitle: e.target.value})}
                value={this.state.eventTitle}
                ref={(ip) => this.myInp = ip}
                placeholder="Enter the task"
                type="text"/>
              <input className="btn btn-create" type="submit" value="Create"/>
              <button className="btn btn-destroy" onClick={() => this.setState({ showForm: !this.state.showForm})}>Cancel</button>
            </form>
          </div> 
          :
        '' }
          <Events completeEvent={this.completeEvent} month={this.month()} year={this.year()} monthEvents={this.state.monthEvents} />
      </div>
    )

  }
}

export default Calender;