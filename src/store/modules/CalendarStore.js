import {CalendarService, EventService} from '../../resource/index'

import moment from 'moment'
import tz from 'moment-timezone'
import 'moment/locale/es';

import {
    SET_DATE,
    SET_CALENDARS,
    SET_CALENDAR_SELECTED,
    SET_EVENTS,
    SET_CALENDAR_GENERAL_ERRORS
} from './calendar-mutation-types'

export default {
    namespaced: false,
    state: {
        date: moment().tz('America/Argentina/Buenos_Aires').locale('es'),
        calendarSelected: null,
        calendars: [],
        calendarGeneralErrors: [],
        events: []
    },
    getters: {
        getDate: (state) => {
            return state.date
        },
        getDateFormated: (state) => {
            return state.date.format("YYYY-MM-DD")
        },
        getCalendars: (state) => {
            return state.calendars
        },
        getEvents: (state) => {
            return state.events
        },
    },
    actions: {

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
    },
}
