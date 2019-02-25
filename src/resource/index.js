import AuthProvider from './providers/AuthProvider'
import CalendarProvider from './providers/CalendarProvider'
import AppointmentProvider from './providers/AppointmentProvider'


// Give arg to provider to start endpoint with specific path for example = xxx.com/api/person
export const AuthService = new AuthProvider('auth')

export const CalendarProvider = new CalendarProvider('/zfmc/api/calendars')


export const AppointmentProvider = new AppointmentProvider('/zfmc/api/appointments')
