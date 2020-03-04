import React from "react";
import { Switch, Route } from "react-router-dom";
import { ConnectedRouter } from "connected-react-router";
import PostDetail from "pages/PostDetail";
import PostWrite from "pages/PostWrite";
import Login from "pages/Login";
import Register from "pages/Register";
import PostUpdate from "pages/PostUpdate";

import { Home, MyPage } from "pages";

function App({ history }) {
  return (
    <ConnectedRouter history={history}>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/myPage" component={MyPage} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/postDetail/:postId" component={PostDetail} />
        <Route path="/postWrite" component={PostWrite} />
        <Route path="/postUpdate/:postId" component={PostUpdate} />
      </Switch>
    </ConnectedRouter>
  );
}

export default App;
