<template>
  <div>
    <v-card class="elevation-12" :class="getClass">
      <v-card-text class="pa-2">
        <view-appointment :appointment="appointment"></view-appointment>
        <v-btn v-if="appointment.status == 1"
               class="ml-3 mb-0 px-1"
               :color="'amber lighten-4'"
               @click="$emit('dialogCancel', appointment )"
               small
               :disabled="disableCancel"
        >
          Cancelar
        </v-btn>
      </v-card-text>

    </v-card>
  </div>
</template>

<script>
  import {mapGetters, mapActions} from 'vuex'
  import ViewAppointment from './ViewAppointment'
  import moment from 'moment'

  export default {
    name: "MyAppointmentsView",
    components: {ViewAppointment},
    data() {
      return {
        dialogCancel: false
      }
    },
    props: {
      appointment: {type: Object},
    },
    computed: {
      ...mapGetters([
        'getAppointmentsLoading', 'getResultAppointment', 'getCalendars'
      ]),
      getClass: function () {
        if (this.appointment.status == 2 || this.appointment.status == 3) {
          return 'border-error'
        }
        if (this.appointment.status == 1) {
          return 'border-green'
        }
        return ''
      },
      disableCancel() {
        let idCalendar = this.appointment.calendar.id
        let appointmentStart = moment(this.appointment.start, 'YYYY-MM-DD HH:mm')
        let now = moment()


        let calendar = this.getCalendars.find(calendars => calendars.id == idCalendar)
        appointmentStart.subtract(calendar.appointmentConfig.cancelTimeInHours, 'hours')

        if (now > appointmentStart) {
          return true
        }
        return false
      }
    },
    methods: {
      ...mapActions([
        'cancelAppointment'
      ]),
      appointmentCancel(appointmentId) {
        this.cancelAppointment(appointmentId)
      },


    },
  }
</script>

<style scoped>
  .border-error {
    border: 1px solid red;
  }

  .border-green {
    border: 1px solid green;
  }
</style>
