import React, { forwardRef } from "react";
import { useDispatch } from "react-redux";
import { useField } from "formik";
import styled from "styled-components";

import { colors } from "theme";
import { actions } from "data";

const MyUrlInput = forwardRef((props, ref) => {
  const dispatch = useDispatch();
  const [field, meta] = useField(props);
  const toggleReadOnly = bool => {
    dispatch(actions.editorState.toggleEditorReadOnly(bool));
  };
  return (
    <InputContainer
      onFocus={toggleReadOnly.bind(this, true)}
      onBlur={toggleReadOnly.bind(this, false)}
    >
      <InputStyled ref={ref} {...field} {...props} />
      {meta.touched && meta.error && <Error> {meta.error}</Error>}
    </InputContainer>
  );
});

const InputContainer = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  width: 100%;
  font-size: 16px;
`;

const InputStyled = styled.input`
  width: 100%;
  outline: none;
  border: none;
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray_1};
  padding: 10px;
`;

const Error = styled.div`
  position: absolute;
  margin-left: 30px;
  left: 500px;
  font-size: 16px;
  width: 300px;
  color: ${colors.yellow};
`;
export default MyUrlInput;
