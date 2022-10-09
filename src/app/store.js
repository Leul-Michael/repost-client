import { configureStore } from "@reduxjs/toolkit"
import userReducer from "../features/users/userSlice"
import postsReducer from "../features/posts/postsSlice"
import messageReducer from "../features/message/messageSlice"

const store = configureStore({
  reducer: {
    user: userReducer,
    posts: postsReducer,
    message: messageReducer,
  },
})

export default store
