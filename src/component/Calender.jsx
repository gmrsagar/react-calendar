import React, { Component } from 'react';
import moment from 'moment';
import YearNav from './YearNav';
import MonthNav from './MonthNav';
// import Cell from './Cell';

class Calender extends Component {

  state = {
    dateContext: moment(), //initialize date in state using moment.js
    today: moment(),
    showMonthPopup: false
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

  // setMonth = (month) => {
  //   let monthNo = this.months.indexOf(month);
  //   let dateContext = Object.assign({}, this.state.dateContext);
  //   dateContext = moment(dateContext).set("month", month);
  //   this.setState({
  //     dateContext: dateContext
  //   })
  // }

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

  // onSelectChange = (e, data) => {
  //   this.setMonth(data);
  //   this.props.onChangeMonth && this.props.onChangeMonth();
  // }

  // SelectList = (props) => {
  //   let popup = props.data.map((data) => {
  //     return (
  //       <div key={data}>
  //         <a onClick={(e) => {this.onSelectChange(e, data)}} href="#">{data}</a>
  //       </div>
  //     )
  //   })

  //   return (
  //     <div className="month-popup">
  //       {popup}
  //     </div> 
  //   )
  // }

  onChangeMonth = (e, month) => {
    this.setState({
      showMonthPopup: !this.state.showMonthPopup
    })
  }


  // MonthNav = () => {
  //   return (
  //     <span onClick={(e) => {this.onChangeMonth(e, this.month())}} className="label-month">
  //       {this.month()}
  //       {this.state.showMonthPopup && 
  //       <this.SelectList data={this.months} />
  //       }
  //     </span>
  //   )
  // }

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
    for( let i = 0; i < this.firstDayOfMonth(); i++ ) {
      blanks.push(<td key={i*4.6} className="emptySlot">{""}</td>);
    }

    /**
     * Grab all the days in a month
     */
    let daysInMonth = [];
    for(let d = 1; d <= this.daysInMonth(); d++) {
      let className = (d == this.currentDay()) ? "day current-day" : "day";
      daysInMonth.push(
        <td key={d} className={className}>
          <span>{d}</span>
        </td>
      );
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
  
    return (
      <div className="calender-wrapper">
        <table className="calender">
          <thead>
            <tr className="calender-header">
              <MonthNav month={this.month} previousMonth={this.previouMonth} nextMonth={this.nextMonth} />
              <td colSpan="3"></td>
              <YearNav year={this.year} previousYear={this.previousYear} nextYear={this.nextYear} />
            </tr>
          </thead>
          <tbody>
            <tr>
              {weekdays}
            </tr>
            {trElems}
          </tbody>
        </table>
      </div>
    )
  }
}

export default Calender;