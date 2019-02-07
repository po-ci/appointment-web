<template>
  <v-select
    v-model="select"
    :items="getCalendars"
    item-text="name"
    item-value="id"
    label="Agenda"
    v-on:change="onChange"
  ></v-select>
</template>

<script>

  import {mapActions, mapGetters} from 'vuex'


  export default {
    name: "ShiftsCalendars",
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
