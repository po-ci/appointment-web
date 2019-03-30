<template>
  <v-container>
    <v-layout row wrap>
      <v-flex pa-3 xs12>
        <v-card>
          <v-card-title><h2>
            Progracion Especifica
          </h2></v-card-title>
        </v-card>
      </v-flex>
      <v-flex pa-3 xs12>
        <v-card>
          <v-card-text>
            <v-data-table
              :loading="getSpecificsSchedulesLoading"
              :headers="headers"
              :items="getSpecificsSchedules">

              <template slot="no-data">

                <div v-if="getSpecificsSchedulesLoading"
                     color="info"
                     outline
                     class="text-xs-center">
                  Cargando Licencias
                </div>

                <div v-if="!getSpecificsSchedulesLoading"
                     outline
                     color="info">
                  Sin datos
                </div>

              </template>

              <template slot="items" slot-scope="props">
                <td>{{props.item.id}}</td>
                <td v-if="props.item.calendar">{{props.item.calendar.name}}</td>
                <td v-else></td>
                <td>{{props.item.date}}</td>
                <td>{{props.item.start}}</td>
                <td>{{props.item.end}}</td>
                <td>{{props.item.start2}}</td>
                <td>{{props.item.end2}}</td>
                <td>
                  <v-icon
                    small
                    class="mr-2"
                    @click="editSpecificsSchedules(props.item)"
                  >
                    edit
                  </v-icon>
                  <v-icon
                    small
                    @click="dialogDelete(props.item.id)"
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


    <specifics-schedules-crud-dialog v-if="dialog"
                                     :title="title"
                                     :open="dialog"
                                     :specifics-schedule-object="specificsScheduleObject"
                                     @closeDialog="dialog = false"></specifics-schedules-crud-dialog>


    <specifics-schedules-crud-delete :dialog-open="openDelete"
                                     :specifics-schedule-i-d="specificsScheduleDelete"
                                     @closeDialogDelete="openDelete = false"></specifics-schedules-crud-delete>

    <v-snackbar
      v-model="snackbar"
      :color="'success'"
      :timeout="4000"
    >
      {{ getFlashMessaSpecificsSchedules }}
      <v-btn
        dark
        flat
        @click="snackbar = false"
      >
        <v-icon>close</v-icon>
      </v-btn>
    </v-snackbar>

    <v-btn class="elevation-8"
           color="#D81B60"
           fab
           fixed
           bottom
           right
           dark
           @click="addSpecificsSchedules">
      <v-icon>add</v-icon>
    </v-btn>

  </v-container>
</template>

<script>
  import SpecificsSchedulesCrudDialog from './SpecificsSchedulesCrudDialog'
  import SpecificsSchedulesCrudDelete from './SpecificsSchedulesCrudDelete'
  import {mapGetters, mapActions} from 'vuex'

  export default {
    name: "SpecificsSchedulesCrud",
    components: {
      SpecificsSchedulesCrudDialog,
      SpecificsSchedulesCrudDelete
    },
    data() {
      return {
        headers: [
          {text: 'ID', value: 'id'},
          {text: 'Calendario', value: 'calendar'},
          {text: 'Dia', value: 'date'},
          {text: 'Desde', value: 'start'},
          {text: 'Hasta', value: 'end'},
          {text: 'Desde2', value: 'start2'},
          {text: 'Hasta2', value: 'end2'},
          {text: 'Acciones', value: 'actions'}
        ],
        snackbar: false,
        title: null,
        dialog: false,
        specificsScheduleObject: null,
        openDelete: false,
        specificsScheduleDelete: null,

      }
    },
    computed: {
      ...mapGetters(['getSpecificsSchedules', 'getSpecificsSchedulesLoading',
        'getSpecificsSchedulesError', 'getFlashMessaSpecificsSchedules'])
    },
    methods: {
      ...mapActions(['fetchAllSpecificsSchedules', 'fetchCalendars']),

      addSpecificsSchedules() {
        this.title = "Nueva Programacion Especifica"
        this.specificsScheduleObject = {}
        this.dialog = true
      },
      editSpecificsSchedules(object) {
        this.specificsScheduleObject = object
        this.title = "Editar Programacion Especifica"
        this.dialog = true
      },
      dialogDelete(id) {
        this.specificsScheduleDelete = id
        this.openDelete = true
      }
    },
    mounted() {
      this.fetchCalendars()
      this.fetchAllSpecificsSchedules()
    },
    watch: {
      getFlashMessaSpecificsSchedules: function (value) {
        if (value) {
          this.snackbar = true
        }
      }
    }
  }
</script>

