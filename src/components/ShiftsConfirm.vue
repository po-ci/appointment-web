<template>
  <v-dialog
    v-model="dialog"
    width="500"
    persistent
  >

    <v-card v-if="isPasswordChange">
      <v-card-text>
      </v-card-text>
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
    computed:
      {}
    ,
    methods: {
      ...mapActions([]),

    }
  }
</script>

<style scoped>

</style>
