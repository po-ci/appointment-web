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
                <shifts-calendars></shifts-calendars>
                <shifts-date-picker></shifts-date-picker>
              </v-flex>

              <v-flex xs12 md9 class="pa-1">

                <div v-if="isSelected">
                  Por favor, seleccionar Agenda y Fecha.
                </div>

                <div v-else>
                  <shifts-available v-for="s in getAvailableShifts"
                                    :hour="s.hour"
                  ></shifts-available>
                </div>

              </v-flex>

            </v-layout>


          </v-card-text>

        </v-card>

      </v-flex>
    </v-layout>

  </v-container>

</template>

<script>

  import {mapActions, mapGetters} from 'vuex'
  import ShiftsDatePicker from './ShiftsDatePicker'
  import ShiftsCalendars from './ShiftsCalendars'
  import ShiftsAvailable from './ShiftsAvailable'

  export default {
    name: "Turnos",
    components: {ShiftsCalendars, ShiftsDatePicker,ShiftsAvailable},
    mounted: function () {
      this.fetchCalendars()
    },
    watch: {
      getDate: function () {
        this.fetchAvailableShifts()
      }
    },
    computed: {
      isSelected() {
        return (this.getDate && this.getCalendarSelected) ? false : true
      },

      ...mapGetters([
        'getDateFormated',
        'getDate',
        'getCalendarSelected',
        'getAvailableShifts'
      ]),
    },
    methods: {
      ...mapActions([
        'fetchCalendars',
        'fetchAvailableShifts'
      ])
    }
  }
</script>

<style scoped>

</style>
