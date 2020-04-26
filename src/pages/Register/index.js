import React from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";

import { actions } from "data";
import { MyTextInput, Button } from "components";
import { EditorLayout } from "layout";
import { colors } from "theme";

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
    <EditorLayout logo>
      <FormContainer>
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={yupValidationSchema}
        >
          <FormStyled>
            <LabelStyled>LOG IN</LabelStyled>
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
            <MyTextInput
              name="firstName"
              label="성"
              type="firstName"
              placeholder="성"
            />
            <MyTextInput
              name="lastName"
              label="이름"
              type="lastName"
              placeholder="이름"
            />
            <Controller>
              <LinkStyled to="/login">
                이미 가입하셨나요? 로그인하러 가기.
              </LinkStyled>
              <Button type="submit">가입하기</Button>
            </Controller>
          </FormStyled>
        </Formik>
      </FormContainer>
    </EditorLayout>
  );
}

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
`;

const FormStyled = styled(Form)`
  display: flex;
  flex-direction: column;
  height: 400px;
  justify-content: space-around;
`;

const LabelStyled = styled.label`
  font-size: 32px;
  margin-bottom: 10px;
  color: ${colors.yellow};
`;

const Controller = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const LinkStyled = styled(Link)`
  color: ${colors.gray_light};
  font-size: 16px;
  margin-right: 50px;
  text-decoration: none;
  cursor: pointer;
`;
