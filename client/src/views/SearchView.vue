<script setup>
import Search from "../components/Search.vue";
import Results from "../components/Results.vue";
import Navbar from "../components/Navbar.vue";
import Footbar from "../components/Footbar.vue";
</script>

<template>
  <Navbar />
  <main>
    <Search />
    <Results />
  </main>
  <Footbar />
</template>

<style scoped>
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
