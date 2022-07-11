<script setup>
import Navbar from "../components/Navbar.vue";
import Footbar from "../components/Footbar.vue";
import Destinations from "../components/Destinations.vue";
import Search from "../components/Search.vue";
</script>

<template>
  <Navbar />
  <main>
    <h1>Finally an easy way to find cheap flights.</h1>
    <Search />
    <Destinations />
  </main>
  <Footbar />
</template>

<style scoped>
h1 {
  font-weight: 900;
}

main {
  padding-left: calc(var(--padding) * 2);
  padding-right: calc(var(--padding) * 2);
  padding-top: var(--padding);
}

@media screen and (max-width: 1100px) {
  main {
    padding-left: calc(var(--padding) * 1.5);
    padding-right: calc(var(--padding) * 1.5);
  }
}

@media screen and (max-width: 450px) {
  main {
    padding-left: calc(var(--padding) * 1.25);
    padding-right: calc(var(--padding) * 1.25);
  }
}
</style>
