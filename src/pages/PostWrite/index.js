import React, { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";

import { actions } from "data";
import { MyEditor } from "components";

export default function PostWriteComp() {
  return <MyEditor />;
}
