import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import Home from "pages/Home";
import PostDetail from "pages/PostDetail";
import PostWrite from "pages/PostWrite";
import Login from "pages/Login";
import Register from "pages/Register";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/postDetail" component={PostDetail} />
        <Route path="/postWrite" component={PostWrite} />
      </Switch>
    </Router>
  );
}

export default App;
