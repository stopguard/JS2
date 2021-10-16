'use strict';

/**
 * 1. Добавить методы и обработчики событий для поля поиска. 
 *    Создать в объекте данных поле searchLine и 
 *      привязать к нему содержимое поля ввода. 
 *    На кнопку Искать 
 *      добавить обработчик клика, вызывающий метод FilterGoods.
 * 2. Добавить корзину. 
 *    В html-шаблон добавить разметку корзины. 
 *    Добавить в объект данных поле isVisibleCart, управляющее видимостью корзины.
 * 3. * Добавлять в .goods-list заглушку с текстом «Нет данных» в случае, если список товаров пуст.
 */

const API_URL = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';
const API_CATALOG = '/catalogData.json';
const API_BASKET = '/getBasket.json';
const API_ADD_TO_BASKET = '/addToBasket.json';
const API_REMOVE_FROM_BASKET = '/deleteFromBasket.json';

new Vue({
  el: '#app',
  data: {
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
        });
    },

    filterGoods() {
      let re = new RegExp(this.searchLine, 'i');
      this.filteredGoods = this.goods.filter(item => item.product_name.match(re));
    },

    addToCart(event) {
      event.preventDefault();
      fetch(API_URL + API_ADD_TO_BASKET/*, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json;charset=utf-8' },
        body: JSON.stringify({ id: +event.target.id.slice(3) })
      }*/)
        .then((response) => {
          return response.json();
        })
        .then((request) => {
          if (request.result == 1) {
            event.target.classList.add('added');
          }
          this.fetchCart();
        });
    },

    fetchCart() {
      fetch(API_URL + API_BASKET)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          this.cart = data;
        });
    },

    toggleCart() {
      this.isVisibleCart = !this.isVisibleCart;
    },

    delFromCart(event) {
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
        });
    },
  },
  mounted() {
    this.fetchGoods();
    this.fetchCart();
  },
});
