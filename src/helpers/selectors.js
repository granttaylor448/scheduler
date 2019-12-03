
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
   const getInterviewerForDay = function(state, day) {
    let result = [];
    let compare = []
    const filteredDays = state.days.filter(item => item.name === day);
    if (filteredDays.length > 0) {
      compare = filteredDays[0].interviewers
    }
    compare.forEach(item => {
      
     if (item === state.interviewers[item].id) {
       
       result.push(state.interviewers[item])
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
      obj["interviewer"] = state.interviewers[key]
      obj["student"] = student
      return obj
    } 
  } return null
   
}
const getSpotsForDay= function(state, day) {
  
  let compare = 0
  const filteredDays = state.days.filter(item => item.name === day);
  if (filteredDays.length > 0) {

    compare = filteredDays[0].spots
  }
    return compare
 }

export { getInterview, getAppointmentsForDay, getInterviewerForDay, getSpotsForDay }