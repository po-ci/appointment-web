import AuthProvider from './providers/AuthProvider'
import CalendarProvider from './providers/CalendarProvider'
import EventProvider from './providers/EventProvider'


// Give arg to provider to start endpoint with specific path for example = xxx.com/api/person
export const AuthService = new AuthProvider('auth')

export const CalendarService = new CalendarProvider('calendars')


export const EventService = new EventProvider('events')