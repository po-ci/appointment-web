<template>
    <v-dialog
            v-model="dialog"
            width="500"
            persistent
    >

        <v-card v-if="isPasswordChange">
            <v-card-text>
                <v-alert
                        :value="true"
                        color="success"
                        icon="check_circle"
                        outline
                >
                    Su contraseña ha sido modificada con exito.

                </v-alert>

            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>


                <v-btn
                        color="success"
                        flat="flat"
                        @click="closeDialog"
                >
                    Cerrar
                </v-btn>
            </v-card-actions>
        </v-card>

        <v-card v-else>
            <v-card-title></v-card-title>
            <v-card-text>
                <v-form ref="form" autocomplete="off" v-model="valid">

                    <v-text-field id="password"
                                  prepend-icon="lock"
                                  name="password"
                                  label="Nueva Contraseña"
                                  type="password"
                                  v-model="form.password"
                                  :rules="validations.password"
                                  placeholder="Nueva Contraseña"
                                  autocomplete="new-password"

                                  :error="errors.password.length?true:false"
                                  :error-messages="errors.password"


                                  required
                    ></v-text-field>

                    <v-text-field id="password_verify"
                                  prepend-icon="lock"
                                  name="password_verify"
                                  label="Repetir Nueva Contraseña"
                                  type="password"
                                  v-model="form.password_verify"
                                  :rules="validations.password"
                                  placeholder="Repetir Nueva Contraseña"
                                  autocomplete="new-password"

                                  :error="errors.password_verify.length?true:false"
                                  :error-messages="errors.password_verify"


                                  required
                    >

                    </v-text-field>


                </v-form>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>


                <v-btn
                        color="orange darken-1"
                        flat="flat"
                        @click="closeDialog"
                >
                    Cancelar
                </v-btn>

                <v-btn :loading="getAuthLoading" color="success" dark @click="submit">Cambiar Contraseña</v-btn>

            </v-card-actions>
        </v-card>

    </v-dialog>
</template>

<script>
    import {mapGetters, mapActions} from 'vuex'

    export default {
        name: "ProfilePassword",
        data: () => ({
                valid: true,
                isPasswordChange: false,
                form: {
                    password: null,
                    password_verify: null,
                },
                errors: {
                    password: [],
                    password_verify: []
                },
                validations: {
                    password: [
                        v => !!v || 'Contraseña es requerido',
                    ],
                }
            }
        ),
        computed: {
            ...mapGetters([
                'getUser',
                'getChangePasswordDialog',
                'getAuthLoading'
            ]),
            dialog: {
                get() {
                    return this.getChangePasswordDialog
                },
                set(value) {
                    this.setChangePasswordDialog(value)
                }
            }
        },
        methods: {
            ...mapActions([
                'setChangePasswordDialog',
                'passwordChange'
            ]),

            closeDialog: function(){

                this.dialog = false
                this.isPasswordChange = false

            },

            resetValidation: function () {
                this.errors = {
                    password: [],
                    password_verify: []
                }
            },

            submit: function () {

                this.resetValidation()

                if (this.$refs.form.validate()) {
                    this.$store.commit('SET_AUTH_LOADING', true)
                    this.passwordChange(this.form).then((response) => {
                        if (response.data.status) {
                            //TODO confirmar creacion de cuenta
                            this.isPasswordChange = true
                        } else {
                            this.errors = Object.assign({}, this.errors, response.data.errors);
                        }
                        this.$store.commit('SET_AUTH_LOADING', false)
                    })
                }
            },
        }
    }
</script>

<style scoped>

</style>