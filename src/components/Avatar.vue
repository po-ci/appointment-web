<template>

        <v-btn icon large>
            <span class="pr-2">{{getUsername}}</span>
            <v-avatar
                    :tile="tile"
                    :size="avatarSize"
                    color="grey lighten-4"

            >
                <img :src="getSrc">
            </v-avatar>
        </v-btn>

</template>

<script>
    import {mapGetters} from 'vuex'

    export default {
        name: "Avatar",
        data: () => ({
            src: '/assets/user.jpg',
            avatarSize: 30,
            tile: false
        }),
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