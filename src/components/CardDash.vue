<template lang="pug">
  .card
    .flex-fill.d-flex.flex-column.justify-content-between.h-100
      h2 {{props.cardTitle}}
      p {{props.cardValue}}
    div
      span.fa-solid.fs-4(:class="props.iconName")
</template>

<script setup lang="ts">
import { defineProps } from "vue";
const props = defineProps(["cardTitle", "cardValue", "iconName"]);
</script>

<style lang="scss" scoped>
.card {
  padding: 1.25rem;
  flex-direction: row;
  align-items: end;
  margin-bottom: 1.25rem;
  border-radius: 20px;
  min-height: 130px;
  height: 130px;
}

h2 {
  font-size: 16px;
  margin-bottom: 1.5rem;
  font-weight: 400;
}

p {
  font-size: 20px;
  margin-bottom: 0;
  font-weight: 500;
  line-height: 1;
}
</style>
