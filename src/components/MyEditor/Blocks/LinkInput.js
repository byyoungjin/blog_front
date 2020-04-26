import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import { Formik, Form } from "formik";

import { actions, selectors } from "data";
import MyUrlInput from "components/Input/MyUrlInput";

export default function LinkInput() {
  const dispatch = useDispatch();
  const editorState = useSelector(selectors.editorState.getEditorState);

  const submitHandler = values => {
    const { url } = values;
    dispatch(actions.editorState.toggleLink({ editorState, url }));
    dispatch(actions.editorState.toggleIsLinkInput(false));
    toggleReadOnly(false);
  };

  const toggleReadOnly = bool => {
    dispatch(actions.editorState.toggleEditorReadOnly(bool));
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
          onFocus={toggleReadOnly.bind(this, true)}
          onBlur={toggleReadOnly.bind(this, false)}
        />
      </Form>
    </Formik>
  );
}
