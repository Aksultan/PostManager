<template>
    <div class="container">
        <b-row v-for="(post, index) in posts" :key="index">
            <b-col>
                <div class="card">
                    <div class="header">
                        <router-link :to="'/user/'+post.userId" :class="{ owner: validateUser(post.email) }">{{post.name}}</router-link>
                        <div class="toolbar" v-if="validateUser(post.email)">
                            <b-button-group v-if="edit && editId === post.id">
                                <b-button variant="outline-primary" @click="edit = false">
                                    <b-icon icon="x"></b-icon>
                                </b-button>
                            </b-button-group>
                            <b-button-group v-else>
                                <b-button variant="outline-primary" @click="enableEdit(post.id, post.title, post.body)">
                                    <b-icon icon="pencil"></b-icon>
                                </b-button>
                                <b-button variant="outline-primary" @click="deletePost(post.id)">
                                    <b-icon icon="trash"></b-icon>
                                </b-button>
                            </b-button-group>
                        </div>
                    </div>
                    <div v-if="edit && editId == post.id">
                        <br/>
                        <b-row>
                            <b-col sm="2">
                                <label for="edit-title">Title : </label>
                            </b-col>
                            <b-col sm="10">
                                <b-form-input id="edit-title" v-model="editTitle" :value="post.title"></b-form-input>
                            </b-col>
                        </b-row>
                        <br/>
                        <b-row>  
                            <b-col sm="2">
                                <label for="edit-title">Body : </label>
                            </b-col>
                            <b-col sm="10">
                                <b-form-textarea id="edit-title" v-model="editBody" :value="post.body"></b-form-textarea>
                            </b-col>
                        </b-row>
                        <br/>
                        <b-button block variant="primary" @click="editPost(editTitle, editBody, post.id)">Save</b-button>
                    </div>
                    <div v-else>
                        <h2>
                            <router-link :to="'/postInfo/'+JSON.stringify(post.id)">
                                {{post.title}}
                            </router-link>
                        </h2>
                        <p>{{post.body}}</p>
                    </div>
                </div>
            </b-col>
        </b-row>
    </div>
</template>
<script>
export default {
    name: 'Post',
     data(){
        return {
            title: '',
            body: '',
            editTitle:'',
            editBody:'',
            edit: false,
            editId: null
        }
    },

    props : ['posts'],

    methods : {
        validateUser(email){
            return localStorage.getItem('auth-mail') === email
        },
        
        deletePost(id){
            return this.$store.dispatch('DELETE_POST', id)
        },

        enableEdit(id, title, body){
            this.editId = id
            this.edit = true
            this.editTitle = title
            this.editBody = body
        },

        editPost(title, body, postId){
            this.edit = false
            return this.$store.dispatch('EDIT_POST', {
                id : parseInt(localStorage.getItem('auth-id')),
                title, 
                body, 
                postId
            })
        }
}

}
</script>
<style lang="scss">
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