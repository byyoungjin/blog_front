import React, { Suspense } from "react";
import { Route } from "react-router-dom";

import useWhoAmI from "hooks/useWhoAmI";
import { PulseLoading } from "components";

export default function PublciRoute({
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
        <Suspense fallback={<PulseLoading />}>
          <Layout>
            <Component {...matchProps} {...rest} />
          </Layout>
        </Suspense>
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
