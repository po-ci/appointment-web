<template>


  <v-radio-group  v-if="getCalendars.length > 0" v-model="select" :mandatory="true" @change="onChange">

    <v-radio
      v-for="calendar in getCalendars"
      :key="calendar.id"
      :label="`${calendar.name}`"
      :value="calendar.id"
    ></v-radio>

  </v-radio-group>


  <v-flex v-else>
    <span class="primary--text">Cargando Agendas</span>
    <v-progress-linear  indeterminate> </v-progress-linear>
  </v-flex>


</template>

<script>

  import {mapActions, mapGetters} from 'vuex'


  export default {
    name: "AppointmentsCalendarsRadio",
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
