<template>
    <div class="container">
        <div class="card" v-for="(comment, index) in comments" :key="index">
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
export default {
    name: 'Comments',
    props: ['comments'],

    data(){
        return{
            text: ''
        }
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