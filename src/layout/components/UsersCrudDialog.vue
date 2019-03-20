<template>
  <v-dialog :value="open" width="800" persistent>
    <v-card>
      <v-card-title class="title" primary-title>
        {{title}}
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

                            required
              >

              </v-text-field>
            </v-flex>
            <v-flex xs12 md6>
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
            <v-flex xs12 md6>
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
              ></v-select>
            </v-flex>
            <v-flex xs12 md6 class="pl-4">
              Activo
              <v-switch :value="1" input-value="0" v-model="form.active"></v-switch>
            </v-flex>
          </v-layout>


        </v-form>
        {{form}}
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
  import {mapGetters, mapActions} from 'vuex'

  export default {
    name: "UsersCrudDialog",
    props: {
      open: Boolean,
      title: String,
      roles: Array,
      user: Object
    },

    watch: {
      user: function () {
        if (this.user.id) {
          this.form = this.user
          for (var indice in this.form.roles) {
            this.form.roles[indice] = this.form.roles[indice].id;
          }

        } else {
          this.form = {
            name: null,
            username: null,
            password: null,
            password_verify: null,
            email: null,
            phone: null,
            roles: [],
            active: false
          }
        }
      }

    },
    data() {
      return {
        form: {
          name: null,
          username: null,
          password: null,
          password_verify: null,
          email: null,
          phone: null,
          roles: [],
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
          console.log(this.form)
          this.$emit('closeDialog')
        } else {
          this.createUser(this.form)
          console.log(this.getResponse)
          this.$emit('closeDialog')

        }

      }
    },
    computed: {
      ...mapGetters(['getUsersLoading', 'getResponse'])
    }
  }
</script>
