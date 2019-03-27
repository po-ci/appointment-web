<template>
  <v-dialog :value="openDialog"
            width="800"
            persistent>
    <v-card>
      <v-card-title class="title" primary-title>
        {{title}}
      </v-card-title>
      <v-card-text>


        <v-menu
          ref="menu"
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
            label="Fecha"
            prepend-icon="event"
            readonly
            class="pt-0 px-4"
            :error="localErrors.date.length?true:false"
            :error-messages="localErrors.date"

          ></v-text-field>

          <v-date-picker
            full-width
            v-model="form.date"
            @input="$refs.menu.save(form.date)"
          ></v-date-picker>
        </v-menu>


        <v-text-field prepend-icon="title"
                      name="title"
                      label="Titulo"
                      type="text"
                      v-model="form.title"
                      placeholder="Titulo"
                      class="pa-4"

                      :error="localErrors.title.length?true:false"
                      :error-messages="localErrors.title"

                      required
        >

        </v-text-field>


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
          color="primary"
          :loading="getHolidaysLoading"
          @click="saveHolidayas"
        >
          Guardar
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
  import {mapActions, mapGetters} from 'vuex'
  import cloneByJsonCopy from './../../../helpers/cloneByJsonCopy'

  export default {
    name: "HolidaysCrudDialog",
    props: {
      openDialog: Boolean,
      title: String,
      holidayObject: Object
    },
    mounted: function () {
      if (this.holidayObject.id) {
        this.form = cloneByJsonCopy(this.holidayObject)
      }
    },

    watch: {
      getResultHolidays: function (value) {
        if (value) {
          this.$emit('closeDialog')
        }
      },
      getHolidaysErrors: function (value) {
        this.localErrors = Object.assign({}, this.localErrors, value);
      }
    },
    data() {
      return {
        form: {
          date: null,
          title: null
        },
        localErrors: {
          date: [],
          title: []
        }

      }
    },
    computed: {
      ...mapGetters(['getHolidaysLoading', 'getResultHolidays', 'getHolidaysErrors'])
    },
    methods: {
      ...mapActions(['createHolidays', 'updateHolidays']),

      saveHolidayas() {
        if (this.form.id) {
          this.updateHolidays(this.form)
        } else {
          this.createHolidays(this.form)
        }

      }
    }
  }
</script>

