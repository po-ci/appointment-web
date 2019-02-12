import {CalendarService, AppointmentService} from '../../resource/index'

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
  SET_CALENDAR_LOADING, ADD_APPOINTMENT, SET_APPOINTMENTS
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
    appointments: []
  },
  getters: {
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
  },
  actions: {

    takeAppointment({commit, getters}, {calendar, start, duration}) {
      commit(SET_CALENDAR_LOADING, true);

      console.log(start)

      AppointmentService.take(calendar, start, duration).then((response) => {
        if (response.data.status) {
          commit(ADD_APPOINTMENT, response.data.item);
        }
        commit(SET_CALENDAR_LOADING, false);
      }).catch((error) => {
        commit(SET_CALENDAR_LOADING, false);
      })

    },

    setCalendarLoading({commit, getters}, value) {
      commit(SET_CALENDAR_LOADING, value);
    },

    setCalendarSelected({commit, getters}, calendar) {
      commit(SET_CALENDAR_SELECTED, calendar);
    },

    fetchAvailableAppointments({commit, getters}) {
      commit(SET_CALENDAR_LOADING, true);
      if (getters.getDate && getters.getCalendarSelected) {
        commit(SET_AVAILABLE_SHIFTS, [])
        AppointmentService.availables(getters.getCalendarSelected.id, getters.getDateFormated).then((response) => {
          commit(SET_AVAILABLE_SHIFTS, response.data)
          commit(SET_CALENDAR_LOADING, false);
        })
      }
    },

    fetchCalendars({state, commit, dispatch}) {
      CalendarService.findAll().then((response) => {
        commit(SET_CALENDARS, response.data);
      }).catch(
        (error) => {
          if (error.response && error.response.data && response.data.errors) {
            commit(SET_CALENDAR_GENERAL_ERRORS, response.data.errors);
          }
        }
      );
    },

    findEventsByCalendarAndDate({state, commit,}) {

      if (state.calendarSelected && state.date) {
        let dateFrom = state.date.clone();
        let dateTo = state.date.clone();
        dateTo.add(1, 'days');

        EventService.findEventsByCalendarAndDate(state.calendarSelected.id, dateFrom.format("YYYY-MM-DD"), dateTo.format("YYYY-MM-DD")).then((response) => {

          commit(SET_EVENTS, response.data);

        }).catch(
          (error) => {
            if (error.response && error.response.data && response.data.errors) {
              commit(SET_CALENDAR_GENERAL_ERRORS, response.data.errors);
            }
          }
        );
      }


    },
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
  },
}
