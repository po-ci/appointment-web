<template>
  <v-container>
    <v-layout>
      <v-flex xs12>
        <v-card>
          <v-card-title primary-title class="title">
            Calendarios
          </v-card-title>
          <v-card-text>
            <v-data-table
              :headers="headers"
              :items="desserts">

            </v-data-table>
            <p v-for="item of getCalendars">{{item.name}}</p>
          </v-card-text>

        </v-card>
      </v-flex>
    </v-layout>


  </v-container>

</template>

<script>
  import {mapGetters, mapActions} from 'vuex'


  export default {
    name: "CalendarsTable",
    data: () => ({
      select: null,
      headers: [
        {
          text: '',
          align: 'left',
          sortable: false,
          value: 'name'
        },
        {text: 'ID', value: 'id'},
        {text: 'Nombre', value: 'nombre'},
        {text: 'Usuario', value: 'usuario'},
        {text: 'Aciones', value: 'acciones', sortable: false},
      ],
      desserts: [],

    }),
    computed: {
      ...mapGetters([
        'getCalendars']),
    },
    methods: {
      ...mapActions(['fetchCalendars']),


    },
    created() {
      this.fetchCalendars()
    }
  }
</script>
