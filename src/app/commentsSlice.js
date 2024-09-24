import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Асинхронное получение комментариев с API
export const fetchComments = createAsyncThunk(
  "comments/fetchComments",
  async () => {
    const response = await fetch("https://dummyjson.com/comments");
    const data = await response.json();
    return data.comments.map((comment) => ({
      id: comment.id,
      body: comment.body,
      likes: comment.likes,
      user: comment.user,
    }));
  }
);

const commentsSlice = createSlice({
  name: "comments",
  initialState: { comments: [], status: "idle", error: null },
  reducers: {
    addComment: (state, action) => {
      // Используйте unshift, чтобы добавить комментарий в начало списка
      state.comments.unshift(action.payload);
    },
    deleteComment: (state, action) => {
      state.comments = state.comments.filter(
        (comment) => comment.id !== action.payload
      );
    },
    editComment: (state, action) => {
      const { id, newBody } = action.payload;
      const comment = state.comments.find((comment) => comment.id === id);
      if (comment) {
        comment.body = newBody;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchComments.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.comments = action.payload;
      })
      .addCase(fetchComments.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { addComment, deleteComment, editComment } = commentsSlice.actions;
export default commentsSlice.reducer;
