import React, { useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";

import { Formik, Form } from "formik";

import { actions } from "data";
import MyUrlInput from "components/Input/MyUrlInput";
import SplashSelect from "components/MyEditor/Blocks/SplashSelect";

import { useFocus } from "../hooks";

export default function SplashSearch() {
  const dispatch = useDispatch();
  const [images, setImages] = useState(false);
  const container = useFocus();

  const submitHandler = async values => {
    const { keyword } = values;
    dispatch(actions.editorState.submitSplashInput({ keyword, setImages }));
  };

  const initialValues = {
    keyword: ""
  };
  return images ? (
    <SplashSelect images={images} />
  ) : (
    <Formik initialValues={initialValues} onSubmit={submitHandler}>
      <Form>
        <MyUrlInput
          name="keyword"
          placeholder="keyword 를 입력하고 ENTER 키를 눌러주세요."
          ref={container}
        />
      </Form>
    </Formik>
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
