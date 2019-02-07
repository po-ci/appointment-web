<template>
  <v-card class="ma-1">
    <v-card-text>
      <v-layout row wrap>
        <v-flex md3 xs12>
          <v-btn flat color="primary">
            <v-icon dark left>alarm</v-icon>
            {{hour}}
          </v-btn>

        </v-flex>

        <v-flex md6 xs12>
          <v-btn flat color="primary">
            <v-icon dark left>assignment_ind</v-icon>
            {{calendar.name}}
          </v-btn>

        </v-flex>

        <v-flex md3 xs12 class="text-xs-center">
          <v-btn color="info" v-on:click="$emit('bookShift',{date: date, day: day, hour: hour,calendar: calendar})">
            Reservar
          </v-btn>

        </v-flex>

      </v-layout>
    </v-card-text>
  </v-card>
</template>

<script>


  export default {
    name: "ShiftsAvailable",
    props: {
      day: {type: String},
      date: {type: String},
      hour: {type: String},
      calendar: {type: Object}
    },

  }
</script>

<style scoped>

</style>
