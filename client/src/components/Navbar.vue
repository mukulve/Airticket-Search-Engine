<script setup></script>
<script>
export default {
  data() {
    return {};
  },
  methods: {
    gohome() {
      this.$router.push({
        path: `/`,
      });
    },
  },
  mounted() {},
};
</script>
<template>
  <nav>
    <div class="logo" @click="gohome">
      <span>C</span>
      <span>H</span>
      <span>E</span>
      <span>A</span>
      <span>P</span>
      <span>T</span>
      <span>R</span>
      <span>I</span>
      <span>P</span>
      <span>S</span>
    </div>
  </nav>
</template>

<style scoped>
nav {
  padding-top: 1rem;
  padding-bottom: 1rem;
  padding-left: var(--padding);
  padding-right: var(--padding);
}

span {
  font-size: 0.7rem;
  background-color: var(--orange);
  margin-right: 0.1rem;
  padding: 0.5rem;
  color: white;
  font-weight: 900;
}
</style>
