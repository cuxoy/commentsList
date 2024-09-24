import React, { useState, useEffect } from "react";
import { TextField, Button, Box } from "@mui/material";
import { useDispatch } from "react-redux";
import { addComment } from "../app/commentsSlice";

const CommentForm = () => {
  const [commentBody, setCommentBody] = useState(
    () => localStorage.getItem("commentBody") || ""
  );
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (commentBody.trim()) {
      const newComment = {
        id: Date.now(),
        body: commentBody,
        likes: 0,
        user: {
          id: Date.now(),
          username: "currentUser",
          fullName: "Current User",
        },
      };
      dispatch(addComment(newComment));
      setCommentBody("");
    }
  };

  useEffect(() => {
    localStorage.setItem("commentBody", commentBody);
  }, [commentBody]);

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "400px",
        margin: "20px auto",
        backgroundColor: "#f9f9f9",
        padding: "20px",
        borderRadius: "8px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      }}
    >
      <TextField
        label="Add a comment"
        variant="outlined"
        value={commentBody}
        onChange={(e) => setCommentBody(e.target.value)}
        sx={{ marginBottom: "10px" }}
      />
      <Button
        type="submit"
        variant="contained"
        disabled={!commentBody.trim()}
        sx={{
          backgroundColor: "#007bff",
          "&:hover": { backgroundColor: "#0056b3" },
        }}
      >
        Submit
      </Button>
    </Box>
  );
};

export default CommentForm;
