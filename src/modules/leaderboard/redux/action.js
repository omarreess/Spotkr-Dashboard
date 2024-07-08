import defaultAPI from "../../../axiosInstance";
import { MODULE_CONSTANTS } from "./constants";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getLeaderBoard = createAsyncThunk(
  `${MODULE_CONSTANTS.NAME}/${MODULE_CONSTANTS.GET}`,
  async ({ pageSize, handle }) => {
    const res = await defaultAPI.get(`${MODULE_CONSTANTS.BASE}`, {
      params: { per_page: pageSize, handle },
    });
    return res.data;
  }
);


export const fetchLeaderBoardDataByPage = (info) => async (dispatch) => {
  const { state, pageSize } = info;

  dispatch(getLeaderBoard.pending());
  const response = await defaultAPI.get(`${state}&per_page=${pageSize}`);
  const data = response.data;

  dispatch(getLeaderBoard.fulfilled(data));
  dispatch(setCurrentPage(state));
};

export const markWinnder = createAsyncThunk(
  `${MODULE_CONSTANTS.NAME}/${MODULE_CONSTANTS.PATCH}`,
  async ({ id }) => {
    const res = await defaultAPI.patch(
      `${MODULE_CONSTANTS.BASE_WINNER}/${MODULE_CONSTANTS.WINNER}`,{
        params: {
          user_id: id,
        }
      }
    );
    return res.data;
  }
);


