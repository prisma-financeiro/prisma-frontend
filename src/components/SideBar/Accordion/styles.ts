import styled, { css } from 'styled-components';

import Button from '../../Button';

export const Container = styled(Button)`
  && {
    ${({ theme }) => css`
      color: ${theme.colors.grey};
      font-size: ${theme.fontSizes.default};
      font-weight: bold;
      border-radius: 1.1rem;
      width: 100%;
      justify-content: flex-start;
      padding: 1.1rem 1.1rem;

      // :not(:last-child) {
      //   border-bottom: 0.1rem solid ${theme.colors.lightGrey};
      // }

      > div {
        :first-child {
          width: 3.2rem;
          height: 3.2rem;
          background: ${theme.colors.lightGrey};
          display: flex;
          justify-content: center;
          align-items: center;
          border-radius: 50%;
          margin-right: 1.2rem;

          svg {
            stroke: ${theme.colors.primary};
          }
        }
      }

      > svg {
        margin-left: auto;
      }

      :hover {
        background: ${({ theme }) => theme.colors.background};
      }

      @media (max-width: 670px) {
        display: none;
      }
    `}
  }
`;
