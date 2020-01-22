<template>
  <div>
    <Navbar/>
    <div class="container">
      <b-row v-for="(post, index) in POSTS" :key="index">
        <b-col>
          <div class="card">
            <div class="header">
              <a href="" :class="{owner: validateUser(post.email)}">{{post.name}}</a>
              <div class="toolbar" v-if="validateUser(post.email)">
                <b-button-group>
                  <b-button variant="outline-primary">
                    <b-icon icon="pencil"></b-icon>
                  </b-button>
                  <b-button variant="outline-primary" @click="deletePost(post.id)">
                    <b-icon icon="trash"></b-icon>
                  </b-button>
                </b-button-group>
              </div>
            </div>
            <h2>
              {{post.title}}
            </h2>
            <p>{{post.body}}</p>
          </div>
        </b-col>
      </b-row>
    </div>
  </div>
</template>

<script>
import Navbar from './Navbar'
import { mapGetters } from 'vuex'
export default {
  name: 'Posts',
  components: {
    Navbar    
  },


  mounted(){
    this.$store.dispatch('GET_POSTS');
  },


  computed : {
    ...mapGetters(['POSTS']),
  },


  methods : {
     validateUser(email){
      return localStorage.getItem('auth-mail') === email
    },
    
    deletePost(id){
      return this.$store.dispatch('DELETE_POST', id)
    }
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .card{
    background-color:#fff;
    margin-top: 20px;
    padding: 15px;
  }

  .container{
    margin-top: 15px;
  }

  h2{
    margin-top: 15px;
  }

  .toolbar{
    float:right;
  }

  .owner{
    font-weight: bold;
    color: #000;
  }
</style>
