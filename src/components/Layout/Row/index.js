import styled from "styled-components";

export const Default = styled.div`
  flex: ${({ flex }) => flex};
  height: ${({ height }) => height};
  width: ${({ width }) => width};
  ${({ theme }) => theme.styles.rowDefault}
`;

export const Start = styled(Default)`
  ${({ theme }) => theme.styles.rowStart}
`;
export const StartCenter = styled(Start)`
  ${({ theme }) => theme.styles.rowStartCenter}
`;
export const StartBetween = styled(Start)`
  ${({ theme }) => theme.styles.rowStartBetween}
`;
export const StartAround = styled(Start)`
  ${({ theme }) => theme.styles.rowStartAround}
`;

export const Center = styled(Default)`
  ${({ theme }) => theme.styles.rowCenter}
`;
export const CenterCenter = styled(Center)`
  ${({ theme }) => theme.styles.rowCenterCenter}
`;
export const CenterBetween = styled(Center)`
  ${({ theme }) => theme.styles.rowCenterBetween}
`;
export const CenterAround = styled(Center)`
  ${({ theme }) => theme.styles.rowCenterAround}
`;

export const End = styled(Default)`
  ${({ theme }) => theme.styles.rowEnd}
`;
export const EndCenter = styled(End)`
  ${({ theme }) => theme.styles.rowEndCenter}
`;
export const EndBetween = styled(End)`
  ${({ theme }) => theme.styles.rowEndBetween}
`;
export const EndAround = styled(End)`
  ${({ theme }) => theme.styles.rowEndAround}
`;
