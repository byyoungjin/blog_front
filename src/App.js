import React from "react";
import { Switch, Route } from "react-router-dom";
import { ConnectedRouter } from "connected-react-router";

import Login from "pages/Login";
import Register from "pages/Register";
import { Home, MyPage, PostWrite, PostDetail, PostEdit } from "pages";
import { PublicRoute, PrivateRoute } from "routes";
import { DefaultLayout, EditorLayout } from "layout";
import ErrorBoundary from "pages/ErrorBoundary";

function App({ history }) {
  return (
    <ErrorBoundary>
      <ConnectedRouter history={history}>
        <Switch>
          <PublicRoute exact path="/" component={Home} layout={DefaultLayout} />
          <PublicRoute
            path="/postDetail/:postId"
            component={PostDetail}
            layout={EditorLayout}
          />
          <PublicRoute
            path="/myPage"
            component={MyPage}
            layout={DefaultLayout}
          />

          <PrivateRoute
            path="/postWrite"
            component={PostWrite}
            layout={EditorLayout}
          />

          <PrivateRoute
            path="/postEdit/:postId"
            component={PostEdit}
            layout={EditorLayout}
          />

          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
        </Switch>
      </ConnectedRouter>
    </ErrorBoundary>
  );
}

export default App;
