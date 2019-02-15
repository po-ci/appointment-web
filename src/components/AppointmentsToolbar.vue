<template>
  <v-toolbar-items>

    <v-btn flat to="myAppointments">
      <v-badge left color="red" :value="getQtyAppointments">
        <span slot="badge">{{getQtyAppointments}}</span>
        <v-icon large>event_note</v-icon>
      </v-badge>

    </v-btn>
  </v-toolbar-items>
</template>

<script>

  import {mapActions,mapGetters} from 'vuex'

    export default {
        name: "AppointmentsToolbar",
      mounted: function(){
        this.fetchMyAppointments()
      },
      computed: {
          getQtyAppointments: function(){
            return this.getAppointments.length
          },

          ...mapGetters([
            'getAppointments'
          ])
      },
      methods:{
          ...mapActions([
            'fetchMyAppointments'
          ])
      }
    }
</script>

<style scoped>

</style>
