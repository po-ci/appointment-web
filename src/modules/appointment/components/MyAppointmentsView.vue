<template>
  <v-card class="elevation-12">
    <v-card-text>
      <view-appointment :appointment="appointment"></view-appointment>
    </v-card-text>
    <v-card-actions class="pa-0">
      <v-spacer></v-spacer>
      <v-alert
        v-if="appointment.status == 2 || appointment.status == 3"
        :value="appointment.status == 2 || appointment.status == 3"
        color="error"
        icon="check_circle"
        outline
      >
        Cita Cancelada
      </v-alert>

      <v-btn v-if="appointment.status == 1"
             flat
             :color="'warning'"
             :loading="getCalendarLoading"
             @click="cancelAppointment(appointment.id)"
      >
        Cancelar Turno
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
  import {mapGetters, mapActions} from 'vuex'
  import ViewAppointment from './ViewAppointment'

  export default {
    name: "MyAppointmentsView",
    components: {ViewAppointment},
    props: {
      appointment: {type: Object}
    },
    computed: {
      ...mapGetters([
        'getCalendarLoading'
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
