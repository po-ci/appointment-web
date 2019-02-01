<template>
    <v-form ref="form" autocomplete="off" v-model="valid">

        <v-text-field id="password"
                      prepend-icon="lock"
                      name="password"
                      label="Contraseña"
                      type="password"
                      v-model="form.password"
                      :rules="validations.password"
                      placeholder="Contraseña"
                      autocomplete="new-password"

                      :error="errors.password.length?true:false"
                      :error-messages="errors.password"


                      required
        >

            <v-text-field id="password_verify"
                          prepend-icon="lock"
                          name="password_verify"
                          label="Repetir Contraseña"
                          type="password"
                          v-model="form.password"
                          :rules="validations.password"
                          placeholder="Repetir Contraseña"
                          autocomplete="new-password"

                          :error="errors.password_verify.length?true:false"
                          :error-messages="errors.password_verify"


                          required
            >

        </v-text-field>

            <v-btn :loading="getAuthLoading" color="grey" dark @click="submit">Crear Cuenta</v-btn>
    </v-form>
</template>

<script>
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
        submit: function () {

            this.resetValidation()

            if (this.$refs.form.validate()) {
                this.$store.commit('SET_AUTH_LOADING', true)
                this.register(this.form).then((response) => {
                    if (response.data.status) {
                        //TODO confirmar creacion de cuenta
                        this.isAccountCreated = true
                    } else {
                        this.errors = Object.assign({}, this.errors, response.data.errors);
                    }
                    this.$store.commit('SET_AUTH_LOADING', false)
                })
            }
        },
    }
</script>

<style scoped>

</style>