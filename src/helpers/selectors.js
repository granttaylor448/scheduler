import React from "react";

const getAppointmentsForDay= function(state, day) {
    let result = [];
    let compare = []
    const filteredDays = state.days.filter(item => item.name === day);
    if (filteredDays.length > 0) {

      compare = filteredDays[0].appointments
    }
    compare.forEach(item => {
      
     if (item === state.appointments[item].id) {
       
       result.push(state.appointments[item])
     } 
    })
      return result;
   }

 const getInterview = function(state, interview) {
  
  let key = 0;
  let student = {}
  let obj = {};
  for (let item in state.appointments) {
    if (state.appointments[item].interview === interview && state.appointments[item].interview !== null) {
      
      key = state.appointments[item].interview.interviewer
      student = state.appointments[item].interview.student
      // console.log(student)
      obj["interviewer"] = state.interviewers[key]
      obj["student"] = student
      console.log(obj)
      return obj
    } 
    // state.interviewers.key = student
  } return null
   
  }

export { getInterview, getAppointmentsForDay }