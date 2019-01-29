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

    <v-container v-else-if="isAccountCreated" fluid fill-height class="grey lighten-3">

        <v-layout align-center justify-center>
            <v-flex xs12 sm8 md4>
                <v-card class="elevation-12">
                    <v-card-text>
                        <p>Hemos enviado un correo para confirmar y finalizar la creación de su cuenta.</p>
                        <p>Por favor, acceda a su correo y haga click en el enlace de confirmación, para terminar de activar su cuenta</p>
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

                                          :error="errors.username.length?true:false"
                                          :error-messages="errors.username"

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

                                          :error="errors.email.length?true:false"
                                          :error-messages="errors.email"

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
                isAccountCreated: false,
                form: {
                    name: null,
                    username: null,
                    password: null,
                    email: null,
                    phone: null,
                },
                errors: {
                    name: [],
                    username: [],
                    password: [],
                    email: [],
                    phone: [],
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
            resetValidation: function () {
                this.$refs.form.resetValidation()
                this.errors = {
                    name: [],
                    username: [],
                    password: [],
                    email: [],
                    phone: [],
                }
            },
            submit: function () {

                this.resetValidation()

                if (this.$refs.form.validate()) {
                    this.register(this.form).then((response) => {
                        if (response.data.status) {
                            //TODO confirmar creacion de cuenta
                            this.isAccountCreated = true
                        } else {
                            this.errors = Object.assign({}, this.errors, response.data.errors);
                        }
                    })
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