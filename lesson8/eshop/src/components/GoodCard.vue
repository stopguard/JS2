<template>
  <li class="good-item">
    <h3>{{ title }}</h3>
    <p>{{ price }} руб.</p>
    <a href="#" v-bind:id="`buy${item_id}`" @click="toCart" class="buy"
      >Добавить</a
    >
  </li>
</template>

<script>
export default {
  props: {
    title: String,
    price: Number,
    item_id: String,
  },
  methods: {
    toCart(event) {
      event.preventDefault();
      this.$store.dispatch("toCart", event.target.id);
      event.target.classList.add("added");
    },
  },
};
</script>
