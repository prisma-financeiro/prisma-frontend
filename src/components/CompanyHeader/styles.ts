import styled, { css } from 'styled-components';

interface HeaderProps {
  isClickable: boolean | false;
}

const _getClickableProperties = (props: HeaderProps, theme: any) => {
  return props.isClickable ? `
    :hover {
      background-color: ${theme.colors.greyLowerOpacity};
      cursor: pointer;
    }
  `: ``;
}

export const Header = styled.div`
${({ theme }) => css`
  display: flex;
  flex-direction: row;
  justify-content: start;
  align-items: center;
  min-width: 20rem;

  ${(props: HeaderProps) => _getClickableProperties(props, theme)}
`}
`

export const CompanyLogo = styled.img`
  height: 5rem;
  width: 5rem;
  border-radius: 50%;

  @media (max-width: ${({ theme }) => theme.deviceWidth.mobile}) {
    height: 3.5rem;
    width: 3.5rem;
  }
`
export const Title = styled.div`
${({ theme }) => css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 1rem;

  > p {
    color: ${theme.colors.grey};
    font-size: ${theme.fontSizes.small};
  }

  @media (max-width: ${({ theme }) => theme.deviceWidth.mobile}) {
    > p {
      font-size: ${theme.fontSizes.tiny};
    }
  }
`}
`