import HttpRequest from './../HttpRequest'

class EventProvider extends HttpRequest {
    createEvent(event) {
        return this.create('', event)
    }

    updateEvent(event) {
        return this.update(event.id, event)
    }

    findEventsByCalendarAndDate(calendarId, dateFrom, dateTo) {
        let filters = '?calendar=' + calendarId + '&start=' + dateFrom + '<>' + dateTo;
        return this.fetchFilters(filters);
    }


}

export default EventProvider