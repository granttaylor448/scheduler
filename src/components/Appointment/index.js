import React, {useState} from "react";

import "./styles.scss"
import Header from "./Header"
import Show from "./Show"
import Empty from "./Empty"
import InterviewerList from "components/InterviewerList";
import useVisualMode from "../../hooks/useVisualMode"
import Form from "./Form"
import Button from "../Button"
import { getInterviewerForDay } from "../../helpers/selectors"

export default function Appointment(props) { 
    const EMPTY = "EMPTY";
    const SHOW = "SHOW";
    const CREATE = "CREATE";

    const { mode, transition, back } = useVisualMode(
        props.interview ? SHOW : EMPTY
      );
      const [name, setName] = useState(props.name || "");
    
    

    return (
      <article className="appointment">
            <Header
                time={props.time}
            />
            {/* {props.interview ? 
                <Show
                
                student={props.interview.student}
                interviewer={props.interview.interviewer}
                onEdit={props.onEdit}
                onDelete={props.onDelete}
            />
            : <Empty
                
                onAdd={props.onAdd}
            /> 
            } */}
            {mode === EMPTY && <Empty onAdd={e => (transition(CREATE))} />}
                {mode === SHOW && (
                  <Show
                    student={props.interview.student}
                    interviewer={props.interview.interviewer}
                    onEdit={props.onEdit}
                    onDelete={props.onDelete}
                  />
                )}
                {mode === CREATE && (
                
                    <Form
                        name ={name}
                        value={name}
                        interviewers= {props.interviewers}
                        type="text"
                        placeholder="Enter Student Name"
                        onChange={(event) => setName(event.target.value)}
                        onSubmit={event => event.preventDefault()}
                        onCancel={e => (back(EMPTY))}
                              
                    />
                     /* <InterviewerList interviewers={[]} interviewer={interviewer} setInterviewer={setInterviewer} /> */
                    
                   
                     /* <Button  confirm onClick={e => props.onSave( name, interviewer)}> Save </Button> */
                          
                    
                )  

                }
        </article>
    )
}