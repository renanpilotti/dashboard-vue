<template lang="pug">
  h2.mb-5.fs-6 {{title}}
  canvas.w-100(:id="`chart${randomId}`")
  .filter-chart-container
    select.form-control(v-model="selectedRegion")
      option(value="") Todas regiões
      option(v-for="region in regions" :key="region.regionId" :value="region.regionId") {{ region.regionName }}

    select.form-control(v-model="selectedCategory")
      option(value="") Todas categorias
      option(v-for="category in categories" :key="category.categoryId" :value="category.categoryId") {{ category.categoryName }}
  .empty-box(v-if="filteredProducts.length === 0")
    span.fa-solid.fa-magnifying-glass
    p Nenhum dado a ser exibido.

</template>

<script lang="ts" setup>
import { defineProps, onMounted, ref, watchEffect, computed } from "vue";
import Chart, { ChartTypeRegistry } from "chart.js/auto";
import { useStore } from "vuex";

const store = useStore();

const props = defineProps(["itemList", "xName", "yName", "title", "chartType"]);
const randomId = ref(Math.floor(Math.random() * 100000));

const selectedCategory = ref<string>("");
const selectedRegion = ref<string>("");
const categories = computed(() => store.state.categories);
const regions = computed(() => store.state.regions);
const filteredProducts = computed(() =>
  filterProductsByKey(props.xName, props.itemList)
);

let chartInstance: Chart | null = null;

const drawChart = (
  list: any[],
  xName: string,
  yName: string,
  title: string,
  chartType: keyof ChartTypeRegistry
) => {
  if (chartInstance) {
    chartInstance.destroy();
  }

  const chartData = list.map((item: any) => ({
    xValue: item[xName],
    yValue: item[yName],
  }));
  const ctx = document.getElementById(
    `chart${randomId.value}`
  ) as HTMLCanvasElement;
  if (ctx && chartData.length > 0) {
    chartInstance = new Chart(ctx, {
      type: chartType,
      data: {
        labels: chartData.map((row: any) => row.xValue),
        datasets: [
          {
            label: title,
            data: chartData.map((row: any) => row.yValue),
            cubicInterpolationMode: "monotone",
            backgroundColor: "#99eba4",
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: false,
          },
          title: {
            display: false,
          },
        },
        scales: {
          x: {
            grid: {
              display: false,
            },
          },
          y: {
            grid: {
              display: false,
            },
          },
        },
      },
    });
  }
};

const mesesCalendario = [
  "janeiro",
  "fevereiro",
  "março",
  "abril",
  "maio",
  "junho",
  "julho",
  "agosto",
  "setembro",
  "outubro",
  "novembro",
  "dezembro",
];

const filterProductsByKey = (filterKey: string, filteredList: any) => {
  if (selectedCategory.value) {
    filteredList = filteredList.filter(
      (a: any) => a.categoryId === selectedCategory.value
    );
  }
  if (selectedRegion.value) {
    filteredList = filteredList.filter(
      (a: any) => a.regionId === selectedRegion.value
    );
  }
  filteredList = filteredList.sort(
    (a: any, b: any) =>
      mesesCalendario.indexOf(a.month) - mesesCalendario.indexOf(b.month)
  );

  const groupedData = filteredList.reduce((acc: any, item: any) => {
    const { salesTotal } = item;
    const key = item[filterKey]; // Acessando a chave dinâmica corretamente

    if (!acc[key]) {
      acc[key] = { [filterKey]: key, salesTotal: 0 };
    }

    acc[key].salesTotal += salesTotal;

    return acc;
  }, {});

  const resultado = Object.values(groupedData);
  return resultado;
};

onMounted(() => {
  drawChart(
    filteredProducts.value,
    props.xName,
    props.yName,
    props.title,
    props.chartType
  );
});

watchEffect(() => {
  drawChart(
    filteredProducts.value,
    props.xName,
    props.yName,
    props.title,
    props.chartType
  );
});
</script>

<style lang="scss" scoped>
canvas {
  max-height: max(20vh, 200px);
  margin: auto;
}

.filter-chart-container {
  position: absolute;
  right: 2%;
  top: 5%;
  display: flex;
  gap: 0.5rem;

  select {
    width: auto;
    font-size: 13px;

    &:focus {
      box-shadow: none;
      border-color: #e3e3e3;
    }
  }
}
.empty-box {
  width: 100%;
  text-align: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  i {
    margin-bottom: 0.5rem;
  }
}

@media (max-width: 768px) {
  .filter-chart-container {
    flex-direction: column;
    // position: static;
  }
}

@media (max-width: 500px) {
  .filter-chart-container {
    position: static;
    width: fit-content;
    margin-left: auto;
  }
}
</style>
