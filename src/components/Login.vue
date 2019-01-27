<template>
    <v-container fluid fill-height class="grey lighten-3">
        <v-layout align-center justify-center>
            <v-flex xs12 sm8 md4>
                <v-card class="elevation-12">
                    <v-toolbar dark color="grey">
                        <v-toolbar-title>Login form</v-toolbar-title>
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
                        <v-btn color="grey" dark @click="login">Login</v-btn>
                    </v-card-actions>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>

    import {mapActions} from 'vuex'

    export default {
        name: "Login",
        data: () => ({
                username: null,
                password: null
            }
        ),
        mounted: function(){
            console.log(process.env)
            console.log(process.env.VUE_APP_APIHOST)
        },
        methods: {
            login: function() {
                this.auth({username: this.username, password: this.password})
            },
            ...mapActions([
                'auth',
            ]),
        }
    }
</script>

<style scoped>

</style>