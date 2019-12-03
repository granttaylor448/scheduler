import React from "react";

import "components/DayListItem.scss";
var classNames = require('classnames');


export default function DayListItem(props) {
  const formatSpots = (spots) => {
    if (spots === 1){
      return <p>{spots} spot remaining</p>
    }

    if (spots > 1){
      return <p>{spots} spots remaining</p>
    }

    if (spots < 1){
      return <p>no spots remaining</p>
    }
  }
  
  const dayClass = classNames("day-list__item", {
    "day-list__item--selected":props.selected,
    "day-list__item--full": props.spots === 0
    
  });
  
  return (
    <li onClick= {props.setDay} className={dayClass} data-testid="day">
      <h2>{props.name}</h2>
      <h3> {formatSpots(props.spots)}</h3>   
      
    </li>
  );
}

