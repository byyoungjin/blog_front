import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import Home from "pages/Home";
import PostDetail from "pages/PostDetail";
import PostWrite from "pages/PostWrite";
import Login from "pages/Login";
import HeaderImage from "components/HeaderImage";

function App() {
  return (
    <Router>
      <HeaderImage />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/postDetail" component={PostDetail} />
        <Route path="/postWrite" component={PostWrite} />
      </Switch>
    </Router>
  );
}

export default App;
