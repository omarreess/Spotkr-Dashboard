import { createSlice } from "@reduxjs/toolkit";
import { finishOrder, getOneOrder, getOrders } from "./action.js";
import { MODULE_CONSTANTS } from "./constants.js";


const ordersSlice = createSlice({
  name: MODULE_CONSTANTS.NAME,
  initialState: {
    ordersData: [],
    oneOrderData: null,
    currentPage: null,
    loading: false,
    error: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getOrders.pending, (state) => {
        state.loading = true;
      })
      .addCase(getOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        state.ordersData = action.payload;
        state.currentPage = action.payload.meta.current_page;
        state.oneOrderData  = null;

      })
      .addCase(getOrders.rejected, (state) => {
        state.error = true;
      })
      .addCase(getOneOrder.pending, (state) => {
        state.loading = true;
      })
      .addCase(getOneOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        state.oneOrderData  = action.payload;
      })
      .addCase(getOneOrder.rejected, (state) => {
        state.error = true;
      })
      .addCase(finishOrder.pending, (state) => {
        state.loading = true;
      })
      .addCase(finishOrder.fulfilled, (state) => {
        state.error = false;
        state.loading = false;
      })
      .addCase(finishOrder.rejected, (state) => {
        state.loading = false;
        state.error = true;
      })
      
  },
});
export const { setCurrentPage } = ordersSlice.actions;

export default ordersSlice.reducer;
