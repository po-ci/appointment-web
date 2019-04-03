<template>
  <v-dialog :value="open" width="800" persistent>
    <v-card>
      <v-card-title class="title" primary-title>
        {{title}}
      </v-card-title>
      <v-card-text>
        <v-text-field prepend-icon="turned_in"
                      name="reason"
                      label="Razon"
                      type="text"
                      v-model="form.reason"
                      placeholder="Razon"

                      :error="localErrors.reason.length?true:false"
                      :error-messages="localErrors.reason"

                      required
        >

        </v-text-field>

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
            v-model="form.start"
            label="Hasta"
            prepend-icon="event"
            readonly
            clearable
            :error="localErrors.start.length?true:false"
            :error-messages="localErrors.start"

          ></v-text-field>
          <v-date-picker
            v-model="form.start"
            locale="es-es"
            no-title
            color="secondary"
            :show-current="false"
            @input="$refs.menu1.save(form.start)"
          ></v-date-picker>
        </v-menu>

        <v-menu
          ref="menu2"
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
            v-model="form.end"
            label="Hasta"
            prepend-icon="event"
            readonly
            clearable
            :error="localErrors.end.length?true:false"
            :error-messages="localErrors.end"

          ></v-text-field>
          <v-date-picker
            v-model="form.end"
            locale="es-es"
            no-title
            color="secondary"
            :show-current="false"
            @input="$refs.menu2.save(form.end)"
          ></v-date-picker>
        </v-menu>

        <v-select
          :loading="getCalendarLoading"
          prepend-icon="account_box"
          :items="getCalendars"
          :item-text="'name'"
          :item-value="'id'"
          v-model="form.calendar"
          label="Calendario"
          attach
          chips
          :error="localErrors.calendar.length?true:false"
          :error-messages="localErrors.calendar"

        ></v-select>


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
          :loading="getOutOfServiceLoading"
          @click="saveOutOfService"
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
  import OutOfServiceCrudDelete from './OutOfServiceCrudDelete'

  export default {
    name: "OutOfServiceCrudDialog",
    props: {
      open: Boolean,
      title: String,
      outOfServiceObject: Object
    },
    components: {
      OutOfServiceCrudDelete
    },
    computed: {
      ...mapGetters(['getCalendars',
        'getOutOfServiceLoading',
        'getResultOutOfService',
        'getOutOfServiceErrors',
        'getFlashMessageOutOfService',
        'getCalendarLoading'])
    },
    data() {
      return {
        form: {
          calendar: null,
          reason: null,
          start: null,
          end: null
        },
        localErrors: {
          calendar: [],
          reason: [],
          start: [],
          end: []
        }
      }
    },
    methods: {
      ...mapActions(['addOutOfService', 'updateOutOfService']),

      saveOutOfService() {
        if (this.form.id) {
          this.updateOutOfService(this.form)
        } else {
          this.addOutOfService(this.form)
        }

      }
    },
    watch: {
      getResultOutOfService: function (value) {
        if (value) {
          this.$emit('closeDialog')
        }
      },
      getOutOfServiceErrors: function (value) {
        this.localErrors = Object.assign({}, this.localErrors, value);
      }
    },
    mounted: function () {
      if (this.outOfServiceObject.id) {
        this.form = cloneByJsonCopy(this.outOfServiceObject)
      }
    },
  }
</script>

<style scoped>

</style>
