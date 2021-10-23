<template>
  <div class="search">
    <input v-model="searchLine" />
    <button @click="filterGoods">Искать</button>
    <button @click="refresh">Обновить товары</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchLine: "",
    };
  },
  methods: {
    filterGoods() {
      this.$store.dispatch("filterGoods", this.searchLine);
    },

    refresh() {
      this.$store.dispatch("fetchGoods");
    },
  },
};
</script>
