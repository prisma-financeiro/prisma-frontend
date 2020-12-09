import styled, { css } from 'styled-components';

export const Header = styled.div`
display: flex;
flex-direction: row;
justify-content: start;
align-content: center;
margin: 10px 0 10px 10px;
`;

export const CompanyLogo = styled.img`
height: 5rem;
width: 5rem;
border-radius: 50%;
`
export const Title = styled.div`
${({ theme }) => css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 10px;

  > h1 {
    font-weight: 500;
    color: ${theme.colors.h1};
    font-size: ${theme.fontSizes.large};
  }

  > p {
    color: ${theme.colors.grey};
    font-size: ${theme.fontSizes.small};
  }
`}
`