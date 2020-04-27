import React, { useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";

import { Formik, Form } from "formik";

import { actions } from "data";
import api from "api";
import MyUrlInput from "components/Input/MyUrlInput";
import SplashSelect from "components/MyEditor/Blocks/SplashSelect";

export default function SplashSearch() {
  const dispatch = useDispatch();
  const [images, setImages] = useState(false);
  const toggleReadOnly = bool => {
    dispatch(actions.editorState.toggleEditorReadOnly(bool));
  };

  const submitHandler = async values => {
    const { keyword } = values;
    const res = await api.unSplashApi.getPhotos({ keyword });
    const data = res.data;
    setImages(data);
    toggleReadOnly(false);
  };

  const initialValues = {
    keyword: ""
  };
  return images ? (
    <SplashSelect images={images} />
  ) : (
    <>
      <Formik initialValues={initialValues} onSubmit={submitHandler}>
        <Form>
          <MyUrlInput
            name="keyword"
            onFocus={toggleReadOnly.bind(this, true)}
            onBlur={toggleReadOnly.bind(this, false)}
            placeholder="keyword 를 입력하고 ENTER 키를 눌러주세요."
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
