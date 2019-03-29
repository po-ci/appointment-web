import AuthProvider from '../modules/user-auth/resource/AuthProvider'
import CalendarProviderClass from '../modules/appointment/resource/CalendarProvider'
import HolidaysProviderClass from '../modules/appointment/resource/HolidaysProvider'
import AppointmentProviderClass from '../modules/appointment/resource/AppointmentProvider'
import RoleProviderClass from '../modules/user-crud/resource/RoleProvider'
import UserProviderClass from '../modules/user-crud/resource/UserProvider'
import OutOfServiceProviderClass from '../modules/appointment/resource/OutOfServiceProvider'

// Give arg to provider to start endpoint with specific path for example = xxx.com/api/person
export const AuthService = new AuthProvider('auth')

export const CalendarProvider = new CalendarProviderClass('/zfmc/api/calendars')


export const AppointmentProvider = new AppointmentProviderClass('/zfmc/api/appointments')

export const RoleProvider = new RoleProviderClass('/security/api/roles')

export const UserProvider = new UserProviderClass('/security/api/users')

export const HolidaysProvider = new HolidaysProviderClass('/zfmc/api/holidays')

export const OutOfServiceProvider = new OutOfServiceProviderClass('/zfmc/api/out-of-service')
