import React, { useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";

import { Formik, Form } from "formik";

import { actions } from "data";
import MyUrlInput from "components/Input/MyUrlInput";
import YouTubeVideo from "components/MyEditor/Blocks/YouTubeVideo";

export default function YouTube() {
  const dispatch = useDispatch();
  const [src, setSrc] = useState(false);
  const toggleReadOnly = bool => {
    dispatch(actions.editorState.toggleEditorReadOnly(bool));
  };

  const submitHandler = values => {
    setSrc(values.url);
    toggleReadOnly(false);
  };

  const initialValues = {
    url: ""
  };
  return src ? (
    <YouTubeVideo src={src} />
  ) : (
    <>
      <Formik initialValues={initialValues} onSubmit={submitHandler}>
        <Form>
          <MyUrlInput
            name="url"
            onFocus={toggleReadOnly.bind(this, true)}
            onBlur={toggleReadOnly.bind(this, false)}
            placeholder="YouTube 링크를 붙여넣고 ENTER 키를 눌러주세요."
          />
        </Form>
      </Formik>
    </>
  );
}

const Container = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
`;

const Button = styled.button`
  width: 100px;
`;
