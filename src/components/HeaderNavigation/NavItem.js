import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import toggle from "hocs/toggle";

function NavItem({ to, text, action }) {
  const onClickAnchor = e => {
    if (action) {
      e.preventDefault();
      e.stopPropagation();
      action();
    }
  };
  return (
    <StyledLi>
      <StyledLink to={to} onClick={onClickAnchor}>
        {text}
      </StyledLink>
    </StyledLi>
  );
}

const StyledLi = styled.li`
  color: black;
  font-weight: 800;
  font-size: 12px;
  line-height: 26px;
  :hover {
    cursor: pointer;
  }
  margin: 10px;
`;

const StyledLink = styled(Link)`
  color: #333;
  text-decoration: none;
  cursor: pointer;
`;

export default toggle(NavItem);
