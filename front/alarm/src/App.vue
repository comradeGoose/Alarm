<script>
import Navbar from './components/Navbar.vue'
import axios from 'axios'
export default {
  name: 'SignIn',
  components: {
    Navbar
  },
  data () {
    return {
      access_key: localStorage.getItem('access_key')
    }
  },
  methods: {
  }
}
</script>

<template>

  <header>
    <Navbar v-if="access_key"/>
  </header>

  <main class="h-100 w-100">
    <RouterView />
  </main>

</template>

<style scoped>
</style>
