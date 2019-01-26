import AuthProvider from './providers/AuthProvider'



// Give arg to provider to start endpoint with specific path for example = xxx.com/api/person
export const AuthService = new AuthProvider('auth')

