<script>
export default {
  data() {
    return {
      url: "",
      price: [],
      fromairline: [],
      toairline: [],
      fromtime: [],
      totime: [],
      fromcode: "",
      tocode: "",
      doneloading: false,
    };
  },
  methods: {
    getroute() {
      //get current route
      var url = window.location.href;
      var url = url.split("/search/")[1];

      var from = url.split("/")[0];
      var to = url.split("/")[1];

      this.fromcode = from;
      this.tocode = to;

      this.url = url;
      this.fetchdata();
    },
    fetchdata() {
      const options = {
        method: "POST",
        headers: {},
      };
      var fetchurl = "http://localhost:5000/" + this.url;
      console.log(fetchurl);
      fetch(fetchurl, options)
        .then((response) => response.json())
        .then((response) => {
          console.log(response);
          const { cheapoairprice } = response;
          const { cheapoairfromairline } = response;
          const { cheapoairtoairline } = response;
          const { cheapoairfromtime } = response;
          const { cheapoairtotime } = response;

          this.price = cheapoairprice;
          this.fromairline = cheapoairfromairline;
          this.toairline = cheapoairtoairline;
          this.fromtime = cheapoairfromtime;
          this.totime = cheapoairtotime;
          this.doneloading = true;
        })
        .catch((err) => {
          console.error(err);
          this.doneloading = false;
          this.getroute();
        });
    },
  },
  mounted() {
    this.getroute();
  },

  //detect change in route
  watch: {
    $route: function () {
      //log the route url
      var route = this.$route.path;

      if (route.includes("search")) {
        this.doneloading = false;
        this.getroute();
      } else {
        this.$router.push({
          path: `/`,
        });
      }
    },
  },
};
</script>
<template>
  <section class="results" v-if="doneloading">
    <!--v-for over array-->
    <div v-for="(item, index) in price" class="result">
      <div class="result_start">
        <div class="result_start_flex">
          <a>{{ fromairline[index] }}</a>
          <a
            >{{ fromcode }} <i class="fa-solid fa-minus"></i>
            {{ fromtime[index] }} <i class="fa-solid fa-minus"></i>
            {{ tocode }}</a
          >
        </div>
        <div class="result_start_flex">
          <a>{{ toairline[index] }}</a>
          <a
            >{{ tocode }} <i class="fa-solid fa-minus"></i> {{ totime[index] }}
            <i class="fa-solid fa-minus"></i> {{ fromcode }}</a
          >
        </div>
      </div>
      <div class="result_end">
        <a>{{ price[index] }}</a>
        <button>Book <i class="fa-solid fa-chevron-right"></i></button>
      </div>
    </div>
  </section>
  <section class="loading" v-if="!doneloading">
    <div class="loading_plane"><i class="fa-solid fa-plane"></i></div>
    <h1>Loading . . .</h1>
  </section>
</template>

<style scoped>
.loading {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 65vh;
  position: relative;
  font-size: 1.5rem;
}

.loading i {
  font-size: 3.5rem;
}

.loading_plane {
  position: absolute;
  animation: infinite;
  animation-name: run;
  animation-duration: 5s;
}

@keyframes run {
  0% {
    left: 0;
  }
  50% {
    left: 100%;
  }
  100% {
    left: 0;
  }
}

.result {
  display: flex;
  flex-direction: row;
  margin-top: 1.5rem;
  background-color: var(--grey);
  font-weight: 700;
  padding: 2rem;
  border-radius: 5px;
}

.result_start {
  width: 75%;
  display: flex;
  flex-direction: column;
  padding-left: 2rem;
  padding-right: 2rem;
  line-height: 3;
  font-size: 1.1rem;
}

.result_end {
  width: 25%;
  display: flex;
  flex-direction: column;
  padding-left: 2rem;
  padding-right: 2rem;
  justify-content: center;
  text-align: center;
  line-height: 2;
  gap: 1rem;
  font-size: 1.3rem;
}

.result_end button {
  padding: 0.3rem 0.5rem;
  background-color: var(--orange);
  font-size: 1.3rem;
  border: none;
  color: white;
  border-radius: 5px;
}

.result_start_flex {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  gap: 1rem;
}

@media screen and (max-width: 900px) {
  .result {
    padding: 1.5rem;
    flex-direction: column-reverse;
    gap: 1rem;
  }
  .result_start {
    width: 100%;
    display: flex;
    flex-direction: column;
    padding-left: 2rem;
    padding-right: 2rem;
    line-height: 3;
    font-size: 1.1rem;
  }

  .result_end {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
  .result_start_flex {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    gap: 1rem;
  }
}

@media screen and (max-width: 700px) {
  .result_start {
    padding-left: 1rem;
    padding-right: 1rem;
  }

  .result {
    padding: 1rem;
  }

  .result_end {
    padding-left: 1rem;
    padding-right: 1rem;
  }
}

@media screen and (max-width: 650px) {
  .result_start_flex {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    gap: 0rem;
  }
  .result_start {
    line-height: 2;
  }

  .result_end {
    line-height: 1;
  }
}

@media screen and (max-width: 360px) {
  .result {
    padding: 0.5rem;
  }
  .result_start {
    font-size: 1.2rem;
  }

  .result_end {
    font-size: 1.2rem;
  }

  .result_end button {
    font-size: 1.2rem;
  }
}

@media screen and (max-width: 310px) {
  .result_start {
    font-size: 1.1rem;
  }

  .result_end {
    font-size: 1.1rem;
  }

  .result_end button {
    font-size: 1.1rem;
  }
}
</style>
