<template lang="pug">
  header.container(v-if="!isLoading")
    .px-5
      h1.main-title Dashboard - Análise de Vendas
      nav
        router-link(to="/") Principal
        router-link(to="/Heatmap") Hotmap     
  main
    .container
      AppLoader(v-if="isLoading")
      ErrorAlert(v-else-if="error.status" :errorMessage="error.message")
      router-view(v-else)
  footer.mt-auto
    div.text-center.py-2.mt-3.bg-light Dashboard 2024
</template>

<script setup>
import { computed, onMounted } from "vue";
import { useStore } from "vuex";
import ErrorAlert from "./components/ErrorAlert.vue";
import AppLoader from "./components/AppLoader.vue";

const store = useStore();
const isLoading = computed(() => store.state.isLoading);
const error = computed(() => store.state.error);

onMounted(async () => {
  await Promise.all([
    store.dispatch("fetchProducts"),
    store.dispatch("fetchCategories"),
    store.dispatch("fetchRegions"),
  ]);
});
</script>
