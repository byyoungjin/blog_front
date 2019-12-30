import React from "react";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import "./App.css";
import Home from "pages/Home";
import PostDetail from "pages/PostDetail";
import PostWrite from "pages/PostWrite";
import Login from "pages/Login";

function App() {
  return (
    <Router>
      <Switch>
        <Home path="/" />
        <Login path="/login" />
        <PostDetail path="/postDetail" />
        <PostWrite path="/postWrite" />
      </Switch>
    </Router>
  );
}

export default App;
