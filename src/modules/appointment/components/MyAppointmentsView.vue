<template>
  <div>
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
               @click="dialogCancel = true"
        >
          Cancelar Turno
        </v-btn>
      </v-card-actions>
    </v-card>
    <v-dialog
      v-model="dialogCancel"
      max-width="500"
    >
      <v-card>
        <v-card-title class="title" primary-title>
          Desea cancelar este turno?
        </v-card-title>
        <v-card-text>
          Si cancela el turno no se podrá recuperar nuevamente, y en tal caso deberá solicitar uno nuevo.
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="grey"
            flat="flat"
            @click="dialogCancel = false"
          >
            Cancelar
          </v-btn>
          <v-btn
            color="green darken-1"
            flat="flat"
            :loading="getCalendarLoading"
            @click="appointmentCancel(appointment.id)"
          >
            Aceptar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
  import {mapGetters, mapActions} from 'vuex'
  import ViewAppointment from './ViewAppointment'

  export default {
    name: "MyAppointmentsView",
    components: {ViewAppointment},
    data() {
      return {
        dialogCancel: false
      }
    },
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
      ]),
      appointmentCancel(appointmentId) {
        this.cancelAppointment(appointmentId)
        this.dialogCancel = this.getCalendarLoading
      }

    }
  }
</script>

<style scoped>

</style>
