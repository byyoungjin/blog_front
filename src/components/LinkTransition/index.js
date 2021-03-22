import React from "react";
import { useDispatch } from "react-redux";

import { actions } from "data";

export default function LinkTransition({ to, children, className }) {
  const dispatch = useDispatch();

  const onClickHanlder = () => {
    dispatch(actions.routing.routeWithAnimation(to));
  };

  return (
    <a onClick={onClickHanlder} className={className}>
      {children}
    </a>
  );
}
