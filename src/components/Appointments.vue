<template>

  <v-container fluid fill-height class="grey lighten-3">
    <v-layout justify-center>
      <v-flex xs12 sm12 md12>
        <v-card class="elevation-12">
          <v-card-title class="pb-0">
            <h2>Turnos</h2>
          </v-card-title>

          <v-card-text class="pt-1">

            <v-layout fluid row wrap>

              <v-flex xs12 md3 class="pa-1">
                <appointments-calendars></appointments-calendars>
                <appointments-date-picker></appointments-date-picker>
              </v-flex>

              <v-flex xs12 md7 offset-md1 class="pa-1">

                <div v-if="isSelected" class="text-xs-center">
                  <v-alert
                    class="ma-5 headline"
                    :value="true"
                    color="info"
                    icon="priority_high"
                    outline
                  >
                    Seleccionar Agenda y Fecha.
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

                  <v-layout row wrap class="mb-4">
                    <v-flex class="text-xs-center">

                      <h5 class="grey--text text--darken-1 title text-uppercase">
                        <v-icon>calendar_today</v-icon>
                        {{getCalendarSelected.name}}: {{getFriendlyDateFormated}}
                      </h5>

                    </v-flex>
                  </v-layout>

                  <appointments-available v-for="s in getAvailableShifts"
                                          :date="getDateFormated"
                                          :day="getDateDay"
                                          :start="s.start"
                                          :hour="s.hour"
                                          :duration="s.duration"
                                          :calendar="getCalendarSelected"
                                          v-on:bookAppointment="bookAppointment"
                  ></appointments-available>
                </div>


                <div v-else>
                  <v-alert
                    class=" headline text-xs-center"
                    :value="true"
                    color="warning"
                    icon="priority_high"
                    outline
                  >
                    No hay turnos disponibles para la fecha seleccionada. <br>Intenta otra fecha por favor.
                  </v-alert>
                </div>

              </v-flex>

            </v-layout>


          </v-card-text>

        </v-card>

      </v-flex>

      <appointments-confirm :dialog="dialog" :appointment="appointment" v-on:closeDialog="dialog = false"></appointments-confirm>

    </v-layout>

  </v-container>

</template>

<script>

  import {mapActions, mapGetters} from 'vuex'
  import AppointmentsDatePicker from './AppointmentsDatePicker'
  import AppointmentsCalendars from './AppointmentsCalendars'
  import AppointmentsAvailable from './AppointmentsAvailable'
  import AppointmentsConfirm from './AppointmentsConfirm'

  export default {
    name: "Turnos",
    components: {AppointmentsCalendars, AppointmentsDatePicker, AppointmentsAvailable, AppointmentsConfirm},
    data: () => ({
        dialog: false,
        appointment: null
      }
    ),
    mounted: function () {
      this.fetchCalendars()
    },
    watch: {

      getDate: function () {
        this.fetchAvailableAppointments()
      },

      getCalendarSelected: function () {
        this.fetchAvailableAppointments()
      },

    },
    computed: {

      isSelected() {
        return (this.getDate && this.getCalendarSelected) ? false : true
      },

      ...mapGetters([
        'getDateFormated',
        'getDateDay',
        'getDate',
        'getCalendarSelected',
        'getAvailableShifts',
        'getCalendarLoading',
        'getFriendlyDateFormated'
      ]),
    },
    methods: {

      bookAppointment: function (appointmentData) {

        this.clearLastAppointment()
        this.dialog = true
        this.appointment = appointmentData
      },

      ...mapActions([
        'fetchCalendars',
        'fetchAvailableAppointments',
        'clearLastAppointment'
      ])
    }
  }
</script>

<style scoped>

</style>
