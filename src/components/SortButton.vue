<template lang="pug">
  button.sort-button(@click="toggleSort") {{ props.column }} 
    span(v-if="props.showBtn") {{ sortDirection === "asc" ? "&#8593;" : "&#8595;" }}
</template>

<script lang="ts" setup>
import { defineProps, defineEmits } from "vue";

const props = defineProps(["column", "sortDirection", "showBtn"]);

const emit = defineEmits(["sortChanged"]);

const toggleSort = () => {
  emit("sortChanged", { column: props.column });
};
</script>

<style lang="scss" scoped>
.sort-button {
  background-color: transparent;
  border: 0;

  span {
    margin-left: 0.25rem;
  }
}
</style>
