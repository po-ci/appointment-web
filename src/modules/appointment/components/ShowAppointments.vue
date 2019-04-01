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
        'getShowAppointmentsByCalendar'
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
        'setNowToDate'
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
      }
    }
  }

</script>

<style scoped>
  .appointment-step-card {
    height: 350px;
  }
</style>

