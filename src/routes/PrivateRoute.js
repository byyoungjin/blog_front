import React from "react";
import { Route, Redirect } from "react-router-dom";

import useWhoAmI from "hooks/useWhoAmI";
import Modal from "components/Modal";

export default function UserRoute({
  path,
  component: Component,
  layout: Layout,
  ...rest
}) {
  const whoAmIRemote = useWhoAmI();

  const route = (
    <Route
      {...rest}
      path={path}
      render={matchProps => (
        <Layout>
          <Component {...matchProps} {...rest} />
          <Modal />
        </Layout>
      )}
    />
  );

  return whoAmIRemote.cata({
    NotAsked: () => "loading",
    Loading: () => "loading",
    Failure: () => <Redirect to="/" from="" />,
    Success: () => route
  });
}
