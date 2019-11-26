import React from "react";

import "components/DayListItem.scss";
// import { tsPropertySignature } from "@babel/types";
var classNames = require('classnames');


export default function DayListItem(props) {
  const formatSpots = () => {
    if (props.spots === 1){
      return <p>{props.spots} spot remaining</p>
    }

    if (props.spots > 1){
      return <p>{props.spots} spots remaining</p>
    }

    if (props.spots < 1){
      return <p>no spots remaining</p>
    }
  }
  
  const dayClass = classNames("day-list__item", {
    "day-list__item--selected":props.selected,
    "day-list__item--full": props.spots === 0
    
  });
  
  return (
    <li onClick={() => props.setDay(props.name)} className={dayClass}>
      <h2>{props.name}</h2>
      <h3> {formatSpots(props.spots)}</h3>   
    </li>
  );
}

