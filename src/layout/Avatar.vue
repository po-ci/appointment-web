<template>

    <v-toolbar-items>
        <v-btn flat>{{getUsername}}</v-btn>
        <v-btn icon large>

            <v-menu offset-y left>
            <v-avatar
                    :tile="tile"
                    :size="avatarSize"
                    color="grey lighten-4"
                    slot="activator"


            >
                <img :src="getSrc">
            </v-avatar>

                <v-list>
                    <v-list-tile @click="logout">
                        <v-list-tile-title>Cerrar Sesión</v-list-tile-title>
                    </v-list-tile>
                </v-list>
            </v-menu>
        </v-btn>

    </v-toolbar-items>

</template>

<script>
    import {mapGetters, mapActions} from 'vuex'

    export default {
        name: "Avatar",
        data: () => ({
            src: '/assets/user.jpg',
            avatarSize: 30,
            tile: false
        }),
        methods: {
            ...mapActions([
                'logout'
            ])
        },
        computed: {
            getSrc: function () {
                let user = this.getUser

                if (user.img) {
                    return user.img
                } else {
                    return this.src
                }
            },
            getUsername: function(){
              return this.getUser.username
            },
            ...mapGetters([
                'getUser'
            ])
        }
    }
</script>

<style scoped>

</style>