import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import defaultAPI from '../../../axiosInstance.js'

export const userLogin = createAsyncThunk('users/login', async (user) => {
    const res = await defaultAPI.post('auth/login/dashboard', user)
    console.log(res)
    return res.data
})

export const userLogout = createAsyncThunk('users/logout', async () => {
  const apiUrl = '/auth/logout'
    const res = await defaultAPI.post(apiUrl)
    return res.data
})

const userSlice = createSlice({
  name: 'user',
  initialState: {
    loggedIn: false,
    loggedOut: true,
    userInfo: [],
    loading: false,
    error: false,
    permissions: [],
    token: '',
    user_id: '',
    type: '',
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(userLogin.pending, (state) => {
        state.loading = true
      })
      .addCase(userLogin.fulfilled, (state, action) => {
        state.loading = false
        state.error = false
        state.loggedIn = true
        state.loggedOut = false
        state.userInfo = action.payload
        state.token = action.payload.data.token
        state.permissions = action.payload.data.permissions
        state.type = action.payload.data.type
        state.user_id = action.payload.data.user_id
        state.message = action.payload.message
        localStorage.setItem('token', action.payload.data.token)
        localStorage.setItem('type', action.payload.data.type)
        localStorage.setItem('user_id', action.payload.data.id)
      })
      .addCase(userLogin.rejected, (state) => {
        state.error = true
        state.loading = false
      })
      .addCase(userLogout.pending, (state) => {
        state.loading = true
      })
      .addCase(userLogout.fulfilled, (state) => {
        state.loading = false
        state.error = false
        state.loggedIn = false
        state.loggedOut = true
        state.token = null
      })
      .addCase(userLogout.rejected, (state) => {
        state.error = true
        state.loading = false
      })
  },
})

export default userSlice.reducer
