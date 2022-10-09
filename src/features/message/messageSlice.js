import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  message: null,
}

const messageSlice = createSlice({
  name: "message",
  initialState,
  reducers: {
    removeMessage(state) {
      state.message = null
    },
    messageAdded(state, action) {
      state.message = action.payload
    },
  },
})

export const { removeMessage, messageAdded } = messageSlice.actions

export const selectMessage = (state) => state.message.message

export default messageSlice.reducer
