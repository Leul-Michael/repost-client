import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from "@reduxjs/toolkit"
import axios from "axios"

const POSTS_URL = "https://teal-attractive-elk.cyclic.app/api/posts"
// const POSTS_URL = "http://localhost:5000/api/posts"

const postsAdapter = createEntityAdapter({
  selectId: (post) => post._id,
  sortComparer: (a, b) => b.createdAt.localeCompare(a.createdAt),
})

const initialState = postsAdapter.getInitialState({
  status: "idle",
  error: null,
  message: null,
})

export const fetchPosts = createAsyncThunk(
  "posts/fetchPosts",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().user.user.token
      const res = await axios.get(`${POSTS_URL}/`, {
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

export const createPost = createAsyncThunk(
  "posts/createPost",
  async (postData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().user.user.token
      const res = await axios.post(`${POSTS_URL}/`, postData, {
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

export const updatePost = createAsyncThunk(
  "posts/updatePost",
  async (postData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().user.user.token
      const res = await axios.put(`${POSTS_URL}/${postData.postId}`, postData, {
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

export const deletePost = createAsyncThunk(
  "posts/deletePost",
  async (postId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().user.user.token
      const res = await axios.delete(`${POSTS_URL}/${postId}`, {
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

export const likePost = createAsyncThunk(
  "posts/likePost",
  async (postId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().user.user.token
      const res = await axios.put(`${POSTS_URL}/like/${postId}`, postId, {
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

export const addComment = createAsyncThunk(
  "posts/addComment",
  async (postComment, thunkAPI) => {
    try {
      const { id, comment } = postComment
      const token = thunkAPI.getState().user.user.token
      const res = await axios.post(
        `${POSTS_URL}/comment/${id}`,
        { comment: comment },
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

export const updateComment = createAsyncThunk(
  "posts/updateComment",
  async (postComment, thunkAPI) => {
    try {
      const { id, commentId, body } = postComment
      const token = thunkAPI.getState().user.user.token
      const res = await axios.put(
        `${POSTS_URL}/comment/${id}/${commentId}`,
        { body },
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

export const removeComment = createAsyncThunk(
  "posts/deleteComment",
  async (postComment, thunkAPI) => {
    try {
      const { id, commentId } = postComment
      const token = thunkAPI.getState().user.user.token
      const res = await axios.delete(
        `${POSTS_URL}/comment/${id}/${commentId}`,
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

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    resetPostStatus(state) {
      state.status = "idle"
      state.message = null
      state.error = null
      state.entities = {}
      state.ids = []
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.status = "loading"
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = "succeeded"
        postsAdapter.upsertMany(state, action.payload)
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = "failed"
        state.error = action.payload
      })
      .addCase(createPost.fulfilled, (state, action) => {
        postsAdapter.addOne(state, action.payload)
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        if (!action.payload._id) {
          return
        }
        postsAdapter.upsertOne(state, action.payload)
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        postsAdapter.removeOne(state, action.payload._id)
      })
      .addCase(likePost.fulfilled, (state, action) => {
        const { id, likes } = action.payload
        const selectedPost = state.entities[id]
        if (selectedPost) {
          selectedPost.likes = likes
        }
      })
      .addCase(addComment.fulfilled, (state, action) => {
        const { id, comments } = action.payload
        const selectedPost = state.entities[id]
        if (selectedPost) {
          selectedPost.comments = comments
        }
      })
      .addCase(addComment.rejected, (state, action) => {
        state.error = action.payload
      })
      .addCase(updateComment.fulfilled, (state, action) => {
        const { id, comments } = action.payload
        const selectedPost = state.entities[id]
        if (selectedPost) {
          selectedPost.comments = comments
        }
      })
      .addCase(removeComment.fulfilled, (state, action) => {
        const { id, comments } = action.payload
        const selectedPost = state.entities[id]
        if (selectedPost) {
          selectedPost.comments = comments
        }
      })
  },
})

export const {
  selectAll: selectAllPosts,
  selectById: selectPostById,
  selectIds: selectPostIds,
} = postsAdapter.getSelectors((state) => state.posts)

export const selectPostStatus = (state) => state.posts.status
export const selectPostError = (state) => state.posts.error

export const { resetPostStatus } = postsSlice.actions

export default postsSlice.reducer
