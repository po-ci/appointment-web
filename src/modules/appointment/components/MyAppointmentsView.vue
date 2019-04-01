<template>
  <div>
    <v-card class="elevation-12" :class="getClass">
      <v-card-text class="pa-2">
        <view-appointment :appointment="appointment"></view-appointment>
        <v-btn v-if="appointment.status == 1"
               class="ml-3 mb-0 px-1"
               :color="'amber lighten-4'"
               @click="$emit('dialogCancel', appointment )"
               small

        >
          Cancelar
        </v-btn>
      </v-card-text>

    </v-card>
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
        'getAppointmentsLoading', 'getResultAppointment'
      ]),
      getClass: function () {
        if (this.appointment.status == 2 || this.appointment.status == 3) {
          return 'border-error'
        }
        if (this.appointment.status == 1) {
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
      }

    },
  }
</script>

<style scoped>
  .border-error {
    border: 1px solid red;
  }

  .border-green {
    border: 1px solid green;
  }
</style>
