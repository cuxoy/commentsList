import React from "react";
import CommentList from "./Components/CommentList";
import CommentForm from "./Components/CommentForm";
import "./App.css";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <CommentForm />
        <CommentList />
      </header>
    </div>
  );
}

export default App;
