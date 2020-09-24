import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Formik, Form } from "formik";

import { actions, selectors } from "data";
import MyUrlInput from "components/Input/MyUrlInput";

import { useFocus } from "../hooks";

export default function YouTube() {
  const dispatch = useDispatch();
  const container = useFocus();

  const submitHandler = values => {
    const { url } = values;
    dispatch(actions.editorState.submitYoutubeInput(url));
  };

  const initialValues = {
    url: ""
  };

  return (
    <Formik initialValues={initialValues} onSubmit={submitHandler}>
      <Form>
        <MyUrlInput
          name="url"
          placeholder="YouTube 링크를 붙여넣고 ENTER 키를 눌러주세요."
          ref={container}
        />
      </Form>
    </Formik>
  );
}
