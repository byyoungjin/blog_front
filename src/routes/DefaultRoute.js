import React from "react";
import { Route } from "react-router-dom";

import useWhoAmI from "hooks/useWhoAmI";
import useModal from "hooks/useModal";
import Modal from "components/Modal";

export default function DefaultRoute({
  path,
  component: Component,
  layout: Layout,
  ...rest
}) {
  const whoAmIRemote = useWhoAmI();
  const { modalUp } = useModal();

  const route = (
    <Route
      {...rest}
      path={path}
      render={matchProps => (
        <Layout>
          <Component {...matchProps} {...rest} />
          <Modal modalUp={modalUp} />
        </Layout>
      )}
    />
  );

  return whoAmIRemote.cata({
    NotAsked: () => "loading",
    Loading: () => "loading",
    Failure: () => route,
    Success: () => route
  });
}
