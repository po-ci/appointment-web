<template>
  <v-container>
    <v-layout row wrap>
      <v-flex xs12 class="pa-3">
        <v-card class="elevation-8">
          <v-card-title>
            <h2>Licencias</h2>
          </v-card-title>
        </v-card>

      </v-flex>
      <v-flex xs12 class="pa-3">
        <v-card class="elevation-8">
          <v-card-text>
            <v-layout row wrap>
              <v-flex md6 xs12 class="offset-md6">
                <v-text-field
                  v-model="search"
                  append-icon="search"
                  label="Search"
                  single-line
                  hide-details
                  class="pa-2"
                ></v-text-field>
              </v-flex>
              <v-flex>
                <v-data-table
                  :search="search"
                  :loading="getOutOfServiceLoading"
                  :headers="headers"
                  :items="getAllOutOfService"
                >
                  <template slot="no-data">

                    <div v-if="getOutOfServiceLoading"
                         color="info"
                         outline
                         class="text-xs-center">
                      Cargando Licencias
                    </div>

                    <div v-if="!getOutOfServiceLoading"
                         outline
                         color="info">
                      Sin datos
                    </div>

                  </template>

                  <template slot="items" slot-scope="props">
                    <td>
                      <v-icon
                        small
                        class="mr-2"
                        @click="editOutOfService(props.item)"
                      >
                        edit
                      </v-icon>
                      <v-icon
                        small
                        @click="dialodDeletes(props.item.id)"
                      >
                        delete
                      </v-icon>
                    </td>
                    <td>{{props.item.id}}</td>
                    <td v-if="props.item.calendar">{{props.item.calendar.name}}</td>
                    <td v-else></td>
                    <td>{{props.item.reason}}</td>
                    <td>{{props.item.start}}</td>
                    <td>{{props.item.end}}</td>

                  </template>

                </v-data-table>
              </v-flex>
            </v-layout>


          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
    <out-of-service-crud-dialog
      v-if="dialog"
      :open="dialog"
      :title="title"
      :out-of-service-object="outOfServiceObject"
      @closeDialog="dialog = false"></out-of-service-crud-dialog>
    <out-of-service-crud-delete
      :dialog-open="dialodDelete"
      :outOfServiceId="outOfServiceDelete"
      @closeDialogDelete="dialodDelete = false"></out-of-service-crud-delete>

    <v-snackbar
      v-model="snackbar"
      :color="'success'"
      :timeout="4000"
    >
      {{ getFlashMessageOutOfService }}
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
           @click="createOutOfSet">
      <v-icon>add</v-icon>
    </v-btn>
  </v-container>
</template>

<script>
  import OutOfServiceCrudDialog from './OutOfServiceCrudDialog'
  import {mapActions, mapGetters} from 'vuex'
  import OutOfServiceCrudDelete from "./OutOfServiceCrudDelete";

  export default {
    name: "OutOfServiceCrud",
    components: {
      OutOfServiceCrudDelete,
      OutOfServiceCrudDialog
    },
    data() {
      return {
        headers: [
          {text: 'Acciones', value: 'actions'},
          {text: 'ID', value: 'id'},
          {text: 'Calendario', value: 'calendar'},
          {text: 'Razon', value: 'reason'},
          {text: 'Desde', value: 'start'},
          {text: 'Hasta', value: 'end'},
        ],
        search: null,
        dialog: false,
        snackbar: false,
        outOfServiceObject: null,
        title: null,
        outOfServiceDelete: null,
        dialodDelete: false
      }
    },
    computed: {
      ...mapGetters(['getAllOutOfService', 'getOutOfServiceLoading', 'getFlashMessageOutOfService'])
    },
    methods: {
      ...mapActions(['fetchAllOutOfService', 'fetchCalendars']),
      createOutOfSet() {
        this.fetchCalendars()
        this.title = "Nueva Licencia"
        this.outOfServiceObject = {}
        this.dialog = true
      },
      editOutOfService(outOfService) {
        this.fetchCalendars()
        this.title = "Editar Feriado"
        this.outOfServiceObject = outOfService
        this.dialog = true
      },
      dialodDeletes(id) {
        this.outOfServiceDelete = id
        this.dialodDelete = true

      }
    },
    mounted() {
      this.fetchAllOutOfService()
    },
    watch: {
      getFlashMessageOutOfService: function (value) {
        if (value) {
          this.snackbar = true
        }
      }
    }

  }
</script>

<style scoped>

</style>
