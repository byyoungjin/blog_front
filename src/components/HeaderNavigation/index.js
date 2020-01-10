import React from "react";
import styled from "styled-components";

import NavItem from "components/HeaderNavigation/NavItem";

export default function HeaderNavigation() {
  return (
    <Navigation>
      <NavItem text="로그인" to="/login" />
      <NavItem text="회원가입" to="/register" />
      <NavItem text="글쓰기" to="/postWrite" />
    </Navigation>
  );
}

const Navigation = styled.ul`
  display: flex;
  align-items: center;
  background-color: #f6f9fc;
  list-style-type: none;
  height: 30px;
  margin: 0;
  padding: 0;
`;
