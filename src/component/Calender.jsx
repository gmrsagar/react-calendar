import React, { Component } from 'react';
import moment from 'moment';
// import Cell from './Cell';

class Calender extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    dateContext: moment(),
    today: moment(),
    showMonthPopup: false
  }

  weekdays = moment.weekdays(); //[sunday, monday] array returned
  weekdaysShort = moment.weekdaysShort(); //[sun, mon] array returned
  months = moment.months();

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

  setMonth = (month) => {
    let monthNo = this.months.indexOf(month);
    let dateContext = Object.assign({}, this.state.dateContext);
    dateContext = moment(dateContext).set("month", month);
    this.setState({
      dateContext: dateContext
    })
  }

  onSelectChange = (e, data) => {
    this.setMonth(data);
    this.props.onChangeMonth && this.props.onChangeMonth();
  }

  SelectList = (props) => {
    let popup = props.data.map((data) => {
      return (
        <div key={data}>
          <a onClick={(e) => {this.onSelectChange(e, data)}} href="#">{data}</a>
        </div>
      )
    })

    return (
      <div className="month-popup">
        {popup}
      </div> 
    )
  }

  onChangeMonth = (e, month) => {
    this.setState({
      showMonthPopup: !this.state.showMonthPopup
    })
  }


  MonthNav = () => {
    return (
      <span onClick={(e) => {this.onChangeMonth(e, this.month())}} className="label-month">
        {this.month()}
        {this.state.showMonthPopup && 
        <this.SelectList data={this.months} />
        }
      </span>
    )
  }

  YearNav = () => {
    return (
      <span className="label-year">
        {this.year()}
      </span>
    )
  }

  render() {
    //Map weekdays short and create tr
    let weekdays = this.weekdaysShort.map((day) => {
      return (
        <td key={day} className="week-day">{day}</td>
      )
    });

    let blanks = [];
    for( let i = 0; i < this.firstDayOfMonth(); i++ ) {
      blanks.push(<td key={i*4.6} className="emptySlot">{""}</td>);
    }
    console.log("blanks", blanks);

    let daysInMonth = [];
    for(let d = 1; d <= this.daysInMonth(); d++) {
      let className = (d == this.currentDay()) ? "day current-day" : "day";
      daysInMonth.push(
        <td key={d} className="{className}">
          <span>{d}</span>
        </td>
      );
    }

    let totalSlots = [...blanks, ...daysInMonth];
    let rows = [];
    let cells = [];
    
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
              <td colSpan="5">
                <this.MonthNav />
                {" "}
                <this.YearNav />
                </td>  
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