import React, { forwardRef } from "react";
import { useDispatch } from "react-redux";
import { useField } from "formik";
import styled from "styled-components";

import { colors } from "theme";
import { actions } from "data";

const MyUrlInput = forwardRef((props, ref) => {
  const dispatch = useDispatch();
  const [field, meta] = useField(props);

  const focusHandler = () => {
    dispatch(actions.editorState.toggleEditorReadOnly(true));
  };
  const blurHandler = () => {
    dispatch(actions.editorState.toggleEditorReadOnly(false));
  };
  return (
    <InputContainer onFocus={focusHandler} onBlur={blurHandler}>
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
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray_light};
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
