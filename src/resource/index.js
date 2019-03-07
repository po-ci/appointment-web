import AuthProvider from './providers/AuthProvider'
import CalendarProviderClass from './providers/CalendarProvider'
import AppointmentProviderClass from './providers/AppointmentProvider'
import RoleProviderClass from './providers/RoleProvider'
import UserProviderClass from './providers/UserProvider'

// Give arg to provider to start endpoint with specific path for example = xxx.com/api/person
export const AuthService = new AuthProvider('auth')

export const CalendarProvider = new CalendarProviderClass('/zfmc/api/calendars')


export const AppointmentProvider = new AppointmentProviderClass('/zfmc/api/appointments')

export const RoleProvider = new RoleProviderClass('/security/api/roles')

export const UserProvider = new UserProviderClass('/security/api/users')
