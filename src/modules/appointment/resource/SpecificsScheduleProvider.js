import HttpRequest from '../../../resource/HttpRequest'

class SpecificsScheduleProvider extends HttpRequest {

  fetchActive(from) {
    return this.axiosInstance.get(this.entity + '?date=>=' + from,
      {headers: {'authorization': 'Bearer ' + localStorage.getItem('access_token')}}
    )
  }

}

export default SpecificsScheduleProvider
