<script setup>
import airport_codes from "../assets/airports.json";
import Fuse from "fuse.js";
import { RouterLink, RouterView } from "vue-router";
</script>
<script>
export default {
  data() {
    return {
      fromcode: "",
      fromcodesuggestion: [],
      tocode: "",
      tocodesuggestion: [],
      fromdate: "",
      todate: "",
    };
  },
  methods: {
    fromcodesearch() {
      document.querySelectorAll(".to_suggestion")[0].style.display = "none";
      document.querySelectorAll(".from_suggestion")[0].style.display = "block";
      var search = this.fromcode;
      const fuse = new Fuse(airport_codes, {
        keys: ["name", "city", "country", "iata_code"],
        includeScore: true,
      });
      var results = fuse.search(search, { limit: 5 });
      if (results.length == 0) {
        document.querySelectorAll(".from_suggestion")[0].style.display = "none";
      } else {
        document.querySelectorAll(".from_suggestion")[0].style.display =
          "block";
      }
      this.fromcodesuggestion = results.map((result) => result.item);
    },
    tocodesearch() {
      document.querySelectorAll(".from_suggestion")[0].style.display = "none";
      document.querySelectorAll(".to_suggestion")[0].style.display = "block";
      var search = this.tocode;
      const fuse = new Fuse(airport_codes, {
        keys: ["name", "city", "country", "iata_code"],
        includeScore: true,
      });
      var results = fuse.search(search, { limit: 5 });
      if (results.length == 0) {
        document.querySelectorAll(".to_suggestion")[0].style.display = "none";
      } else {
        document.querySelectorAll(".to_suggestion")[0].style.display = "block";
      }
      this.tocodesuggestion = results.map((result) => result.item);
    },
    fromcodeset(e) {
      var selected = e.target.innerText;
      this.fromcode = selected;
      document.querySelectorAll(".from_suggestion")[0].style.display = "none";
    },
    tocodeset(e) {
      var selected = e.target.innerText;
      this.tocode = selected;
      document.querySelectorAll(".to_suggestion")[0].style.display = "none";
    },
    flip() {
      var from = this.fromcode;
      var to = this.tocode;

      this.fromcode = to;
      this.tocode = from;
    },
    search() {
      if (
        this.fromcode == "" ||
        this.tocode == "" ||
        this.fromdate == "" ||
        this.todate == ""
      ) {
        alert("Enter all the fields");
        return;
      }

      var fromthree = this.fromcode.substr(this.fromcode.length - 3);
      var tothree = this.tocode.substr(this.tocode.length - 3);
      //format date to month day year
      var fromdate = this.fromdate.split("-");
      var todate = this.todate.split("-");
      var fromdate = fromdate[1] + "" + fromdate[2] + "" + fromdate[0];
      var todate = todate[1] + "" + todate[2] + "" + todate[0];

      this.$router.push({
        path: `/search/${fromthree}/${tothree}/${fromdate}/${todate}`,
      });
    },
  },
  mounted() {},
};
</script>

<template>
  <section class="search_container">
    <div class="dropdown">
      <input
        @keypress="fromcodesearch()"
        @keyup="fromcodesearch()"
        @change="fromcodesearch()"
        type="text"
        v-model="fromcode"
        :modelValue="fromcode"
        placeholder="From?"
      />
      <div class="from_suggestion">
        <ul>
          <li v-for="item in fromcodesuggestion">
            <a @click="fromcodeset($event)">
              {{ item.name }}
              {{ item.city }}
              {{ item.country }}
              {{ item.iata_code }}
            </a>
          </li>
        </ul>
      </div>
    </div>
    <button @click="flip"><i class="fa-solid fa-right-left"></i></button>
    <div class="dropdown">
      <input
        @keypress="tocodesearch()"
        @keyup="tocodesearch()"
        @change="tocodesearch()"
        type="text"
        v-model="tocode"
        :modelValue="tocode"
        placeholder="To?"
      />
      <div class="to_suggestion">
        <ul>
          <li v-for="item in tocodesuggestion">
            <a @click="tocodeset($event)">
              {{ item.name }}
              {{ item.city }}
              {{ item.country }}
              {{ item.iata_code }}
            </a>
          </li>
        </ul>
      </div>
    </div>
    <input type="date" v-model="fromdate" placeholder="Search..." />
    <input type="date" v-model="todate" placeholder="Search..." />
    <button @click="search">
      <i class="fa-solid fa-magnifying-glass"></i>
    </button>
  </section>
</template>

<style scoped>
.dropdown {
  position: relative;
  display: inline-block;
}

.from_suggestion,
.to_suggestion {
  display: none;
  position: absolute;
  background-color: #f9f9f9;
  min-width: 25vw;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  padding: 12px 16px;
  z-index: 1;
}

.dropdown:hover .from_suggestion .to_suggestion {
  display: block;
}

ul {
  list-style-type: none; /* Remove bullets */
  padding: 0; /* Remove padding */
  margin: 0; /* Remove margins */
}

li {
  margin-top: 1rem;
  margin-bottom: 1rem;
}

li a {
  text-decoration: none;
  color: #212a30;
  cursor: pointer;
}

.search_container {
  display: flex;
  flex-direction: row;
  gap: 0.2rem;
}

.search_container input {
  height: 100%;
  padding: 0.5rem 0.7rem;
  font-size: 1rem;
  border: none;
  background-color: var(--grey);
  border-radius: 5px;
}

.search_container input[type="text"],
.search_container input[type="date"] {
  padding: 0.9rem;
}

.search_container button:nth-child(6),
.search_container button:nth-child(2) {
  padding: 0.5rem 1rem;
  background-color: var(--orange);
  font-size: 1rem;
  border: none;
  color: white;
  border-radius: 5px;
}

.search_container button:nth-child(2) {
  background-color: var(--grey);
  color: #212a30;
}

@media screen and (max-width: 755px) {
  .search_container {
    display: flex;
    flex-direction: column;
    gap: 0.2rem;
  }
  .search_container input[type="text"],
  .search_container input[type="date"] {
    width: 100%;
  }
}
</style>
