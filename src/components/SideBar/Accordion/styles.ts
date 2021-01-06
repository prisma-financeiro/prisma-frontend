import styled, { css } from 'styled-components';

import Button from '../../Button';

export const Container = styled(Button)`
  && {
    ${({ theme }) => css`
      color: ${theme.colors.grey};
      font-size: ${theme.fontSizes.default};
      border-radius: 1.1rem;
      width: 100%;
      justify-content: flex-start;
      padding: 1.1rem 1.1rem;
      text-align: left;

      > div {
        :first-child {
          width: 2.5rem;
          height: 2.5rem;
          background: ${theme.colors.darkGrey};
          display: flex;
          justify-content: center;
          align-items: center;
          border-radius: 50%;
          margin-right: 1.2rem;

          svg {
            stroke: ${theme.colors.primary};
            color: ${theme.colors.primary};
            font-size: ${theme.fontSizes.large};
          }
        }
      }

      :hover {
        background: ${({ theme }) => theme.colors.greyLowerOpacity};
      }

      @media (max-width: 670px) {
        display: none;
      }
    `}
  }
`;
