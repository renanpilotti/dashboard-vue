import { createStore } from "vuex";
import axios from "axios";
import { Region, Category, StoreConfig, Product, Error } from "./types";

const apiUrl = "http://localhost:3000";

export default createStore<StoreConfig>({
  state: {
    regions: [],
    categories: [],
    products: [],
    isLoading: false,
    error: {
      status: false,
      message: "",
    },
  },
  mutations: {
    setRegions(state, regions: Region[]) {
      state.regions = regions;
    },
    setCategories(state, categories: Category[]) {
      state.categories = categories;
    },
    setProducts(state, productList: Product[]) {
      state.products = productList;
    },
    setLoading(state, loading: boolean) {
      state.isLoading = loading;
    },
    setError(state, error: Error) {
      state.error = error;
    },
  },
  actions: {
    async fetchRegions({ commit }) {
      commit("setLoading", true);
      try {
        const response = await axios.get(`${apiUrl}/regions`);
        commit("setRegions", response.data);
      } catch (e: any) {
        const error: Error = {
          status: true,
          message: e.message,
        };
        commit("setError", error);
      } finally {
        commit("setLoading", false);
      }
    },
    async fetchCategories({ commit }) {
      commit("setLoading", true);
      try {
        const response = await axios.get(`${apiUrl}/categories`);
        commit("setCategories", response.data);
      } catch (e: any) {
        const error: Error = {
          status: true,
          message: e.message,
        };
        commit("setError", error);
      } finally {
        commit("setLoading", false);
      }
    },
    async fetchProducts({ commit }) {
      commit("setLoading", true);
      try {
        const response = await axios.get(`${apiUrl}/products`);
        commit("setProducts", response.data);
      } catch (e: any) {
        const error: Error = {
          status: true,
          message: e.message,
        };
        commit("setError", error);
      } finally {
        commit("setLoading", false);
      }
    },
  },
});
