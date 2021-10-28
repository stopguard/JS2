<template>
  <ul class="goods-list">
    <template v-if="list.length && errors.noErr">
      <GoodCard
        v-for="item of list"
        v-bind:title="item.product_name"
        v-bind:price="item.price"
        v-bind:item_id="item.id_product"
        v-bind:key="item.id_product"
      ></GoodCard>
    </template>
    <template v-else>
      <p>Нет данных</p>
    </template>
  </ul>
</template>

<script>
import GoodCard from "./GoodCard.vue";

export default {
  components: {
    GoodCard,
  },
  computed: {
    list() {
      return this.$store.getters.getGoods;
    },
    errors() {
      return this.$store.getters.getErrors;
    },
  },
};
</script>
