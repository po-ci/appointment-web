<template>
  <v-dialog
    v-model="dialog"
    width="500"
    persistent
  >



    <v-card>

      <v-card-title
      >
        <span class="headline">Confirmación de Turno</span>
      </v-card-title>

      <v-card-text v-if="dialog">

        <v-list two-line>

          <v-list-tile>
            <v-list-tile-action>
              <v-icon color="indigo">calendar_today</v-icon>
            </v-list-tile-action>

            <v-list-tile-content>
              <v-list-tile-title> <span class="text-capitalize">{{shift.day}} </span> - {{shift.date}} </v-list-tile-title>
              <v-list-tile-sub-title>Fecha</v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>

          <v-list-tile>
            <v-list-tile-action>
              <v-icon color="indigo">alarm</v-icon>
            </v-list-tile-action>

            <v-list-tile-content>
              <v-list-tile-title> {{shift.hour}}</v-list-tile-title>
              <v-list-tile-sub-title>Hora</v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>

          <v-list-tile>
            <v-list-tile-action>
              <v-icon color="indigo">assignment_ind</v-icon>
            </v-list-tile-action>

            <v-list-tile-content>
              <v-list-tile-title> {{shift.calendar.name}}</v-list-tile-title>
              <v-list-tile-sub-title>Agenda</v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>

        </v-list>


      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>


        <v-btn
          color="orange darken-1"
          flat="flat"
          @click="$emit('closeDialog')"
        >
          Cancelar
        </v-btn>

        <v-btn :loading="getCalendarLoading" color="success" dark @click="confirmShift">Confirmar Turno</v-btn>

      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
  import {mapGetters, mapActions} from 'vuex'

  export default {
    name: "ShiftsConfirm",
    props: {
      dialog: {type: Boolean, default: false},
      shift: {type: Object}
    },
    data: () => ({}
    ),
    computed: {
      ...mapGetters([
        'getCalendarLoading'
      ]),
    }
    ,
    methods: {

      confirmShift: function () {

      },

      ...mapActions([]),

    }
  }
</script>

<style scoped>

</style>
