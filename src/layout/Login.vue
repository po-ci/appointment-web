<template>
    <v-container v-if="isLogin" fluid fill-height class="grey lighten-3">
        <v-layout align-center justify-center>
            <v-flex xs12 sm8 md4>
                <v-card class="elevation-12">
                    <v-card-text>
                        Sesión Iniciada como:
                        <strong>{{getUser.username}}</strong>
                    </v-card-text>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>

    <v-container v-else fluid fill-height class="grey lighten-3">

        <v-layout align-center justify-center>
            <v-flex xs12 sm8 md4>
                <v-card class="elevation-12">
                    <v-toolbar dark color="grey">
                        <v-toolbar-title>Login</v-toolbar-title>
                        <v-spacer></v-spacer>


                    </v-toolbar>
                    <v-card-text>
                        <v-form>
                            <v-text-field prepend-icon="person"
                                          name="username"
                                          label="Usuario"
                                          type="text"
                                          v-model="username"
                                          placeholder="Usuario"
                            >

                            </v-text-field>

                            <v-text-field id="password"
                                          prepend-icon="lock"
                                          name="password"
                                          label="Password"
                                          type="password"
                                          v-model="password"
                                          placeholder="Password"
                            >

                            </v-text-field>
                        </v-form>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="grey" dark @click="login">Iniciar Sesión</v-btn>
                    </v-card-actions>
                </v-card>

                <v-card class="elevation-12 mt-3">
                    <v-card-text  class="text-xs-center">
                        Aun no tienes cuenta?
                        <router-link to="register">Crear Cuenta</router-link>
                    </v-card-text>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>

    import {mapActions, mapGetters} from 'vuex'

    export default {
        name: "Login",
        data: () => ({
                username: null,
                password: null,
                lo: false
            }
        ),
        computed: {
            ...mapGetters([
                'getUser',
                'isLogin'
            ]),
        },
        methods: {
            login: function () {
                this.auth({username: this.username, password: this.password})
            },
            ...mapActions([
                'auth',
            ]),
        }
    }
</script>

<style scoped>
    a {
        text-decoration: none;
    }
</style>