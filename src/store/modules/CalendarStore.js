import {CalendarService} from '../../resource/index'
import {SET_CALENDARS, SET_CALENDAR_GENERAL_ERRORS} from './calendar-mutation-types'

export default {
    namespaced: false,
    state: {
        calendars: [],
        calendarGeneralErrors: []
    },
    getters: {},
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

    },
    mutations: {
        [SET_CALENDARS](state, calendars) {
            state.calendars = calendars;
        },
        [SET_CALENDAR_GENERAL_ERRORS](state, errors) {
            state.calendarGeneralErrors = errors;
        },
    },
}