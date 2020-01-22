import React from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

import { actions } from "data";

export default function Login() {
  const dispatch = useDispatch();

  const initialValues = {
    emailAddress: "",
    password: ""
  };
  const onSubmit = values => dispatch(actions.user.login(values));
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
        <StyledForm>
          <StyledLabel>LOG IN</StyledLabel>
          <StyledField name="emailAddress" type="email" placeholder="이메일" />
          <ErrorMessage name="emailAddress" />
          <StyledField name="password" type="password" placeholder="비밀번호" />
          <ErrorMessage name="password" />
          <StyledButton type="submit">로그인</StyledButton>
        </StyledForm>
      </Formik>
    </StyledFormContainer>
  );
}
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

const StyledFormContainer = styled.div`
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  justify-content: center;
`;

const StyledButton = styled.button`
  width: 100px;
`;
