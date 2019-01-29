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
                        <v-toolbar-title>Crear Cuenta</v-toolbar-title>
                        <v-spacer></v-spacer>


                    </v-toolbar>
                    <v-card-text>
                        <v-form ref="form" autocomplete="off" v-model="valid">


                            <v-text-field prepend-icon="account_box"
                                          name="name"
                                          label="Nombre y Apellido"
                                          type="text"
                                          v-model="form.name"
                                          :rules="validations.name"
                                          placeholder="Nombre y Apellido"
                                          required
                            >

                            </v-text-field>

                            <v-text-field prepend-icon="person"
                                          name="username"
                                          label="Usuario"
                                          type="text"
                                          v-model="form.username"
                                          :rules="validations.username"
                                          placeholder="Usuario"
                                          autocomplete="new-password"
                                          required
                            >

                            </v-text-field>

                            <v-text-field prepend-icon="email"
                                          name="email"
                                          label="Email"
                                          type="text"
                                          v-model="form.email"
                                          :rules="validations.email"
                                          placeholder="Email"

                                          required
                            >

                            </v-text-field>

                            <v-text-field prepend-icon="phone"
                                          name="phone"
                                          label="Telefono"
                                          type="text"
                                          v-model="form.phone"
                                          :rules="validations.phone"
                                          placeholder="Telefono"
                                          required
                            >

                            </v-text-field>

                            <v-text-field id="password"
                                          prepend-icon="lock"
                                          name="password"
                                          label="Contraseña"
                                          type="password"
                                          v-model="form.password"
                                          :rules="validations.password"
                                          placeholder="Contraseña"
                                          autocomplete="new-password"
                                          required
                            >

                            </v-text-field>
                        </v-form>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="grey" dark @click="submit">Crear Cuenta</v-btn>
                    </v-card-actions>
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
                valid: true,
                form: {
                    name: null,
                    username: null,
                    password: null,
                    email: null,
                    phone: null,
                    lo: false,
                },
                validations: {
                    name: [
                        v => !!v || 'Nombre y Apellido es requerido',
                    ],
                    username: [
                        v => !!v || 'Usuario es requerido',
                    ],
                    phone: [
                        v => !!v || 'Telefono es requerido',
                    ],
                    email: [
                        v => !!v || 'Email es requerido',
                        v => /.+@.+/.test(v) || 'Email debe tener un formato valido '
                    ],
                    password: [
                        v => !!v || 'Contraseña es requerido',
                    ],
                }
            }
        ),
        computed: {
            ...mapGetters([
                'getUser',
                'isLogin'
            ]),
        },
        methods: {
            submit: function () {
                if (this.$refs.form.validate()) {
                    console.log("Validate ok")
                    this.register(this.form)
                }
            },
            ...mapActions([
                'register',
            ]),
        }
    }
</script>

<style scoped>
    a {
        text-decoration: none;
    }
</style>