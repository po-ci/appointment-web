import HttpRequest from './../HttpRequest'
import qs from 'querystring'

class CalendarProvider extends HttpRequest {

    findAll(){
        return this.fetchAll()
    }


}

export default CalendarProvider