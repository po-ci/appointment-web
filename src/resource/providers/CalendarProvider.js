import HttpRequest from './../HttpRequest'
import qs from 'querystring'

class CalendarProvider extends HttpRequest {



    findAll(){
        return this.fetchAll()
    }

    availableShifts(calendarId,date){
      return this.axios.get(process.env.VUE_APP_APIHOST + '/zfmc/shift/available-shifts/' + calendarId + '/' + date)
    }

}

export default CalendarProvider
