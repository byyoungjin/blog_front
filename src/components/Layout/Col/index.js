import styled from "styled-components";

export const Default = styled.div`
  flex: ${({ flex }) => flex};
  height: ${({ height }) => height};
  width: ${({ width }) => width};
  ${({ theme }) => theme.styles.colDefault}
`;

export const Start = styled(Default)`
  ${({ theme }) => theme.styles.colStart}
`;
export const StartCenter = styled(Start)`
  ${({ theme }) => theme.styles.colStartCenter}
`;
export const StartBetween = styled(Start)`
  ${({ theme }) => theme.styles.colStartBetween}
`;
export const StartAround = styled(Start)`
  ${({ theme }) => theme.styles.colStartAround}
`;

export const Center = styled(Default)`
  ${({ theme }) => theme.styles.colCenter}
`;
export const CenterCenter = styled(Center)`
  ${({ theme }) => theme.styles.colCenterCenter}
`;
export const CenterBetween = styled(Center)`
  ${({ theme }) => theme.styles.colCenterBetween}
`;
export const CenterAround = styled(Center)`
  ${({ theme }) => theme.styles.colCenterAround}
`;

export const End = styled(Default)`
  ${({ theme }) => theme.styles.colEnd}
`;
export const EndCenter = styled(End)`
  ${({ theme }) => theme.styles.colEndCenter}
`;
export const EndBetween = styled(End)`
  ${({ theme }) => theme.styles.colEndBetween}
`;
export const EndAround = styled(End)`
  ${({ theme }) => theme.styles.colEndAround}
`;
