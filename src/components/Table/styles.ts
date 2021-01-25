import styled, { css } from 'styled-components';
import { ButtonHTMLAttributes } from 'react';
import { motion } from 'framer-motion';

interface TableStylingProps {
  showBottomBorder: boolean;
  showRowHover: boolean;
}

interface PaginationButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isCurrentPage: boolean;
}

export const Container = styled.div`
  ${({ theme }) => css`
    height: 100%;
    width: 100%;
    position: relative;
  `}
`;

export const StyledTable = styled(motion.table) <TableStylingProps>`
  ${({ theme, showBottomBorder, showRowHover }) => css`
    font-size: ${theme.fontSizes.default};
    border-collapse: collapse;
    width: 100%;
  
    thead {
      font-size: ${theme.fontSizes.xlarge}
    }

    tbody {
      tr {
        :hover {
          background-color: ${showRowHover ? theme.colors.greyLowerOpacity: 'none'};
          cursor: ${showRowHover ? 'pointer' : 'default'};
        }

        :last-child {
          td {
            border-bottom: 0;
          }
        }
      }
    }

    th,
    td {
      padding: 0.5rem;
      text-align: left;
      border-bottom: ${showBottomBorder ? `1px solid` + theme.colors.greyLowerOpacity : 'none'};

      :last-child {
        border-right: 0;
      }
    }

    @media (max-width: ${({ theme }) => theme.deviceWidth.mobile}) {
      thead {
        font-size: ${theme.fontSizes.default}
      }
    }
  `}
`;

export const Pagination = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: row;
    justify-content: center;
    width: 100%;
  `}
`;

export const PaginationButton = styled.button<PaginationButtonProps>`
  ${({ theme, isCurrentPage }) => css`
    margin: 0.5rem;
    height: 4rem;
    min-width: 3rem;
    width: 4rem;
    cursor: pointer;
    border-radius: ${theme.radio.small};
    background-color: ${isCurrentPage ? theme.colors.primary : theme.colors.secondary};
    color: ${isCurrentPage ? theme.colors.lightGrey : theme.colors.darkGrey};
  `}
`;

export const PaginationNextPrevButton = styled.button`
  ${({ theme }) => css`
    margin: 0.5rem;
    height: 4rem;
    width: 4rem;
    color: ${theme.colors.primary};
    background-color: transparent;
    cursor: pointer;
    font-size: ${theme.fontSizes.xlarge};
  `}
`;

export const SpinnerContainer = styled.div`
  ${({ theme }) => css`
    position: absolute;
    border-radius: ${theme.radio.small};
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 100%;
    -webkit-backdrop-filter: blur(4px);
    backdrop-filter: blur(4px);
    background-color: rgba(0, 0, 0, 0.1);
  `}
`;