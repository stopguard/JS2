'use strict';

/**
 * 1. Вынести поиск в отдельный компонент.
 * 2. Вынести корзину в отдельный компонент.
 * 3. * Создать компонент с сообщением об ошибке. 
 *    Компонент должен отображаться, когда не удаётся выполнить запрос к серверу.
 */

new Vue({
  el: '#app',
  data: {
    noErrors: true,
    errorText: '',
    searchLine: '',
    isVisibleCart: false,
    goods: [],
    filteredGoods: [],
    cart: {
      countGoods: 0,
      amount: 0,
      contents: [],
    },
  },

  methods: {

    fetchGoods() {
      fetch(API_URL + API_CATALOG)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          this.goods = data;
          this.filteredGoods = data;
          this.searchLine = '';
        })
        .catch(() => {
          this.errorText = 'Загрузка списка товаров не удалась';
          this.noErrors = false;
        });
    },

    fetchCart() {
      fetch(API_URL + API_BASKET)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          this.cart = data;
        })
        .catch(() => {
          this.errorText = 'Загрузка корзины не удалась';
          this.noErrors = false;
        });
    },

    filterGoods(filter) {
      let re = new RegExp(filter, 'i');
      this.filteredGoods = this.goods.filter(item => item.product_name.match(re));
    },

    toggleCart() {
      this.isVisibleCart = !this.isVisibleCart;
    },

    clearErrors() {
      this.errorText = '';
      this.noErrors = true;
    }
  },

  mounted() {
    this.fetchGoods();
    this.fetchCart();
  },
});
