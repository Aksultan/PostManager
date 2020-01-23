<template>
    <div>
        <Navbar/>
        <div class="container">
            <Post :posts="[POST]"/>
        </div>
    </div>
</template>
<script>
import Navbar from './Navbar'
import Post from './Post'
import { mapGetters } from 'vuex'

export default {
    name: 'PostInfo',
    components: {
        Navbar,
        Post
    },
    mounted(){
        this.$store.dispatch('GET_POST', this.$route.params.id)
    },

    computed : {
        ...mapGetters(['POST'])
    }


}
</script>