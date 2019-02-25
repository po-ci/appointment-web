import AuthProvider from './providers/AuthProvider'
import CalendarProviderClass from './providers/CalendarProvider'
import AppointmentProviderClass from './providers/AppointmentProvider'


// Give arg to provider to start endpoint with specific path for example = xxx.com/api/person
export const AuthService = new AuthProvider('auth')

export const CalendarProvider = new CalendarProviderClass('/zfmc/api/calendars')


export const AppointmentProvider = new AppointmentProviderClass('/zfmc/api/appointments')
