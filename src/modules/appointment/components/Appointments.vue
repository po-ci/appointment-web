<template>

  <v-container fluid fill-height class="grey lighten-3">
    <v-layout justify-center>
      <v-flex xs12 sm12 md12>
        <v-card class="elevation-12">
          <v-card-title class="pb-2">
            <h2>Solicitud de Turnos</h2>
          </v-card-title>

          <v-card-text class="pt-1">


            <v-stepper v-model="step">
              <v-stepper-header>
                <v-stepper-step :complete="step > 1" step="1">Agenda</v-stepper-step>

                <v-divider></v-divider>

                <v-stepper-step :complete="step > 2" step="2">Día</v-stepper-step>

                <v-divider></v-divider>

                <v-stepper-step step="3">Horario</v-stepper-step>
              </v-stepper-header>

              <v-stepper-items>
                <v-stepper-content step="1">
                  <v-card
                  >


                    <v-card-text class="text-xs-center pa-0">

                      <h3 class="pa-0">
                        <v-btn fab dark small color="indigo">
                          1
                        </v-btn>
                        Seleccionar Agenda
                      </h3>
                    </v-card-text>

                    <v-card-text class="text-xs-center pa-0">
                      <v-flex>
                        <appointments-calendars></appointments-calendars>
                      </v-flex>
                    </v-card-text>

                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn
                        color="primary"
                        @click="step = 2"
                      >
                        Continuar
                      </v-btn>
                    </v-card-actions>

                  </v-card>


                </v-stepper-content>

                <v-stepper-content step="2">
                  <v-card
                    class="mb-5"
                  >


                    <v-card-text class="text-xs-center">

                      <appointments-date-picker></appointments-date-picker>
                    </v-card-text>


                    <v-card-actions>
                      <v-btn flat @click="step = 1">
                        <v-icon right dark>arrow_back</v-icon>Volver
                      </v-btn>
                      <v-spacer></v-spacer>
                      <v-btn color="primary" @click="step = 3">
                        Continuar
                      </v-btn>
                    </v-card-actions>

                  </v-card>


                </v-stepper-content>

                <v-stepper-content step="3">
                  <v-card
                    class="mb-5"
                  >



                    <v-card-text>
                      <v-layout fluid row wrap>
                        <v-flex xs12 md12 offset-md1 class="pa-1">
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

                    <v-card-actions>
                      <v-btn flat @click="step = 2">
                        <v-icon right dark>arrow_back</v-icon>Volver
                      </v-btn>
                    </v-card-actions>

                  </v-card>

                </v-stepper-content>

              </v-stepper-items>

            </v-stepper>


          </v-card-text>

        </v-card>

      </v-flex>

      <appointments-confirm :dialog="dialog" :appointment="appointment"
                            v-on:closeDialog="dialog = false"></appointments-confirm>

    </v-layout>

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
        step: 1,
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
