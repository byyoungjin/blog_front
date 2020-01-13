import React from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

import apis from "api";
import { actions } from "data";

export default function Register() {
  const dispatch = useDispatch();
  const initialValues = {
    emailAddress: "",
    password: "",
    firstName: "",
    lastName: ""
  };
  const onSubmit = values => dispatch(actions.user.register(values));
  const yupValidationSchema = Yup.object({
    emailAddress: Yup.string()
      .email("유효하지 않은 이메일 입니다.")
      .required("필수 항목입니다."),
    password: Yup.string()
      .min(5, "비밀번호는 5글자 이상이어야 합니다.")
      .max(20, "비밀번호는 20글자 이하이어야 합나다.")
      .required("필수 항목입니다."),
    firstName: Yup.string().required("필수 항목입니다."),
    lastName: Yup.string().required("필수 항목입니다.")
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
          <Field name="firstName" type="firstName" placeholder="성" />
          <ErrorMessage name="firstName" />
          <Field name="lastName" type="lastName" placeholder="이름" />
          <ErrorMessage name="lastName" />
          <StyledButton type="submit">가입</StyledButton>
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
