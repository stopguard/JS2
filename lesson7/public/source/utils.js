'use strict';

Vue.component('search', {
  template: '<div class="search">' +
    '  <input v-model="searchLine">' +
    '  <button @click="filterGoods">Искать</button>' +
    '  <button @click="refresh">Обновить товары</button>' +
    '</div>',
  data() {
    return {
      searchLine: '',
    }
  },
  methods: {
    filterGoods() {
      this.$emit('search', this.searchLine);
    },
    refresh() {
      this.$emit('refresh');
    },
  },
})

Vue.component('errors', {
  template: '<div class="error-wrapper" v-if="!no_errors">' +
    '  <div class="error-msg">' +
    '    <h4>Ошибка!</h4>' +
    '    <p>{{ error_text }}</p>' +
    '    <button @click="clear">Закрыть</button>' +
    '  </div>' +
    '</div>',
  props: {
    no_errors: Boolean,
    error_text: String,
  },
  methods: {
    clear() {
      this.$emit('clear');
    },
  },
})
