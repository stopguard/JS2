import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const API_URL = "http://localhost:8080";
const API_CATALOG = "/catalog";
const API_BASKET = "/cart";
const API_ADD_TO_BASKET = "/add";
const API_REMOVE_FROM_BASKET = "/del";

export default new Vuex.Store({
  state: {
    goods: [],
    filteredGoods: [],
    cart: {
      countGoods: 0,
      amount: 0,
      contents: [],
    },
    noErrors: true,
    errorText: ''
  },

  getters: {
    getGoods: state => state.filteredGoods,
    getCart: state => state.cart,
    getErrors: state => {
      return {
        noErr: state.noErrors,
        text: state.errorText,
      };
    },
  },

  mutations: {
    setGoods: (state, goods) => {
      state.goods = goods;
      state.filteredGoods = goods;
    },
    setFiltered: (state, filteredGoods) => {
      state.filteredGoods = filteredGoods
    },
    setErrors: (state, ifError, txt) => {
      state.noErrors = ifError;
      state.errorText = txt;
    },
    setCart: (state, cart) => state.cart = cart,
  },

  actions: {
    fetchGoods({ commit }) {
      fetch(API_URL + API_CATALOG)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          commit('setGoods', data);
        })
        .catch(() => {
          commit('setErrors', true, "Загрузка списка товаров не удалась");
        })
    },

    filterGoods({ commit, state }, filter) {
      let re = new RegExp(filter, "i");
      commit('setFiltered', state.goods.filter((item) => item.product_name.match(re)));
    },

    toCart({ commit }, item_id) {
      fetch(API_URL + API_ADD_TO_BASKET, {
        method: "POST",
        headers: { "Content-Type": "application/json;charset=utf-8" },
        body: JSON.stringify({ id: +item_id.slice(3) }),
      })
        .then((response) => {
          return response.json();
        })
        .then((request) => {
          if (!request.result) {
            commit('setErrors', true, "Добавление товара в корзину не удалось, обновите страницу");
          }
        })
        .catch(() => {
          commit('setErrors', true, "Добавление товара в корзину не удалось, обновите страницу");
        });
    },

    fetchCart({ commit }) {
      fetch(API_URL + API_BASKET)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          commit('setCart', data);
        })
        .catch(() => {
          commit('setErrors', true, "Загрузка корзины не удалась");
        });
    },

    fromCart({ dispatch, commit }, item_id) {
      fetch(API_URL + API_REMOVE_FROM_BASKET, {
        method: "DELETE",
        headers: { "Content-Type": "application/json;charset=utf-8" },
        body: JSON.stringify({ id: +item_id.slice(3) }),
      })
        .then((response) => {
          return response.json();
        })
        .then((request) => {
          if (request.result) {
            dispatch("fetchCart");
          } else {
            commit('setErrors', true, "Удаление товара из корзины не удалось, обновите страницу");
          }
        })
        .catch(() => {
          commit('setErrors', true, "Удаление товара из корзины не удалось, обновите страницу");
        });
    },

  }
})
