<template>
  <footer>
    <a>Airtickets scraped from Cheapoair.ca</a>
    <a>Made By Mukul</a>
  </footer>
</template>

<style scoped>
footer {
  font-size: 1.3rem;
  font-weight: 700;
  gap: 0.8rem;
  margin-top: 1.5rem;
  display: flex;
  flex-direction: column;
  text-align: center;
  background-color: var(--grey2);
  color: white;
  padding-top: calc(var(--padding) / 2);
  padding-bottom: calc(var(--padding) / 2);
}

@media screen and (max-width: 500px) {
  footer {
    font-size: 1rem;
  }
}
</style>
