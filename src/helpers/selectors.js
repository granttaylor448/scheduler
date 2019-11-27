import React from "react";
export default function getAppointmentsForDay(state, day) {
    let result = [];
    let compare = []
    const filteredDays = state.days.filter(item => item.name === day);
    // console.log(filteredDays[0].appointments) 
    if (filteredDays.length > 0) {

      compare = filteredDays[0].appointments
    }

    // console.log(compare)

    compare.forEach(item => {
      
     if (item === state.appointments[item].id) {
       
       result.push(state.appointments[item])
     } 
    })
      return result;
     
  //   for (let key in state.appointments) {
  //     filteredApp.forEach((e) => {
  //       if (key === appointments[e]){
  //         result.push(key.state)
  //       }
  //     })
  //   }
   }
    // state.forEach(function(arrayItem) {
      // return [day]
    // });

    // const filteredDays = state.days.filter(i => i.day === day )

  //  const filteredAppointments = state.days.filter( day =>  day.day === day);
    // filteredAppointments

  // return filteredDays
 