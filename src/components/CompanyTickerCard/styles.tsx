import styled, { css } from 'styled-components';

export const Container = styled.div`
${({ theme }) => css`
    background: ${theme.colors.lightGrey};
    width: 120px;
    height: 120px;
    border-radius: 5px;
  `}
`;
