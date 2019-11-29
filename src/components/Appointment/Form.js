import React, { useState } from "react";
import Button from "components/Button"
import InterviewerList from "components/InterviewerList"



export default function Form(props) {

  const [name, setName] = useState(props.name || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);
  
  const reset = () => {
    setName("");
    setInterviewer(null)
  }
  const cancel = () => {
    reset();
    props.onCancel();
  }
  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
  }



  

  
  
  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off">
          <input
            className="appointment__create-input text--semi-bold"
            name ={name}
            value={name}
            type="text"
            placeholder="Enter Student Name"
            onChange={(event) => setName(event.target.value)}
            // onClick={(event) => setInterviewer(event.interviewListItem.id)}
            onSubmit={event => event.preventDefault()}
            
             
            /*
              This must be a controlled component
            */
          />
        </form>
        <InterviewerList interviewers={props.interviewers} interviewer={interviewer} setInterviewer={setInterviewer} />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick= {cancel} >Cancel</Button>
          <Button  confirm onClick={e => props.onSave( name, interviewer )}> Save </Button>
        </section>
      </section>
    </main>

  )  
}

