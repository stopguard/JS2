'use strict';

Vue.component('cart-item', {
  template: '<div class="good-item">' +
    '  <h3>{{ title }}</h3>' +
    '  <p>{{ price }} руб.</p>' +
    '  <p>{{ quantity }} ед.</p>' +
    '  <a href="#"' +
    '    v-bind:id="`del${item_id}`"' +
    '    @click="fromCart"' +
    '    class="delete"' +
    '  >Удалить</a>' +
    '</div>',
  props: {
    title: String,
    price: Number,
    item_id: Number,
    quantity: Number,
  },
  methods: {
    fromCart(event) {
      event.preventDefault();
      fetch(API_URL + API_REMOVE_FROM_BASKET/*, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json;charset=utf-8' },
          body: JSON.stringify({ id: +event.target.id.slice(3) })
        }*/)
        .then((response) => {
          return response.json();
        })
        .then((request) => {
          if (request.result == 1) {
            event.target.classList.add('deleted');
          }
          this.$emit('update_cart');
        })
        .catch(() => {
          this.errorText = 'Удаление товара из корзины не удалось, обновите страницу';
          this.noErrors = false;
        });
    },
  },
});

Vue.component('cart', {
  template: '<div class="cart">' +
    '  <button @click="toggle">Корзина</button>' +
    '  <div class="cart" v-if="visible">' +
    '    <template v-if="list.length && no_errors">' +
    '      <div class="goods-list">' +
    '        <cart-item' +
    '          @update_cart="updateCart"' +
    '          v-for="item of list"' +
    '          v-bind:title="item.product_name"' +
    '          v-bind:price="item.price"' +
    '          v-bind:quantity="item.quantity"' +
    '          v-bind:item_id="item.id_product"' +
    '          v-bind:key="item.id_product"' +
    '        ></cart-item>' +
    '      </div>' +
    '      <div class="cart-cost">' +
    '        <p>Товаров в корзине - {{ count_goods }} ед. на сумму {{ amount }} руб.</p>' +
    '      </div>' +
    '    </template>' +
    '    <template v-else>' +
    '      <p>Здесь пока ничего нет</p>' +
    '    </template>' +
    '  </div>' +
    '</div>',
  props: {
    list: Array,
    count_goods: Number,
    amount: Number,
    visible: Boolean,
    no_errors: Boolean,
  },
  methods: {
    updateCart() {
      this.$emit('update_cart');
    },
    toggle() {
      this.$emit('toggle');
    },
  },
});
