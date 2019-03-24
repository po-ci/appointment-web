<template>
  <v-dialog
    v-model="dialog"
    max-width="600"
    fullscreen
    persistent
  >
    <v-card>
      <v-flex md4 offset-md4 xs12 class="pa-4">

        <!--appointment rechazado-->
        <v-card v-if="getLastAppointment && getLastAppointment.status == false">
          <v-card-text v-if="getLastAppointment.message">

            <v-alert
              class="text-xs-center headline"
              :value="true"
              color="error"
              outline
            >
              {{getLastAppointment.message}}
            </v-alert>

          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>


            <v-btn
              color="grey darken-1"
              flat="flat"
              @click="$emit('closeDialog')"
            >
              Cerrar
            </v-btn>

          </v-card-actions>
        </v-card>

        <!--appointment confirmado-->
        <v-card v-else-if="getLastAppointment && getLastAppointment.status == true">
          <v-card-text v-if="getLastAppointment.message">

            <v-alert
              :value="true"
              color="success"
              outline
              class="text-xs-center headline"
            >
              {{getLastAppointment.message}}
            </v-alert>

          </v-card-text>

          <v-card-actions class="text-xs-center">
            <v-spacer></v-spacer>
            <v-btn
              color="primary darken-1"
              flat="flat"
              @click="goToMyAppointments"
            >
              Mis Turnos
            </v-btn>

          </v-card-actions>
        </v-card>

        <!--appointment por confirmar-->
        <v-card v-else>

          <v-card-title class="pb-0"
          >
            <span class="headline">Confirmación de Turno</span>
          </v-card-title>

          <v-card-text v-if="dialog" class="pt-0">


            <view-appointment :appointment="appointment"></view-appointment>

          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>


            <v-btn
              color="grey darken-1"
              flat="flat"
              @click="$emit('closeDialog')"
            >
              Cancelar
            </v-btn>

            <v-btn :loading="getCalendarLoading" color="primary" dark @click="confirmappointment">Confirmar Turno
            </v-btn>

          </v-card-actions>
        </v-card>
      </v-flex>
    </v-card>
  </v-dialog>
</template>

<script>
  import {mapGetters, mapActions} from 'vuex'
  import moment from 'moment'
  import ViewAppointment from "./ViewAppointment";

  export default {
    name: "AppointmentsConfirm",
    components: {ViewAppointment},
    props: {
      dialog: {type: Boolean, default: false},
      appointment: {type: Object}
    },
    data: () => ({}
    ),
    computed: {
      getFriendlyDateTime: function () {
        if (this.appointment && this.appointment.date && this.appointment.hour) {
          let m = moment(this.appointment.date + " " + this.appointment.hour)
          return m.format("dddd Do MMMM  YYYY")
        }
        return ""
      },
      ...mapGetters([
        'getCalendarLoading',
        'getLastAppointment'
      ]),
    },
    methods: {
      goToMyAppointments: function(){
        this.$emit('closeDialog')
        this.$router.push('/my-appointments')
      },
      confirmappointment: function () {
        this.takeAppointment({
          calendar: this.appointment.calendar.id,
          start: this.appointment.start,
          duration: this.appointment.duration
        });
      },

      ...mapActions([
        'takeAppointment'
      ]),

    }
  }
</script>

<style scoped>

</style>
