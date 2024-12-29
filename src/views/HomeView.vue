<template lang="pug">
  .px-5.py-4
    .row.h-100
      .col-md-6.col-xxl-3(v-for="card in cardDashData")
        CardDash(:cardTitle="card.title" :cardValue="card.value" :iconName="card.icon")
      .col-md-12.mb-4
        .card.rounded-4.p-4
          ChartDash(v-if="!isLoading" :itemList="products" :xName="'month'" :yName="'salesTotal'" 
          :title="'Venda total por mês (R$)'" :chartType="'line'")
          AppLoader(v-else)    
      .col-md-12.col-xl-6.mb-3.mb-xl-0
        .card.rounded-4.p-4.h-100
          ChartDash(v-if="!isLoading" :itemList="products" :xName="'productName'" :yName="'salesTotal'" 
          :title="'Venda total por produto (R$)'" :chartType="'bar'")
          AppLoader(v-else)     
      .col-md-12.col-xl-6.h-100
        TableDash(v-if="!isLoading" :topProducts="topProducts" :tableConfig="productsTable")
        AppLoader(v-else)   
</template>

<script lang="ts" setup>
import { computed, onMounted, ref } from "vue";
import { useStore } from "vuex";
import ChartDash from "../components/ChartDash.vue";
import AppLoader from "../../src/components/AppLoader.vue";
import TableDash from "../components/TableDash.vue";
import CardDash from "../components/CardDash.vue";
import { Product, TableConfig } from "@/store/types";

const store = useStore();

const isLoading = computed(() => store.state.isLoading);
const products = computed(() => store.state.products);
const productsTable = computed(() => {
  return {
    cardTitle: "Produtos mais vendidos",
    tableHead: [
      { name: "Nome", numeric: false },
      { name: "Categoria", numeric: false },
      { name: "Número de Vendas", numeric: true },
    ],
    tableBody: products.value.map((p: any) => [
      p.productName,
      p.category,
      p.soldQuantity,
    ]),
    sortColumn: 2,
    order: "desc",
    numeric: true,
  };
});
const cardDashData = computed(() => {
  const sumAll = products.value.reduce((a: any, b: any) => b.salesTotal + a, 0);
  return [
    {
      title: "Venda total anual",
      value: sumAll.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
      }),
      icon: "fa-hand-holding-dollar",
    },
    {
      title: "Variedade de Produtos",
      value: products.value.length,
      icon: "fa-boxes-stacked",
    },
    {
      title: "Categorias",
      value: 5,
      icon: "fa-list",
    },
    {
      title: "Projeção 2025",
      value: "12%",
      icon: "fa-chart-line",
    },
  ];
});

onMounted(async () => {
  await store.dispatch("fetchProducts");
  await store.dispatch("fetchCategories");
  await store.dispatch("fetchRegions");
});
</script>
