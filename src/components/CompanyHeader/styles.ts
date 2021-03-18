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
  align-items: flex-start;
  width: 18rem;

  ${(props: HeaderProps) => _getClickableProperties(props, theme)}

  @media (max-width: ${({ theme }) => theme.deviceWidth.mobile}) {
    align-items: center;
  }
`}
`

export const Title = styled.div`
${({ theme }) => css`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 1rem;

  > p {
    color: ${theme.colors.grey};
    font-size: ${theme.fontSizes.tiny};
  }
`}
`