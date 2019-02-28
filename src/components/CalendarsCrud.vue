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
                    @click="dialogDelete = true"
                  >
                    delete
                  </v-icon>
                  <CalendarsCrudDialogDelete :dialogOpen="dialogDelete"
                                             @closeDialogDelete="dialogDelete = false"
                                             @acceptDelete="deleteCalendars(props.item.id)">
                  </CalendarsCrudDialogDelete>
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
      ...mapGetters(['getCalendars','getCalendarLoading']),
    },
    methods: {
      ...mapActions(['fetchCalendars', 'deleteCalendar']),

      editCalendars(calendar) {
        alert('hola')
      },

      deleteCalendars(calendarId) {
        this.deleteCalendar(calendarId)
        this.dialogDelete = false
      }


    },
    created() {
      this.fetchCalendars()
    }
  }
</script>
