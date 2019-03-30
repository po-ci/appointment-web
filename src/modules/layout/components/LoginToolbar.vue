<template>

  <avatar-toolbar v-if="isLogin"></avatar-toolbar>
  <v-btn v-else
         flat
         dark
         to="/login"
  >
    Iniciar Sesión
  </v-btn>

</template>

<script>
  import {mapGetters, mapActions} from 'vuex'
  import AvatarToolbar from './AvatarToolbar'

  export default {
    name: "LoginToolbar",
    components: {AvatarToolbar},
    computed: {
      ...mapGetters([
        'getUser',
        'isLogin'
      ]),
    },
    mounted: function () {
      this.checkAuth()
      this.controlLoginExpire()
    },
    methods: {
      controlLoginExpire: function () {
        const self = this;
        setInterval(function(){
          if(self.$router.currentRoute.name != "home"
            && self.$router.currentRoute.name != "register"
            && self.$router.currentRoute.name != "login"
            && self.$router.currentRoute.name != "validate"){
            self.checkAuth()
          }

        },60000)
      },
      ...mapActions([
        'checkAuth'
      ])
    }
  }
</script>

<style scoped>

</style>
