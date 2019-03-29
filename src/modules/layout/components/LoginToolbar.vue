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
          console.log(self.$router.currentRoute.path)
          if(self.$router.currentRoute.path != "/"
            && self.$router.currentRoute.path != "/register"
            && self.$router.currentRoute.path != "/login"){
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
