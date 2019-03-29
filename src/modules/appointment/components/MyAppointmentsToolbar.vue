<template>
  <v-toolbar-items>

    <v-btn flat to="my-appointments">
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
        name: "MyAppointmentsToolbar",
      mounted: function(){
        this.fetchMyAppointments()
      },
      watch: {
        isLogin: function(){
          this.fetchMyAppointments()
        }
      },
      computed: {
          getQtyAppointments: function(){
            return this.pendingAppointment.length
          },

          ...mapGetters([
            'getAppointments',
            'pendingAppointment',
            'isLogin'
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
