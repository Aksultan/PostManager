<template>
  <div>
    <Navbar/>
    <div class="container">
      <b-row>
        <b-col>
          <div class="card">
            <b-row>
              <b-col sm="2">
                 <label for="title">Post title : </label>
              </b-col>
              <b-col sm="10">
                <b-form-input type="text" id="title" v-model="title"></b-form-input>
              </b-col>
            </b-row>
            <br/>
            <b-row>
              <b-col sm="2">
                 <label for="title">Post body : </label>
              </b-col>
              <b-col sm="10">
                <b-form-textarea type="text" id="title" v-model="body"></b-form-textarea>
              </b-col>
            </b-row>
            <br/>
            <b-button block variant="primary" @click="addPost(title, body)">Add post</b-button>  
          </div>
        </b-col>
      </b-row>
      <Post :posts="POSTS"/> 
    </div>
  </div>
</template>

<script>
import Navbar from './Navbar'
import Post from './Post'

import { mapGetters } from 'vuex'

export default {
  name: 'Posts',
  components: {
    Navbar,
    Post    
  },

  data(){
    return {
      title: '',
      body: '',
    }
  },
 
  mounted(){
    this.$store.dispatch('GET_POSTS');
  },


  computed : {
    ...mapGetters(['POSTS']),
  },

  methods : {
     addPost(title, body){
            return this.$store.dispatch('ADD_POST', {
                title, 
                body, 
                userId : parseInt(localStorage.getItem('auth-id'))
            })
        },
  }

}
</script>