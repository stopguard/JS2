<template>
  <div class="cart">
    <template v-if="cart.contents.length && errors.noErr">
      <ul class="goods-list">
        <cart-item
          v-for="item of cart.contents"
          v-bind:title="item.product_name"
          v-bind:price="item.price"
          v-bind:quantity="item.quantity"
          v-bind:item_id="item.id_product"
          v-bind:key="item.id_product"
        ></cart-item>
      </ul>
      <div class="cart-cost">
        <p>
          Товаров в корзине - {{ cart.countGoods }} ед. на сумму
          {{ cart.amount }} руб.
        </p>
      </div>
    </template>
    <template v-else>
      <p>Здесь пока ничего нет</p>
    </template>
  </div>
</template>

<script>
import CartItem from "./CartItem.vue";

export default {
  components: {
    CartItem,
  },
  computed: {
    cart() {
      return this.$store.getters.getCart;
    },
    errors() {
      return this.$store.getters.getErrors;
    },
  },
};
</script>
