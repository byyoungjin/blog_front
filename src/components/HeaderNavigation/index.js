import React from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";

import NavItem from "components/HeaderNavigation/NavItem";
import { actions } from "data";

export default function HeaderNavigation({ user }) {
  const dispatch = useDispatch();
  return (
    <Navigation>
      <NavItem text="로그인" to="/login" show={!user} />
      <NavItem
        text="로그아웃"
        to="/logout"
        action={() => dispatch(actions.user.logout())}
        show={user}
      />
      <NavItem text="회원가입" to="/register" show={!user} />
      <NavItem text="글쓰기" to="/postWrite" show={user} />
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
