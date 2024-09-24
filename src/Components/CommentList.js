import React, { useState, useEffect } from "react";
import styled from "styled-components";

import {
  Button,
  TextField,
  Typography,
  CardContent,
  CardActions,
  CircularProgress,
  Snackbar,
} from "@mui/material";
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
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleEdit = (id, body) => {
    setEditingId(id);
    setNewBody(body);
  };

  const saveEdit = (id) => {
    if (newBody.trim()) {
      dispatch(editComment({ id, newBody }));
      setEditingId(null);
      setNewBody("");
      setSnackbarOpen(true);
    }
  };

  useEffect(() => {
    dispatch(fetchComments());
  }, [dispatch]);

  if (status === "loading") {
    return <Loading />;
  }

  if (status === "failed") {
    return <Failed color="error">Error: {error}</Failed>;
  }

  return (
    <div>
      <ScrollRestoration />
      {comments.map((comment) => (
        <Content
          key={comment.id}
          variant="outlined"
          style={{ margin: "10px 0" }}
        >
          <CardContent>
            <Title fullname={comment.user.fullName} variant="h6">
              {comment.user.username}
            </Title>
            {editingId === comment.id ? (
              <TextField
                fullWidth
                value={newBody}
                onChange={(e) => setNewBody(e.target.value)}
                placeholder="Edit your comment"
                variant="outlined"
                size="small"
              />
            ) : (
              <Text variant="body1">{comment.body}</Text>
            )}
            <Typography color="textSecondary" variant="caption">
              Likes: {comment.likes}
            </Typography>
          </CardContent>
          <CardActions>
            {editingId === comment.id ? (
              <Button
                variant="contained"
                color="primary"
                onClick={() => saveEdit(comment.id)}
              >
                Save
              </Button>
            ) : (
              <Button
                variant="contained"
                color="secondary"
                onClick={() => handleEdit(comment.id, comment.body)}
              >
                Edit
              </Button>
            )}
            <Button
              variant="contained"
              color="error"
              onClick={() => dispatch(deleteComment(comment.id))}
            >
              Delete
            </Button>
          </CardActions>
        </Content>
      ))}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        message="Comment updated successfully!"
      />
    </div>
  );
};

export const Content = styled(CardContent)`
  max-width: 400px;
  margin: 0 auto !important;
`;

export const Title = styled(Typography)`
  font-weight: bold;
  position: relative;
  font-size: 31px !important;
  text-decoration: underline;

  &:hover::after {
    content: "${(props) => props.fullname}";
    position: absolute;
    left: 0;
    top: -20px;
    background-color: #333;
    color: white;
    padding: 5px;
    border-radius: 4px;
    font-size: 12px;
    white-space: nowrap;
  }
`;

export const Loading = styled(CircularProgress)`
  display: block !important;
  margin: 0 auto !important;
  max-width: 400px !important;
`;

export const Failed = styled(Typography)`
  margin: 0 auto !important;
  max-width: 400px !important;
`;

export const Text = styled(Typography)`
  word-wrap: break-word;
`;

export default CommentList;
