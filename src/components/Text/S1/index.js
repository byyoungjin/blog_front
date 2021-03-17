import React from "react";
import styled from "styled-components";

import { theme } from "theme";
import { WithSelectable } from "hocs";

export function S1({ children, style, ...rest }) {
  return (
    <Text style={style} {...rest}>
      {children}
    </Text>
  );
}

export const S1Selectable = ({
  children,
  style,
  isSelected,
  onSelect,
  ...rest
}) => {
  const SelectableText = () => (
    <S1 style={{ ...style }} {...rest}>
      {children}
    </S1>
  );
  return (
    <WithSelectable
      isSelected={isSelected}
      onSelect={onSelect}
      WrappedComponent={SelectableText}
    />
  );
};

const Text = styled.span`
  color: ${theme["color-basic-500"]};
`;
