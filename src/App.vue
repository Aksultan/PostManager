<template>
  <div id="app">
    <Auth/>
  </div>
</template>

<script>
import '../src/style/app.scss'

// import Posts from './components/Posts.vue'
import Auth from './components/Auth.vue'


export default {
  name: 'app',
  components: {
    // Posts,
    Auth
  }
}
</script>
