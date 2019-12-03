import React from "react";
import "components/Application.scss";
import Appointment from "components/Appointment";
import DayList from "./DayList";
import {getAppointmentsForDay, getInterview, getInterviewerForDay, getSpotsForDay } from "../helpers/selectors";
import useApplicationData from "hooks/useApplicationData";



export default function Application(props) {

  
    const {
      state,
      setDay,
      bookInterview,
      deleteInterview,
      editInterview
    } = useApplicationData();
  

    const appointments = getAppointmentsForDay(state, state.day);
    const interviewers = getInterviewerForDay(state, state.day);
    const spots = getSpotsForDay(state, state.day)

    const schedule = appointments.map((appointment) => {
    const interview = getInterview(state, appointment.interview);
      
      return (
        <Appointment
          key={appointment.id}
          id={appointment.id}
          time={appointment.time}
          interview={interview}
          interviewers={interviewers}
          spots= {spots}
          bookInterview={bookInterview}
          deleteInterview = {deleteInterview}
          editInterview = {editInterview}
        />
        
      );
    });

  return (
    <main className="layout">
      <section className="sidebar">
      <img
        className="sidebar--centered"
        src="images/logo.png"
        alt="Interview Scheduler"
      />
      <hr className="sidebar__separator sidebar--centered" />
      <nav className="sidebar__menu">
      <DayList
        days= {state.days}
        day={state.day}
        setDay={setDay}
      />
      </nav>
      <img
        className="sidebar__lhl sidebar--centered"
        src="images/lhl.png"
        alt="Lighthouse Labs"
      />
      </section>
      <section className="schedule"> {schedule}
        
       
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}