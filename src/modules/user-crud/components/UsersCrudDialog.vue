<template>
  <v-dialog :value="open" width="800" persistent>
    <v-card>
      <v-card-title class="title" primary-title>
        <span>{{title}}</span>
        <v-spacer></v-spacer>
        <v-btn flat icon color="grey" @click="$emit('closeDialog')">
          <v-icon>close</v-icon>
        </v-btn>
      </v-card-title>

      <v-card-text>

        <v-form ref="form" autocomplete="off">

          <v-layout row wrap>
            <v-flex xs12 md6>

              <v-text-field prepend-icon="account_box"
                            name="name"
                            label="Nombre y Apellido"
                            type="text"
                            v-model="form.name"
                            placeholder="Nombre y Apellido"
                            class="pa-3"

                            :error="localErrors.name.length?true:false"
                            :error-messages="localErrors.name"

                            required
              >

              </v-text-field>
            </v-flex>

            <v-flex xs12 md6>
              <v-text-field prepend-icon="person"
                            name="username"
                            label="Usuario"
                            type="text"
                            v-model="form.username"
                            placeholder="Usuario"
                            class="pa-3"
                            autocomplete="new-password"

                            :error="localErrors.username.length?true:false"
                            :error-messages="localErrors.username"

                            required
              >

              </v-text-field>
            </v-flex>

            <v-flex xs12 md6>
              <v-text-field prepend-icon="email"
                            name="email"
                            label="Email"
                            type="text"
                            class="pa-3"
                            v-model="form.email"
                            placeholder="Email"

                            :error="localErrors.email.length?true:false"
                            :error-messages="localErrors.email"

                            required
              >

              </v-text-field>
            </v-flex>

            <v-flex xs12 md6>
              <v-text-field prepend-icon="phone"
                            name="phone"
                            label="Telefono"
                            type="text"
                            class="pa-3"
                            v-model="form.phone"
                            placeholder="Telefono"

                            :error="localErrors.phone.length?true:false"
                            :error-messages="localErrors.phone"

                            required
              >

              </v-text-field>
            </v-flex>


            <v-flex xs12 md6 v-if="showPassword">
              <v-text-field id="password"
                            prepend-icon="lock"
                            name="password"
                            label="Contraseña"
                            type="password"
                            v-model="form.password"
                            class="pa-3"
                            placeholder="Contraseña"
                            autocomplete="new-password"
                            ref="password"


                            required
              >
              </v-text-field>
            </v-flex>
            <v-flex xs12 md6 v-if="showPassword">
              <v-text-field id="password_verify"
                            prepend-icon="lock"
                            name="password_verify"
                            label="Repetir Contraseña"
                            type="password"
                            v-model="form.password_verify"
                            placeholder="Repetir Contraseña"
                            autocomplete="new-password"
                            class="pa-3"


                            required
              >

              </v-text-field>
            </v-flex>
            <v-flex xs12 md6>
              <v-select
                prepend-icon="account_box"
                class="pa-3"
                :items="roles"
                :item-text="'name'"
                :item-value="'id'"
                v-model="form.roles"
                label="Rol"
                attach
                chips
                multiple

                :error="localErrors.roles.length?true:false"
                :error-messages="localErrors.roles"

              ></v-select>
            </v-flex>
            <v-flex xs12 md6 class="pl-4">
              Activo
              <v-switch :value="1" input-value="0" v-model="form.active"></v-switch>
            </v-flex>
          </v-layout>


        </v-form>
      </v-card-text>


      <v-card-actions>
        <v-btn
          color="grey"
          flat
          @click="$emit('closeDialog')"
        >
          Cerrar
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn
          color="primary"
          @click="saveUser"
          :loading="getUsersLoading"
        >
          Guardar
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
  import {mapGetters, mapActions, mapState} from 'vuex'
  import cloneByJsonCopy from './../../../helpers/cloneByJsonCopy'
  export default {
    name: "UsersCrudDialog",
    props: {
      open: Boolean,
      title: String,
      roles: Array,
      user: Object,
      showPassword: Boolean
    },
    mounted: function () {
      if (this.user.id) {
        this.form = cloneByJsonCopy(this.user)
        for (var indice in this.form.roles) {
          this.form.roles[indice] = this.form.roles[indice].id;
        }

      }
    },
    watch: {
      getResult: function (value) {
        if (value) {
          this.$emit('closeDialog')
        }
      },
      getErrors: function (value) {
        this.localErrors = Object.assign({}, this.localErrors, value);
      }
    },
    data() {
      return {
        localErrors: {
          name: [],
          username: [],
          password: [],
          password_verify: [],
          email: [],
          phone: [],
          active: [],
          roles: []
        },
        form: {
          name: null,
          username: null,
          password: null,
          password_verify: null,
          email: null,
          phone: null,
          roles: [2],
          active: null
        }
      }
    },
    methods: {
      ...mapActions(['createUser', 'updateUser']),

      saveUser() {
        if (this.form.id) {
          if (this.form.active == null) {
            this.form.active = 0
          }
          this.updateUser(this.form)
        } else {
          this.createUser(this.form)
        }

      }
    },
    computed: {
      ...mapGetters(['getUsersLoading', 'getErrors', 'getResult']),
    }
  }
</script>
