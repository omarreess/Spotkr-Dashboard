import defaultAPI from "../../../axiosInstance";
import { MODULE_CONSTANTS } from "./constants";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getActivities = createAsyncThunk(
  `${MODULE_CONSTANTS.NAME}/${MODULE_CONSTANTS.GET}`,
  async ({ pageSize, handle, thirdId }) => {
    const res = await defaultAPI.get(`${MODULE_CONSTANTS.BASE}/${thirdId}/${MODULE_CONSTANTS.ACTIVITY}`, {
      params: { per_page: pageSize, handle },
    });
    return res.data;
  }
);
export const getOneActivity = createAsyncThunk(
  `${MODULE_CONSTANTS.NAME}/${MODULE_CONSTANTS.GET_ONE}`,
  async ({ thirdId, id }) => {
    const res = await defaultAPI.get(`${MODULE_CONSTANTS.BASE}/${thirdId}/${MODULE_CONSTANTS.ACTIVITY}/${id}`);
    return res.data;
  }
);

export const fetchActivitiesDataByPage = (info) => async (dispatch) => {
  const { state, pageSize } = info;

  dispatch(getActivities.pending());
  const response = await defaultAPI.get(`${state}&per_page=${pageSize}`);
  const data = response.data;

  dispatch(getActivities.fulfilled(data));
  dispatch(setCurrentPage(state));
};

export const changeActivitiesStatus = createAsyncThunk(
  `${MODULE_CONSTANTS.NAME}/${MODULE_CONSTANTS.PATCH}`,
  async ({ id, status, thirdId }) => {
    const res = await defaultAPI.patch(
      `${MODULE_CONSTANTS.BASE}/${thirdId}/${MODULE_CONSTANTS.ACTIVITY}/${id}?${MODULE_CONSTANTS.STATUS}=${status}`
    );
    return res.data;
  }
);
export const changeAdrenalineStatus = createAsyncThunk(
  `${MODULE_CONSTANTS.NAME}/${MODULE_CONSTANTS.PATCH}`,
  async ({ id, status, thirdId }) => {
    const res = await defaultAPI.post(
      `${MODULE_CONSTANTS.BASE}/${thirdId}/${MODULE_CONSTANTS.ADRENALINE_RUSH}/${id}?${MODULE_CONSTANTS.STATUS}=${status}`
    );
    return res.data;
  }
);
export const changeCarouselStatus = createAsyncThunk(
  `${MODULE_CONSTANTS.NAME}/${MODULE_CONSTANTS.PATCH}`,
  async ({ id, status, thirdId }) => {
    const res = await defaultAPI.post(
      `${MODULE_CONSTANTS.BASE}/${thirdId}/${MODULE_CONSTANTS.ACTIVITY}/${id}/${MODULE_CONSTANTS.CAROUSEL}?${MODULE_CONSTANTS.STATUS}=${status}`
    );
    return res.data;
  }
);

