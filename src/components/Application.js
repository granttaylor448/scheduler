import React, { useState, useEffect } from "react";
import axios from "axios";

import "components/Application.scss";
import Appointment from "components/Appointment";
import DayList from "./DayList"
import {getAppointmentsForDay, getInterview, getInterviewerForDay } from "../helpers/selectors";



export default function Application(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviews: {},
  });
  // const [days, setDays] = useState([])
  // const [day, setDay] = useState("Monday")
  const setDay = day => setState({ ...state, day });
  // const setDays = days => setState(prev => ({ ...prev, days }));

    useEffect (() => {
      // axios.get('/api/days').then ((res) => { res.data })
        // console.log(res.data) 
        // setDays(res.data)
      

      Promise.all([
        Promise.resolve(axios.get('/api/days').then ((res) =>  res.data )),
        Promise.resolve(axios.get('/api/appointments').then ((res) =>  res.data )),
        Promise.resolve(axios.get('/api/interviewers').then ((res) =>  res.data )),
      ]).then((all) => {
        setState(prev => ({days: all[0], appointments: all[1], interviewers: all[2]}))
        console.log(all[0]); // first
        console.log(all[1]); // second
        console.log(all[2]); // third
      
        // const [first, second, third] = all;
      
        // console.log(first, second, third);
      });
    }, [])

    const appointments = getAppointmentsForDay(state, state.day);
    const interviewers = getInterviewerForDay(state, state.day);

    const schedule = appointments.map((appointment) => {
    const interview = getInterview(state, appointment.interview);

      return (
        <Appointment
          key={appointment.id}
          id={appointment.id}
          time={appointment.time}
          interview={interview}
          interviewers={interviewers}
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
        {/* * Replace this with the sidebar elements during the "Environment Setup" activity. */} */}
      </section>
      <section className="schedule"> {schedule}
        
       
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}