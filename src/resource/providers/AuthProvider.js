
import HttpRequest from './../HttpRequest'

class AuthProvider extends HttpRequest {
    auth (username,password) {
        return this.axios.post('/auth',{username: username,password:password})
    }


}

export default AuthProvider