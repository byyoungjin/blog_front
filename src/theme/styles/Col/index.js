import { css } from "styled-components";

export const colDefault = css`
  display: flex;
  flex-direction: column;
`;

//align-items : flex-start
export const colStart = css`
  ${colDefault}
  align-items: flex-start;
`;
export const colStartCenter = css`
  ${colStart}
  justify-content: center;
`;
export const colStartBetween = css`
  ${colStart}
  justify-content: space-between;
`;
export const colStartAround = css`
  ${colStart}
  justify-content: space-around;
`;

//align-items : center
export const colCenter = css`
  ${colDefault}
  align-items: center;
`;
export const colCenterCenter = css`
  ${colCenter}
  justify-content: center;
`;
export const colCenterBetween = css`
  ${colCenter}
  justify-content: space-between;
`;
export const colCenterAround = css`
  ${colCenter}
  justify-content: space-around;
`;

//align-items : flex-end
export const colEnd = css`
  ${colDefault}
  align-items: flex-end;
`;
export const colEndCenter = css`
  ${colEnd}
  justify-content: center;
`;
export const colEndBetween = css`
  ${colEnd}
  justify-content: space-between;
`;
export const colEndAround = css`
  ${colEnd}
  justify-content: space-around;
`;
