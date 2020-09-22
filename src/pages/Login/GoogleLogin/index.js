import React from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import GoogleLogin from "react-google-login";

import { actions } from "data";
import { googleKey } from "config";

export default function GoogleLoginComponent() {
  const dispatch = useDispatch();

  const onSuccess = googleUser => {
    const { googleId, profileObj } = googleUser;
    console.log("googleUser", googleUser);
    dispatch(
      actions.user.loginSocial({
        providerKey: googleId,
        providerType: "google",
        userLoginType: "social",
        firstName: profileObj.givenName,
        lastName: profileObj.familyName,
        userSmallImageUrl: profileObj.imageUrl
      })
    );
  };

  const onFailure = error => {
    console.log(error);
  };
  console.log("googleKey", googleKey);
  return (
    <StyledGoogleLogin
      clientId={googleKey.googleOAuthClientId}
      buttonText="GOOGLE 로그인"
      onSuccess={onSuccess}
      onFailure={onFailure}
      cookiePolicy={"single_host_origin"}
    />
  );
}

const StyledGoogleLogin = styled(GoogleLogin)`
  text-align: center;
`;
