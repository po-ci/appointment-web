<template>
  <v-list dense class="pt-3">
    <template v-for="item in nav">
      <v-list-tile v-if="isGranted(item)" :key="item.text" :to="item.link" exact @click="$emit('closeDrawer')">
        <v-list-tile-action>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>
            {{ item.text }}
          </v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </template>
  </v-list>
</template>

<script>

  import {mapGetters} from 'vuex'

  export default {
    name: "LayoutMenuList",
    props: {
      nav: {type: Array, default: null},
    },
    methods: {
      isGranted: function (item) {

        if(!item.role){
          return true
        }

        return this.hasRole(item.role) ? true: false
      },
    },
    computed: {

      ...mapGetters([
        'hasRole'
      ])
    }

  }
</script>

<style scoped>

</style>
