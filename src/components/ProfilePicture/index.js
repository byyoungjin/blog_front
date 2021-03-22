import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { Link } from "react-router-dom";

import { colors } from "theme";
import { selectors } from "data";
const anonymous = process.env.PUBLIC_URL + "/images/default_user_image.svg";

function ProfilePicture({ src, diameter }) {
  const { userSmallImageUrl } = useSelector(selectors.user.getUserSession);
  const imgSrc = userSmallImageUrl ? userSmallImageUrl : anonymous;
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
  border: 3px solid ${colors.blue_light};
  background-color: ${colors.yellow};
  margin: 10px;
`;

export default ProfilePicture;
