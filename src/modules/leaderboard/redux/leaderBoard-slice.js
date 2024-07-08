import { createSlice } from "@reduxjs/toolkit";
import { getLeaderBoard, markWinnder } from "./action.js";
import { MODULE_CONSTANTS } from "./constants.js";


const leaderBoardSlice = createSlice({
  name: MODULE_CONSTANTS.NAME,
  initialState: {
    data: [],
    currentPage: null,
    loading: false,
    error: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getLeaderBoard.pending, (state) => {
        state.loading = true;
      })
      .addCase(getLeaderBoard.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        state.data = action.payload;
        state.currentPage = action.payload.meta.current_page;
      })
      .addCase(getLeaderBoard.rejected, (state) => {
        state.error = true;
      })
      .addCase(markWinnder.pending, (state) => {
        state.loading = true;
      })
      .addCase(markWinnder.fulfilled, (state) => {
        state.error = false;
        state.loading = false;
      })
      .addCase(markWinnder.rejected, (state) => {
        state.loading = false;
        state.error = true;
      })
      
  },
});
export const { setCurrentPage } = leaderBoardSlice.actions;

export default leaderBoardSlice.reducer;
