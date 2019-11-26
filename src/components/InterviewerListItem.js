import React from "react";

import "components/InterviewerListItem.scss"
var classNames = require('classnames');

export default function InterviewListItem(props) { 
  

  const interviewee = classNames("interviewers__item", {
    "interviewers__item--selected": props.selected
  });
  
  return (
  
      <li className={interviewee} onClick={() => props.setInterviewer(props.id)} >
        <img
          className="interviewers__item-image"
          src={props.avatar}
          alt={props.name}
        />
        {props.selected && props.name}
      </li>
    );
  
}