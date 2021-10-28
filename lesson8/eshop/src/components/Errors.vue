<template>
  <div class="error-wrapper" v-if="!errors.noErr">
    <div class="error-msg">
      <h4>Ошибка!</h4>
      <p>{{ errors.text }}</p>
      <button @click="clear">Закрыть</button>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    errors() {
      return this.$store.getters.getErrors;
    }
  },
  methods: {
    clear() {
      this.$store.dispatch("setErrors", true, "");
    },
  },
};
</script>
