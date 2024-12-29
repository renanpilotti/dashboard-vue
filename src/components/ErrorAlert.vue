<template lang="pug">
  .alert.alert-danger.mx-5.mt-4
    span.fa-solid.fa-circle-info.me-2
    span Ocorreu um erro ao processar a requisição. {{errorMessage}}
</template>

<script setup>
import { defineProps } from "vue";

const props = defineProps(["errorMessage"]);
</script>
