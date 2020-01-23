<template>
  <div>
    <Navbar/>
    <div class="container">
      <b-row>
        <b-col>
          <div class="card">
          
          
            <b-form-group
              label-cols-sm="4"
              label-cols-lg="2"
              label="Post title :"
              label-for="title"
              :invalid-feedback="validateTitle"
              :state="validateTitle===''?true:false"
              :description="titleLength.toString()"
            >
              <b-form-input type="text" id="title" v-model="title" :state="validateTitle===''?true:false" @change="titleLength?titleLength:''"></b-form-input>
            </b-form-group>
              
            <br/>

            <b-form-group
              label-cols-sm="4"
              label-cols-lg="2"
              label="Post body :"
              label-for="body"
              :invalid-feedback="validateBody"
              :state="validateBody===''?true:false"
            >
              <b-form-textarea type="text" id="body" v-model="body" :state="validateBody===''?true:false"></b-form-textarea>
            </b-form-group>
            <br/>
            <b-button block variant="primary" @click="addPost(title, body)">Add post</b-button>  
          </div>
        </b-col>
      </b-row> 
    </div>
    <Post :posts="POSTS"/>
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

    titleLength(){
      return this.title.length>50?0:50-this.title.length
    },

    validateTitle(){
      if(this.title.length > 50)
        return "max 50 symbols"
      else if(this.title.length === 0)
        return "can't be empty"
      else
        return ""  
    },

    validateBody(){
      if(this.body.length === 0)
        return "can't be empty"
      else
        return ""  
    }
  },

  methods : {
     
    addPost(title, body){
      if(this.validateTitle==="" && this.validateBody==="")
        return this.$store.dispatch('ADD_POST', {
            title, 
            body, 
            userId : parseInt(localStorage.getItem('auth-id'))
        })
      else
        return alert("Title or body is filled wrong")  
    },
    
    
  }

}
</script>