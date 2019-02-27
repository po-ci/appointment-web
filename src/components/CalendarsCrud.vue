<template>
  <v-container>
    <v-layout>
      <v-flex xs12>
        <v-card>
          <v-card-title primary-title class="title">
            Calendarios
          </v-card-title>

          <calendars-crud-dialog :open="dialog"
                                 @closeDialog="dialog = false"></calendars-crud-dialog>

          <v-card-text>
            <v-btn color="primary" dark aling @click="dialog= true">New Item</v-btn>
            <v-data-table
              :headers="headers"
              :items="getCalendars"
              class="elevation-1">
              <template slot="items" slot-scope="props">
                <td>{{ props.item.id }}</td>
                <td>{{ props.item.name }}</td>
                <td>{{ props.item.user }}</td>
                <td>
                  <v-icon
                    small
                    class="mr-2"
                    @click="editCalendars(props.item)"
                  >
                    edit
                  </v-icon>
                  <v-icon
                    small
                    @click="deleteCalendars(props.item)"
                  >
                    delete
                  </v-icon>
                </td>
              </template>
            </v-data-table>
          </v-card-text>

        </v-card>
      </v-flex>
    </v-layout>


  </v-container>

</template>

<script>
  import {mapGetters, mapActions} from 'vuex'
  import CalendarsCrudDialog from './CalendarsCrudDialog'


  export default {
    name: "CalendarsCrud",
    components: {
      CalendarsCrudDialog
    },
    data() {
      return {
        select: null,
        dialog: false,
        headers: [
          {text: 'ID', value: 'id'},
          {text: 'Nombre', value: 'name'},
          {text: 'Usuario', value: 'user'},
          {text: 'Aciones', value: 'acciones', sortable: false},
        ],
        desserts: [],
      }
    },
    computed: {
      ...mapGetters([
        'getCalendars']),
    },
    methods: {
      ...mapActions(['fetchCalendars']),

      editCalendars(calendar) {
        alert("Aca estoy jej")
      },
      deleteCalendars(calendar) {
        alert("Ahora estos aca jojo")
      }


    },
    created() {
      this.fetchCalendars()
    }
  }
</script>
