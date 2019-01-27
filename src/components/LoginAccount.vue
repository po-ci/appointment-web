<template>

    <avatar v-if="isLogin"></avatar>
    <v-btn v-else color="grey"
           dark
           @click="showLogin"
    >
        Login
        <v-icon right dark>forward</v-icon>
    </v-btn>

</template>

<script>
    import {mapGetters} from 'vuex'
    import Avatar from './Avatar'

    export default {
        name: "LoginAccount",
        components: {Avatar},
        computed: {
            ...mapGetters([
                'getUser',
                'isLogin'
            ]),
        },
        methods: {
            showLogin: function () {

            }
        }
    }
</script>

<style scoped>

</style>