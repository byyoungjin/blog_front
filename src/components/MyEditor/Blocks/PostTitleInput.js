import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { Formik, Form } from "formik";

import { actions, selectors } from "data";
import MyUrlInput from "components/Input/MyUrlInput";

export default function PostTitleInput() {
  const dispatch = useDispatch();

  const editorState = useSelector(selectors.editorState.getEditorState);
  const toggleReadOnly = bool => {
    dispatch(actions.editorState.toggleEditorReadOnly(bool));
  };

  const submitHandler = values => {
    dispatch(
      actions.editorState.replaceEntityData({ data: values.title, editorState })
    );
    toggleReadOnly(false);
  };

  const initialValues = {
    title: ""
  };
  return (
    <Formik initialValues={initialValues} onSubmit={submitHandler}>
      <Form>
        <MyUrlInput
          name="title"
          onFocus={toggleReadOnly.bind(this, true)}
          onBlur={toggleReadOnly.bind(this, false)}
          placeholder="제목"
        />
      </Form>
    </Formik>
  );
}
