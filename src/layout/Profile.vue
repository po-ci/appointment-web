<template>

    <v-container v-if="isLogin" fluid fill-height class="grey lighten-3">
        <v-layout align-center justify-center>
            <v-flex xs12 sm8 md4>
                <v-card class="elevation-12">

                    <profile-image></profile-image>
                    <v-divider></v-divider>

                    <v-card-text>
                        <v-list two-line>
                            <v-list-tile>
                                <v-list-tile-action>
                                    <v-icon color="primary">account_box</v-icon>
                                </v-list-tile-action>

                                <v-list-tile-content>
                                    <v-list-tile-sub-title class="primary--text">Nombre</v-list-tile-sub-title>
                                    <v-list-tile-title> {{getUser.name}}</v-list-tile-title>

                                </v-list-tile-content>
                            </v-list-tile>

                            <v-list-tile>
                                <v-list-tile-action>
                                    <v-icon color="primary">alternate_email</v-icon>
                                </v-list-tile-action>

                                <v-list-tile-content>
                                    <v-list-tile-sub-title class="primary--text">Email</v-list-tile-sub-title>
                                    <v-list-tile-title> {{getUser.email}}</v-list-tile-title>

                                </v-list-tile-content>
                            </v-list-tile>

                            <v-list-tile>
                                <v-list-tile-action>
                                    <v-icon color="primary">phone</v-icon>
                                </v-list-tile-action>

                                <v-list-tile-content>
                                    <v-list-tile-sub-title class="primary--text">Télefono</v-list-tile-sub-title>
                                    <v-list-tile-title> {{getUser.phone}}</v-list-tile-title>

                                </v-list-tile-content>


                            </v-list-tile>
                        </v-list>

                    </v-card-text>

                    <v-card-text class="text-xs-center pt-0">
                        <v-btn @click="setChangePasswordDialog(true)">
                            <v-icon left>lock</v-icon>
                            Cambiar Contraseña</v-btn>

                    </v-card-text>
                </v-card>
            </v-flex>


        </v-layout>
        <profile-password></profile-password>
    </v-container>
</template>

<script>
    import {mapGetters, mapActions} from 'vuex'
    import ProfileImage from './ProfileImage'
    import ProfilePassword from './ProfilePassword'

    export default {
        name: "Profile",
        components: {ProfileImage, ProfilePassword},
        computed: {
            ...mapGetters([
                'getUser',
                'isLogin',
                'getAuthLoading'
            ]),
        },
        methods: {
            ...mapActions([
                'setChangePasswordDialog',
            ]),
        }
    }
</script>

<style scoped>

</style>