<template>
  <v-container>
    <v-layout>
      <v-flex xs12>
        <v-card class="elevation-6">
          <v-card-title primary-title class="title pb-0 px-4">
            Usuarios
          </v-card-title>
          <v-card-text>
            <v-layout row wrap>
              <v-flex xs6>
                <v-btn color="primary"
                       @click="createUsuario">
                  Nuevo Usuario
                </v-btn>
              </v-flex>
              <v-flex md6 xs12>
                <v-text-field
                  v-model="search"
                  append-icon="search"
                  label="Search"
                  single-line
                  hide-details
                  class="pa-0 px-2"
                ></v-text-field>
              </v-flex>
            </v-layout>
            <v-data-table
              class="mt-3"
              :headers="headers"
              :items="getUsers"
              :search="search"
              :loading="getUsersLoading">
              <template slot="items" slot-scope="props">
                <td>
                  <v-avatar
                    size="36px"
                  >
                    <img
                      :src="getSrc(props.item.img)"
                      alt="Avatar"
                    >
                  </v-avatar>
                </td>
                <td>{{ props.item.name }}</td>
                <td>{{ props.item.username}}</td>
                <td>{{ props.item.email }}</td>
                <td v-if="props.item.active == 1">
                  <v-icon
                    color="primary">check_circle
                  </v-icon>
                </td>
                <td v-else>
                  <v-icon color="error">highlight_off</v-icon>
                </td>
                <td>{{ props.item.phone }}</td>
                <td>
                  <v-icon
                    small
                    @click="">lock
                  </v-icon>
                </td>
                <td>Impersonar</td>
                <td>
                  <v-icon
                    small
                    class="mr-2"
                    @click=""
                  >
                    edit
                  </v-icon>
                  <v-icon
                    small
                    @click=""
                  >
                    delete
                  </v-icon>

                </td>
              </template>
            </v-data-table>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
    <users-crud-dialog :open="dialog"
                       :title="'Nuevo Usuario'"
                       @closeDialog="dialog = false"
    ></users-crud-dialog>

  </v-container>
</template>

<script>
  import {mapActions, mapGetters} from 'vuex'
  import UsersCrudDialog from './UsersCrudDialog'

  export default {
    name: "UsersCrud",
    components: {
      UsersCrudDialog
    },
    data() {
      return {
        headers: [
          {text: '', value: 'img', sortable: false},
          {text: 'Nombre', value: 'name'},
          {text: 'Usuario', value: 'user'},
          {text: 'Email', value: 'email'},
          {text: 'Active', value: 'active'},
          {text: 'Phone', value: 'phone'},
          {text: 'Password', value: 'password', sortable: false},
          {text: 'Impersonar', value: 'impersonar', sortable: false},
          {text: 'Aciones', value: 'acciones', sortable: false},
        ],
        search: '',
        dialog: false,
      }
    },
    computed: {
      ...mapGetters(['getUsers', 'getUsersLoading'])
    },
    methods: {
      ...mapActions(['allUsers', 'imageProfile']),

      getSrc(image) {
        if (image != null) {
          return process.env.VUE_APP_APIHOST + '/img/profile/' + image
        } else {
          return '/assets/user.jpg'
        }
      },
      createUsuario() {
        this.dialog = true
      }
    },
    mounted() {
      this.allUsers()
    }
  }
</script>
