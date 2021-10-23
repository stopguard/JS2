<template>
  <div>
    <header>
      <button @click="toggle">К корзине</button>
      <Search></Search>
    </header>
    <main>
      <Errors></Errors>
      <GoodList></GoodList>
    </main>
  </div>
</template>

<script>
import Search from "../components/Search.vue";
import GoodList from "../components/GoodsList.vue";
import Errors from "../components/Errors.vue";

export default {
  components: {
    GoodList,
    Search,
    Errors,
  },

  methods: {
    toggle() {
      this.$router.push('/cart');
    },
  },

  mounted() {
    this.$store.dispatch("fetchGoods");
  },
};
</script>
