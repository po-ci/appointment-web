<template>
    <v-app>
        <layout>
          <template slot="toolbar">
            <appointments-toolbar></appointments-toolbar>
          </template>

          <router-view/>


        </layout>

    </v-app>
</template>

<script>
    import Layout from './layout/components/Layout'
    import AppointmentsToolbar from './components/AppointmentsToolbar'
    export default {
        name: 'App',
        components: {Layout,AppointmentsToolbar},
        data() {
            return {
                //
            }
        }
    }
</script>
