<template>
  <v-dialog :value="open" width="800" persistent>
    <v-card>
      <v-card-title>
        <h2>{{title}}</h2>
      </v-card-title>
      <v-card-text>

        <v-select
          :loading="getCalendarLoading"
          prepend-icon="account_box"
          :items="getCalendars"
          :item-text="'name'"
          :item-value="'id'"
          v-model="form.calendar"
          label="Calendario"
          class="px-2"
          attach
          chips
          :error="localErrors.calendar.length?true:false"
          :error-messages="localErrors.calendar"

        ></v-select>


        <v-menu
          ref="menu1"
          :close-on-content-click="false"
          :nudge-right="40"
          lazy
          transition="scale-transition"
          offset-y
          full-width
          max-width="290px"
          min-width="290px"
        >
          <v-text-field
            slot="activator"
            v-model="form.date"
            label="Dia"
            prepend-icon="event"
            readonly
            class="px-2"
            :error="localErrors.start.length?true:false"
            :error-messages="localErrors.date"

          ></v-text-field>
          <v-date-picker
            v-model="form.date"
            locale="es-es"
            no-title
            color="secondary"
            :show-current="false"
            @input="$refs.menu1.save(form.date)"
          ></v-date-picker>
        </v-menu>
        <v-layout row wrap>
          <v-flex xs12 md6 pa-2>
            <specifics-schedules-crud-time :title="'Desde'"
                                           :value="form.start"
                                           :field="'start'"
                                           @time="saveTime"></specifics-schedules-crud-time>
          </v-flex>
          <v-flex xs12 md6 pa-2>
            <specifics-schedules-crud-time :title="'Hasta'"
                                           :value="form.end"
                                           :field="'end'"
                                           @time="saveTime"></specifics-schedules-crud-time>
          </v-flex>
          <v-flex xs12 md6 pa-2>
            <specifics-schedules-crud-time :title="'Desde 2'"
                                           :value="form.start2"
                                           :field="'start2'"
                                           @time="saveTime"></specifics-schedules-crud-time>
          </v-flex>
          <v-flex xs12 md6 pa-2>
            <specifics-schedules-crud-time :title="'Hasta 2'"
                                           :value="form.end2"
                                           :field="'end2'"
                                           @time="saveTime"></specifics-schedules-crud-time>
          </v-flex>
        </v-layout>


      </v-card-text>
      <v-card-actions>

        <v-btn
          color="grey"
          flat
          @click="$emit('closeDialog')"
        >
          Cerrar
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn
          :loading="getSpecificsSchedulesLoading"
          color="primary"
          dark
          @click="save"
        >
          Guardar
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
  import cloneByJsonCopy from './../../../helpers/cloneByJsonCopy'
  import {mapGetters, mapActions} from 'vuex'
  import SpecificsSchedulesCrudTime from './SpecificsSchedulesCrudTime'

  export default {
    name: "SpecificsSchedulesCrudDialog",
    components: {
      SpecificsSchedulesCrudTime
    },
    props: {
      open: Boolean,
      title: String,
      specificsScheduleObject: Object
    },
    computed: {
      ...mapGetters(['getSpecificsSchedulesResult', 'getSpecificsSchedulesError',
        'getSpecificsSchedulesLoading', 'getCalendarLoading', 'getCalendars'])
    },

    data() {
      return {
        form: {
          calendar: null,
          date: null,
          start: '',
          end: '',
          start2: '',
          end2: ''
        },
        localErrors: {
          calendar: [],
          date: [],
          start: [],
          end: [],
          start2: [],
          end2: []
        }
      }

    },
    methods: {
      ...mapActions(['addSpecificsSchedules', 'updateSpecificsSchedules']),
      save() {
        if (this.form.id) {
          this.updateSpecificsSchedules(this.form)
        } else {
          this.addSpecificsSchedules(this.form)
        }
      },
      saveTime(date) {
        switch (date.field) {
          case 'start':
            this.form.start = date.value
            break
          case 'end':
            this.form.end = date.value
            break
          case 'start2':
            this.form.start2 = date.value
            break
          case 'end2':
            this.form.end2 = date.value
            break
        }
      }
    },

    watch: {
      getSpecificsSchedulesResult: function (value) {
        if (value) {
          this.$emit('closeDialog')
        }
      },
      getSpecificsSchedulesError: function (value) {
        this.localErrors = Object.assign({}, this.localErrors, value);
      },
    },
    mounted() {
      if (this.specificsScheduleObject.id) {
        this.form = cloneByJsonCopy(this.specificsScheduleObject)
      }
    }
  }
</script>

<style scoped>

</style>
