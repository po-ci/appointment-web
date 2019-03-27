<template>
  <div>
    <v-card class="elevation-12" :class="getClass">
      <v-card-text class="pa-2">
        <view-appointment :appointment="appointment"></view-appointment>
        <v-btn v-if="appointment.status == 1"
               class="ml-3 mb-0 px-1"
               :color="'amber lighten-4'"
               @click="dialogCancel = true"
               small

        >
         Cancelar
        </v-btn>
      </v-card-text>

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
      ]),
      getClass: function(){
        if(this.appointment.status == 2 || this.appointment.status == 3){
          return 'border-error'
        }
        if(this.appointment.status == 1){
          return 'border-green'
        }
        return ''
      }
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
.border-error{
  border:1px solid red;
}
.border-green{
  border:1px solid green;
}
</style>
