import React from "react";
import { Switch, Route } from "react-router-dom";
import { ConnectedRouter } from "connected-react-router";

import Login from "pages/Login";
import Register from "pages/Register";
import { Home, MyPage, PostWrite, PostDetail, PostEdit } from "pages";
import { DefaultRoute, UserRoute } from "routes";
import { DefaultLayout, EditorLayout } from "layout";
import ErrorBoundary from "pages/ErrorBoundary";

function App({ history }) {
  return (
    <ErrorBoundary>
      <ConnectedRouter history={history}>
        <Switch>
          <DefaultRoute
            exact
            path="/"
            component={Home}
            layout={DefaultLayout}
          />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <DefaultRoute
            path="/myPage"
            component={MyPage}
            layout={DefaultLayout}
          />
          <UserRoute
            path="/postWrite"
            component={PostWrite}
            layout={EditorLayout}
          />
          <DefaultRoute
            path="/postDetail/:postId"
            component={PostDetail}
            layout={EditorLayout}
          />
          <UserRoute
            path="/postEdit/:postId"
            component={PostEdit}
            layout={EditorLayout}
          />
          {/* <Route path="/postUpdate/:postId" component={PostUpdate} /> */}
        </Switch>
      </ConnectedRouter>
    </ErrorBoundary>
  );
}

export default App;
