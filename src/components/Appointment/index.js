import React, {useState} from "react";
import "./styles.scss"
import Header from "./Header"
import Show from "./Show"
import Empty from "./Empty"
import useVisualMode from "../../hooks/useVisualMode"
import Form from "./Form"
import Status from "./Status";
import Confirm from "./Confirm"
import Error from "./Error"

export default function Appointment(props) { 

    const EMPTY = "EMPTY";
    const SHOW = "SHOW";
    const CREATE = "CREATE";
    const SAVING = "SAVING"
    const DELETING = "DELETING"
    const CONFIRM = "CONFIRM"
    const EDIT = "EDIT"
    const ERROR_SAVE = "ERROR_SAVE"
    const ERROR_DELETE = "ERROR_DELETE"


    const { mode, transition, back } = useVisualMode(
        props.interview ? SHOW : EMPTY
      );
      const [name, setName] = useState(props.name || "");

   
    function save(name, interviewer) {
      const interview = {
        student: name,
        interviewer
        };
        transition(SAVING, true)
        
        props.bookInterview(props.id, interview)
        .then(() => {
            transition(SHOW)
        }).catch(error => 
        transition(ERROR_SAVE, true));
        
    }

    function edit(name, interviewer) {
        const interview = {
          student: name,
          interviewer
          };
          transition(SAVING, true)
          props.editInterview(props.id, interview)
          .then(() => {
              transition(SHOW)
          }).catch(error => 
          transition(ERROR_SAVE, true));
      }
    function remove(id) {
        transition(DELETING, true)
        props.deleteInterview(props.id)
        .then(() => {transition(EMPTY) 
        }).catch(error => transition(ERROR_DELETE, true));  
    }
    return (
      <article className="appointment" data-testid="appointment">
            <Header
                
                time={props.time}
            />
            {mode === EMPTY && <Empty onAdd={e => (transition(CREATE))} />}
                {mode === SHOW && (
                  <Show
                    student={props.interview.student}
                    interviewer={props.interview.interviewer}
                    onEdit={e => (transition(EDIT))}
                    onDelete={e => (transition(CONFIRM))}
                    
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
                        onSave= {save}        
                    />      
                )  
                }
                {mode === SAVING && (
                    <Status
                    message={"SAVING"}
                    />
                )}
                {mode === DELETING && (
                    <Status
                    message={"DELETING"}
                    />
                )}
                {mode === CONFIRM && (
                    <Confirm
                    message = {"ARE YOU SURE YOU WOULD LIKE TO DELETE?"}
                    onConfirm = {remove}
                    onCancel = {e => (back(SHOW))}
                    />
                )}
                {mode === EDIT && (
                    <Form
                    
                        name={props.interview.student}
                        interviewer={props.interview.interviewer.id}
                        value={name}
                        interviewers= {props.interviewers}
                        type="text"
                        placeholder={props.interview.student}
                        onChange={(event) => setName(event.target.value)}
                        onSubmit={event => event.preventDefault()}
                        onCancel={e => (back(EMPTY))}
                        onSave= {edit}
                    />
                )}
                {mode === ERROR_SAVE && (
                    <Error
                    message = {"FAILED TO SAVE"}
                    onClose = {e => (transition(CREATE))}
                    />
                )}
                {mode === ERROR_DELETE && (
                    <Error
                    message = {"FAILED TO DELETE"}
                    onClose = {e => (back(SHOW))}
                    />
                )}
                
        </article>
    )
}