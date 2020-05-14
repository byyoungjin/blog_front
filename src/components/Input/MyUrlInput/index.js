import React, { forwardRef } from "react";
import { useField } from "formik";
import styled from "styled-components";

import { colors } from "theme";

const MyUrlInput = forwardRef((props, ref) => {
  const [field, meta] = useField(props);
  return (
    <InputContainer>
      <InputStyled ref={ref} {...field} {...props} />
      {meta.touched && meta.error && <Error> {meta.error}</Error>}
    </InputContainer>
  );
});

const InputContainer = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  width: 500px;

  font-size: 16px;
`;

const InputStyled = styled.input`
  width: 100%;
  outline: none;
  border: none;
  border-bottom: 1px solid red;
  border-radius: 10px;
  padding: 10px;
  background-color: lightgray;
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
