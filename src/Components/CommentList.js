import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchComments, deleteComment } from "../app/commentsSlice";

const CommentList = () => {
  const dispatch = useDispatch();
  const { comments, status, error } = useSelector((state) => state.comments);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchComments());
    }
  }, [dispatch, status]);

  return (
    <div>
      {status === "loading" && <div>Loading...</div>}
      {status === "failed" && <div>{error}</div>}
      <ul>
        {comments.map((comment) => (
          <li key={comment.id}>
            <p>{comment.body}</p>
            <button onClick={() => dispatch(deleteComment(comment.id))}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CommentList;
