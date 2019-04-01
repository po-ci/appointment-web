<template>

  <v-menu
    ref="menu"
    :close-on-content-click="false"
    :nudge-right="40"
    lazy
    transition="scale-transition"
    offset-y
    full-width
    max-width="290px"
    min-width="290px"
  >
    <v-text-field
      slot="activator"
      v-model="datePick"
      label="Fecha"
      prepend-icon="event"
      readonly

    ></v-text-field>
    <v-date-picker
      v-model="datePick"
      locale="es-es"
      no-title
      color="secondary"
      :show-current="false"
      @input="$refs.menu.save(datePick)"
    ></v-date-picker>
  </v-menu>
</template>

<script>
  import moment from 'moment'
  import tz from 'moment-timezone'
  import 'moment/locale/es';

  import {mapGetters} from 'vuex'

  export default {
    name: "ShowAppointmentsDatePicker",
    data: () => ({}),
    computed: {
      ...mapGetters([
        'getDateFormated',
        'getCalendarSelected'
      ]),
      datePick: {
        get() {
          return this.getDateFormated
        },
        set(value) {
          this.$store.commit('SET_DATE', value)
        }
      }
    }
  }
</script>

<style scoped>

</style>
