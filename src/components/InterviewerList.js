import React from "react";

import "components/InterviewerList.scss"
import "components/InterviewerListItem.scss"
import InterviewerListItem from "components/InterviewerListItem"
import PropTypes from 'prop-types';




export default function InterviewList(props) { 
  
  
  
  const RenderInterviewList  = props.interviewers.map((person) => {
    return (
      <InterviewerListItem
      key={person.id}
      id={person.id}
      name={person.name} 
      avatar = {person.avatar} 
      selected = {person.id === props.interviewer} 
      setInterviewer = {(props.setInterviewer)}
      />
      );
    });
    
    // const interviewee = classNames("interviewers__item", {
      //   "interviewers__item--selected": props.selected
      // });
      
      
      return (
        <section className={"interviewers"}>
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">
      { RenderInterviewList  }
      </ul>
    </section>
  )
}
              InterviewList.propTypes = {
                person: PropTypes.number,
                setInterviewer: PropTypes.func.isRequired
              };