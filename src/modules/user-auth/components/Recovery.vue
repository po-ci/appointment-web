<template>


    <v-container v-if="recoverySuccess"  fluid fill-height class="grey lighten-3">

        <v-layout align-center justify-center>
            <v-flex xs12 sm8 md4>
                <v-card class="elevation-12">
                    <v-card-text>
                        <v-alert
                                :value="true"
                                color="success"
                                icon="check_circle"
                                outline
                        >
                            {{recoveryMessage}}
                        </v-alert>

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
                        <v-toolbar-title>Recuperar Contraseña</v-toolbar-title>
                        <v-spacer></v-spacer>


                    </v-toolbar>
                    <v-card-text>
                        <v-form ref="form" autocomplete="off" v-model="valid">


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


                        </v-form>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn :loading="getAuthLoading" color="grey" dark @click="submit">Recuperar Contraseña</v-btn>
                    </v-card-actions>
                </v-card>

            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>

    import {mapActions, mapGetters} from 'vuex'

    export default {
        name: "Recovery",
        data: () => ({
                valid: true,
                recoverySuccess: false,
                recoveryMessage: '',
                form: {
                    email: null,
                },
                errors: {
                    email: [],
                },
                validations: {
                    email: [
                        v => !!v || 'Email es requerido',
                        v => /.+@.+/.test(v) || 'Email debe tener un formato valido '
                    ],
                }
            }
        ),
        computed: {
            ...mapGetters([
                'getUser',
                'isLogin',
                'getAuthLoading'
            ]),

        },
        methods: {
            resetValidation: function () {
                this.errors = {
                    email: [],
                }
            },
            submit: function () {

                this.resetValidation()

                if (this.$refs.form.validate()) {
                    this.$store.commit('SET_AUTH_LOADING', true)

                    this.recovery(this.form).then((response) => {
                        if (response.data.status) {
                            this.recoverySuccess = true
                            this.recoveryMessage = response.data.message
                        } else {
                            this.errors = Object.assign({}, this.errors, response.data.errors)
                        }
                        this.$store.commit('SET_AUTH_LOADING', false)
                    })

                }
            },
            ...mapActions([
                'recovery',
            ]),
        }
    }
</script>

<style scoped>
    a {
        text-decoration: none;
    }
</style>