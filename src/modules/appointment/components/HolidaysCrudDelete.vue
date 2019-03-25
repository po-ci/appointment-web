<template>
  <v-dialog
    :value="dialogOpenDelete"
    max-width="400"
    persistent
  >
    <v-card>
      <v-card-title class="headline">Desea elinimar este Feriado?</v-card-title>
      <v-card-text>Si borra este Feriado no se podra recupear nuevamente
      </v-card-text>

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
          :loading="getHolidaysLoading"
          @click="acceptDelete"
        >
          Aceptar
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
  import {mapGetters, mapActions} from 'vuex'

  export default {
    name: "HolidaysCrudDelete",
    props: {
      dialogOpenDelete: Boolean,
      holiday: Number
    },
    watch: {
      getResultHolidays: function (value) {
        if (value) {
          this.$emit('closeDialogDelete')
        }
      },
      getResultHolidays: function (value) {
        if (value) {
          this.$emit('closeDialogDelete')
        }
      }
    },

    methods: {
      ...mapActions(['deleteHoliday']),
      acceptDelete() {

        this.deleteHoliday(this.holiday)
      },
    },
    computed: {
      ...mapGetters(['getHolidaysLoading', 'getResultHolidays'])
    }
  }
</script>

