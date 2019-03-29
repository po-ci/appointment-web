<template>
  <v-date-picker
    v-model="datePick"
    locale="es-es"
    no-title
    color="secondary"
    :show-current="false"
    class="text-xs-center"
    :allowed-dates="allowedDates"

  ></v-date-picker>
</template>

<script>
  import moment from 'moment'
  import tz from 'moment-timezone'
  import 'moment/locale/es';

  import {mapGetters} from 'vuex'

  export default {
    name: "AppointmentsDatePicker",
    data: () => ({}),
    methods: {

      allowedDates: function (val) {
        let start = moment().tz('America/Argentina/Buenos_Aires').locale('es').startOf('day')
        let end = start.clone()

        let v = moment(val)

        //TODO: Specific Schedule

        //Working Days
        if(this.getWorkingDays && this.getWorkingDays.findIndex(d => d == v.format('E')) == -1){
          return false
        }

        //Max Days
        end.add(this.getMaxDays, 'days')


        if (v >= start && v <= end) {
          return true
        }

        return false
      }

    },
    computed: {
      ...mapGetters([
        'getDateFormated',
        'getCalendarSelected'
      ]),
      getMaxDays: function () {
        if (this.getCalendarSelected && this.getCalendarSelected.appointmentConfig && this.getCalendarSelected.appointmentConfig.maxTimeInDays) {
          return this.getCalendarSelected.appointmentConfig.maxTimeInDays
        }
        return 30
      },
      getWorkingDays: function () {
        let days = []
        if (this.getCalendarSelected && this.getCalendarSelected.schedules) {

          this.getCalendarSelected.schedules.forEach(function(schedule){
            if (schedule.start && schedule.end) {
              days.push(schedule.day)
            }
          })
        }
        return days
      },
      datePick: {
        get() {
          return this.getDateFormated
        },
        set(value) {
          this.$store.commit('SET_DATE', value)
        }
      }
    }
  }
</script>

<style scoped>

</style>
