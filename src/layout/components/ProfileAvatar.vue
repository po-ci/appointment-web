<template>

    <v-avatar
            :tile="tile"
            :size="avatarSize"
            color="grey lighten-4"
            slot="activator"
            v-on:mouseover="hover = true"
            v-on:mouseleave="hover = false"
            v-on:click="$emit('avatarClick')"

    >
        <img style="position: absolute" :src="getSrc">

        <img  v-show="hover || getAuthLoading" style="position: absolute" :src="src">

        <v-progress-circular
                v-if="getAuthLoading"
                :size="50"
                color="primary"
                indeterminate
        ></v-progress-circular>

        <v-flex v-show="hover" style="position: relative; cursor:pointer;" class="grey--text">
            <v-icon class="grey--text">photo_camera</v-icon><br>
            <span class="font-weight-bold">Cambiar Foto</span>
        </v-flex>
    </v-avatar>


</template>

<script>
    import {mapGetters, mapActions} from 'vuex'

    export default {
        name: "ProfileAvatar",
        data: () => ({
            src: '/assets/user.jpg',
            avatarSize: 130,
            tile: false,
            hover: false
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
            getUsername: function () {
                return this.getUser.username
            },
            ...mapGetters([
                'getUser',
                'getAuthLoading'
            ])
        }
    }
</script>

<style scoped>

</style>