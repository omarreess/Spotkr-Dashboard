import { createSlice } from "@reduxjs/toolkit";
import {  addCoupons, changeCouponsStatus, getCoupons } from "./action.js";
import { MODULE_CONSTANTS } from "./constants.js";
// const createAsyncThunkBuilderDetailsStudent = (name, requestFn) => {
//   return createAsyncThunk(`products/modifie/${name}`, async (id) => {
//     const apiUrl = `/products/${id}`;
//       const res = await requestFn(apiUrl);
//       return res.data;
//   });
// };
// export const removeReports = createAsyncThunkBuilderDetailsStudent(
//   "reports",
//   defaultAPI.delete
// );


const couponsSlice = createSlice({
  name: MODULE_CONSTANTS.NAME,
  initialState: {
    couponsData: [],
    couponsLinks: {
      first: null,
      last: null,
      next: null,
      prev: null,
    },
    currentPage: null,
    loading: false,
    error: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCoupons.pending, (state) => {
        state.loading = true;
      })
      .addCase(getCoupons.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        state.couponsData = action.payload;
        state.couponsLinks = action.payload.links;
        state.couponsLinks.first = action.payload.links.first;
        state.couponsLinks.last = action.payload.links.last;
        state.couponsLinks.prev = action.payload.links.prev;
        state.couponsLinks.next = action.payload.links.next;
        state.currentPage = action.payload.meta.current_page;
      })
      .addCase(getCoupons.rejected, (state) => {
        state.error = true;
      })
      .addCase(changeCouponsStatus.pending, (state) => {
        state.loading = true;
      })
      .addCase(changeCouponsStatus.fulfilled, (state) => {
        state.error = false;
        state.loading = false;
      })
      .addCase(changeCouponsStatus.rejected, (state) => {
        state.loading = false;
        state.error = true;
      })
      .addCase(addCoupons.pending, (state) => {
        state.loading = true;
      })
      .addCase(addCoupons.fulfilled, (state) => {
        state.error = false;
        state.loading = false;
      })
      .addCase(addCoupons.rejected, (state) => {
        state.loading = false;
        state.error = true;
      })
      
  },
});
export const { setCurrentPage } = couponsSlice.actions;

export default couponsSlice.reducer;
