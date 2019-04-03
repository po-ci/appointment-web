<template>
  <v-dialog
    :value="dialogOpen"
    max-width="400"
    persistent
  >
    <v-card>
      <v-card-title class="headline">Desea elinimar este calendario?</v-card-title>
      <v-card-text>Si borra este calendario no se podra recupear nuevamente</v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>

        <v-btn
          color="green darken-1"
          flat="flat"
          @click="$emit('closeDialogDelete')"
        >
          Cancelar
        </v-btn>

        <v-btn
          color="green darken-1"
          flat="flat"
          :loading="getCalendarLoading"
          @click="$emit('acceptDelete', calendar.id)"
        >
          Aceptar
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
  import {mapGetters} from 'vuex'
  export default {
    name: "CalendarsCrudDialogDelete",
    data() {
      return {}
    },
    props: {
      dialogOpen: Boolean,
      calendar: Object
    },
    computed:{
      ...mapGetters(['getCalendatResult', 'getCalendarLoading'])
    }
  }
</script>

