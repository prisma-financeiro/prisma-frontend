import styled, { css } from 'styled-components';

interface HeaderProps {
  isClickable: boolean | false;
}

const _getClickbleProperties = (props: HeaderProps, theme: any) => {
  return props.isClickable ? `
    :hover {
      background-color: ${theme.colors.greyLowerOpacity};
      cursor: pointer;
    }
  `: '';
}

export const Header = styled.div`
${({ theme }) => css`
  display: flex;
  flex-direction: row;
  justify-content: start;
  align-content: center;

  ${(props: HeaderProps) => _getClickbleProperties(props, theme)}
`}
`

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
  margin-left: 1rem;

  > p {
    color: ${theme.colors.grey};
    font-size: ${theme.fontSizes.small};
  }
`}
`