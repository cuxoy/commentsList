import commentsReducer, {
  fetchComments,
  addComment,
  deleteComment,
  editComment,
} from "./commentsSlice";

describe("commentsSlice", () => {
  const initialState = {
    comments: [],
    status: "idle",
    error: null,
  };

  it("should handle initial state", () => {
    expect(commentsReducer(undefined, { type: "unknown" })).toEqual(
      initialState
    );
  });

  it("should handle adding a comment", () => {
    const newComment = {
      id: 1,
      body: "New comment",
      likes: 0,
      user: { id: 1, username: "currentUser", fullName: "Current User" },
    };
    const actual = commentsReducer(initialState, addComment(newComment));
    expect(actual.comments).toEqual([newComment]);
  });

  it("should handle deleting a comment", () => {
    const stateWithComments = {
      ...initialState,
      comments: [
        {
          id: 1,
          body: "Comment 1",
          likes: 0,
          user: { id: 1, username: "user1", fullName: "User One" },
        },
      ],
    };
    const actual = commentsReducer(stateWithComments, deleteComment(1));
    expect(actual.comments).toEqual([]);
  });

  it("should handle editing a comment", () => {
    const stateWithComments = {
      ...initialState,
      comments: [
        {
          id: 1,
          body: "Comment 1",
          likes: 0,
          user: { id: 1, username: "user1", fullName: "User One" },
        },
      ],
    };
    const newBody = "Updated Comment 1";
    const actual = commentsReducer(
      stateWithComments,
      editComment({ id: 1, newBody })
    );
    expect(actual.comments[0].body).toBe(newBody);
  });

  it("should handle fetchComments fulfilled", () => {
    const action = {
      type: fetchComments.fulfilled.type,
      payload: [
        {
          id: 1,
          body: "Fetched comment 1",
          likes: 0,
          user: { id: 1, username: "user1", fullName: "User One" },
        },
        {
          id: 2,
          body: "Fetched comment 2",
          likes: 0,
          user: { id: 2, username: "user2", fullName: "User Two" },
        },
      ],
    };
    const actual = commentsReducer(initialState, action);
    expect(actual.status).toBe("succeeded");
    expect(actual.comments.length).toBe(2);
  });

  it("should handle fetchComments rejected", () => {
    const action = {
      type: fetchComments.rejected.type,
      error: { message: "Failed to fetch" },
    };
    const actual = commentsReducer(initialState, action);
    expect(actual.status).toBe("failed");
    expect(actual.error).toBe("Failed to fetch");
  });
});
