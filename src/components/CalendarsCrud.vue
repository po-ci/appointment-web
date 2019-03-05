<template>
  <v-container>
    <v-layout>
      <v-flex xs12>
        <v-card>
          <v-card-title primary-title class="title">
            Calendarios
          </v-card-title>

          <calendars-crud-dialog :open="dialog"
                                 :users="getUsers"
                                 @closeDialog="dialog = false"></calendars-crud-dialog>

          <v-card-text>
            <v-btn color="primary" dark aling @click="dialogOpen">New Item
            </v-btn>
            <v-data-table
              :headers="headers"
              :items="getCalendars"
              :loading="getCalendarLoading"
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
                    @click="dialogDelete = true; calendarToDelete = props.item;"
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


    <CalendarsCrudDialogDelete :dialog-open="dialogDelete"
                               :calendar="calendarToDelete"
                               @closeDialogDelete="dialogDelete = false"
                               @acceptDelete="deleteCalendars">
    </CalendarsCrudDialogDelete>

  </v-container>

</template>

<script>
  import {mapGetters, mapActions, mapState} from 'vuex'
  import CalendarsCrudDialog from './CalendarsCrudDialog'
  import CalendarsCrudDialogDelete from './CalendarsCrudDialogDelete'


  export default {
    name: "CalendarsCrud",
    components: {
      CalendarsCrudDialog,
      CalendarsCrudDialogDelete
    },
    data() {
      return {
        select: null,
        dialog: false,
        dialogDelete: false,
        calendarToDelete: null,
        users: [],
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
      ...mapGetters(['getCalendars', 'getCalendarLoading', 'getUsers']),
    },
    methods: {
      ...mapActions(['fetchCalendars', 'deleteCalendar', 'allUsers']),

      editCalendars(calendar) {

        alert('hola')
      },

      deleteCalendars(calendarId) {
        this.deleteCalendar(calendarId)
        this.dialogDelete = false
      },
      dialogOpen() {
        this.dialog = true
        this.users = this.allUsers()
      }


    },
    created() {
      this.fetchCalendars()
    }
  }
</script>
