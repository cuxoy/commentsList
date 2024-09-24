import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteComment,
  editComment,
  fetchComments,
} from "../app/commentsSlice";
import ScrollRestoration from "./ScrollRestoration";

const CommentList = () => {
  const { comments, status, error } = useSelector((state) => state.comments);
  const dispatch = useDispatch();
  const [editingId, setEditingId] = useState(null);
  const [newBody, setNewBody] = useState("");

  const handleEdit = (id, body) => {
    setEditingId(id);
    setNewBody(body);
  };

  const saveEdit = (id) => {
    if (newBody.trim()) {
      dispatch(editComment({ id, newBody }));
      setEditingId(null);
    }
  };

  useEffect(() => {
    dispatch(fetchComments());
  }, [dispatch]);

  if (status === "loading") {
    return <Loading>Loading comments...</Loading>;
  }

  if (status === "failed") {
    return <Error>Error: {error}</Error>;
  }

  return (
    <div>
      <ScrollRestoration />
      {comments.map((comment) => (
        <CommentContainer key={comment.id}>
          <Username fullname={comment.user.fullName}>
            {comment.user.username}
          </Username>
          {editingId === comment.id ? (
            <input
              type="text"
              value={newBody}
              onChange={(e) => setNewBody(e.target.value)}
              placeholder="Edit your comment"
            />
          ) : (
            <CommentBody>{comment.body}</CommentBody>
          )}
          <Likes>Likes: {comment.likes}</Likes>
          {editingId === comment.id ? (
            <Button onClick={() => saveEdit(comment.id)}>Save</Button>
          ) : (
            <Button onClick={() => handleEdit(comment.id, comment.body)}>
              Edit
            </Button>
          )}
          <Button onClick={() => dispatch(deleteComment(comment.id))}>
            Delete
          </Button>
        </CommentContainer>
      ))}
    </div>
  );
};

export const CommentContainer = styled.div`
  padding: 10px;
  border-bottom: 1px solid #ddd;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  max-width: 600px;
  margin: 0 auto;
`;

export const Username = styled.span`
  font-weight: bold;
  position: relative;
  &:hover::after {
    content: "${(props) => props.fullname}";
    position: absolute;
    left: 0;
    bottom: -20px;
    background-color: #333;
    color: white;
    padding: 5px;
    border-radius: 4px;
    font-size: 12px;
    white-space: nowrap;
  }
`;

export const CommentBody = styled.p`
  margin: 5px 0;
`;

export const Likes = styled.span`
  color: gray;
  font-size: 14px;
  margin-left: auto;
`;

export const Button = styled.button`
  margin-left: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background-color: #0056b3;
  }
`;

export const Error = styled.div`
  text-align: center;
  font-size: 50px;
  color: red;
`;

export const Loading = styled.div`
  text-align: center;
  font-size: 50px;
`;

export default CommentList;
