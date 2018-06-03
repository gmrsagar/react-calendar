import React, { Component } from 'react';

const YearNav = props => (
      <td colSpan="3" className="nav-year">
        <i onClick={props.previousYear} className="fas fa-angle-left"></i>
        <span className="label-year">
          {props.year()}
        </span>
        <i onClick={props.nextYear} className="fas fa-angle-right"></i>
      </td>
    )

export default YearNav;