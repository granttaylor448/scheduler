import React, { useReducer, useEffect, useState } from "react";
import axios from "axios";


export default function useApplicationData () {

 
  
  // const [state, setState] = useState({
  //   day: "Monday",
  //   days: [],
  //   appointments: {},
  //   interviews: {}
  // });

  const SET_DAY = "SET_DAY";
  const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
  const SET_INTERVIEW = "SET_INTERVIEW";
  const SET_SPOTSREMAINING = "SET_SPOTSREMAINING"

function reducer(state , action) {
  switch (action.type) {
    case SET_DAY:
      return { ...state, day : action.day }
    case SET_APPLICATION_DATA:
      return {...state, 
         days : action.days,
         appointments: action.appointments,
         interviewers: action.interviewers,
         spots: state.spots - 1
         
       }
    case SET_INTERVIEW: {
      return {...state,
        appointments: action.appointments
      }
    }
    case SET_SPOTSREMAINING: {
      return {...state,
        spots: state.spots - action.spots
      }
    }
    default:
      throw new Error(
        `Tried to reduce with unsupported action type: ${action.type}`
      );
  }
}


  const [state, dispatch] = useReducer(reducer, {
    day: "Monday",
    days: [],
    spots: 0,
    appointments: {},
    interviews: {},
  
  });

  const setDay = day => dispatch({ type: SET_DAY, day });
  
  function bookInterview(id, interview) {
    
    // console.log(id, interview);
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    const spots = {
      ...state.spots,
      spots: 1

    }
    
      // console.log(appointments)
    return axios.put(`/api/appointments/${id}`, {interview})
    .then(axios.get('/api/days').then((res) =>  console.log((res.data["3"].spots)) )).then(res =>  dispatch({ type: SET_INTERVIEW, appointments, spots: res }))
    
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
    
    return axios.delete(`/api/appointments/${id}`).then(res => dispatch({ type: SET_INTERVIEW, appointments }));
  }

  useEffect (() => {
    
    
    Promise.all([
      Promise.resolve(axios.get('/api/days').then ((res) =>  res.data )),
      Promise.resolve(axios.get('/api/appointments').then ((res) =>  res.data )),
      Promise.resolve(axios.get('/api/interviewers').then ((res) =>  res.data )),
    ]).then((all) => {
      console.log(all[0]["3"].spots)
      dispatch({ type: SET_APPLICATION_DATA, days : all[0], spots: all[0]["3"].spots, appointments : all[1], interviewers: all[2] });
      console.log(all[0]); // first
      console.log(all[1]); // second
      console.log(all[2]); // third
    });
  }, [])

  return {
      state,
      setDay,
      bookInterview,
      deleteInterview
    } 

}


  
