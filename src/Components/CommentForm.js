import React, { useState } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { addComment } from "../app/commentsSlice";

const CommentForm = () => {
  const [commentBody, setCommentBody] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (commentBody.trim()) {
      const newComment = {
        id: Date.now(),
        body: commentBody,
        likes: 0,
        user: { id: 1, username: "currentUser", fullName: "Current User" },
      };
      dispatch(addComment(newComment));
      setCommentBody("");
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Input
        type="text"
        value={commentBody}
        onChange={(e) => setCommentBody(e.target.value)}
        placeholder="Add a comment"
      />
      <Button type="submit" disabled={!commentBody.trim()}>
        Submit
      </Button>
    </Form>
  );
};

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 400px;
  margin: 20px auto;
  background-color: #f9f9f9;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

export const Input = styled.input`
  padding: 10px;
  font-size: 16px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 100%;
  &:focus {
    border-color: #007bff;
    outline: none;
  }
`;

export const Button = styled.button`
  padding: 10px 15px;
  font-size: 16px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
  &:hover {
    background-color: #0056b3;
  }
  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

export default CommentForm;
