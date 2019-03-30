import {
  CalendarProvider,
  AppointmentProvider,
  HolidaysProvider,
  OutOfServiceProvider,
  SpecificsScheduleProvider
} from '../../../resource'
import Vue from 'vue'
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
  SET_CALENDAR_LOADING,
  ADD_APPOINTMENT,
  SET_APPOINTMENTS,
  SET_LAST_APPOINTMENT,
  SET_CALENDAR_DELETED_RESPONSE,
  SET_CALENDAR_DELETED,
  ADD_CALENDAR,
  UPDATE_CALENDAR,
  UPDATE_APPOINTMENT,
  SET_HOLIDAYS,
  SET_HOLIDAYS_GENERAL_ERRORS,
  SET_HOLIDAYS_LOADING,
  SET_ADD_HOLIDAYS,
  SET_FLASH_MESSAGE,
  SET_ERRORS,
  SET_RESULT_HOLIDAYS,
  UPDATE_HOLIDAYS,
  SET_HOLIDAY_DELETED,
  SET_ADMIN_APPOINTMENTS,
  SET_OUT_OF_SERVICE,
  SET_OUT_OF_SERVICE_GENERAL_ERRORS,
  SET_OUT_OF_SERVICE_LOADING,
  SET_ADD_OUT_OF_SERVICE,
  UPDATE_OUT_OF_SERVICE,
  SET_RESULT_OUT_OF_SERVICE,
  SET_OUT_OF_SERVICE_DELETED,
  ADD_ADMIN_APPOINTMENT,
  REMOVE_AVAILABLE_SHIFT,
  SET_SPECIFICS_SCHEDULES,
  SET_SPECIFICS_SCHEDULES_GENERAL_ERRORS,
  SET_SPECIFICS_SCHEDULES_LOADING,
  SET_ADD_SPECIFICS_SCHEDULES,
  UPDATE_SPECIFICS_SCHEDULES,
  SET_RESULT_SPECIFICS_SCHEDULES,
  SET_SPECIFICS_SCHEDULES_DELETED
} from './calendar-mutation-types'
import {SET_RESULT, SET_USERS_LOADING, UPDATE_USER} from "../../user-crud/storage/user-mutation-type";

