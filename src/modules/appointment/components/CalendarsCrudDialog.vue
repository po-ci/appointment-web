<template>
  <v-dialog :value="open"
            fullscreen
            hide-overlay
            persistent
  >

    <v-card>
      <v-card-text>
        <v-toolbar
          fixed
          dark
          color="primary"
          height="55px">
          <v-btn
            icon
            dark
            @click="$emit('closeDialog')"
          >
            <v-icon>close</v-icon>
          </v-btn>
          <v-toolbar-title>Configuración de Agenda</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn
            dark
            flat
            :loading="getCalendarLoading"
            @click="submitForm"
          >
            Guardar
          </v-btn>
        </v-toolbar>
      </v-card-text>

      <v-card-title primary-title class="title">Agenda</v-card-title>

      <v-card-text>
        <v-form>
          <v-layout row wrap>
            <v-text-field
              md4 xs12
              class="pr-2"
              name="name"
              label="Nombre de la agenda"
              type="text"
              v-model="form.name">
            </v-text-field>

            <v-select
              md4 xs12
              class="pr-2"
              :items="users"
              :item-text="'name'"
              :item-value="'id'"
              label="Usuario"
              v-model="form.user"
              required
              :loading="getUsersLoading"
              :error="localErrors.user.length?true:false"
              :error-messages="localErrors.user"


            ></v-select>

            <v-text-field
              md4 xs12
              class="pr-2"
              name="description"
              label="Descripcion"
              type="text"
              v-model="form.description">
            </v-text-field>
          </v-layout>
        </v-form>
      </v-card-text>


      <v-divider></v-divider>
      <v-card-title primary-title class="title">Configuración de turnos</v-card-title>
      <v-card-text>

        <v-layout row wrap>
          <v-flex xs12 md4 class="text-xs-center">

            <v-text-field class="pr-2"
                          label="Tiempo de turno en minutos"
                          type="number"
                          v-model="form.appointmentConfig.duration"
            ></v-text-field>
          </v-flex>
          <v-flex xs12 md4 class="text-xs-center">

            <v-text-field class="pr-2"
                          label="Tiempo libre entre turnos en minutos"
                          type="number"
                          v-model="form.appointmentConfig.break"
            ></v-text-field>
          </v-flex>
          <v-flex xs12 md4 class="text-xs-center">
            <v-text-field class="pr-2"
                          label="Cantidad de Dias máximos para Turnos"
                          type="number"
                          v-model="form.appointmentConfig.maxTimeInDays"
            ></v-text-field>
          </v-flex>
          <v-flex xs12 md4 class="text-xs-center">
            <v-text-field class="pr-2"
                          label="Tiempo minimo para turno en horas"
                          type="number"
                          v-model="form.appointmentConfig.minTimeInHours"
            ></v-text-field>
          </v-flex>
          <v-flex xs12 md4 class="text-xs-center">
            <v-text-field class="pr-2"
                          label="Tiempo minimo para cancelar en horas"
                          type="number"
                          v-model="form.appointmentConfig.cancelTimeInHours"
            ></v-text-field>
          </v-flex>
        </v-layout>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-title primary-title class="title">Programación horaria</v-card-title>
      <v-card-text>

        <v-spacer></v-spacer>

        <template v-for="day in days">
          <v-layout row wrap>
            <v-flex xs4 md2 class="text-xs-center py-3 px-0 ">
              <v-layout row wrap fill-height align-center justify-center>
                {{day.name}}
              </v-layout>
            </v-flex>

            <v-flex xs8 md10 class="text-xs-center py-3 px-0">
              <v-layout row wrap>
                <v-flex xs6 md3 class="pr-2">
                  <calendars-crud-dialog-time
                    :day="day.number"
                    :field="'start'"
                    label="Desde"
                    :value="findScheduleValue(day.number, 'start')"
                    @time="timeCalendars"></calendars-crud-dialog-time>
                </v-flex>
                <v-flex xs6 md3 class="pr-2">
                  <calendars-crud-dialog-time
                    :day="day.number"
                    :field="'end'"
                    label="Hasta"
                    :value="findScheduleValue(day.number, 'end')"
                    @time="timeCalendars"></calendars-crud-dialog-time>
                </v-flex>
                <v-flex xs6 md3 class="pr-2">
                  <calendars-crud-dialog-time
                    :day="day.number"
                    :field="'start2'"
                    label="Desde2"
                    :value="findScheduleValue(day.number, 'start2')"
                    @time="timeCalendars"></calendars-crud-dialog-time>
                </v-flex>
                <v-flex xs6 md3 class="pr-2">
                  <calendars-crud-dialog-time
                    :day="day.number"
                    :field="'end2'"
                    label="Hasta 2"
                    :value="findScheduleValue(day.number, 'end2')"
                    @time="timeCalendars"></calendars-crud-dialog-time>
                </v-flex>
              </v-layout>
            </v-flex>


          </v-layout>
        </template>

      </v-card-text>


      <v-footer class="pa-3"
                color="primary">
      </v-footer>
    </v-card>
  </v-dialog>
