<template>
  <v-container>
    <v-layout row wrap>
      <v-flex xs12 pa-3>
        <v-card class="elevation-8">
          <v-card-title>
            <h2>Agendas</h2>
          </v-card-title>
        </v-card>
      </v-flex>
      <v-flex xs12 pa-3>
        <v-card class="elevation-8">
          <v-card-text>
            <v-data-table
              :headers="headers"
              :items="getCalendars"
              :loading="getCalendarLoading">
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

    <calendars-crud-dialog

      :open="dialog"
      :calendar-form="calendarForm"
      :users="getUsersForCalendar"
      @closeDialog="dialog = false"

    >
    </calendars-crud-dialog>

    <CalendarsCrudDialogDelete :dialog-open="dialogDelete"
                               :calendar="calendarToDelete"
                               @closeDialogDelete="dialogDelete = false"
                               @acceptDelete="deleteCalendars">
    </CalendarsCrudDialogDelete>
    <v-btn class="elevation-8"
           color="#D81B60"
           fixed
           dark
           fab
           bottom
           right
           @click="dialogOpenCreate">
      <v-icon>add</v-icon>
    </v-btn>
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
      ...mapGetters(['getCalendars', 'getCalendarLoading', 'getUsersForCalendar']),
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
