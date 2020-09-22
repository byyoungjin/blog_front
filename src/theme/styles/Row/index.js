import { css } from "styled-components";

export const rowDefault = css`
  display: flex;
  flex-direction: row;
`;

//align-items : flex-start
export const rowStart = css`
  ${rowDefault}
  align-items: flex-start;
`;
export const rowStartCenter = css`
  ${rowStart}
  justify-content: center;
`;
export const rowStartBetween = css`
  ${rowStart}
  justify-content: space-between;
`;
export const rowStartAround = css`
  ${rowStart}
  justify-content: space-around;
`;

//align-items : center
export const rowCenter = css`
  ${rowDefault}
  align-items: center;
`;
export const rowCenterCenter = css`
  ${rowCenter}
  justify-content: center;
`;
export const rowCenterBetween = css`
  ${rowCenter}
  justify-content: space-between;
`;
export const rowCenterAround = css`
  ${rowCenter}
  justify-content: space-around;
`;

//align-items : flex-end
export const rowEnd = css`
  ${rowDefault}
  align-items: flex-end;
`;
export const rowEndCenter = css`
  ${rowEnd}
  justify-content: center;
`;
export const rowEndBetween = css`
  ${rowEnd}
  justify-content: space-between;
`;
export const rowEndAround = css`
  ${rowEnd}
  justify-content: space-around;
`;
