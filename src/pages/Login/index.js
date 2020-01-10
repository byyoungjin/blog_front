import React from "react";
import styled from "styled-components";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

import apis from "api";

export default function Login() {
  const initialValues = {
    emailAddress: "",
    password: ""
  };
  const onSubmit = values => {
    apis.authApi.login(values).then(res => console.log("res", res));
  };
  const yupValidationSchema = Yup.object({
    emailAddress: Yup.string()
      .email("유효하지 않은 이메일 입니다.")
      .required("필수 항목입니다."),
    password: Yup.string()
      .min(5, "비밀번호는 5글자 이상이어야 합니다.")
      .max(20, "비밀번호는 20글자 이하이어야 합나다.")
      .required("필수 항목입니다.")
  });
  return (
    <StyledFormContainer>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={yupValidationSchema}
      >
        <Form>
          <Field name="emailAddress" type="email" placeholder="이메일" />
          <ErrorMessage name="emailAddress" />
          <Field name="password" type="password" placeholder="비밀번호" />
          <ErrorMessage name="password" />
          <StyledButton type="submit">로그인</StyledButton>
        </Form>
      </Formik>
    </StyledFormContainer>
  );
}

const StyledFormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  justify-contents: center;
`;

const StyledButton = styled.button``;
