<template>
  <div class="good-item">
    <h3>{{ title }}</h3>
    <p>{{ price }} руб.</p>
    <p>{{ quantity }} ед.</p>
    <a href="#" v-bind:id="`del${item_id}`" @click="fromCart" class="delete"
      >Удалить</a
    >
  </div>
</template>

<script>
export default {
  props: {
    title: String,
    price: Number,
    item_id: String,
    quantity: Number,
  },
  methods: {
    fromCart(event) {
      event.preventDefault();
      this.$store.dispatch("fromCart", event.target.id);
      event.target.classList.add("deleted");
    },
  },
};
</script>
