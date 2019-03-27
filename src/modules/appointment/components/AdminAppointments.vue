<template>
  <v-container class="grey lighten-3">

    <v-layout row wrap>
      <v-flex class="pa-2" offset-md2 xs12 sm12 md8>
        <v-card class="elevation-12">
          <v-card-title primary-title="">
            <div>
              <h3 class="headline">Administración de Turnos</h3>
              <div> A continuación se muestra los turnos reservados</div>
            </div>
          </v-card-title>

        </v-card>
      </v-flex>
      <v-flex class="pa-2 offset-md2" xs12 md8>
        <v-card class="elevation-4">
          <v-card-text>
            <v-layout row wrap>
              <v-flex xs12 sm12 md12 class="px-4 py-1">
                <appointments-calendar-selected></appointments-calendar-selected>
              </v-flex>
              <v-flex xs12 sm12 md12 class="px-4 py-1">
                <admin-appointments-date-picker></admin-appointments-date-picker>
              </v-flex>
            </v-layout>
          </v-card-text>
        </v-card>
      </v-flex>


      <v-flex class="pa-2 offset-md2" xs12 md8>
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
          <v-flex xs12 md8 class="pa-2 offset-md2">
            <v-card>
              <v-card-text>Todos los turnos</v-card-text>
            </v-card>
          </v-flex>
        </v-layout>
      </v-tab-item>


      <v-tab-item :key="'assing'" class="pa-2">
        <v-layout row wrap>
          <v-flex xs12 md8 class="offset-md2">
            <admin-appointments-hours></admin-appointments-hours>
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
        data: {
          id: null,
          start: null,
          end: null
        }
      }
    ),
    mounted: function () {
      this.clearData()
      this.fetchCalendars()
    },
    watch: {

      getDate: function () {
        this.fetchAvailableAppointments()
        //this.fetchAllAppointsments()
      },

      getCalendarSelected: function () {
        //this.fetchAllAppointsments()
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
        'getAllAppointments'
      ]),
    },
    methods: {
      clearData: function () {
        this.setCalendarSelected(null)
        this.$store.commit('SET_DATE', null)
      },
      ...mapActions([
        'fetchCalendars',
        'fetchAvailableAppointments',
        'clearLastAppointment',
        'setCalendarSelected',
        'fetchAllAppointments'
      ]),

      fetchAllAppointsments() {
        this.data.id = this.getCalendarSelected()
        this.data.start = this.getDate()
        if (this.data.id && this.data.start) {
          data.start = moment().format(data.start, 'yyyy-mm-dd')
          console.log(data)
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

