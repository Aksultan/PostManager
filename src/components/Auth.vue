<template>
  <div class="container">
    <div class="form">
    <b-form-group
        label="Enter your email"
        label-for="email"
        :type="email"
    >
      <b-form-input type="email" id="email" :state="validateEmail" v-model="email" trim></b-form-input>
    </b-form-group>

    <b-form-group
        label="Enter your password"
        label-for="password"
    >
      <b-form-input id="type-password" type="password" v-model="password"></b-form-input>    
    </b-form-group>        
     <b-button variant="outline-primary" @click="authUser">Login</b-button>
    </div>
  </div>
</template>

<script>
  export default {
    name:'Auth',

    data() {
      return {
        email: '',
        password: ''
      }
    },
    
    computed: {
        validateEmail() {
            return this.email!=''?
              /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g.test(this.email)
              :null
        },
    },

    methods:{
       authUser() {
          return this.$store.dispatch('AUTHORIZATION', {email: this.email, password: this.password})
        }} 
  }
</script>
<style scoped lang="scss">
.container{
    display:flex;
    flex-direction: column;
    align-items:center;
    justify-content: center;
    height:100%;
}
.form{
    width:50%;
}
.container{
  margin-top:0;
  margin-bottom:0;
}
</style>