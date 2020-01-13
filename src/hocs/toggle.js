import React from "react";

export default function toggle(WrappedComponent) {
  return function toggledComponent(props) {
    return props.show ? <WrappedComponent {...props} /> : false;
  };
}
