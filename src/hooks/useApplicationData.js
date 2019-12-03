import { useReducer, useEffect } from "react";
import axios from "axios";
import reducer, {
  SET_DAY,
  SET_APPLICATION_DATA,
  SET_INTERVIEW,
  SET_SPOTSREMAINING
} from "reducers/application";


export default function useApplicationData() {


  const [state, dispatch] = useReducer(reducer, {
    day: "Monday",
    days: [],
    spots: 0,
    appointments: {},
    interviews: {},

  });


  const dayByAppId = id => {
    let dayByAppointmenID = {};
    state.days.forEach(item => {
      item.appointments.forEach(appointmentID => {
        if (id === appointmentID) {
          dayByAppointmenID = { ...item };
        }
      }
      )
    });
    return dayByAppointmenID;
  }

  const setDay = day => dispatch({ type: SET_DAY, day });

  function bookInterview(id, interview) {

    const daySpot = dayByAppId(id)
    const spotIncrease = (daySpot) => {
      const output = state.days.map((item, index) => {
        if (index !== daySpot.id - 1) {
          return item;
        }
        return {
          ...daySpot,
          spots: item.spots - 1
        }
      }
      )
      return output;
    }

    const stateDays = spotIncrease(daySpot)


    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return axios.put(`/api/appointments/${id}`, { interview })
      .then(res => { 
        dispatch({ type: SET_INTERVIEW, appointments, }); 
        dispatch({ type: SET_SPOTSREMAINING, stateDays });
      })

  }
  function editInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return axios.put(`/api/appointments/${id}`, { interview })
      .then(axios.get('/api/days').then(res => dispatch({ type: SET_INTERVIEW, appointments, })))
  }
  function deleteInterview(id, interview) {

    const daySpot = dayByAppId(id)

    const spotIncrease = (daySpot) => {
      const output = state.days.map((item, index) => {
        if (index !== daySpot.id - 1) {
          return item;
        }
        return {
          ...daySpot,
          spots: item.spots + 1
        }
      }
      )
      return output;
    }
    const stateDays = spotIncrease(daySpot)
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return axios.delete(`/api/appointments/${id}`).then(res => { 
    dispatch({ type: SET_INTERVIEW, appointments }); 
    dispatch({ type: SET_SPOTSREMAINING, stateDays });
    });
  }

  useEffect(() => {


    Promise.all([
      Promise.resolve(axios.get('/api/days').then((res) => res.data)),
      Promise.resolve(axios.get('/api/appointments').then((res) => res.data)),
      Promise.resolve(axios.get('/api/interviewers').then((res) => res.data)),
    ]).then((all) => {
      dispatch({ type: SET_APPLICATION_DATA, days: all[0], appointments: all[1], interviewers: all[2] });
    });
  }, [])

  return {
    state,
    setDay,
    bookInterview,
    deleteInterview,
    editInterview
  }

}





