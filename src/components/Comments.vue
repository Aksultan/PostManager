<template>
    <div class="container">
        <div class="card" v-for="(comment, index) in COMMENTS" :key="index">
            <b-row>
                <b-col>
                    <router-link to="">
                        {{comment.email}}
                    </router-link>
                </b-col>
            </b-row>
            <b-row>
                <b-col>
                    <p>{{comment.body}}</p>
                </b-col>
            </b-row>
        </div>
    </div>
</template>
<script>
import { mapGetters } from 'vuex'

export default {
    name: 'Comments',
    props: ['postId'],

    data(){
        return{
            text: ''
        }
    },

    mounted(){
        this.$store.dispatch('GET_COMMENTS', this.$route.params.id)
    },

    computed: {
        ...mapGetters(['COMMENTS'])
    },
}
</script>
<style lang="scss">
    .container{
        margin-bottom: 20px;
    }
    .b-col{
        text-align: center;
    }
</style>