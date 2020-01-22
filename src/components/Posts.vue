<template>
  <div>
    <Navbar/>
    <div class="container">
      
    </div>
  </div>
</template>

<script>
import Navbar from './Navbar'
export default {
  name: 'Posts',
  components: {
Navbar    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
