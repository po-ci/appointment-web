<template>
  <v-app>
    <layout :nav="nav">
      <template slot="toolbar">
        <appointments-toolbar></appointments-toolbar>
      </template>

      <router-view/>


    </layout>

  </v-app>
</template>

<script>
  import {mapActions} from 'vuex'
  import Layout from './layout/components/Layout'
  import AppointmentsToolbar from './components/AppointmentsToolbar'

  export default {
    name: 'App',
    components: {Layout, AppointmentsToolbar},
    mounted: function () {
      this.checkAuth()
    },
    methods: {
      ...mapActions([
        'checkAuth'
      ])
    },
    data() {
      return {
        nav: [
          {
            icon: 'home',
            text: 'Principal',
            link: {name: "home"}

          },
          {
            icon: 'event_note',
            text: 'Mis Turnos',
            link: {name: "myAppointments"}

          },
          {
            icon: 'event',
            text: 'Solicitar Turno',
            link: {name: "appointments"}

          },
          {
            icon: 'contact_mail',
            text: 'Acerca de Nosotros',
            link: {name: "about"}
          },
        ]
      }
    }
  }
</script>
