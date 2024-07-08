import defaultAPI from "../../../axiosInstance";
import { MODULE_CONSTANTS } from "./constants";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getCoupons = createAsyncThunk(
  `${MODULE_CONSTANTS.NAME}/${MODULE_CONSTANTS.GET}`,
  async ({ pageSize, handle }) => {
    const res = await defaultAPI.get(MODULE_CONSTANTS.BASE, {
      params: { per_page: pageSize, handle },
    });
    return res.data;
  }
);
export const addCoupons = createAsyncThunk(
  `${MODULE_CONSTANTS.NAME}/${MODULE_CONSTANTS.ADD}`,
  async ( data ) => {
    const res = await defaultAPI.post(MODULE_CONSTANTS.BASE, data);
    return res.data;
  }
);

export const fetchCouponsDataByPage = (info) => async (dispatch) => {
  const { state, pageSize } = info;

  dispatch(getCoupons.pending());
  const response = await defaultAPI.get(`${state}&per_page=${pageSize}`);
  const data = response.data;

  dispatch(getCoupons.fulfilled(data));
  dispatch(setCurrentPage(state));
};

export const changeCouponsStatus = createAsyncThunk(
  `${MODULE_CONSTANTS.NAME}/${MODULE_CONSTANTS.PATCH}`,
  async ({ id, status }) => {
    const res = await defaultAPI.patch(
      `${MODULE_CONSTANTS.BASE}/${id}?${MODULE_CONSTANTS.STATUS}=${status}`
    );
    return res.data;
  }
);
export const deleteCoupons = createAsyncThunk(
  `${MODULE_CONSTANTS.NAME}/${MODULE_CONSTANTS.PATCH}`,
  async ( id ) => {
    const res = await defaultAPI.delete(
      `${MODULE_CONSTANTS.BASE}/${id}`
    );
    return res.data;
  }
);
