import React from "react";
import { Route, Redirect } from "react-router-dom";

import useWhoAmI from "hooks/useWhoAmI";
import { useModal } from "hooks/useModal";
import Modal from "components/Modal";

export default function UserRoute({
  path,
  component: Component,
  layout: Layout,
  ...rest
}) {
  const whoAmIRemote = useWhoAmI();
  const { modal } = useModal();

  const route = (
    <Route
      {...rest}
      path={path}
      render={matchProps => (
        <Layout>
          <Component {...matchProps} {...rest} />
          <Modal modal={modal} />
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
