import React, { useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";

import { Formik, Form } from "formik";

import { actions, selectors } from "data";
import MyUrlInput from "components/Input/MyUrlInput";

import { useFocus } from "../hooks";

export default function LinkInput() {
  const dispatch = useDispatch();
  const container = useFocus();

  const submitHandler = values => {
    const { url } = values;
    dispatch(actions.editorState.submitLinkInput(url));
  };

  const initialValues = {
    url: ""
  };

  return (
    <Formik initialValues={initialValues} onSubmit={submitHandler}>
      <Form>
        <MyUrlInput
          name="url"
          placeholder="Link 주소를 넣고 ENTER 키를 눌러주세요."
          ref={container}
        />
      </Form>
    </Formik>
  );
}
