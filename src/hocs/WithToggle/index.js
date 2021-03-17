import React from "react";

const toggle = WrappedComponent => props =>
  props.show ? <WrappedComponent {...props} /> : null;

export default toggle;
