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

              <template slot="no-data">

                <div  v-if="getUsersLoading"
                         color="info"
                         outline
                         class="text-xs-center">
                  Cargando usuarios
                </div>

                <div v-if="!getUsersLoading"
                         outline
                         color="info">
                  Sin datos
                </div>

              </template>

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

                <!--
                        <td class="text-xs-center">
                          <v-icon
                            small
                            @click="">lock
                          </v-icon>
                        </td>
                -->
                <td class="text-xs-center">
                  <v-icon
                    small
                    class="mr-2"
                    @click="editUser(props.item)"
                  >
                    edit
                  </v-icon>
                </td>
              </template>
            </v-data-table>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
    <users-crud-dialog :user="user"
                       :title="title"
                       :roles="getRoles"
                       :open="dialog"
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
          {text: 'Activo', value: 'active'},
          {text: 'Telefono', value: 'phone'},
          //    {text: 'Password', value: 'password', sortable: false},
          {text: 'Aciones', value: 'acciones', sortable: false},
        ],
        search: '',
        dialog: false,
        user: null,
        title: null,
      }
    },
    computed: {
      ...mapGetters(['getUsers', 'getUsersLoading', 'getRoles'])
    },
    methods: {
      ...mapActions(['allUsers', 'imageProfile', 'fetchRoles']),

      getSrc(image) {
        if (image != null) {
          return process.env.VUE_APP_APIHOST + '/img/profile/' + image
        } else {
          return '/assets/user.jpg'
        }
      },
      createUsuario() {
        this.user = {}
        this.title = 'Nuevo Usuario'
        this.fetchRoles()
        this.dialog = true
      },
      editUser(userObject) {
        this.title = 'Edit Usuario'
        this.fetchRoles()
        this.user = userObject
        this.dialog = true
      }
    },
    mounted() {
      this.allUsers()
    }
  }
</script>
