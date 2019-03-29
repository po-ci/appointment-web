<template>
  <v-dialog
    :value="dialogOpen"
    max-width="400"
    persistent
  >
    <v-card>
      <v-card-title class="headline">Desea elinimar esta licencia?</v-card-title>
      <v-card-text>Si borra esta licencia no se podra recupear nuevamente</v-card-text>

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
          :loading="getOutOfServiceLoading"
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
    name: "OutOfServiceDelete",
    data() {
      return {}
    },
    props: {
      dialogOpen: Boolean,
      outOfServiceId: Number
    },
    watch: {
      getResultOutOfService: function (value) {
        if (value) {
          this.$emit('closeDialogDelete')
        }
      }
    },

    methods: {
      ...mapActions(['deleteOutOfService']),
      acceptDelete() {

        this.deleteOutOfService(this.outOfServiceId)
      },
    },
    computed: {
      ...mapGetters(['getOutOfServiceLoading', 'getResultOutOfService'])
    }
  }
</script>

