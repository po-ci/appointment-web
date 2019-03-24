<template>

    <v-card-text class="text-xs-center">
        <profile-avatar v-on:avatarClick="pickFile"></profile-avatar>


        <v-form ref="form" autocomplete="off" v-model="valid">
            <input
                    type="file"
                    style="display: none"
                    ref="img"
                    accept="image/*"
                    @change="onFilePicked"
            >

            <v-alert
                    :value="errors.img.length?true:false"
                    color="error"
                    icon="warning"
                    outline
            >
                <ul>
                    <li v-for="error in errors.img">
                        {{error}}
                    </li>
                </ul>
            </v-alert>

        </v-form>
    </v-card-text>

</template>

<script>
    import {mapGetters, mapActions} from 'vuex'
    import ProfileAvatar from './ProfileAvatar'

    export default {
        name: "ProfileImage",
        components: {ProfileAvatar},
        data: () => ({
            valid: true,
            imageName: null,
            errors: {
                img: []
            },
            img: null,
        }),
        computed: {
            ...mapGetters([
                'getUser',
                'isLogin',
                'getAuthLoading'
            ]),
        },
        methods: {
            ...mapActions([
                'imageChange',
            ]),
            pickFile() {
                this.$refs.img.click()
            },
            resetValidation: function () {
                this.valid = true
                this.errors = {
                    img: []
                }
            },
            onFilePicked: function (e) {

                this.img = e.target.files[0]

                this.imageName = this.img.name

                this.resetValidation()

                if (this.$refs.form.validate()) {

                    this.$store.commit('SET_AUTH_LOADING', true)

                    this.imageChange(this.img).then((response) => {

                        if (response.data.status) {
                            this.$store.commit('SET_USER_IMG', response.data.img)
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