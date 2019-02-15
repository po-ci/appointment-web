import HttpRequest from './../HttpRequest'

class AppointmentProvider extends HttpRequest {

  headerToken(access_token) {

    return {'authorization': 'Bearer ' + localStorage.getItem('access_token')}
  }

  availables(calendarId, date) {
    return this.axiosInstance.get(this.apipath + '/appointments/availables/' + calendarId + '/' + date,
      {headers: {'authorization': 'Bearer ' + localStorage.getItem('access_token')}}
    )
  }

  myAppointments() {
    return this.axiosInstance.get(this.apipath + '/appointments/my-appointments',
      {
        headers: {'authorization': 'Bearer ' + localStorage.getItem('access_token')}
      })
  }

  take(calendar, start, duration) {

    let data = new FormData()
    data.append('calendar', calendar)
    data.append('start', start)
    data.append('duration', duration)

    return this.axiosInstance.post(this.apipath + '/appointments/take',
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
