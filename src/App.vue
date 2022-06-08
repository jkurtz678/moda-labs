<script lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import Header from '@/components/Header.vue'

export default {
  components: {
    Header,
    RouterLink,
    RouterView
  },
}
</script>

<template>
 <!--  <header>

    <div class="wrapper">
      <Header msg="Moda archives" />

      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/submit">Submit</RouterLink>
      </nav>
    </div>
  </header> -->

  <RouterView />
</template>

<style>

@import '@/assets/base.css';

#app {
  margin: 0 auto;
  font-weight: normal;
  height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}
</style>
