<template>
    <div>
        <b-navbar toggleable="sm" type="light" variant="light">
            <div class="container">
                <b-navbar-nav>
                    <b-nav-item>
                        <router-link to="/posts">
                            Main
                        </router-link>
                    </b-nav-item>
                </b-navbar-nav>
                <b-navbar-nav class="ml-auto">
                    <b-nav-item>{{email}}</b-nav-item>
                    <b-button size="md" variant="light" class="mb-2" @click="logOut">
                        <b-icon icon="power"></b-icon> Logout
                    </b-button>
                </b-navbar-nav>
            </div>
        </b-navbar>
    </div>
</template>
<script>
export default {
    name: 'Navbar',
    data(){
        return {
            email:localStorage.getItem('auth-mail')
        }
    },

    methods:{
        logOut() { 
            return this.$store.dispatch('LOG_OUT') 
        }
    }
}
</script>

<style lang="scss" scoped>
    .nav{
        background-color: #fff;
    }

</style>