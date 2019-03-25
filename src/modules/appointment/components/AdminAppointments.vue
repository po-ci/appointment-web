<template>
  <v-container class="grey lighten-3">

    <v-layout row wrap>
      <v-flex class="pa-2" xs12 sm12 md12>
        <v-card class="elevation-12">
          <v-card-title primary-title="">
            <div>
              <h3 class="headline">Administración de Turnos</h3>
              <div> A continuación se muestra los turnos reservados</div>
            </div>
          </v-card-title>

        </v-card>
      </v-flex>
      <v-flex class="pa-2" xs12 sm12 md12>
        <v-card class="elevation-4">
          <v-tabs fixed-tabs v-model="tabs">
            <v-tab :key="'appointments'" ripple>Turnos</v-tab>
            <v-tab :key="'assing'" ripple>Asignacion De Turnos</v-tab>
          </v-tabs>
        </v-card>
      </v-flex>
    </v-layout>


    <v-tabs-items v-model="tabs">
      <v-tab-item :key="'appointments'">
        <v-layout row wrap>
          <v-flex xs12 class="pa-2">
            <v-card>
              <v-card-text>Todos los turnos</v-card-text>
            </v-card>
          </v-flex>
        </v-layout>
      </v-tab-item>


      <v-tab-item :key="'assing'">
        <v-layout row wrap>
          <v-flex xs12 sm12 md4 class="pa-2">
            <v-card class="appointment-step-card">
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

          <v-flex xs12 sm12 md4 class="pa-2">
            <v-card class="appointment-step-card">
              <v-card-title class="pa-1">
                <h3 class="pa-0">
                  <v-btn fab dark small color="primary">
                    2
                  </v-btn>
                  Selecionar Dia
                </h3>
              </v-card-title>

              <v-card-text class="text-xs-center pa-1">

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

          <v-flex xs12 sm12 md4 class="pa-2">
            <v-card class="appointment-step-card">
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

                  <!--          <v-layout row wrap class="mb-1 mt-0">
                              <v-flex class="text-xs-center">
                                <h5 class="grey&#45;&#45;text text&#45;&#45;darken-1 title text-uppercase pa-0">
                                  <v-icon>calendar_today</v-icon>
                                  {{getCalendarSelected.name}}: {{getFriendlyDateFormated}}
                                </h5>
                              </v-flex>
                            </v-layout>-->

                  <div style="height:280px; overflow-y: scroll; overflow-x: hidden;">
                    <!--<appointments-available v-for="s in getAvailableShifts"-->
                    <!--:date="getDateFormated"-->
                    <!--:day="getDateDay"-->
                    <!--:start="s.start"-->
                    <!--:hour="s.hour"-->
                    <!--:duration="s.duration"-->
                    <!--:calendar="getCalendarSelected"-->
                    <!--v-on:bookAppointment="bookAppointment"-->
                    <!--&gt;</appointments-available>-->
                  </div>
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


              </v-card-text>
            </v-card>
          </v-flex>

        </v-layout>
      </v-tab-item>
    </v-tabs-items>
  </v-container>
</template>

<script>
  import AppointmentsCalendars from './AppointmentsCalendarRadio'
  import AppointmentsDatePicker from './AppointmentsDatePicker'
  import {mapActions, mapGetters} from 'vuex'

  export default {
    name: "AdminAppointments",
    components: {
      AppointmentsCalendars,
      AppointmentsDatePicker
    },
    data: () => ({
        dialog: false,
        appointment: null,
        tabs: null
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
    height: 350px;
  }
</style>

