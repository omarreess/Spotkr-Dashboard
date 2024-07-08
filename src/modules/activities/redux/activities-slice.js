import { createSlice } from "@reduxjs/toolkit";
import { changeActivitiesStatus, getActivities, getOneActivity } from "./action.js";
import { MODULE_CONSTANTS } from "./constants.js";


const activitiesSlice = createSlice({
  name: MODULE_CONSTANTS.NAME,
  initialState: {
    activitiesData: [],
    oneActivityData:null,
    activitiesLinks: {
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
      .addCase(getActivities.pending, (state) => {
        state.loading = true;
      })
      .addCase(getActivities.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        state.activitiesData = action.payload;
        state.currentPage = action.payload.meta.current_page;
        state.oneActivityData = null;

      })
      .addCase(getActivities.rejected, (state) => {
        state.error = true;
      })
      .addCase(getOneActivity.pending, (state) => {
        state.loading = true;
      })
      .addCase(getOneActivity.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        state.oneActivityData = action.payload;
      })
      .addCase(getOneActivity.rejected, (state) => {
        state.error = true;
      })
      .addCase(changeActivitiesStatus.pending, (state) => {
        state.loading = true;
      })
      .addCase(changeActivitiesStatus.fulfilled, (state) => {
        state.error = false;
        state.loading = false;
      })
      .addCase(changeActivitiesStatus.rejected, (state) => {
        state.loading = false;
        state.error = true;
      })
      
  },
});
export const { setCurrentPage } = activitiesSlice.actions;

export default activitiesSlice.reducer;
