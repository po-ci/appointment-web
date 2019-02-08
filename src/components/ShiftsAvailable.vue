<template>
  <v-card class="ma-1">
    <v-card-text class="pt-1 pb-1">
      <v-layout row wrap>
        <v-flex  xs9>
          <v-btn flat color="primary">
            <v-icon dark left>alarm</v-icon>
            {{hour}}
          </v-btn>

        </v-flex>

        <v-flex xs3 class="text-xs-center">
          <v-btn color="secondary" v-on:click="$emit('bookShift',{date: date, day: day, hour: hour,calendar: calendar})">
            <v-icon>insert_invitation</v-icon>
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
