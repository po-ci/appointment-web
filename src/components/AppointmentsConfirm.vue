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
          icon="priority_high"
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
          icon="priority_high"
          outline
          class="text-xs-center headline"
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

    <!--appointment por confirmar-->
    <v-card v-else>

      <v-card-title class="pb-0"
      >
        <span class="headline">Confirmación de Turno</span>
      </v-card-title>

      <v-card-text v-if="dialog" class="pt-0">

        <v-list two-line>


          <v-list-tile>
            <v-list-tile-action>
              <v-icon color="indigo">assignment_ind</v-icon>
            </v-list-tile-action>

            <v-list-tile-content>
              <v-list-tile-sub-title>Agenda</v-list-tile-sub-title>

              <v-list-tile-title> {{shift.calendar.name}}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>

          <v-list-tile>
            <v-list-tile-action>
              <v-icon color="indigo">calendar_today</v-icon>
            </v-list-tile-action>

            <v-list-tile-content>
              <v-list-tile-sub-title>Fecha</v-list-tile-sub-title>

              <v-list-tile-title>
                {{getFriendlyDateTime}}


              </v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>

          <v-list-tile>
            <v-list-tile-action>
              <v-icon color="indigo">alarm</v-icon>
            </v-list-tile-action>

            <v-list-tile-content>
              <v-list-tile-sub-title>Hora</v-list-tile-sub-title>

              <v-list-tile-title> {{shift.hour}}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>


        </v-list>


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

        <v-btn :loading="getCalendarLoading" color="primary" dark @click="confirmShift">Confirmar Turno</v-btn>

      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
  import {mapGetters, mapActions} from 'vuex'
  import moment from 'moment'

  export default {
    name: "AppointmentsConfirm",
    props: {
      dialog: {type: Boolean, default: false},
      shift: {type: Object}
    },
    data: () => ({}
    ),
    computed: {
      getFriendlyDateTime: function () {
        if(this.shift && this.shift.date && this.shift.hour) {
          let m = moment(this.shift.date + " " + this.shift.hour)
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

      confirmShift: function () {
        this.takeAppointment({
          calendar: this.shift.calendar.id,
          start: this.shift.start,
          duration: this.shift.duration
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