</template>

<script>
  import cloneByJsonCopy from './../../../helpers/cloneByJsonCopy'
  import CalendarsCrudDialogTime from './CalendarsCrudDialogTime'
  import {mapActions, mapGetters} from 'vuex'

  export default {
    name: "CalendarCrudDialog",
    components: {
      CalendarsCrudDialogTime
    },
    props: {
      open: Boolean,
      users: Array,
      calendarForm: Object
    },

    computed: {
      ...mapGetters(['getCalendatResult', 'getCalendatGeneralErrors', 'getCalendarLoading', 'getUsersLoading'])
    },

    watch: {
      getCalendatResult: function (value) {
        if (value) {
          this.$emit('closeDialog')
        }
      },
      getCalendatGeneralErrors: function (value) {
        this.localErrors = Object.assign({}, this.localErrors, value);
      }

    },
    data() {
      return {
        days: [
          {number: 1, name: 'Lunes'},
          {number: 2, name: 'Martes'},
          {number: 3, name: 'Miercoles'},
          {number: 4, name: 'Jueves'},
          {number: 5, name: 'Viernes'},
          {number: 6, name: 'Sabado'},
          {number: 7, name: 'Domingo'},
          {number: 8, name: 'Feriado'}
        ],
        form: {
          name: null,
          description: null,
          user: null,
          schedules: [
            {day: 1, start: null, end: null, start2: null, end2: null},
            {day: 2, start: null, end: null, start2: null, end2: null},
            {day: 3, start: null, end: null, start2: null, end2: null},
            {day: 4, start: null, end: null, start2: null, end2: null},
            {day: 5, start: null, end: null, start2: null, end2: null},
            {day: 6, start: null, end: null, start2: null, end2: null},
            {day: 7, start: null, end: null, start2: null, end2: null},
            {day: 8, start: null, end: null, start2: null, end2: null}

          ],
          appointmentConfig: {
            duration: null,
            break: null,
            minTimeInHours: null,
            maxTimeInDays: null,
            cancelTimeInHours: null
          }
        },
        localErrors: {
          user: []
        }

      }
    },
    methods: {
      findScheduleValue(day, field) {
        let item = this.form.schedules.find(item => item.day == day)
        return item[field]
      },
      timeCalendars(object) {
        this.form.schedules.find(sc => sc.day === object.day)[object.field] = object.value;
      },
      ...mapActions(['createCalendar', 'updateCalendar']),

      submitForm() {

        if (this.form.id) {
          this.updateCalendar(this.form)
        } else {
          this.createCalendar(this.form)

        }
      }
    },
    mounted: function () {
      if (this.calendarForm.id) {
        this.form = cloneByJsonCopy(this.calendarForm)
      }
    }
  }
</script>
