import HttpRequest from '../../../resource/HttpRequest'

class AppointmentProvider extends HttpRequest {

  headerToken(access_token) {

    return {'authorization': 'Bearer ' + localStorage.getItem('access_token')}
  }

  availables(calendarId, date) {
    return this.axiosInstance.get(this.entity + '/availables/' + calendarId + '/' + date,
      {headers: {'authorization': 'Bearer ' + localStorage.getItem('access_token')}}
    )
  }

  findByCalendarAndDate(calendarId, from, to) {
    return this.axiosInstance.get(this.entity + '?calendar=' + calendarId + '&start=' + from + '<>' + to,
      {headers: {'authorization': 'Bearer ' + localStorage.getItem('access_token')}}
    )
  }

  myAppointments() {
    return this.axiosInstance.get(this.entity + '/my-appointments',
      {
        headers: {'authorization': 'Bearer ' + localStorage.getItem('access_token')}
      })
  }

  cancel(appointmentId) {

    let data = new FormData()

    return this.axiosInstance.post(this.entity + '/cancel/' + appointmentId,
      data,
      {
        headers: {
          'authorization': 'Bearer ' + localStorage.getItem('access_token')
        }
      }
    )

  }

  take(calendar, start, duration) {

    let data = new FormData()
    data.append('calendar', calendar)
    data.append('start', start)
    data.append('duration', duration)

    return this.axiosInstance.post(this.entity + '/take',
      data,
      {
        headers: {
          'authorization': 'Bearer ' + localStorage.getItem('access_token'),
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }
    )
  }

  takeAdmin(calendar, start, duration, user) {

    let data = new FormData()
    data.append('calendar', calendar)
    data.append('start', start)
    data.append('duration', duration)
    data.append('user', user)

    return this.axiosInstance.post(this.entity + '/take',
      data,
      {
        headers: {
          'authorization': 'Bearer ' + localStorage.getItem('access_token'),
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }
    )

  }


}

export default AppointmentProvider
