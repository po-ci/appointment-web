<template>

  <v-container fluid grid-list-md class="grey lighten-3">
    <v-layout row wrap>
      <v-flex xs12 sm12 md12>
        <v-card class="elevation-12">
          <v-card-title class="pb-2">
            <h2>Solicitud de turno en 3 pasos</h2>
          </v-card-title>
        </v-card>
      </v-flex>
    </v-layout>

    <v-layout row wrap>

      <!-- STEP 1 -->
      <v-flex xs12 sm12 md4>
        <v-card :class="$vuetify.breakpoint.mdAndUp?'appointment-step-card':''">
          <v-card-title class="pa-1">
            <h3 class="pa-0">
              <v-btn fab dark small color="primary">
                1
              </v-btn>
              Elegir Agenda
            </h3>
          </v-card-title>

          <v-card-text class="text-xs-center pa-1">
            <appointments-calendars></appointments-calendars>
          </v-card-text>
        </v-card>
      </v-flex>

      <!-- STEP 2 -->

      <v-flex xs12 sm12 md4>
        <v-card :class="$vuetify.breakpoint.mdAndUp?'appointment-step-card':''">
          <v-card-title class="pa-1">
            <h3 class="pa-0">
              <v-btn fab dark small color="primary">
                2
              </v-btn>
              Selecionar Dia
            </h3>
          </v-card-title>

          <v-card-text class="text-xs-center pa-2">

            <div v-if="isAgendaSelected" class="text-xs-center">
              <v-alert
                class="ma-5 title"
                :value="true"
                color="info"
                outline
              >
                Seleccionar agenda
              </v-alert>

            </div>

            <appointments-date-picker v-else></appointments-date-picker>
          </v-card-text>
        </v-card>
      </v-flex>


      <!-- STEP 3 -->

      <v-flex xs12 sm12 md4>
        <v-card :class="$vuetify.breakpoint.mdAndUp?'appointment-step-card':''">
          <v-card-title class="pa-1">
            <h3 class="pa-0">
              <v-btn fab dark small color="primary">
                3
              </v-btn>
              Confirmar Horario
            </h3>
          </v-card-title>

          <v-card-text class="pa-1">

            <div v-if="isAgendaAndDaySelected" class="text-xs-center">
              <v-alert
                class="ma-5 title"
                :value="true"
                color="info"
                outline
              >
                Seleccionar agenda y dia
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


              <div :style="$vuetify.breakpoint.mdAndUp?'height:330px; overflow-y: scroll; overflow-x: hidden;':''">

                <v-alert v-if="checkCalendarAppointment"
                         class="ma-5 title text-xs-center"
                         :value="true"
                         color="error"
                         outline
                >
                  Ya tiene registrado un turno para esta agenda.<br>
                  <v-btn
                    color="secundary darken-1"
                    flat="flat"
                    @click="$router.push('/my-appointments')"
                  >
                    Ver mis Turnos
                  </v-btn>
                </v-alert>
                <template v-else>
                  <appointments-available v-for="s in getAvailableShifts"
                                          :date="getDateFormated"
                                          :day="getDateDay"
                                          :start="s.start"
                                          :hour="s.hour"
                                          :duration="s.duration"
                                          :calendar="getCalendarSelected"
                                          v-on:bookAppointment="bookAppointment"
                  ></appointments-available>
                </template>
              </div>
            </div>


            <div v-else>
              <v-alert
                class=" title font-weight-light text-xs-center"
                :value="true"
                color="warning"
                outline
              >
                No hay turnos disponibles para la fecha seleccionada. <br>Intenta otra fecha por favor.
              </v-alert>
            </div>


          </v-card-text>
        </v-card>
      </v-flex>

    </v-layout>


    <appointments-confirm :dialog="dialog" :appointment="appointment"
                          v-on:closeDialog="dialog = false"></appointments-confirm>

  </v-container>

</template>

<script>

  import {mapActions, mapGetters} from 'vuex'
  import AppointmentsDatePicker from './AppointmentsDatePicker'
  //  import AppointmentsCalendars from './AppointmentsCalendarSelect'
  import AppointmentsCalendars from './AppointmentsCalendarRadio'
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
      this.clearData()
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

      isAgendaSelected() {
        return (this.getCalendarSelected) ? false : true
      },
      isAgendaAndDaySelected() {
        return (this.getDate && this.getCalendarSelected) ? false : true
      },

      ...mapGetters([
        'checkCalendarAppointment',
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
      clearData: function () {
        this.setCalendarSelected(null)
        this.$store.commit('SET_DATE', null)
      },
      bookAppointment: function (appointmentData) {

        this.clearLastAppointment()
        this.dialog = true
        this.appointment = appointmentData
      },

      ...mapActions([
        'fetchCalendars',
        'fetchAvailableAppointments',
        'clearLastAppointment',
        'setCalendarSelected'
      ])
    }
  }
</script>

<style scoped>
  .appointment-step-card {
    height: 400px;
  }
</style>
