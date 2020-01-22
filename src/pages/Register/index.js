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
        <StyledForm>
          <StyledLabel>REGISTER</StyledLabel>
          <StyledField name="emailAddress" type="email" placeholder="이메일" />
          <ErrorMessage name="emailAddress" />
          <StyledField name="password" type="password" placeholder="비밀번호" />
          <ErrorMessage name="password" />
          <StyledField name="firstName" type="firstName" placeholder="성" />
          <ErrorMessage name="firstName" />
          <StyledField name="lastName" type="lastName" placeholder="이름" />
          <ErrorMessage name="lastName" />
          <StyledButton type="submit">가입</StyledButton>
        </StyledForm>
      </Formik>
    </StyledFormContainer>
  );
}

const StyledFormContainer = styled.div`
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  justify-content: center;
`;

const StyledLabel = styled.label`
  font-size: 30px;
  margin-bottom: 10px;
`;

const StyledForm = styled(Form)`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyledField = styled(Field)`
  width: 400px;
  margin-bottom: 10px;
  height: auto;
  font-size: 20px;
`;

const StyledButton = styled.button`
  width: 100px;
`;
