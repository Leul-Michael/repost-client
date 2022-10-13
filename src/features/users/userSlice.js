import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"

const API_URL = "https://teal-attractive-elk.cyclic.app/api/users"

export const REDUX_USER = "redux-posts-user"

const initialState = {
  user: JSON.parse(localStorage.getItem(REDUX_USER)) || null,
  status: "idle",
  error: null,
  message: null,
}

export const login = createAsyncThunk(
  "users/userLogin",
  async (userCredentials, thunkAPI) => {
    try {
      const res = await axios.post(`${API_URL}/login`, userCredentials)
      return res.data
    } catch (e) {
      const message =
        (e.response && e.response.data && e.response.data.message) ||
        e.message ||
        e.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

export const register = createAsyncThunk(
  "users/userRegister",
  async (userCredentials, thunkAPI) => {
    try {
      const res = await axios.post(`${API_URL}`, userCredentials)
      return res.data
    } catch (e) {
      const message =
        (e.response && e.response.data && e.response.data.message) ||
        e.message ||
        e.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

export const updateUser = createAsyncThunk(
  "users/updateUser",
  async (content, thunkAPI) => {
    try {
      const { id, name, email } = content
      const token = thunkAPI.getState().user.user.token
      const res = await axios.put(
        `${API_URL}/update/${id}`,
        { name, email },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      return res.data
    } catch (e) {
      const message =
        (e.response && e.response.data && e.response.data.message) ||
        e.message ||
        e.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

export const deactivate = createAsyncThunk(
  "users/deactivate",
  async (userId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().user.user.token
      const res = await axios.delete(`${API_URL}/deactivate/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      return res.data
    } catch (e) {
      const message =
        (e.response && e.response.data && e.response.data.message) ||
        e.message ||
        e.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    reset(state) {
      localStorage.removeItem(REDUX_USER)
      state.user = null
      state.error = null
      state.message = null
      state.status = "idle"
    },
  },
  extraReducers(builder) {
    builder
      .addCase(login.pending, (state) => {
        state.status = "loading"
      })
      .addCase(login.fulfilled, (state, action) => {
        if (!action.payload.id) {
          state.status = "failed"
          state.error = "Could not Login, try again."
          return
        }
        state.status = "succeeded"
        localStorage.setItem(REDUX_USER, JSON.stringify(action.payload))
        state.user = action.payload
      })
      .addCase(login.rejected, (state, action) => {
        state.status = "failed"
        state.error = action.payload
      })
      .addCase(register.pending, (state) => {
        state.status = "loading"
      })
      .addCase(register.fulfilled, (state, action) => {
        if (!action.payload.id) {
          state.status = "failed"
          state.error = "Could not Register, try again."
          state.message = null
          return
        }
        state.status = "succeeded"
        state.message = "Registered Successfully, login please."
      })
      .addCase(register.rejected, (state, action) => {
        state.status = "failed"
        state.error = action.payload
      })
      .addCase(deactivate.fulfilled, (state, action) => {
        if (!action.payload.id) {
          state.error = "Could not Deactivate, try again."
          state.message = null
          return
        }
        localStorage.removeItem(REDUX_USER)
        state.user = null
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        if (!action.payload.id) {
          state.error = "Could not update, try again."
          state.message = null
          return
        }
        localStorage.setItem(REDUX_USER, JSON.stringify(action.payload))
        state.user = action.payload
      })
  },
})

export const selectUser = (state) => state.user

export const { reset } = userSlice.actions

export default userSlice.reducer
