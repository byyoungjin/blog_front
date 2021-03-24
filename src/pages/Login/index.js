import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";

import { actions, selectors } from "data";
import { MyTextInput, Button } from "components";
import { EditorLayout } from "layout";
import { colors } from "theme";
import { Row } from "components/Layout";

import GoogleLogin from "./GoogleLogin";

export default function Login() {
  const dispatch = useDispatch();
  const loginStatus = useSelector(selectors.user.getLoginStatus);

  const initialValues = {
    emailAddress: "",
    password: ""
  };
  const onSubmit = values => dispatch(actions.user.loginTraditional(values));
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
    <FormContainer>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={yupValidationSchema}
      >
        <FormStyled>
          <LabelStyled>LOG IN</LabelStyled>
          <GoogleLogin />
          <Seperator>or</Seperator>
          <MyTextInput
            name="emailAddress"
            label="이메일"
            type="email"
            placeholder="이메일"
          />
          <MyTextInput
            name="password"
            label="비밀번호"
            type="password"
            placeholder="비밀번호"
          />
          {loginStatus.error && (
            <ErrorMesssage> {loginStatus.error.message}</ErrorMesssage>
          )}
          <RouteController>
            <LinkStyled to="/register">처음이신가요? 가입하러가기.</LinkStyled>
            <Button type="submit">로그인</Button>
          </RouteController>
        </FormStyled>
      </Formik>
    </FormContainer>
  );
}

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 10vh;
`;

const FormStyled = styled(Form)`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 400px;
  justify-content: space-around;
`;

const LabelStyled = styled.label`
  font-size: 32px;
  margin-bottom: 10px;
  align-self: center;
  color: ${colors.yellow};

  @media (min-width: 600px) {
    align-items: flex-start;
  }
`;

const RouteController = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const LinkStyled = styled(Link)`
  color: ${colors.gray_light};
  font-size: 12px;
  margin-right: 10px;
  text-decoration: none;
  cursor: pointer;

  @media (min-width: 600px) {
    font-size: 16px;
    margin-right: 50px;
  }
`;

const Seperator = styled(Row.CenterCenter)`
  font-size: 24px;
`;

const ErrorMesssage = styled.div`
  color: ${({ theme }) => theme.colors.pink};
`;
