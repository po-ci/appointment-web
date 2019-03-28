<template>
  <v-container>
    <v-layout row wrap>
      <v-flex xs12 class="pa-3">
        <v-card class="elevation-6">
          <v-card-title primary-title class="title">
            Usuarios
          </v-card-title>
        </v-card>
      </v-flex>
      <v-flex xs12 class="pa-3">
        <v-card class="elevation-6">
          <v-card-text>
            <v-layout row wrap>
              <v-flex md6 xs12 class="offset-md6">
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

                <div v-if="getUsersLoading"
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

                <!--       <td class="text-xs-center">
                         {{props.item}}
                       </td>-->

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
    <users-crud-dialog
      v-if="dialog"
      :user="user"
      :title="title"
      :roles="getRoles"
      :open="dialog"
      :show-password="showPassword"
      @closeDialog="dialog = false"
    >
    </users-crud-dialog>


    <v-snackbar
      v-model="snackbar"
      :color="'success'"
      :timeout="4000"
    >
      {{ getFlashMessage }}
      <v-btn
        dark
        flat
        @click="snackbar = false"
      >
        <v-icon>close</v-icon>
      </v-btn>
    </v-snackbar>

    <v-btn class="elevation-8"
           color="#D81B60"
           fab
           fixed
           bottom
           right
           dark
           @click="createUsuario">
      <v-icon>add</v-icon>
    </v-btn>
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
          //  {text: 'Log', value: 'log', sortable: false},
          {text: 'Aciones', value: 'acciones', sortable: false},
        ],
        search: '',
        dialog: false,
        user: null,
        title: null,
        showPassword: false,
        snackbar: false
      }
    },
    computed: {
      ...mapGetters(['getUsers', 'getUsersLoading', 'getRoles', 'getFlashMessage'])
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
        this.showPassword = true
        this.dialog = true

      },
      editUser(userObject) {
        this.title = 'Editando Usuario'
        this.fetchRoles()
        this.user = userObject
        this.showPassword = false
        this.dialog = true

      }
    },
    mounted() {
      this.allUsers()
    },
    watch: {
      getFlashMessage: function (value) {
        if (value) {
          this.snackbar = true
        }

      }
    }
  }
</script>
