<template>
  <v-dialog
    :value="dialogOpen"
    max-width="500"
    persistent
  >
    <v-card>
      <v-card-title class="headline">Desea elinimar esta Programacion Especifica?</v-card-title>
      <v-card-text>Si borra esta Programacion Especifica no se podra recupear nuevamente</v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>

        <v-btn
          color="grey"
          flat
          @click="$emit('closeDialogDelete')"
        >
          Cancelar
        </v-btn>

        <v-btn
          color="green darken-1"
          flat="flat"
          :loading="getSpecificsSchedulesLoading"
          @click="acceptDelete"
        >
          Aceptar
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
  import {mapActions, mapGetters} from 'vuex'

  export default {
    name: "SpecificsSchedulesCrudDelete",
    data() {
      return {}
    },
    props: {
      dialogOpen: Boolean,
      specificsScheduleID: Number
    },
    watch: {
      getSpecificsSchedulesResult: function (value) {
        if (value) {
          this.$emit('closeDialogDelete')
        }
      }
    },

    methods: {
      ...mapActions(['deleteSpecificsSchedules']),
      acceptDelete() {

        this.deleteSpecificsSchedules(this.specificsScheduleID)
      },
    },
    computed: {
      ...mapGetters(['getSpecificsSchedulesLoading', 'getSpecificsSchedulesResult'])
    }
  }
</script>

