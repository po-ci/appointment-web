<template>
  <v-dialog
    v-model="dialog"
    max-width="600"
    persistent
  >


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
          Cerrar
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


        <view-appointment
          :appointment="appointment"
          :admin="true">

          <template v-slot:morelist>
            <v-list-tile class="pt-2">

              <v-list-tile-action>
                <v-icon color="primary">person</v-icon>
              </v-list-tile-action>

              <v-list-tile-content style="height: 55px">

                <v-autocomplete
                  md4 xs12
                  :items="getUsers"
                  item-text="name"
                  item-value="id"
                  color="white"
                  label="Usuario"
                  v-model="appointments.user"
                  required
                ></v-autocomplete>

              </v-list-tile-content>
            </v-list-tile>
          </template>
        </view-appointment>


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
    watch: {
      appointment: function () {
        this.appointments = this.appointment
      },

    },
    data: () => ({
        appointments: {
          calendar: null,
          start: null,
          duration: null,
          user: null
        }
      }
    ),
    computed: {
      getFriendlyDateTime: function () {
        if (this.appointments && this.appointments.date && this.appointments.hour) {
          let m = moment(this.appointments.date + " " + this.appointments.hour)
          return m.format("dddd Do MMMM  YYYY")
        }
        return ""
      },
      ...mapGetters([
        'getCalendarLoading',
        'getLastAppointment',
        'getUsers'
      ]),
    },
    methods: {
      goToMyAppointments: function () {
        this.$emit('closeDialog')
      },
      confirmappointment: function () {
        console.log(this.appointments)
        this.takeAdminAppointment({
          calendar: this.appointments.calendar.id,
          start: this.appointments.start,
          duration: this.appointments.duration,
          user: this.appointments.user
        });
      },
      ...mapActions([
        'takeAdminAppointment'
      ]),

    }
  }
</script>

<style scoped>

</style>
