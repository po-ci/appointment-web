<template>


  <v-radio-group v-if="getCalendars.length > 0" v-model="select" :mandatory="true" @change="onChange">

    <v-list
      subheader
    >
      <v-list-tile @click="" v-for="calendar in getCalendars" class="pa-0">
        <v-list-tile-action>
          <v-radio
            :key="calendar.id"
            :value="calendar.id"
          ></v-radio>
        </v-list-tile-action>

        <v-list-tile-content @click="select = calendar.id">
          <v-list-tile-title>{{calendar.name}}</v-list-tile-title>
          <v-list-tile-sub-title>{{calendar.description}}</v-list-tile-sub-title>
        </v-list-tile-content>
      </v-list-tile>


    </v-list>

    <!--    <v-radio
          v-for="calendar in getCalendars"
          :key="calendar.id"
          :label="`${calendar.name}`"
          :value="calendar.id"
        ></v-radio>-->

  </v-radio-group>


  <v-flex v-else>
    <span class="primary--text">Cargando Agendas</span>
    <v-progress-linear indeterminate></v-progress-linear>
  </v-flex>


</template>

<script>

  import {mapActions, mapGetters} from 'vuex'


  export default {
    name: "AppointmentsCalendarsRadio",
    data: () => ({
      select: null
    }),
    computed: {
      ...mapGetters([
        'getCalendars',
        'getAvailableShifts',
        'findCalendarById'
      ]),
    },
    watch: {
      select: function(value){
        this.onChange(value)
      }
    },
    methods: {

      onChange: function (value) {
        this.setCalendarSelected(this.findCalendarById(value))
      },

      ...mapActions([
        'setCalendarSelected',

      ])
    }
  }
</script>

<style scoped>

</style>
