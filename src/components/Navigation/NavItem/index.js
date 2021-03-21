import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import { useDispatch } from "react-redux";

import { actions } from "data";
import colors from "theme/colors";
import { WithToggle, WithSelectable } from "hocs";

import LinkTransition from "../../LinkTransition";

function NavItemComp({ text, to }) {
  const dispatch = useDispatch();
  const pathname = window.location.pathname;
  console.log(`to`, to);
  const isSelected = pathname === to;

  const onClickHanlder = () => {
    dispatch(actions.routing.routeWithAnimation(to));
  };

  return (
    <Container>
      <WithSelectable
        isSelected={isSelected}
        onSelect={onClickHanlder}
        WrappedComponent={() => <NavItem to={to}>{text}</NavItem>}
      />
    </Container>
  );
}

const Container = styled.div`
  margin: 0 30px;
`;

const NavItem = styled.a`
  text-decoration: none;
  cursor: pointer;
  font-size: 24px;
  color: ${colors.yellow};
  margin: 20px 10px;
`;

export default WithToggle(NavItemComp);
