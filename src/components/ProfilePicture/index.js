import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import { colors } from "theme";
import Anonymous from "./anonymous.svg";
const anonymous = process.env.PUBLIC_URL + "/icons/anonymous.svg";

function ProfilePicture({ src, diameter }) {
  const imgSrc = src ? src : anonymous;
  return (
    <Link to="/myPage">
      <ProfileRound src={imgSrc} diameter={diameter} />
    </Link>
  );
}

const ProfileRound = styled.img`
  width: ${({ diameter }) => diameter};
  height: ${({ diameter }) => diameter};
  border-radius: 50%;
  background-size: cover;
  border: 3px solid ${colors.blue_dark};
  backgroud-color: ${colors.yellow};
`;

export default ProfilePicture;
