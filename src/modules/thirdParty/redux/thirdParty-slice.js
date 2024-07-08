import { createSlice } from "@reduxjs/toolkit";
import { changeThirdPartyStatus, getThirdParty } from "./action.js";
import { THIRD_PARIES_REDUX_CONSTANTS } from "./constants.js";
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


const thirdPartySlice = createSlice({
  name: THIRD_PARIES_REDUX_CONSTANTS.NAME,
  initialState: {
    thirdPartyData: [],
    thirdPartyLinks: {
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
      .addCase(getThirdParty.pending, (state) => {
        state.loading = true;
      })
      .addCase(getThirdParty.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        state.thirdPartyData = action.payload;
        state.thirdPartyLinks = action.payload.links;
        state.thirdPartyLinks.first = action.payload.links.first;
        state.thirdPartyLinks.last = action.payload.links.last;
        state.thirdPartyLinks.prev = action.payload.links.prev;
        state.thirdPartyLinks.next = action.payload.links.next;
        state.currentPage = action.payload.meta.current_page;
      })
      .addCase(getThirdParty.rejected, (state) => {
        state.error = true;
      })
      .addCase(changeThirdPartyStatus.pending, (state) => {
        state.loading = true;
      })
      .addCase(changeThirdPartyStatus.fulfilled, (state) => {
        state.loading = false;
        state.error = false;
      })
      .addCase(changeThirdPartyStatus.rejected, (state) => {
        state.error = true;
      })
      
  },
});
export const { setCurrentPage } = thirdPartySlice.actions;

export default thirdPartySlice.reducer;
