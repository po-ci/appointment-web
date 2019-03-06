<template>
  <v-dialog :value="open"
            fullscreen
            hide-overlay
            persistent
            transition="dialog-bottom-transition"
  >
    <v-card>

      <v-toolbar
        absolute
        dark color="primary">
        <v-btn
          icon
          @click="$emit('closeDialog')"
        >
          <v-icon>close</v-icon>

        </v-btn>
        <v-spacer></v-spacer>
        <v-btn
          flat
          @click="submitForm"
        >
          Guardar
        </v-btn>
      </v-toolbar>

      <v-card-title primary-title class="title">
        Configuración de Agenda
      </v-card-title>
      <v-card-text>
        <v-form>
          <v-layout row wrap>
            <v-text-field
              md4 xs12
              class="px-2"
              name="name"
              label="Nombre de la agenda"
              type="text"
              v-model="form.name">
            </v-text-field>

            <v-select
              md4 xs12
              class="px-2"
              :items="users"
              :item-text="'name'"
              :item-value="'id'"
              label="Usuario"
              v-model="form.user"
              required
            ></v-select>

            <v-text-field
              md4 xs12
              class="px-2"
              name="description"
              label="Descripcion"
              type="text"
              v-model="form.description">
            </v-text-field>
          </v-layout>
        </v-form>
      </v-card-text>


      <v-spacer></v-spacer>

      <v-card-title primary-title class="title py-0">Programación horaria</v-card-title>
      <v-card-text>
        <v-spacer></v-spacer>
        <v-layout class="mt-2">
          <v-flex xs3 class="text-xs-center">
            Dia
          </v-flex>
          <v-flex xs3 class="text-xs-center">
            Desde
          </v-flex>

          <v-flex xs3 class="text-xs-center">
            Hasta
          </v-flex>

          <v-flex xs3 class="text-xs-center">
            Desde 2
          </v-flex>

          <v-flex xs3 class="text-xs-center">
            Hasta 2
          </v-flex>
          <br>
        </v-layout>
        <template v-for="day in days">
          <v-layout row>
            <v-flex xs3 class="text-xs-center pa-3">
              {{day.name}}
            </v-flex>
            <v-flex xs3>
              <calendars-crud-dialog-time
                :day="day.number"
                :field="'start'"
                :value="findScheduleValue(day.number, 'start')"
                @time="timeCalendars"></calendars-crud-dialog-time>
            </v-flex>
            <v-flex xs3>
              <calendars-crud-dialog-time
                :day="day.number"
                :field="'end'"
                :value="findScheduleValue(day.number, 'end')"
                @time="timeCalendars"></calendars-crud-dialog-time>
            </v-flex>
            <v-flex xs3>
              <calendars-crud-dialog-time
                :day="day.number"
                :field="'start2'"
                :value="findScheduleValue(day.number, 'start2')"
                @time="timeCalendars"></calendars-crud-dialog-time>
            </v-flex>
            <v-flex xs3>
              <calendars-crud-dialog-time
                :day="day.number"
                :field="'end2'"
                :value="findScheduleValue(day.number, 'end2')"
                @time="timeCalendars"></calendars-crud-dialog-time>
            </v-flex>

          </v-layout>
        </template>

      </v-card-text>

      <v-card-text>
        <v-card-title primary-title class="title py-0">Configuración de turnos</v-card-title>
        <v-layout row wrap class="pa-3">
          <v-flex xs6 md3 class="text-xs-center">

            <v-text-field class="px-2"
                          label="Tiempo de turno"
                          type="number"
                          v-model="form.appointmentConfig.duration"
            ></v-text-field>
          </v-flex>
          <v-flex xs6 md3 class="text-xs-center">

            <v-text-field class="px-2"
                          label="Tiempo libre entre turnos"
                          type="number"
                          v-model="form.appointmentConfig.break"
            ></v-text-field>
          </v-flex>
          <v-flex xs6 md3 class="text-xs-center">
            <v-text-field class="px-2"
                          label="Dias máximos para Turnos"
                          type="number"
                          v-model="form.appointmentConfig.maxTimeInDays"
            ></v-text-field>
          </v-flex>
          <v-flex xs6 md3 class="text-xs-center">
            <v-text-field class="px-2"
                          label="Tiempo minimo para turno"
                          type="number"
                          v-model="form.appointmentConfig.minTimeInHours"
            ></v-text-field>
          </v-flex>
          <v-flex xs6 md3 class="text-xs-center">
            <v-text-field class="px-2"
                          label="Tiempo minimo para cancelar"
                          type="number"
                          v-model="form.appointmentConfig.cancelTimeInHours"
            ></v-text-field>
          </v-flex>
        </v-layout>


      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
  import CalendarsCrudDialogTime from './CalendarsCrudDialogTime'
  import {mapActions} from 'vuex'

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
    watch: {
      calendarForm: function () {
        if (this.calendarForm === null) {
          this.form = {
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
          }

        } else {

          this.form = this.calendarForm;

        }
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
        this.$emit('closeDialog')
      }
    }
  }
</script>
