<template>
  <div>
    <div v-if="isAgendaAndDaySelected" class="text-xs-center">
      <v-alert
        class="ma-5 title"
        :value="true"
        color="info"
        outline
      >
        Seleccionar agenda y fecha
      </v-alert>

    </div>

    <div v-else-if="getCalendarLoading" class="text-xs-center mt-5">
      <span class="primary--text headline">Buscando turnos disponibles</span><br>
      <v-progress-circular
        class="mt-3"
        :size="100"
        :width="6"
        color="primary"
        indeterminate
      ></v-progress-circular>
    </div>

    <div v-else-if="getAvailableShifts.length > 0">

      <div style="height:330px; overflow-y: scroll; overflow-x: hidden;">
        <admin-appointments-avalive v-for="s in getAvailableShifts"
                                    :date="getDateFormated"
                                    :day="getDateDay"
                                    :start="s.start"
                                    :hour="s.hour"
                                    :duration="s.duration"
                                    :calendar="getCalendarSelected"
                                    v-on:bookAppointment="bookAppointment"
        ></admin-appointments-avalive>
      </div>
    </div>


    <div v-else>
      <v-alert
        class=" title text-xs-center"
        :value="true"
        color="warning"
        outline
      >
        No hay turnos disponibles para la fecha seleccionada. <br>Intenta otra fecha por favor.
      </v-alert>
    </div>

    <admin-appointments-confirm :dialog="dialog" :appointment="appointment"
                               v-on:closeDialog="dialog = false"></admin-appointments-confirm>
  </div>
</template>

<script>
  import AdminAppointmentsAvalive from './AdminAppointmentsAvalive'
  import AdminAppointmentsConfirm from './AdminAppointmentsConfirm'
  import {mapActions, mapGetters} from 'vuex'

  export default {
    name: "AdminAppointmentsHours",
    components: {
      AdminAppointmentsAvalive,
      AdminAppointmentsConfirm
    },
    data() {
      return {
        dialog: false,
        appointment: null
      }
    },

    computed: {
      ...mapGetters([
        'getDateFormated',
        'getDateDay',
        'getDate',
        'getCalendarSelected',
        'getAvailableShifts',
        'getCalendarLoading',
        'getFriendlyDateFormated'
      ]),
      isAgendaSelected() {
        return (this.getCalendarSelected) ? false : true
      },
      isAgendaAndDaySelected() {
        return (this.getDate && this.getCalendarSelected) ? false : true
      },
    },
    methods: {
      ...mapActions([
        'fetchCalendars',
        'fetchAvailableAppointments',
        'clearLastAppointment',
        'setCalendarSelected'
      ]),
      bookAppointment: function (appointmentData) {

        this.clearLastAppointment()
        this.dialog = true
        this.appointment = appointmentData
      }
    }
  }
</script>

<style scoped>

</style>
