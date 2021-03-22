import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import { useDispatch } from "react-redux";

import { actions } from "data";
import colors from "theme/colors";
import { WithToggle, WithSelectable } from "hocs";

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
        WrappedComponent={() => <StyledA to={to}>{text}</StyledA>}
      />
    </Container>
  );
}

const Container = styled.div`
  margin: 10px 30px;
`;

const StyledA = styled.a`
  text-decoration: none;
  cursor: pointer;
  font-size: 20px;
  color: ${colors.yellow};
  margin: 10px 20px;

  @media (min-width: 600px) {
    font-size: 24px;
  }
`;

export default WithToggle(NavItemComp);
