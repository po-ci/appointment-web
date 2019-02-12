<template>
  <v-select
    v-if="getCalendars.length > 0"
    v-model="select"
    :items="getCalendars"
    item-text="name"
    item-value="id"
    label="Agenda"
    v-on:change="onChange"
  ></v-select>

  <v-progress-linear v-else indeterminate>

  </v-progress-linear>
</template>

<script>

  import {mapActions, mapGetters} from 'vuex'


  export default {
    name: "AppointmentsCalendars",
    data: () => ({
      select: null
    }),
    computed: {
      ...mapGetters([
        'getCalendars',
        'getAvailableShifts',
        'findCalendarById'
      ]),
    },
    methods: {

      onChange: function (value) {
        this.setCalendarSelected(this.findCalendarById(value))
      },

      ...mapActions([
        'setCalendarSelected',

      ])
    }
  }
</script>

<style scoped>

</style>
