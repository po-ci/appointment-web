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

                <div v-else-if="getCalendarLoading" class="text-xs-center mt-5">
                  <v-progress-circular
                    :size="100"
                    :width="6"
                    color="primary"
                    indeterminate
                  ></v-progress-circular>
                </div>

                <div v-else-if="getAvailableShifts.length > 0">
                  <shifts-available v-for="s in getAvailableShifts"
                                    :hour="s.hour"
                                    :calendar="getCalendarSelected"
                  ></shifts-available>
                </div>



                <div v-else>
                  <v-alert
                    :value="true"
                    color="warning"
                    icon="priority_high"
                    outline
                  >
                    No hay turnos para la agenda y fecha seleccionada. Intenta otra fecha por favor.
                  </v-alert>
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
      },
      getCalendarSelected: function () {
        this.fetchAvailableShifts()
      },
    },
    computed: {
      isSelected() {
        return (this.getDate && this.getCalendarSelected) ? false : true
      },

      ...mapGetters([
        'getDateFormated',
        'getDate',
        'getCalendarSelected',
        'getAvailableShifts',
        'getCalendarLoading'
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
