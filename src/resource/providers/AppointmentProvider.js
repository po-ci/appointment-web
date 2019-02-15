import HttpRequest from './../HttpRequest'

class AppointmentProvider extends HttpRequest {

  availables(calendarId, date) {
    return this.axiosInstance.get(this.apipath +  '/appointments/availables/' + calendarId + '/' + date)
  }

  myAppointments() {
    return this.axiosInstance.get(this.apipath +  '/appointments/my-appointments')
  }

  take(calendar, start, duration) {

    let data = new FormData()
    data.append('calendar', calendar)
    data.append('start', start)
    data.append('duration', duration)

    return this.axiosInstance.post( this.apipath + '/appointments/take',
      data,
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }
    )

  }

  updateEvent(event) {
    return this.update(event.id, event)
  }

  findEventsByCalendarAndDate(calendarId, dateFrom, dateTo) {
    let filters = '?calendar=' + calendarId + '&start=' + dateFrom + '<>' + dateTo;
    return this.fetchFilters(filters);
  }


}

export default AppointmentProvider
