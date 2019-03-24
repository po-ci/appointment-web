<template>
  <v-container class="grey lighten-3">

    <v-layout row wrap>
      <v-flex class="pa-2" xs12 sm12 md6 offset-md3>
        <v-card class="elevation-12">
          <v-card-title primary-title>
            <div>
              <h3 class="headline">Mis Turnos</h3>
              <div> A continuación se muestra los turnos reservados</div>
            </div>
          </v-card-title>
        </v-card>
      </v-flex>
    </v-layout>


    <!--List of Appointments-->
    <v-layout row wrap>
      <v-flex class="pa-2" xs12 sm12 md6 offset-md3>
        <v-tabs
          v-model="active"
          color="primary"
          dark
          slider-color="yellow"
        >

          <v-tab :key="'pending'" ripple>Pendientes</v-tab>
          <v-tab :key="'cancelled'" ripple>Cancelados</v-tab>
          <v-tab :key="'expired'" ripple>Vencidos</v-tab>
          <v-tab :key="'all'" ripple>Todos</v-tab>


          <v-tab-item :key="'pending'">
            <v-flex class="pa-0 mt-2"  v-for="appointment in pendingAppointment">
              <my-appointments-view :appointment="appointment"></my-appointments-view>
            </v-flex>
          </v-tab-item>

          <v-tab-item :key="'cancelled'">
            <v-flex class="pa-0 my-2"  v-for="appointment in cancelledAppointment">
              <my-appointments-view :appointment="appointment"></my-appointments-view>
            </v-flex>
          </v-tab-item>

          <v-tab-item :key="'expired'">
            <v-flex class="pa-0 my-2"  v-for="appointment in expiredAppointment">
              <my-appointments-view :appointment="appointment"></my-appointments-view>
            </v-flex>
          </v-tab-item>

          <v-tab-item :key="'all'">
            <v-flex class="pa-0 mb-2"  v-for="appointment in getAppointments">
              <my-appointments-view :appointment="appointment"></my-appointments-view>
            </v-flex>
          </v-tab-item>

        </v-tabs>
      </v-flex>


    </v-layout>

  </v-container>
</template>

<script>

  import {mapGetters, mapActions} from 'vuex'
  import MyAppointmentsView from './MyAppointmentsView'

  export default {
    name: "MyAppointments",
    components: {MyAppointmentsView},
    data: () => ({
      active: 'pendientes',


    }),
    computed: {

      ...mapGetters([
        'getAppointments',
        'getCalendarLoading',
        'pendingAppointment',
        'cancelledAppointment',
        'expiredAppointment'
      ])
    },
    methods: {
      ...mapActions([
          'cancelAppointment'
        ]
      )
    }
  }
</script>

<style scoped>

</style>
