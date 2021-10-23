<template>
  <div>
    <header>
      <button @click="toggle">К каталогу</button>
    </header>
    <main>
      <Errors></Errors>
      <Cart></Cart>
    </main>
  </div>
</template>

<script>
import Errors from "../components/Errors.vue";
import Cart from "../components/Cart.vue";

export default {
  components: {
    Errors,
    Cart,
  },

  methods: {
    toggle() {
      this.$router.push('/');
    },
  },

  mounted() {
    this.$store.dispatch("fetchCart");
  },
};
</script>
