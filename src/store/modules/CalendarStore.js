import {CalendarProvider, AppointmentProvider, AuthService} from '../../resource/index'

import moment from 'moment'
import tz from 'moment-timezone'
import 'moment/locale/es';

import {
  SET_DATE,
  SET_CALENDARS,
  SET_CALENDAR_SELECTED,
  SET_EVENTS,
  SET_CALENDAR_GENERAL_ERRORS,
  SET_AVAILABLE_SHIFTS,
  SET_CALENDAR_LOADING, ADD_APPOINTMENT, SET_APPOINTMENTS, SET_LAST_APPOINTMENT,
  SET_CALENDAR_DELETED_RESPONSE,
  SET_CALENDAR_DELETED,
  SET_USERS,
  SET_USERS_GENERAL_ERROR
} from './calendar-mutation-types'

export default {
  namespaced: false,
  state: {
    date: null,
    calendarSelected: null,
    calendars: [],
    calendarGeneralErrors: [],
    events: [],
    availableShifts: [],
    calendarLoading: false,
    appointments: [],
    lastAppointment: null,
    calendarDelete: null,
    users: [],
    usersGeneralErrors: []
  },
  getters: {

    getLastAppointment: (state) => {
      return state.lastAppointment
    },

    getAppointments: (state) => {
      return state.appointments
    },

    getAppointmentByCalendarAndDate: (state) => ({calendar, date}) => {
      return state.appointments.find(appointment => appointment.id === calendar && appointment.date === date);
    },

    getCalendarLoading: (state) => {
      return state.calendarLoading
    },
    getDate: (state) => {
      return state.date
    },
    getCalendarSelected: (state) => {
      return state.calendarSelected
    },

    getFriendlyDateFormated: (state) => {
      if (state.date) {
        return state.date.format("dddd Do MMMM  YYYY")
      }
      return null
    },

    getDateFormated: (state) => {
      if (state.date) {
        return state.date.format("YYYY-MM-DD")
      }
      return null
    },

    getDateDay: (state) => {
      if (state.date) {
        return state.date.format("dddd")
      }
      return null
    },

    getCalendars: (state) => {
      return state.calendars
    },
    getEvents: (state) => {
      return state.events
    },
    getAvailableShifts: (state) => {
      return state.availableShifts
    },
    findCalendarById: (state) => id => {
      let calendar = state.calendars.find(calendar => calendar.id === id);
      return calendar
    },
    getUsers(state) {
      return state.users
    }
  },
  actions: {


    fetchAvailableAppointments({commit, getters}) {
      commit(SET_CALENDAR_LOADING, true);
      if (getters.getDate && getters.getCalendarSelected) {
        commit(SET_AVAILABLE_SHIFTS, [])
        AppointmentProvider.availables(getters.getCalendarSelected.id, getters.getDateFormated).then((response) => {
          commit(SET_AVAILABLE_SHIFTS, response.data)
          commit(SET_CALENDAR_LOADING, false);
        }).catch(
          (error) => {
            //@TODO Show errors
          }
        )
      }
    },


    fetchMyAppointments({commit, getters}) {
      commit(SET_CALENDAR_LOADING, true);

      if (getters.isLogin) {

        AppointmentProvider.myAppointments().then((response) => {
          commit(SET_APPOINTMENTS, response.data)
          commit(SET_CALENDAR_LOADING, false);
        }).catch(
          (error) => {
            //@TODO Show errors
          }
        )
      }
    },

    takeAppointment({commit, getters}, {calendar, start, duration}) {
      commit(SET_CALENDAR_LOADING, true);

      AppointmentProvider.take(calendar, start, duration).then((response) => {
        commit(SET_LAST_APPOINTMENT, response.data)
        if (response.data.status) {
          commit(ADD_APPOINTMENT, response.data.item);
        }
        commit(SET_CALENDAR_LOADING, false);
      }).catch((error) => {
        commit(SET_CALENDAR_LOADING, false);
      })

    },

    clearLastAppointment: ({commit}) => {
      commit(SET_LAST_APPOINTMENT, null)
    },

    setCalendarLoading({commit, getters}, value) {
      commit(SET_CALENDAR_LOADING, value);
    },

    setCalendarSelected({commit, getters}, calendar) {
      commit(SET_CALENDAR_SELECTED, calendar);
    },


    fetchCalendars({state, commit, dispatch}) {
      commit(SET_CALENDAR_LOADING, true);

      CalendarProvider.fetchAll().then((response) => {
        commit(SET_CALENDARS, response.data);
        commit(SET_CALENDAR_LOADING, false);
      }).catch(
        (error) => {
          if (error.response && error.response.data && response.data.errors) {
            commit(SET_CALENDAR_GENERAL_ERRORS, response.data.errors);
          }
        }
      );
    },

    deleteCalendar({state, commit}, calendarId) {
      commit(SET_CALENDAR_LOADING, true);

      CalendarProvider.delete(calendarId).then((response) => {
        commit(SET_CALENDAR_DELETED_RESPONSE, response.data);
        commit(SET_CALENDAR_DELETED, calendarId);
        commit(SET_CALENDAR_LOADING, false);
      }).catch(
        (error) => {
          if (error.response && error.response.data && response.data.errors) {
            commit(SET_CALENDAR_GENERAL_ERRORS, response.data.errors);
          }
        }
      );
    },

    allUsers({commit}) {
      AuthService.users().then((response) => {
        commit(SET_USERS, response.data)
        console.log(response.data)
      }).catch((error) => {
          if (error.response && error.response.data && response.data.errors) {
            commit(SET_USERS_GENERAL_ERROR, response.data.errors);
          }
        }
      )
    }
  },
  mutations: {
    [SET_CALENDAR_LOADING](state, value) {
      state.calendarLoading = value;
    },
    [SET_DATE](state, value) {
      state.date = moment(value).tz('America/Argentina/Buenos_Aires').locale('es');
    },
    [SET_CALENDARS](state, calendars) {
      state.calendars = calendars;
    },
    [SET_CALENDAR_DELETED_RESPONSE](state, responseData) {
      state.calendarDelete = responseData;
    },
    [SET_CALENDAR_DELETED](state, id) {
      state.calendars = state.calendars.filter(doc => {
        return doc.id != id
      });
    },
    [SET_CALENDAR_SELECTED](state, calendar) {
      state.calendarSelected = calendar;
    },
    [SET_CALENDAR_GENERAL_ERRORS](state, errors) {
      state.calendarGeneralErrors = errors;
    },
    [SET_EVENTS](state, events) {
      state.events = events;
    },
    [SET_AVAILABLE_SHIFTS](state, shifts) {
      state.availableShifts = shifts;
    },
    [ADD_APPOINTMENT](state, appointment) {
      state.appointments.push(appointment);
    },
    [SET_APPOINTMENTS](state, appointments) {
      state.appointments = appointments;
    },
    [SET_LAST_APPOINTMENT](state, appointment) {
      state.lastAppointment = appointment;
    },
    [SET_CALENDAR_DELETED_RESPONSE](state, calendarId) {
      state.calendarDelete = calendarId;
    },
    [SET_USERS](state, response) {
      state.users = response
    },
    [SET_USERS_GENERAL_ERROR](state, error) {
      state.usersGeneralErrors = error
    },
  },
}
