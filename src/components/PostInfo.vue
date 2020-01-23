<template>
    <div>
        <Navbar/>      
        <Post :posts="[POST]"/>
        <Comments :postId="POST.id"/>
    </div>
</template>
<script>
import Navbar from './Navbar'
import Post from './Post'
import Comments from './Comments'
import { mapGetters } from 'vuex'

export default {
    name: 'PostInfo',
    components: {
        Navbar,
        Post,
        Comments
    },
    mounted(){
        this.$store.dispatch('GET_POST', this.$route.params.id)
    },

    computed : {
        ...mapGetters(['POST'])
    }


}
</script>