<script>
import HelloWorld from '../components/HelloWorld.vue'

export default {
  name: 'About',

  components: {
    HelloWorld
  },
  data() {
    return {
    }
  },
  methods: {
  }
}
</script>

<template>
  <header>
    <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />
    <div class="wrapper">
      <HelloWorld msg="Time your life with Timely!" />
    </div>
  </header>
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
  /* margin-top: 4rem; */
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}</style>
