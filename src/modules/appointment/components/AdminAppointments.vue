<template>
  <v-container class="grey lighten-3">

    <v-layout row wrap>

      <v-flex class="pa-2" offset-md2 xs12 sm12 md8>
        <v-card class="elevation-12">
          <v-card-title primary-title="">
            <div>
              <h3 class="headline">Asignación de Turnos</h3>
            </div>
          </v-card-title>
        </v-card>

      </v-flex>


      <v-flex class="pa-2 offset-md2" xs12 md8>
        <v-card class="elevation-4">
          <v-card-text>
            <v-layout row wrap>
              <v-flex xs12 sm12 md6 class="px-4 py-1">
                <appointments-calendar-selected></appointments-calendar-selected>
              </v-flex>
              <v-flex xs12 sm12 md6 class="px-4 py-1">
                <admin-appointments-date-picker></admin-appointments-date-picker>
              </v-flex>
            </v-layout>
          </v-card-text>
        </v-card>
      </v-flex>


      <v-flex class="pa-2 offset-md2" xs12 md8>
        <v-card class="elevation-4">
          <v-card-text>
          <v-tabs fixed-tabs v-model="tabs" color="primary" dark slider-color="white">
            <v-tab :key="'assing'" ripple>Asignacion De Turnos</v-tab>
            <v-tab :key="'appointments'" ripple>Turnos Activos</v-tab>
          </v-tabs>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>


    <v-tabs-items v-model="tabs">

      <v-tab-item :key="'assing'" class="pa-2">
        <v-layout row wrap>
          <v-flex xs12 md8 class="offset-md2">
            <admin-appointments-hours></admin-appointments-hours>
          </v-flex>
        </v-layout>
      </v-tab-item>

      <v-tab-item :key="'appointments'">
        <v-layout row wrap>
          <v-flex xs12 md8 class="pa-2 offset-md2">
            <v-card>

              <v-card-text>
                <span v-if="getCalendarSelected && getDate">Turnos vigentes Agenda <strong>{{getCalendarSelected.name}}</strong> Fecha <strong>{{getDate.format("YYYY-MM-DD")}}</strong></span>

                <v-data-table
                  :headers="[
                     {text: 'Numero', value: 'Numero'},
                   {text: 'Hora', value: 'Hora'},
                    {text: 'Nombre', value: 'Nombre'},
                  ]"
                  :items="getActiveAdminAppointments"
                  :loading="getCalendarLoading"
                  class="elevation-1">
                  <template slot="items" slot-scope="props">
                    <td>{{ props.item.id }}</td>
                    <td>{{ props.item.start.substr(11, 5) }}</td>
                    <td>{{ props.item.user.name }}</td>
                  </template>

                </v-data-table>

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
  import AppointmentsCalendarSelected from './AppointmentsCalendarSelect'
  import AdminAppointmentsDatePicker from './AdminAppointmentsDatePicker'
  import AdminAppointmentsHours from './AdminAppointmentsHours'
  import {mapActions, mapGetters} from 'vuex'

  export default {
    name: "AdminAppointments",
    components: {
      AppointmentsCalendars,
      AppointmentsCalendarSelected,
      AdminAppointmentsDatePicker,
      AdminAppointmentsHours
    },
    data: () => ({
        dialog: false,
        appointment: null,
        tabs: null,
      }
    ),
    mounted: function () {
      this.allUsers()
      this.clearData()
      this.fetchCalendars()
    },
    watch: {

      getDate: function () {
        this.doFetchAdminAppointments()
        this.fetchAvailableAppointments()
      },

      getCalendarSelected: function () {
        this.doFetchAdminAppointments()
        this.fetchAvailableAppointments()
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
        'getCalendarSelected',
        'getAvailableShifts',
        'getCalendarLoading',
        'getFriendlyDateFormated',
        'getActiveAdminAppointments',
        'getUsers'
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
        'fetchAdminAppointments'
      ]),

      doFetchAdminAppointments() {
        if (this.getCalendarSelected && this.getCalendarSelected.id && this.getDate) {
          let to = this.getDate.clone()
          to.add(1, 'days')
          this.fetchAdminAppointments({
              calendar: this.getCalendarSelected.id,
              from: this.getDate.format("YYYY-MM-DD"),
              to: to.format("YYYY-MM-DD")
            }
          )
        }
      }
    }
  }

</script>

<style scoped>
  .appointment-step-card {
    height: 350px;
  }
</style>

