'use strict';

Vue.component('good-card', {
  template: '<div class="good-item">' +
    '  <h3>{{ title }}</h3>' +
    '  <p>{{ price }} руб.</p>' +
    '  <a href="#"' +
    '    v-bind:id="`buy${item_id}`"' +
    '    @click="toCart"' +
    '    class="buy"' +
    '  >Добавить</a>' +
    '</div>',
  props: {
    title: String,
    price: Number,
    item_id: Number,
  },
  methods: {
    toCart(event) {
      event.preventDefault();
      fetch(API_URL + API_ADD_TO_BASKET, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json;charset=utf-8' },
          body: JSON.stringify({ id: +event.target.id.slice(3) })
        })
        .then((response) => {
          return response.json();
        })
        .then((request) => {
          if (request.result == 1) {
            event.target.classList.add('added');
          }
          this.$emit('update_cart');
        })
        .catch(() => {
          this.errorText = 'Добавление товара в корзину не удалось, обновите страницу';
          this.noErrors = false;
        });
    },
  }
});

Vue.component('goods-list', {
  template: '<div class="goods-list">' +
    '  <template v-if="list.length && no_errors">' +
    '    <good-card' +
    '      @update_cart="updateCart"' +
    '      v-for="item of list"' +
    '      v-bind:title="item.product_name"' +
    '      v-bind:price="item.price"' +
    '      v-bind:item_id="item.id_product"' +
    '      v-bind:key="item.id_product"' +
    '    ></good-card>' +
    '  </template>' +
    '  <template v-else>' +
    '    <p>Нет данных</p>' +
    '  </template>' +
    '</div>',
  props: {
    list: Array,
    no_errors: Boolean,
  },
  methods: {
    updateCart() {
      this.$emit('update_cart');
    },
  },
});
