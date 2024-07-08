import defaultAPI from "../../../axiosInstance";
import { MODULE_CONSTANTS } from "./constants";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getOrders = createAsyncThunk(
  `${MODULE_CONSTANTS.NAME}/${MODULE_CONSTANTS.GET}`,
  async ({ pageSize, handle }) => {
    const res = await defaultAPI.get(`${MODULE_CONSTANTS.BASE}`, {
      params: { per_page: pageSize, handle },
    });
    return res.data;
  }
);
export const getOneOrder = createAsyncThunk(
  `${MODULE_CONSTANTS.NAME}/${MODULE_CONSTANTS.GET_ONE}`,
  async ({ id }) => {
    const res = await defaultAPI.get(`${MODULE_CONSTANTS.BASE}/${id}`);
    return res.data;
  }
);

export const fetchOrdersDataByPage = (info) => async (dispatch) => {
  const { state, pageSize } = info;

  dispatch(getOrders.pending());
  const response = await defaultAPI.get(`${state}&per_page=${pageSize}`);
  const data = response.data;

  dispatch(getOrders.fulfilled(data));
  dispatch(setCurrentPage(state));
};

export const finishOrder = createAsyncThunk(
  `${MODULE_CONSTANTS.NAME}/${MODULE_CONSTANTS.POST}`,
  async ({ id }) => {
    const res = await defaultAPI.post(
      `${MODULE_CONSTANTS.BASE}/${id}/${MODULE_CONSTANTS.FINISH}`
    );
    return res.data;
  }
);


