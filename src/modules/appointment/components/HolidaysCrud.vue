<template>
  <v-container>
    <v-layout row wrap>
      <v-flex xs12 class="pa-3">
        <v-card class="elevation-8">
          <v-card-title>
            <h2>Feriados</h2>
          </v-card-title>
        </v-card>
      </v-flex>
      <v-flex xs12 class="pa-3">
        <v-card class="elevation-8">
          <v-card-text>
            <v-data-table
              :loading="getHolidaysLoading"
              :headers="headers"
              :items="getHolidays">
              <template slot="no-data">

                <div v-if="getHolidaysLoading"
                     color="info"
                     outline
                     class="text-xs-center">
                  Cargando Feriados
                </div>

                <div v-if="!getHolidaysLoading"
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
                    @click="editHolidays(props.item)"
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
                <td>{{ props.item.title}}</td>
                <td>{{ props.item.date}}</td>

              </template>
            </v-data-table>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
    <v-btn class="elevation-8"
           color="#D81B60"
           fixed
           dark
           fab
           bottom
           right
           @click="creatUsuario">
      <v-icon>add</v-icon>
    </v-btn>

    <holidays-crud-dialog
      v-if="dialog"
      :title="titles"
      :open-dialog="dialog"
      :holidayObject="holidays"
      @closeDialog="dialog = false"></holidays-crud-dialog>
    <holidays-crud-delete
      :dialogOpenDelete="dialodDelete"
      :holiday="holidayDelete"
      @closeDialogDelete="dialodDelete = false"
    ></holidays-crud-delete>

    <v-snackbar
      v-model="snackbar"
      :color="'success'"
      :timeout="4000"
    >
      {{ getFlashMessageHolidays }}
      <v-btn
        dark
        flat
        @click="snackbar = false"
      >
        <v-icon>close</v-icon>
      </v-btn>
    </v-snackbar>

  </v-container>
</template>

<script>
  import {mapGetters, mapActions} from 'vuex'
  import HolidaysCrudDialog from './HolidaysCrudDialog'
  import HolidaysCrudDelete from './HolidaysCrudDelete'

  export default {
    name: "HolidaysCrud",
    components: {
      HolidaysCrudDialog,
      HolidaysCrudDelete
    },
    data() {
      return {
        headers: [
          {text: 'Aciones', value: 'acciones', sortable: false},
          {text: 'ID', value: 'id'},
          {text: 'Titulo', value: 'title'},
          {text: 'Fecha', value: 'date'},
        ],
        dialog: false,
        titles: null,
        holidays: null,
        snackbar: false,
        dialodDelete: false,
        holidayDelete: null
      }
    },
    computed: {
      ...mapGetters(['getHolidays', 'getHolidaysLoading', 'getFlashMessageHolidays'])
    },
    methods: {
      ...mapActions(['fetchAllHolidays', 'deleteHoliday']),
      creatUsuario() {
        this.titles = "Nuevo Feriado"
        this.holidays = {}
        this.dialog = true
      },
      editHolidays(holiday) {
        this.titles = "Editar Feriado"
        this.holidays = holiday
        this.dialog = true
      },
      dialodDeletes(id) {
        this.holidayDelete = id
        this.dialodDelete = true

      }
    },
    mounted() {
      this.fetchAllHolidays()
    },
    watch: {
      getFlashMessageHolidays: function (value) {
        if (value) {
          this.snackbar = true
        }
      }
    }
  }
</script>

