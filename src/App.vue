<template>
  <v-app>
    <layout :nav="nav">
      <template slot="toolbar">
        <my-appointments-toolbar v-if="isLogin"></my-appointments-toolbar>
      </template>

      <router-view/>


    </layout>

  </v-app>
</template>

<script>
  import {mapActions, mapGetters} from 'vuex'
  import Layout from './modules/layout/components/Layout'
  import MyAppointmentsToolbar from './modules/appointment/components/MyAppointmentsToolbar'

  export default {
    name: 'App',
    components: {Layout, MyAppointmentsToolbar},
    mounted: function () {
      document.title = process.env.VUE_APP_COMPANY
      this.checkAuth()
    },
    methods: {
      ...mapActions([
        'checkAuth'
      ])
    },
    computed: {
      ...mapGetters([
        'isLogin'
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
            icon: 'add_to_photos',
            text: 'Solicitar Turno',
            link: {name: "appointments"}

          },
          {
            icon: 'play_arrow',
            text: 'Asignar Turnos',
            link: {name: "adminAppointments"},
            role: 'admin'
          },
          {
            icon: 'library_books',
            text: 'Ver Turnos',
            link: {name: "showAppointments"},
            role: 'admin'
          },
          {
            text: 'Configuraciones',
            role: 'admin',
            children: [
              {
                icon: 'person',
                text: 'Usuarios',
                link: {name: "users"},
                role: 'admin'
              },
              {
                icon: 'label_important',
                text: 'Agendas',
                link: {name: "crudCalendars"},
                role: 'admin'
              },
              {
                icon: 'local_cafe',
                text: 'Feriados',
                link: {name: "holidays"},
                role: 'admin'
              },
              {
                icon: 'work_off',
                text: 'Licencias',
                link: {name: "out-of-service"},
                role: 'admin'
              },
              {
                icon: 'timelapse',
                text: 'Programacion Especifica',
                link: {name: "specificts-schedule"},
                role: 'admin'
              }
            ]
          }
          /*         {
                      icon: 'contact_mail',
                      text: 'Acerca de Nosotros',
                      link: {name: "about"}
                    },*/

        ]
      }
    }
  }
</script>
