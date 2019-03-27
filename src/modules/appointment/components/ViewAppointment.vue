<template>

  <v-layout row wrap>

    <v-flex xs12>

      <v-flex  v-if="appointment.id" right top absolute class="grey--text text-xs-right ">
        #{{appointment.id}}
      </v-flex>

      <v-list>

        <!--Number-->
       <!-- <v-list-tile v-if="appointment.id">
          <v-list-tile-action>
            <v-icon color="primary">assignment_late</v-icon>
          </v-list-tile-action>

          <v-list-tile-content>
            <v-list-tile-sub-title>Número</v-list-tile-sub-title>

            <v-list-tile-title> {{appointment.id}}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>-->

        <!--Agenda-->
        <v-list-tile>
          <v-list-tile-action>
            <v-icon color="primary">assignment_ind</v-icon>
          </v-list-tile-action>

          <v-list-tile-content>
            <v-list-tile-sub-title>Agenda</v-list-tile-sub-title>

            <v-list-tile-title> {{appointment.calendar.name}}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>


        <!--Fecha-->
        <v-list-tile>
          <v-list-tile-action>
            <v-icon color="primary">event</v-icon>
          </v-list-tile-action>

          <v-list-tile-content class="text-no-wrap">
            <v-list-tile-sub-title>Fecha</v-list-tile-sub-title>

            <v-list-tile-title class="text-capitalize">
              {{getDay}} {{getFriendlyDateTime}}


            </v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

        <!--Hora-->
        <v-list-tile>
          <v-list-tile-action>
            <v-icon color="primary">alarm</v-icon>
          </v-list-tile-action>

          <v-list-tile-content>
            <v-list-tile-sub-title>Hora</v-list-tile-sub-title>

            <v-list-tile-title> {{getAppointmentHour}}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>


      </v-list>

      <v-flex
        style="position: absolute; right: -5px; bottom: -5px"
      >

        <v-chip   v-if="appointment.status == 2 || appointment.status == 3" label dark color="red">Cancelada</v-chip>
        <v-chip   v-if="appointment.status == 1" label dark color="success">Pendiente</v-chip>

      </v-flex>

    </v-flex>

  </v-layout>

</template>

<script>
  import {mapGetters, mapActions} from 'vuex'
  import moment from 'moment'

  export default {
    name: "ViewAppointment",
    props: {
      appointment: {type: Object}
    },
    computed: {
      getAppointmentHour() {
        if (this.appointment.hour) {
          return this.appointment.hour
        }

        if (this.appointment.start) {
          let h = moment(this.appointment.start).tz('America/Argentina/Buenos_Aires').locale('es')
          return h.format("HH:mm")
        }

        return null

      },
      getDay() {
        if (this.appointment.date) {
          let m = moment(this.appointment.start).tz('America/Argentina/Buenos_Aires').locale('es')
          return m.format("dddd")
        }

        if (this.appointment.start) {
          let m = moment(this.appointment.start).tz('America/Argentina/Buenos_Aires').locale('es')
          return m.format("dddd")
        }

        return null
      },
      getFriendlyDateTime: function () {
        if (this.appointment && this.appointment.date && this.appointment.hour) {
          let m = moment(this.appointment.date + " " + this.appointment.hour)
          return m.format('DD MMMM YYYY')
        }


        if (this.appointment.start) {
          let m = moment(this.appointment.start).tz('America/Argentina/Buenos_Aires').locale('es')
          return m.format("DD MMMM YYYY")
        }

        return ""
      },
      ...mapGetters([
        'getCalendarLoading',
        'getLastAppointment'
      ]),
    },
  }
</script>

<style scoped>

</style>
