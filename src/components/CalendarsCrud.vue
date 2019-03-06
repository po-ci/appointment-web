<template>
  <v-container>
    <v-layout>
      <v-flex xs12>
        <v-card class="elevation-6">
          <v-card-title primary-title class="title">
            Agendas
          </v-card-title>

          <calendars-crud-dialog

            :open="dialog"
            :calendar-form="calendarForm"
            :users="getUsers"
            @closeDialog="dialog = false"

          >
          </calendars-crud-dialog>

          <v-card-text>
            <v-btn color="primary" dark aling @click="dialogOpenCreate">Nueva Agenda
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
                    @click="dialogOpenEdit(props.item)"
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
        calendarForm: null,
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


      deleteCalendars(calendarId) {
        this.deleteCalendar(calendarId)
        this.dialogDelete = false

      },

      dialogOpenCreate() {
        this.users = this.allUsers()
        this.calendarForm = null
        this.dialog = true
      },

      dialogOpenEdit(calendar) {
        this.users = this.allUsers()
        this.calendarForm = calendar
        this.dialog = true
      },

    },
    created() {
      this.fetchCalendars()
    }
  }
</script>
