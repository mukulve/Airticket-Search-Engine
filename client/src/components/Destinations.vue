<template>
  <div class="travel_more">
    <img src="../assets/beach.jpg" />
    <div class="centered">Explore The World With Cheaptrips.</div>
  </div>
</template>

<style scoped>
.travel_more {
  position: relative;
  text-align: center;
  color: white;
  font-size: 2.5rem;
  font-weight: 700;
  margin-top: 1.5rem;
  margin-bottom: 1.5rem;
}

.travel_more img {
  filter: brightness(0.7);
  width: 100%;
  border-radius: 10px;
  object-fit: cover;
  max-height: 45vh;
  min-height: 25vh;
}
.centered {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
@media screen and (max-width: 755px) {
  .travel_more {
    font-size: 2rem;
  }
}

@media screen and (max-width: 500px) {
  .travel_more {
    font-size: 1.5rem;
  }
}
</style>
