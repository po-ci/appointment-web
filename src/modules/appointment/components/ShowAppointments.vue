<template>
  <v-container class="grey lighten-3" fluid grid-list-md>
    <v-layout row wrap>

      <v-flex offset-md2 xs12 sm12 md8>
        <v-card class="elevation-12">
          <v-card-title primary-title="">
            <div>
              <h3 class="headline">Ver Turnos</h3>
            </div>
          </v-card-title>
        </v-card>
      </v-flex>


      <v-flex xs12 md8 offset-md2>
        <v-card class="elevation-4">
          <v-card-text class="pb-1">
            <show-appointments-date-picker></show-appointments-date-picker>
          </v-card-text>
          <v-card-text class="pt-0">
            <v-tabs fixed-tabs v-model="tabs" color="primary" dark slider-color="cyan" show-arrows>
              <v-tab v-for="calendar in getCalendars" :key="'key_'+calendar.id" ripple>{{calendar.name}}</v-tab>
            </v-tabs>

            <v-tabs-items v-model="tabs">

              <v-tab-item v-for="calendar in getCalendars" :key="'item_'+calendar.id" class="pa-2">
                <v-layout row wrap>
                  <v-flex xs12 md12 class="pa-2">

                    <span
                      v-if="getCalendarSelected && getDate">Turnos vigentes Agenda <strong>{{calendar.name}}</strong> Fecha <strong>{{getDate.format("YYYY-MM-DD")}}</strong></span>

                    <v-data-table
                      :headers="[
                     {text: '#', value: 'Numero', sortable: false},
                   {text: 'Hora', value: 'Hora', sortable: false},
                    {text: 'Nombre', value: 'Nombre', sortable: false},
                    {text: 'Aciones', value: 'actions', sortable: false},
                  ]"
                      :items="getShowAppointmentsByCalendar(calendar.id)"
                      :loading="getCalendarLoading"
                      :rows-per-page-items="[15,30,100]"
                      rows-per-page-text="Items por pagina"
                      class="elevation-1">
                      <template slot="items" slot-scope="props">
                        <td>{{ props.item.id }}</td>
                        <td>{{ props.item.start.substr(11, 5) }}</td>
                        <td>{{ props.item.user.name }}</td>
                        <td>
                          <v-icon
                            small
                            @click="dialogCancelOpen(props.item)"
                          >
                            error
                          </v-icon>
                        </td>
                      </template>

                    </v-data-table>

                  </v-flex>
                </v-layout>
              </v-tab-item>

            </v-tabs-items>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>


    <v-dialog
      v-model="dialogCancel"
      max-width="500"
    >

      <v-card v-if="getFlashMessageAppointment != null">
        <v-card-text>

          <v-alert
            :value="true"
            :color="getResultAppointment?'success':'error'"
            icon="check_circle"
            outline>
            {{getFlashMessageAppointment}}
          </v-alert>
        </v-card-text>

        <v-card-actions>
          <v-btn
            color="grey"
            flat="flat"
            @click="dialogCancel = false"
          >
            Cerrar
          </v-btn>
        </v-card-actions>
      </v-card>

      <v-card v-else>
        <v-card-title class="title" primary-title>
          Desea cancelar este turno?
        </v-card-title>
        <v-card-text>
          Si cancela el turno no se podrá recuperar nuevamente, y en tal caso deberá solicitar uno nuevo.
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="grey"
            flat="flat"
            @click="dialogCancel = false"
          >
            Cancelar
          </v-btn>
          <v-btn
            color="green darken-1"
            flat="flat"
            :loading="getAppointmentsLoading"
            @click="cancelAppointment(appointmentCancel)"
          >
            Aceptar
          </v-btn>
        </v-card-actions>
      </v-card>


    </v-dialog>


  </v-container>
</template>

<script>
  import AppointmentsCalendars from './AppointmentsCalendarRadio'
  import AppointmentsCalendarSelected from './AppointmentsCalendarSelect'
  import ShowAppointmentsDatePicker from './ShowAppointmentsDatePicker'
  import AdminAppointmentsHours from './AdminAppointmentsHours'
  import {mapActions, mapGetters} from 'vuex'

  export default {
    name: "ShowAppointments",
    components: {
      AppointmentsCalendars,
      AppointmentsCalendarSelected,
      ShowAppointmentsDatePicker,
      AdminAppointmentsHours
    },
    data: () => ({
        dialog: false,
        appointment: null,
        tabs: null,
        dialogCancel: false,
        appointmentCancel: null

      }
    ),
    mounted: function () {
      this.clearData()
      this.fetchCalendars()
      this.setNowToDate()
    },
    watch: {

      getDate: function () {
        this.doFetchShowAppointments()
      },

    },
    computed: {
      isAgendaAndDaySelected() {
        return (this.getDate && this.getCalendarSelected) ? false : true
      },

      ...mapGetters([
        'getDateFormated',
        'getDateDay',
        'getDate',
        'getCalendars',
        'getCalendarSelected',
        'getAvailableShifts',
        'getCalendarLoading',
        'getFriendlyDateFormated',
        'getActiveAdminAppointments',
        'getUsers',
        'getShowAppointmentsByCalendar',
        'getFlashMessageAppointment',
        'getResultAppointment',
        'getAppointmentsLoading'
      ]),
    },
    methods: {
      clearData: function () {
        this.setCalendarSelected(null)
        this.$store.commit('SET_DATE', null)
      },
      ...mapActions([
        'allUsers',
        'fetchCalendars',
        'fetchAvailableAppointments',
        'clearLastAppointment',
        'setCalendarSelected',
        'fetchShowAppointments',
        'setNowToDate',
        'cancelAppointment'
      ]),

      doFetchShowAppointments() {
        if (this.getDate) {
          let to = this.getDate.clone()
          to.add(1, 'days')
          this.fetchShowAppointments({
              from: this.getDate.format("YYYY-MM-DD"),
              to: to.format("YYYY-MM-DD")
            }
          )
        }
      },

      dialogCancelOpen(appointment) {
        this.appointmentCancel = appointment
        this.dialogCancel = true
      }

    }
  }

</script>

<style scoped>
  .appointment-step-card {
    height: 350px;
  }
</style>

