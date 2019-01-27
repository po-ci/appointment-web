
import HttpRequest from './../HttpRequest'
import qs from 'querystring'

class AuthProvider extends HttpRequest {
    auth (username,password) {

        let data = new FormData()
        data.append('username',username)
        data.append('password',password)

        return this.axios.post(
            process.env.VUE_APP_APIHOST + '/auth',
            data,
            {
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}

            }
        )
    }


}

export default AuthProvider