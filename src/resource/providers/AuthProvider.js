import HttpRequest from './../HttpRequest'
import qs from 'querystring'

class AuthProvider extends HttpRequest {
  auth(username, password) {

    let data = new FormData()
    data.append('username', username)
    data.append('password', password)

    return this.axios.post(
      process.env.VUE_APP_APIHOST + '/auth',
      data,
      {
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}

      }
    )
  }

  register(name, username, email, phone, password) {

    let data = new FormData()
    data.append('name', name)
    data.append('username', username)
    data.append('email', email)
    data.append('phone', phone)
    data.append('password', password)

    return this.axios.post(
      process.env.VUE_APP_APIHOST + '/security/api/register',
      data,
      {
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}

      }
    )
  }

  recovery(email) {

    let data = new FormData()
    data.append('email', email)

    return this.axios.post(
      process.env.VUE_APP_APIHOST + '/security/api/recovery',
      data,
      {
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}

      }
    )
  }

  passwordChange(password, password_verify, token) {

    let data = new FormData()
    data.append('password', password)
    data.append('password_verify', password_verify)

    return this.axios.post(
      process.env.VUE_APP_APIHOST + '/security/api/password-change',
      data,
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'authorization': 'Bearer ' + token
        }

      }
    )
  }


  imageChange(img, token) {

    let data = new FormData()
    data.append('img', img)

    return this.axios.post(
      process.env.VUE_APP_APIHOST + '/security/api/image-change',
      data,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          'authorization': 'Bearer ' + token
        }

      }
    )
  }

  validate(id, token) {

    return this.axios.get(process.env.VUE_APP_APIHOST + '/security/api/validate/' + id + '/' + token)
  }

  users() {
    return this.axios.get(process.env.VUE_APP_APIHOST + '/security/api/users')
  }

}

export default AuthProvider
