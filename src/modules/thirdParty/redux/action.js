import defaultAPI from "../../../axiosInstance";
import { THIRD_PARIES_REDUX_CONSTANTS } from "./constants";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getThirdParty = createAsyncThunk(
  `${THIRD_PARIES_REDUX_CONSTANTS.NAME}/${THIRD_PARIES_REDUX_CONSTANTS.GET}`,
  async ({ pageSize, handle }) => {
    const res = await defaultAPI.get(THIRD_PARIES_REDUX_CONSTANTS.THIRD_PARTY_BASE, {
      params: { per_page: pageSize, handle },
    });
    return res.data;
  }
);

export const fetchThirdPartyDataByPage = (info) => async (dispatch) => {
  const { state, pageSize } = info;

  dispatch(getThirdParty.pending());
  const response = await defaultAPI.get(`${state}&per_page=${pageSize}`);
  const data = response.data;

  dispatch(getThirdParty.fulfilled(data));
  dispatch(setCurrentPage(state));
};

export const changeThirdPartyStatus = createAsyncThunk(
  `${THIRD_PARIES_REDUX_CONSTANTS.NAME}/${THIRD_PARIES_REDUX_CONSTANTS.PATCH}`,
  async ({ id, status }) => {
    const res = await defaultAPI.patch(
      `${THIRD_PARIES_REDUX_CONSTANTS.THIRD_PARTY_BASE}/${id}/${THIRD_PARIES_REDUX_CONSTANTS.CHANGE_STATUS}?${THIRD_PARIES_REDUX_CONSTANTS.STATUS}=${status}`
    );
    return res.data;
  }
);
