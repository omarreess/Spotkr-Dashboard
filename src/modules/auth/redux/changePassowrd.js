import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import defaultAPI from '../../../axiosInstance.js'

export const changePassword = createAsyncThunk(
  'users/change',
  async ({ data }) => {
    const apiUrl = '/auth/password/change_password'

      const res = await defaultAPI.put(apiUrl,data)
      return res.data // Assuming the response data you want to store is under the 'data' property
    
  },
)

const changePasswordSlice = createSlice({
  name: 'changePassword',
  initialState: {
    changePassword: [], // You can initialize this array to hold the response data
    loading: false,
    error: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(changePassword.pending, (state) => {
        state.loading = true
        state.changePassword = []
      })
      .addCase(changePassword.fulfilled, (state, action) => {
        state.loading = false
        state.error = false
        state.changePassword = action.payload // Store the response data in the state
      })
      .addCase(changePassword.rejected, (state, action) => {
        state.error = true
        state.changePassword = action.payload
      })
  },
})

export default changePasswordSlice.reducer
