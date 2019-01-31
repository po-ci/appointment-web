<template>

    <avatar-toolbar v-if="isLogin"></avatar-toolbar>
    <v-btn v-else color="grey"
           dark
           to="/login"
    >
        Iniciar Sesión
        <v-icon right dark>forward</v-icon>
    </v-btn>

</template>

<script>
    import {mapGetters,mapActions} from 'vuex'
    import AvatarToolbar from './AvatarToolbar'

    export default {
        name: "LoginAccount",
        components: {AvatarToolbar},
        computed: {
            ...mapGetters([
                'getUser',
                'isLogin'
            ]),
        },
        mounted: function(){
            this.checkAuth()
        },
        methods: {
            ...mapActions([
                'checkAuth'
            ])
        }
    }
</script>

<style scoped>

</style>