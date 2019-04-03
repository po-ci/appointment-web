<template>


  <v-menu
    ref="menu"
    :close-on-content-click="false"
    :nudge-right="40"
    lazy
    transition="scale-transition"
    offset-y
    full-width
    max-width="290px"
    min-width="290px"
  >
    <v-text-field
      slot="activator"
      v-model="datePick"
      label="Fecha"
      prepend-icon="event"
      readonly

    ></v-text-field>
    <v-date-picker
      v-model="datePick"
      locale="es-es"
      no-title
      color="secondary"
      :show-current="false"
      :allowed-dates="allowedDates"
      @input="$refs.menu.save(datePick)"
    ></v-date-picker>
  </v-menu>
</template>

<script>
  import moment from 'moment'
  import tz from 'moment-timezone'
  import 'moment/locale/es';

  import {mapGetters} from 'vuex'

  export default {
    name: "AdminAppointmentsDatePicker",
    data: () => ({}),
    methods: {

      allowedDates: function (val) {
        let start = moment().tz('America/Argentina/Buenos_Aires').locale('es').startOf('day')
        let end = start.clone()

        let v = moment(val)


        if(this.getSpecificsSchedulesActive.findIndex(sc => sc.date == val) != -1){
          return true
        }

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
        'getCalendarSelected',
        'getSpecificsSchedulesActive'
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
