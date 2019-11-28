import React, { useState } from "react";
import axios from "axios";

export default function useApplicationData () {
  
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviews: {}
  });
  console.log(state)

  const setDay = day => setState({ ...state, day });

  function bookInterview(id, interview) {
    
    console.log(id, interview);
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
      console.log(appointments)
    return axios.put(`/api/appointments/${id}`, {interview}).then(res => setState(state => ({...state, appointments})))
    
  }

  function deleteInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    
    return axios.delete(`/api/appointments/${id}`).then(res => setState(state => ({...state, appointments})))
  }

  
}