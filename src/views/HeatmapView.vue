<template lang="pug">
  .px-5.py-4
    .row.h-100
      .col-xl-6.mb-4
        TableDash(v-if="!isLoading" :topProducts="regions" :tableConfig="heatmapTable")
        AppLoader(v-else)
      .col-xl-6.mb-4
        #map
</template>

<script setup>
import { onMounted, computed } from "vue";
import { useStore } from "vuex";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet.heat";
import TableDash from "../components/TableDash.vue";
import { TableConfig } from "@/store/types";

const store = useStore();
const regions = computed(() => store.state.regions);
const isLoading = computed(() => store.state.isLoading);
const heatmapTable = computed(() => {
  return {
    cardTitle: "Vendas por região",
    tableHead: [
      { name: "Região", numeric: false },
      { name: "Valor Total", numeric: true },
    ],
    tableBody: regions.value.map((a) => [
      a.regionName,
      a.salesTotal.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
      }),
    ]),
  };
});

const drawHeatmap = (heatmapId) => {
  const map = L.map(heatmapId).setView([-14.235, -51.9253], 4);

  L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution:
      '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  }).addTo(map);

  const maxSales = Math.max(
    ...regions.value.map((region) => region.salesTotal)
  );

  const heatData = regions.value.map((region) => [
    region.coordinates[0],
    region.coordinates[1],
    region.salesTotal / maxSales,
  ]);

  L.heatLayer(heatData, {
    radius: 80,
    blur: 65,
    maxZoom: 4,
  }).addTo(map);
};

onMounted(async () => {
  await store.dispatch("fetchRegions");
  drawHeatmap("map");
});
</script>

<style scoped>
#map {
  height: 500px;
  width: 100%;
  border-radius: 20px;
}
</style>
