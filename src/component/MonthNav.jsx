import React from 'react';

const MonthNav = props => (
  <td colSpan="2">
    <i onClick={props.previousMonth} className="fas fa-angle-left"></i>
    <span className="label-month">{props.month()}</span>
    <i onClick={props.nextMonth} className="fas fa-angle-right"></i>
  </td>
)

export default MonthNav;