export default {
  namespaced: false,
  state: {
    adminAppointments: [],
    appointments: [],
    date: null,
    calendarSelected: null,
    calendars: [],
    calendarGeneralErrors: [],
    events: [],
    availableShifts: [],
    calendarLoading: false,
    lastAppointment: null,
    calendarDelete: null,
    users: [],
    usersGeneralErrors: [],
    holidays: [],
    holidaysErrors: null,
    holidaysLoading: false,
    flashMessage: null,
    resultHolidays: false,
    errorsHolidays: [],
    outOfService: [],
    loadingOutOfService: false,
    errorOfservice: [],
    resultOutOfService: false,
    specificsSchedules: [],
    specificsSchedulesLoading: false,
    resultSpecificsSchedules: false,
    errorSpecificsSchedules: [],

  },
  getters: {

    getLastAppointment: (state) => {
      return state.lastAppointment
    },

    getAppointments: (state) => {
      return state.appointments
    },
    pendingAppointment: (state) => {
      return state.appointments.filter(appointment => appointment.status === 1);
    },
    cancelledAppointment: (state) => {
      return state.appointments.filter(appointment => appointment.status === 2);
    },
    expiredAppointment: (state) => {
      return state.appointments.filter(appointment => appointment.status === 0);
    },
    orderAppointments: (state) => {
      return state.appointments.sort(function compareNumbers(a, b) {
        return b.id - a.id;
      });

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
    getHolidays(state) {
      return state.holidays
    },
    getHolidaysLoading(state) {
      return state.holidaysLoading
    },
    getFlashMessageHolidays(state) {
      return state.flashMessage
    },
    getResultHolidays(state) {
      return state.resultHolidays
    },
    getHolidaysErrors(state) {
      return state.holidaysErrors
    },
    getAdminAppointments(state) {
      return state.adminAppointments
    },
    getActiveAdminAppointments(state) {
      return state.adminAppointments.filter(appointment => appointment.status === 1).sort(function compareHours(a, b) {
        return ('' + a.start).localeCompare(b.start)
      })

    },
    getAllOutOfService(state) {
      return state.outOfService
    },
    getOutOfServiceLoading(state) {
      return state.loadingOutOfService
    },
    getResultOutOfService(state) {
      return state.resultOutOfService
    },
    getOutOfServiceErrors(state) {
      return state.errorOfservice
    },
    getFlashMessageOutOfService(state) {
      return state.flashMessage
    },
    checkCalendarAppointment: (state) => {
      if (state.calendarSelected && state.appointments.find(appointment => appointment.calendar.id == state.calendarSelected.id && appointment.status == 1) !== undefined) {
        return true
      }
      return false
    },
    getSpecificsSchedules(state) {
      return state.specificsSchedules
    },
    getSpecificsSchedulesLoading(state) {
      return state.specificsSchedulesLoading
    },
    getSpecificsSchedulesError(state) {
      return state.errorSpecificsSchedules
    },
    getSpecificsSchedulesResult(state) {
      return state.resultSpecificsSchedules
    },
    getFlashMessaSpecificsSchedules(state) {
      return state.flashMessage
    },

  },
  actions: {

    fetchAvailableAppointments({commit, getters}) {
      commit(SET_CALENDAR_LOADING, true)
      if (getters.getDate && getters.getCalendarSelected) {
        commit(SET_AVAILABLE_SHIFTS, [])
        AppointmentProvider.availables(getters.getCalendarSelected.id, getters.getDateFormated).then((response) => {
          commit(SET_AVAILABLE_SHIFTS, response.data)
          commit(SET_CALENDAR_LOADING, false)
        }).catch(
          (error) => {
            //@TODO Show errors
          }
        )
      }
    },


    fetchMyAppointments({commit, getters}) {
      commit(SET_CALENDAR_LOADING, true)

      if (getters.isLogin) {

        AppointmentProvider.myAppointments().then((response) => {
          commit(SET_APPOINTMENTS, response.data)
          commit(SET_CALENDAR_LOADING, false)
        }).catch(
          (error) => {
            //@TODO Show errors
          }
        )
      }
    },

    takeAppointment({commit, getters}, {calendar, start, duration}) {
      commit(SET_CALENDAR_LOADING, true)

      AppointmentProvider.take(calendar, start, duration).then((response) => {
        commit(SET_LAST_APPOINTMENT, response.data)
        if (response.data.status) {
          commit(ADD_APPOINTMENT, response.data.item)
        }
        commit(SET_CALENDAR_LOADING, false)
      }).catch((error) => {
        commit(SET_CALENDAR_LOADING, false)
      })

    },
    takeAdminAppointment({commit, getters}, {calendar, start, duration, user}) {
      commit(SET_CALENDAR_LOADING, true)

      AppointmentProvider.takeAdmin(calendar, start, duration, user).then((response) => {
        commit(SET_LAST_APPOINTMENT, response.data)
        commit(ADD_ADMIN_APPOINTMENT, response.data.item)
        commit(REMOVE_AVAILABLE_SHIFT, response.data.item)
        commit(SET_CALENDAR_LOADING, false)
      }).catch((error) => {
        commit(SET_CALENDAR_LOADING, false)
      })

    },


    cancelAppointment({commit, getters}, appointmentId) {
      commit(SET_CALENDAR_LOADING, true);

      AppointmentProvider.cancel(appointmentId).then((response) => {
        console.log(response)
        if (response.status) {
          commit(UPDATE_APPOINTMENT, response.data.item);
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
            commit(SET_CALENDAR_LOADING, false);
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
          commit(SET_CALENDAR_GENERAL_ERRORS, error.response.data);
          console.log(error.response.data)
          commit(SET_CALENDAR_LOADING, false);

        }
      );
    },
    createCalendar({commit}, newCalendar) {
      commit(SET_CALENDAR_LOADING, true);
      CalendarProvider.create(newCalendar).then((response) => {
        console.log(response.data)
        newCalendar.id = response.data.id
        commit(ADD_CALENDAR, newCalendar)
        commit(SET_CALENDAR_LOADING, false);
      }).catch((error) => {
        console.log(error.response.data)

      })
    },
    updateCalendar({commit}, newCalendar) {
      commit(SET_CALENDAR_LOADING, true);
      CalendarProvider.update(newCalendar.id, newCalendar).then((response) => {
        console.log(response.data)
        newCalendar.id = response.data.id
        commit(UPDATE_CALENDAR, newCalendar)
        commit(SET_CALENDAR_LOADING, false);
      }).catch((error) => {
        console.log(error.response.data)

      })
    },
    fetchAllHolidays({commit}) {
      commit(SET_HOLIDAYS_LOADING, true);
      HolidaysProvider.fetchAll().then((response) => {
        commit(SET_HOLIDAYS, response.data)
        commit(SET_HOLIDAYS_LOADING, false);
      }).catch((error) => {
        //commit(SET_HOLIDAYS_GENERAL_ERRORS, error)
      })
    },
    createHolidays({commit}, data) {
      commit(SET_RESULT_HOLIDAYS, false);
      commit(SET_FLASH_MESSAGE, null)
      commit(SET_HOLIDAYS_GENERAL_ERRORS, [])
      commit(SET_ERRORS, [])
      commit(SET_HOLIDAYS_LOADING, true);
      HolidaysProvider.create(data).then((response) => {
        data.id = response.data.id
        commit(SET_ADD_HOLIDAYS, data)
        commit(SET_RESULT_HOLIDAYS, true)
        commit(SET_HOLIDAYS_LOADING, false);
        commit(SET_FLASH_MESSAGE, "El Feriado se creo con exito")
      }).catch((error) => {
        commit(SET_RESULT_HOLIDAYS, false)
        if (error && error.response && error.response.data && error.response.data.errors) {
          commit(SET_HOLIDAYS_GENERAL_ERRORS, error.response.data.errors)
        }
        commit(SET_HOLIDAYS_LOADING, false)
      })
    },
    updateHolidays({commit}, data) {
      commit(SET_RESULT_HOLIDAYS, false);
      commit(SET_FLASH_MESSAGE, null)
      commit(SET_ERRORS, [])
      commit(SET_HOLIDAYS_LOADING, true);
      HolidaysProvider.update(data.id, data).then((response) => {
        data.id = response.data.id
        commit(UPDATE_HOLIDAYS, response.data.item)
        commit(SET_HOLIDAYS_LOADING, false)
        commit(SET_RESULT_HOLIDAYS, true)
        commit(SET_FLASH_MESSAGE, "El Feriado se edito con exito")
      }).catch((error) => {
        commit(SET_RESULT_HOLIDAYS, false)
        if (error && error.response && error.response.data && error.response.data.errors) {
          commit(SET_HOLIDAYS_GENERAL_ERRORS, error.response.data.errors)
        }
        commit(SET_HOLIDAYS_LOADING, false)
      })
    },
    deleteHoliday({commit}, holidayID) {
      commit(SET_RESULT_HOLIDAYS, false);
      commit(SET_FLASH_MESSAGE, null)
      commit(SET_ERRORS, [])
      commit(SET_HOLIDAYS_LOADING, true);
      HolidaysProvider.delete(holidayID).then((response) => {
        commit(SET_HOLIDAY_DELETED, holidayID)
        commit(SET_RESULT_HOLIDAYS, true)
        commit(SET_FLASH_MESSAGE, "El Feriado se elimino con exito")
        commit(SET_HOLIDAYS_LOADING, false)
      }).catch((error) => {
        commit(SET_RESULT_HOLIDAYS, false)
        if (error && error.response && error.response.data && error.response.data.errors) {
          commit(SET_HOLIDAYS_GENERAL_ERRORS, error.response.data.errors)
        }
        commit(SET_HOLIDAYS_LOADING, false)
      })

    },

    fetchAdminAppointments({commit}, {calendar, from, to}) {
      commit(SET_CALENDAR_LOADING, true);
      AppointmentProvider.findByCalendarAndDate(calendar, from, to).then((response) => {
        commit(SET_ADMIN_APPOINTMENTS, response.data)
      }).catch((error) => {

      })
    },

    fetchAllOutOfService({commit},) {
      commit(SET_OUT_OF_SERVICE_LOADING, true)
      OutOfServiceProvider.fetchAll().then((response) => {
        commit(SET_OUT_OF_SERVICE, response.data)
        commit(SET_OUT_OF_SERVICE_LOADING, false)
      }).catch((error) => {
        commit(SET_OUT_OF_SERVICE_GENERAL_ERRORS, error.data)
      })
    },
    addOutOfService({commit}, data) {
      commit(SET_RESULT_OUT_OF_SERVICE, false);
      commit(SET_FLASH_MESSAGE, null)
      commit(SET_OUT_OF_SERVICE_GENERAL_ERRORS, [])
      commit(SET_ERRORS, [])
      commit(SET_OUT_OF_SERVICE_LOADING, true)
      OutOfServiceProvider.create(data).then((response) => {
        if (response.data.id) {
          commit(SET_ADD_OUT_OF_SERVICE, response.data.item)
        }
        commit(SET_RESULT_OUT_OF_SERVICE, true)
        commit(SET_OUT_OF_SERVICE_LOADING, false);
        commit(SET_FLASH_MESSAGE, "La Licencia se creo con exito")
      }).catch((error) => {
        commit(SET_RESULT_OUT_OF_SERVICE, false)
        if (error && error.response && error.response.data && error.response.data.errors) {
          commit(SET_OUT_OF_SERVICE_GENERAL_ERRORS, error.response.data.errors)
        }
        commit(SET_OUT_OF_SERVICE_LOADING, false)
      })
    },
    updateOutOfService({commit}, data) {
      commit(SET_RESULT_OUT_OF_SERVICE, false);
      commit(SET_FLASH_MESSAGE, null)
      commit(SET_ERRORS, [])
      commit(SET_OUT_OF_SERVICE_LOADING, true);
      OutOfServiceProvider.update(data.id, data).then((response) => {
        data.id = response.data.id
        commit(UPDATE_OUT_OF_SERVICE, response.data.item)
        commit(SET_OUT_OF_SERVICE_LOADING, false)
        commit(SET_RESULT_OUT_OF_SERVICE, true)
        commit(SET_FLASH_MESSAGE, "La Licencia se edito con exito")
      }).catch((error) => {
        commit(SET_RESULT_OUT_OF_SERVICE, false)
        if (error && error.response && error.response.data && error.response.data.errors) {
          commit(SET_OUT_OF_SERVICE_GENERAL_ERRORS, error.response.data.errors)
        }
        commit(SET_OUT_OF_SERVICE_LOADING, false)
      })
    },
    deleteOutOfService({commit}, outOfServiceID) {
      commit(SET_RESULT_OUT_OF_SERVICE, false);
      commit(SET_FLASH_MESSAGE, null)
      commit(SET_ERRORS, [])
      commit(SET_OUT_OF_SERVICE_LOADING, true);
      OutOfServiceProvider.delete(outOfServiceID).then((response) => {
        commit(SET_OUT_OF_SERVICE_DELETED, outOfServiceID)
        commit(SET_RESULT_OUT_OF_SERVICE, true)
        commit(SET_FLASH_MESSAGE, "La licencia se elimino con exito")
        commit(SET_OUT_OF_SERVICE_LOADING, false)
      }).catch((error) => {
        commit(SET_OUT_OF_SERVICE_LOADING, false)
        if (error && error.response && error.response.data && error.response.data.errors) {
          commit(SET_OUT_OF_SERVICE_GENERAL_ERRORS, error.response.data.errors)
        }
        commit(SET_OUT_OF_SERVICE_LOADING, false)
      })

    },
    fetchAllSpecificsSchedules({commit}) {
      commit(SET_SPECIFICS_SCHEDULES_LOADING, true);
      SpecificsScheduleProvider.fetchAll().then((response) => {
        commit(SET_SPECIFICS_SCHEDULES, response.data)
        commit(SET_SPECIFICS_SCHEDULES_LOADING, false);
      }).catch((error) => {
        commit(SET_SPECIFICS_SCHEDULES_GENERAL_ERRORS, error.data)
      })
    },

    addSpecificsSchedules({commit}, data) {
      commit(SET_RESULT_SPECIFICS_SCHEDULES, false);
      commit(SET_FLASH_MESSAGE, null)
      commit(SET_SPECIFICS_SCHEDULES_GENERAL_ERRORS, [])
      commit(SET_ERRORS, [])
      commit(SET_SPECIFICS_SCHEDULES_LOADING, true)
      SpecificsScheduleProvider.create(data).then((response) => {
        if (response.data.id) {
          commit(SET_ADD_SPECIFICS_SCHEDULES, response.data.item)
        }
        commit(SET_RESULT_SPECIFICS_SCHEDULES, true)
        commit(SET_SPECIFICS_SCHEDULES_LOADING, false);
        commit(SET_FLASH_MESSAGE, "La Programacion Espeifica se creo con exito")
      }).catch((error) => {
        commit(SET_RESULT_SPECIFICS_SCHEDULES, false)
        if (error && error.response && error.response.data && error.response.data.errors) {
          commit(SET_SPECIFICS_SCHEDULES_GENERAL_ERRORS, error.response.data.errors)
        }
        commit(SET_SPECIFICS_SCHEDULES_LOADING, false)
      })
    },

    updateSpecificsSchedules({commit}, data) {
      commit(SET_RESULT_SPECIFICS_SCHEDULES, false);
      commit(SET_SPECIFICS_SCHEDULES_GENERAL_ERRORS, [])
      commit(SET_FLASH_MESSAGE, null)
      commit(SET_SPECIFICS_SCHEDULES_LOADING, true);
      SpecificsScheduleProvider.update(data.id, data).then((response) => {
        if (response.data.id) {
          commit(UPDATE_SPECIFICS_SCHEDULES, response.data.item)
        }
        commit(SET_RESULT_SPECIFICS_SCHEDULES, true);
        commit(SET_SPECIFICS_SCHEDULES_LOADING, false)
        commit(SET_FLASH_MESSAGE, "La Programacion Espeifica se edito con exito")
      }).catch((error) => {
        commit(SET_RESULT_SPECIFICS_SCHEDULES, false);
        if (error && error.response && error.response.data && error.response.data.errors) {
          commit(SET_SPECIFICS_SCHEDULES_GENERAL_ERRORS, error.response.data.errors)
        }
        commit(SET_SPECIFICS_SCHEDULES_LOADING, false)
      })
    },


    deleteSpecificsSchedules({commit}, specificsSheduleID) {
      commit(SET_RESULT_SPECIFICS_SCHEDULES, false);
      commit(SET_FLASH_MESSAGE, null)
      commit(SET_ERRORS, [])
      commit(SET_SPECIFICS_SCHEDULES_LOADING, true);
      SpecificsScheduleProvider.delete(specificsSheduleID).then((response) => {
        commit(SET_SPECIFICS_SCHEDULES_DELETED, specificsSheduleID)
        commit(SET_RESULT_SPECIFICS_SCHEDULES, true)
        commit(SET_FLASH_MESSAGE, "La Programacion Espeifica se elimino con exito")
        commit(SET_SPECIFICS_SCHEDULES_LOADING, false)
      }).catch((error) => {
        commit(SET_RESULT_SPECIFICS_SCHEDULES, false)
        if (error && error.response && error.response.data && error.response.data.errors) {
          commit(SET_SPECIFICS_SCHEDULES_GENERAL_ERRORS, error.response.data.errors)
        }
        commit(SET_SPECIFICS_SCHEDULES_LOADING, false)
      })

    },

  },
  mutations: {
    [SET_CALENDAR_LOADING](state, value) {
      state.calendarLoading = value;
    }
    ,
    [SET_DATE](state, value) {
      if (value) {
        state.date = moment(value).tz('America/Argentina/Buenos_Aires').locale('es');
      } else {
        state.date = null
      }
    }
    ,
    [SET_CALENDARS](state, calendars) {
      state.calendars = calendars;
    }
    ,
    [SET_CALENDAR_DELETED_RESPONSE](state, responseData) {
      state.calendarDelete = responseData;
    }
    ,
    [SET_CALENDAR_DELETED](state, id) {
      state.calendars = state.calendars.filter(doc => {
        return doc.id != id
      });
    }
    ,
    [SET_CALENDAR_SELECTED](state, calendar) {
      state.calendarSelected = calendar;
    }
    ,
    [SET_CALENDAR_GENERAL_ERRORS](state, errors) {
      state.calendarGeneralErrors = errors;
    }
    ,
    [SET_EVENTS](state, events) {
      state.events = events;
    }
    ,
    [SET_AVAILABLE_SHIFTS](state, appointments) {
      state.availableShifts = appointments;
    }
    ,
    [REMOVE_AVAILABLE_SHIFT](state, appointment) {
      let index = state.availableShifts.findIndex(a => a.start == appointment.start)
      Vue.delete(state.availableShifts, index)
    }
    ,
    [ADD_APPOINTMENT](state, appointment) {
      state.appointments.push(appointment);
    }
    ,
    [ADD_ADMIN_APPOINTMENT](state, appointment) {
      state.adminAppointments.push(appointment);
    },
    [UPDATE_APPOINTMENT](state, appointment) {
      let index = state.appointments.findIndex(a => a.id == appointment.id)
      Vue.set(state.appointments, index, appointment)
    }
    ,
    [SET_APPOINTMENTS](state, appointments) {
      state.appointments = appointments;
    }
    ,
    [SET_LAST_APPOINTMENT](state, appointment) {
      state.lastAppointment = appointment;
    }
    ,
    [SET_CALENDAR_DELETED_RESPONSE](state, calendarId) {
      state.calendarDelete = calendarId;
    }
    ,
    [ADD_CALENDAR](state, data) {
      state.calendars.push(data)
    }
    ,
    [UPDATE_CALENDAR](state, data) {
      let index = state.calendars.findIndex(calendar => calendar.id == data.id)
      state.calendars[index] = data
    }
    ,
    [SET_HOLIDAYS_LOADING](state, loading) {
      state.holidaysLoading = loading
    }
    ,
    [SET_HOLIDAYS](state, data) {
      state.holidays = data
    }
    ,
    [SET_ADD_HOLIDAYS](state, data) {
      state.holidays.push(data)
    }
    ,
    [SET_FLASH_MESSAGE](state, message) {
      state.flashMessage = message
    }
    ,
    [SET_RESULT_HOLIDAYS](state, data) {
      state.resultHolidays = data
    },
    [UPDATE_HOLIDAYS](state, data) {
      let index = state.holidays.findIndex(holiday => holiday.id == data.id)
      Vue.set(state.holidays, index, data)
    },
    [SET_HOLIDAYS_GENERAL_ERRORS](state, data) {
      state.holidaysErrors = data
    },
    [SET_HOLIDAY_DELETED](state, id) {
      state.holidays = state.holidays.filter(doc => {
        return doc.id != id
      });
    },
    [SET_ADMIN_APPOINTMENTS](state, data) {
      state.adminAppointments = data
    },
    [SET_OUT_OF_SERVICE_LOADING](state, data) {
      state.loadingOutOfService = data
    },
    [SET_OUT_OF_SERVICE](state, data) {
      state.outOfService = data
    },
    [SET_OUT_OF_SERVICE_GENERAL_ERRORS](state, data) {
      state.errorOfservice = data
    },
    [SET_ADD_OUT_OF_SERVICE](state, data) {
      state.outOfService.push(data)
    },
    [SET_RESULT_OUT_OF_SERVICE](state, data) {
      state.resultOutOfService = data
    },
    [UPDATE_OUT_OF_SERVICE](state) {
      let index = state.outOfService.findIndex(outOfService => outOfService.id == data.id)
      Vue.set(state.outOfService, index, data)
    },
    [SET_OUT_OF_SERVICE_DELETED](state, id) {
      state.outOfService = state.outOfService.filter(doc => {
        return doc.id != id
      })
    },
    [SET_SPECIFICS_SCHEDULES_LOADING](state, data) {
      state.specificsSchedulesLoading = data
    },
    [SET_SPECIFICS_SCHEDULES](state, data) {
      state.specificsSchedules = data
    },
    [SET_SPECIFICS_SCHEDULES_GENERAL_ERRORS](state, data) {
      state.errorSpecificsSchedules = data
    },
    [SET_ADD_SPECIFICS_SCHEDULES](state, data) {
      state.specificsSchedules.push(data)
    },
    [SET_RESULT_SPECIFICS_SCHEDULES](state, data) {
      state.resultSpecificsSchedules = data
    },
    [UPDATE_SPECIFICS_SCHEDULES](state, data) {
      let index = state.specificsSchedules.findIndex(specificsSchedules => specificsSchedules.id == data.id)
      Vue.set(state.specificsSchedules, index, data)
    },
    [SET_SPECIFICS_SCHEDULES_DELETED](state, id) {
      state.specificsSchedules = state.specificsSchedules.filter(doc => {
        return doc.id != id
      })
    },
  },
}
