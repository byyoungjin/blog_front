import React from "react";
import { Switch, Route } from "react-router-dom";
import { ConnectedRouter } from "connected-react-router";

import Login from "pages/Login";
import Register from "pages/Register";
import { Home, MyPage, PostWrite } from "pages";
import { DefaultRoute, UserRoute } from "routes";
import { DefaultLayout, EditorLayout } from "layout";

function App({ history }) {
  return (
    <ConnectedRouter history={history}>
      <Switch>
        <DefaultRoute exact path="/" component={Home} layout={DefaultLayout} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <DefaultRoute
          path="/myPage"
          component={MyPage}
          layout={DefaultLayout}
        />
        {/* <Route path="/postDetail/:postId" component={PostDetail} /> */}
        <UserRoute
          path="/postWrite"
          component={PostWrite}
          layout={EditorLayout}
        />
        {/* <Route path="/postUpdate/:postId" component={PostUpdate} /> */}
      </Switch>
    </ConnectedRouter>
  );
}

export default App;
