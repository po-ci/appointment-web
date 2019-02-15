<template>
  <v-container class="grey lighten-3">

    <v-layout row wrap  >
      <v-flex class="pa-2" xs12 sm12 md12>
        <v-card class="elevation-12">
          <v-card-title>
            <h3>Mis Turnos</h3>
          </v-card-title>
          <v-card-text>
            A continuación se muestra los turnos reservados
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>


    <!--List of Appointments-->
    <v-layout row wrap>
      <v-flex class="pa-2" xs12 sm12 md6  v-for="appointment in getAppointments">
        <v-card class="elevation-12">
          <v-card-text>
            <view-appointment :appointment="appointment"></view-appointment>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>

  </v-container>
</template>

<script>

  import {mapGetters} from 'vuex'
  import ViewAppointment from './ViewAppointment'

  export default {
    name: "MyAppointments",
    components: {ViewAppointment},
    computed: {

      ...mapGetters([
        'getAppointments',
      ])
    },
    methods: {}
  }
</script>

<style scoped>

</style>
