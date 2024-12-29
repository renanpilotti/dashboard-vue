<template lang="pug">
  .pagination
    span Exibindo {{itemsShownLabel}} de {{totalItems}}
    .btn-container
      button(@click="changePage(currentPage - 1)" v-if="currentPage > 1") <
      button(
      v-if="currentPage !== 1 && currentPage - 2 > 1"
      @click="changePage(1)"
      ) 1

      button.empty(
      v-if="currentPage - 2 > 1"
      ) ...

      button(
      v-if="currentPage > 1"
      @click="changePage(currentPage - 1)"
      ) {{ currentPage - 1 }}

      button.active(
      ) {{ currentPage }}

      button(
      v-if="currentPage < totalPages"
      @click="changePage(currentPage + 1)"
      ) {{ currentPage + 1 }}

      button.empty(
      v-if="currentPage + 2 < totalPages"
      ) ...

      button(
      v-if="currentPage !== totalPages && currentPage + 2 < totalPages"
      @click="changePage(totalPages)"
      ) {{totalPages}}

      button(@click="changePage(currentPage + 1)" v-if="currentPage < totalPages") >
</template>

<script lang="ts" setup>
import { computed, ref, defineProps, defineEmits } from "vue";

const props = defineProps(["totalItems", "itemsPerPage"]);

const emit = defineEmits(["pageChanged"]);
const currentPage = ref(1);

const totalPages = computed(() =>
  Math.ceil(props.totalItems / props.itemsPerPage)
);

const itemsShownLabel = computed(() => {
  if (props.itemsPerPage > props.totalItems) return props.totalItems;

  return `${props.itemsPerPage * (currentPage.value - 1)}-${
    props.itemsPerPage * currentPage.value < props.totalItems
      ? props.itemsPerPage * currentPage.value
      : props.totalItems
  }`;
});

const changePage = (page: number) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page;
    emit("pageChanged", page);
  }
};
</script>

<style lang="scss" scoped>
.pagination {
  display: flex;
  margin-top: 1rem;
  justify-content: space-between;
  align-items: end;

  .btn-container {
    display: flex;
    gap: 0.25rem;
    justify-content: end;
    align-items: end;
  }

  button {
    background-color: transparent;
    border: 1px solid #a1a1a1;
    border-radius: 6px;
    width: 28px;
    height: 28px;
    padding: 0;
    transition: 0.3s ease;

    &.active {
      background-color: #4d4c4c;
      color: #fff;
    }

    &.empty {
      pointer-events: none;
    }

    &:hover:not(.empty) {
      background-color: #4d4c4c;
      color: #fff;
    }
  }
}
</style>
