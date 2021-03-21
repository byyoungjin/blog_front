import React from "react";
import { Switch, Route, useLocation } from "react-router-dom";

import Login from "pages/Login";
import Register from "pages/Register";
import {
  Home,
  MyPage,
  PostWrite,
  PostWriteTry,
  PostDetail,
  PostEdit,
  AboutMe
} from "pages";
import { PublicRoute, PrivateRoute } from "routes";
import { DefaultLayout, EditorLayout, AboutMeLayout } from "layout";

function App() {
  const location = useLocation();

  return (
    <Switch location={location}>
      <PublicRoute exact path="/" component={Home} layout={DefaultLayout} />
      <PublicRoute
        path="/postDetail/:postId"
        component={PostDetail}
        layout={EditorLayout}
      />
      <PublicRoute path="/myPage" component={MyPage} layout={DefaultLayout} />
      <PublicRoute path="/about" component={AboutMe} layout={AboutMeLayout} />

      <PrivateRoute
        path="/postWrite"
        component={PostWrite}
        layout={EditorLayout}
      />
      <PublicRoute
        path="/postWriteTry"
        component={PostWriteTry}
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
  );
}

export default App;
