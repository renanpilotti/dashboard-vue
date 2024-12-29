<template lang="pug">
  header.container
    .px-5
      h1.main-title Dashboard - Análise de Vendas
      nav
        router-link(to="/") Principal
        router-link(to="/Heatmap") Hotmap     
  main
    .container
      router-view(v-if="!error.status")
      ErrorAlert(v-else :errorMessage="error.message")

  footer
    div.text-center.py-2.mt-3.bg-light Dashboard 2024
</template>
<script setup>
import { computed } from "vue";
import { useStore } from "vuex";
import ErrorAlert from "./components/ErrorAlert.vue";

const store = useStore();
const error = computed(() => store.state.error);
</script>

<style lang="scss">
:root {
  --bs-body-font-size: 14px !important;
  --primary: #99eba4;
}
body {
  font-family: "Poppins", sans-serif !important;
  overflow-x: hidden;

  &:after {
    content: "";
    width: 100vw;
    height: 50vh;
    background-color: #99eba4;
    position: absolute;
    top: 0;
    border-radius: 0 0 40% 0%;
    z-index: -1;
  }
}
.fa-solid {
  color: #4b4a4a;
}

main {
  min-height: calc(100vh - 250px);
}
.main-title {
  color: #fff;
  text-align: center;
  margin: 4rem 0 3rem;
  font-size: 2rem;
}

nav {
  background-color: #fff;
  width: fit-content;
  border-radius: 10px;
  display: flex;
  overflow: hidden;

  a {
    text-decoration: none;
    color: inherit;
    padding: 0.75rem 1rem;
    transition: 0.3s ease;
    min-width: 90px;
    text-align: center;
    position: relative;

    &.router-link-active:after {
      content: "";
      width: 100%;
      height: 3px;
      position: absolute;
      bottom: 0;
      left: 0;
      background-color: #454745;
    }
  }
}
</style>
