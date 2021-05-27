import React, { lazy } from "react";
import { Switch, Route, useLocation } from "react-router-dom";
import {
  Home
  // MyPage,
  // PostWrite,
  // PostWriteTry,
  // PostDetail,
  // PostEdit,
  // AboutMe
} from "pages";

import Login from "pages/Login";
import Register from "pages/Register";

import { PublicRoute, PrivateRoute } from "routes";
import {
  DefaultLayout,
  EditorLayout,
  AboutMeLayout,
  BasicLayout
} from "layout";

const MyPage = lazy(() => import("pages/MyPage"));
const PostWrite = lazy(() => import("pages/PostWrite"));
const PostWriteTry = lazy(() => import("pages/PostWriteTry"));
const PostDetail = lazy(() => import("pages/PostDetail"));
const PostEdit = lazy(() => import("pages/PostEdit"));
const AboutMe = lazy(() => import("pages/AboutMe"));

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
      <PublicRoute path="/myPage" component={MyPage} layout={BasicLayout} />
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

      <PublicRoute path="/login" component={Login} layout={BasicLayout} />
      <PublicRoute path="/register" component={Register} layout={BasicLayout} />
    </Switch>
  );
}

export default App;
