<template lang="pug">
  .card.p-4.rounded-4.h-100
    h2.mb-4.fs-6 {{ props.tableConfig.cardTitle }}
    .table-responsive
      table.table.align-middle.text-nowrap.mb-0.text-center
        thead
          tr
            th(v-for="(rowTitle, index) in props.tableConfig.tableHead" :key="index")
              SortButton(:column="rowTitle.name" @sortChanged="sortTable(index, rowTitle.numeric)" :sortDirection="sortDirection" :showBtn="sortColumn === index")
        tbody
          tr(v-if="currentPageData.length === 0")
              td(:colspan="props.tableConfig.tableHead.length") Sem registros encontrados
          tr(v-else v-for="(rowBody, index) in currentPageData" :key="index")
              td(v-for="(td, tdIndex) in rowBody" :key="tdIndex") {{ td }}
    TablePagination(
    :totalItems="props.tableConfig.tableBody.length"
    :itemsPerPage="itemsPerPage"
    @pageChanged="goToPage"
    )
</template>
<script lang="ts" setup>
import { defineProps, ref, computed } from "vue";
import SortButton from "./SortButton.vue";
import TablePagination from "./TablePagination.vue";

const props = defineProps(["tableConfig"]);

const sortColumn = ref<number>(props.tableConfig.sortColumn || 0);
const sortDirection = ref<string>(props.tableConfig.order || "asc");

const currentPage = ref(1);
const numericColumn = ref(props.tableConfig.numeric || false);
const itemsPerPage = 5;

const sortTable = (columnIndex: number, numeric: boolean) => {
  if (sortColumn.value === columnIndex) {
    sortDirection.value = sortDirection.value === "asc" ? "desc" : "asc";
  } else {
    sortColumn.value = columnIndex;
    sortDirection.value = "asc";
  }

  numericColumn.value = numeric;
};

const sortedTableBody = computed(() => {
  return [...props.tableConfig.tableBody].sort((a, b) => {
    const aValue = a[sortColumn.value];
    const bValue = b[sortColumn.value];

    if (numericColumn.value) {
      const aValueNumeric = aValue.toString().replace(/\D/g, "");
      const bValueNumeric = bValue.toString().replace(/\D/g, "");
      return sortDirection.value === "asc"
        ? Number(aValueNumeric) - Number(bValueNumeric)
        : Number(bValueNumeric) - Number(aValueNumeric);
    }

    const aString = String(aValue).toLowerCase();
    const bString = String(bValue).toLowerCase();

    return sortDirection.value === "asc"
      ? aString.localeCompare(bString, "pt-BR", { ignorePunctuation: true })
      : bString.localeCompare(aString, "pt-BR", { ignorePunctuation: true });
  });
});

const totalPages = computed(() =>
  Math.ceil(sortedTableBody.value.length / itemsPerPage)
);

const currentPageData = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return sortedTableBody.value.slice(start, end);
});

const prevPage = () => {
  if (currentPage.value > 1) currentPage.value--;
};

const nextPage = () => {
  if (currentPage.value < totalPages.value) currentPage.value++;
};

const goToPage = (page: number) => {
  currentPage.value = page;
};
</script>

<style scoped lang="scss">
div:has(> table) {
  border: 1px solid #e3e3e3;
  border-radius: 10px;
}

th {
  background-color: var(--primary) !important;

  &:first-child {
    border-radius: 10px 0 0 0;
  }

  &:last-child {
    border-radius: 0 10px 0 0;
  }
}

tr:last-child td {
  border-bottom: 0;
  border-radius: 10px;
}
</style>
