<template>
    <div>
        <Navbar/>
        <div class="container">
            <div class="card" v-if="USER">
                <b-row>
                    <b-col>
                        <label for="username">Username :</label>
                        <p id="username">{{USER.username}}</p>
                    </b-col>
                    <b-col>
                        <label for="address">Address :</label>
                        <p id="address">{{USER.address.street}}, {{USER.address.suite}}, {{USER.address.city}}</p>
                    </b-col>
                </b-row>
                <b-row>
                    <b-col>
                        <label for="name">Name :</label>
                        <p id="name">{{USER.name}}</p>
                    </b-col>
                    <b-col>
                        <label for="company">Company :</label>
                        <p id="company">{{USER.company.name}}</p>
                    </b-col>
                </b-row>
                <b-row>
                    <b-col>
                        <label for="phone">Phone :</label>
                        <p id="phone">{{USER.phone}}</p>
                    </b-col>
                    <b-col>
                        <label for="website">Website :</label>
                        <p id="website">{{USER.website}}</p>
                    </b-col>
                </b-row>
                <b-row>
                  <b-col>
                        <label for="email">Email :</label>
                        <p id="email">{{USER.email}}</p>
                    </b-col>
                </b-row>
            </div>
            <br/>
            <b-tabs content-class="mt-3">
                <b-tab title="Posts" active>
                    <Post :posts="USER_POSTS"/>
                </b-tab>
                <b-tab title="Comments">
                    <Comments :comments="USER_COMMENTS" v-if="USER_COMMENTS"/>
                    <div>No comments, yet :)</div>
                </b-tab>
            </b-tabs>
        </div>
    </div>
</template>
<script>
import Navbar from './Navbar'
import Post from './Post'
import Comments from './Comments'

import { mapGetters } from 'vuex'

export default {
    name: 'User',
    components: {
        Navbar,
        Post,
        Comments
    },
    
    mounted(){
        this.$store.dispatch('GET_USER', this.$route.params.id)
        this.$store.dispatch('GET_USER_RELATED_POSTS', this.$route.params.id)
        this.$store.dispatch('GET_USER_RELATED_COMMENTS', this.$route.params.id)
    },

    computed: {
        ...mapGetters([
            'USER',
            'USER_POSTS',
            'USER_COMMENTS'
        ]),
    },
    
}
</script>
<style lang="scss">
    label{
        font-weight:bolder;
        margin-right: 15px;      
    }

    p{
        display: inline;
    }
</style>