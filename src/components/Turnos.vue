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
                <turnos-date-picker></turnos-date-picker>
              </v-flex>

              <v-flex xs12 md9 class="pa-1">

                <turnos-tab></turnos-tab>
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
  import TurnosDatePicker from './TurnosDatePicker'
  import TurnosTab from './TurnosTab'

  export default {
    name: "Turnos",
    components: {TurnosTab, TurnosDatePicker},
    mounted: function () {
      this.fetchCalendars()
    },
    watch: {
      getDate: function () {
        this.fetchAvailableShifts()
      }
    },
    computed: {
      ...mapGetters([
        'getDateFormated'
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
