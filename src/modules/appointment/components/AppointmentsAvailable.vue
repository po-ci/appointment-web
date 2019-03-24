<template>
  <v-card class="ma-1">
    <v-card-text class="pt-1 pb-1">
      <v-layout row wrap>
        <v-flex xs5>
          <v-btn flat color="primary">
            <v-icon dark left>alarm</v-icon>
            {{hour}}
          </v-btn>

        </v-flex>

        <v-flex xs7 class="text-xs-center">
          <v-btn color="secondary"
                 v-on:click="$emit('bookAppointment',{date: date, day: day, start: start, duration: duration, hour: hour,calendar: calendar})">
            <!--<v-icon left>insert_invitation</v-icon>-->
            Confirmar
          </v-btn>

        </v-flex>

      </v-layout>
    </v-card-text>
  </v-card>
</template>

<script>
  import {mapGetters} from 'vuex'

  export default {
    name: "AppointmentsAvailable",
    props: {
      day: {type: String},
      date: {type: String},
      start: {type: String},
      hour: {type: String},
      duration: {type: Number},
      calendar: {type: Object}
    },
    computed: {
      ...mapGetters([
        'getAppointments',
        'getAppointmentByCalendarAndDate'
      ]),
    }

  }
</script>

<style scoped>

</style>
