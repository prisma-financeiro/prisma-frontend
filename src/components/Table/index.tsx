import React, { useState } from 'react';

import {
  Container,
  StyledTable,
  Pagination,
  PaginationButton,
  PaginationNextPrevButton,
  SpinnerContainer
} from './styles';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import Spinner from '../Spinner';

export interface TableProps {
  tableHeader: string[],
  tableData: any[],
  showBottomBorder: boolean
  numberOfRows: number,
  numberOfPages: number,
  isTableLoading: boolean,
  onPageChange: (nextPageNumber: number) => void
}

const DASHBOARD_ANIMATION = {
  unMounted: { opacity: 0 },
  mounted: {
    opacity: 1,
  },
};


const Table: React.FC<TableProps> = ({ tableHeader, tableData, numberOfRows, numberOfPages, showBottomBorder, isTableLoading, onPageChange }) => {

  const [currentPage, setCurrentPage] = useState<number>(1);

  const getKeys = () => {
    return Object.keys(tableData[0]);
  }

  const getHeader = () => {
    return (
      <tr>
        {tableHeader.map((key) => {
          return (
            <th key={key}>
              {key}
            </th>
          );
        })}
      </tr>
    )
  }

  const getRowsData = () => {
    const items = tableData;
    const keys = getKeys();
    return items.map((row, index) => {
      return (
        <tr key={index}>
          { keys.map((key: any) => {
            return (
              <td key={row[key]}>
                {row[key]}
              </td>
            );
          })
          }
        </tr>
      );
    });
  }

  const generatePaginationButtons = () => {
    if (tableData.length < numberOfRows) {
      return null;
    } else {

      const buttons = [];
      for (let index = 0; index < numberOfPages; index++) {
        buttons.push(
          <PaginationButton
            key={index}
            isCurrentPage={currentPage === index + 1}
            onClick={() => handleGoToPage(index + 1)}
          >
            {index + 1}
          </PaginationButton>
        );
      }

      return buttons;
    }
  }

  const handleNextPage = () => {
    const nextPage = currentPage + 1;

    if (nextPage > numberOfPages) {
      return;
    }

    setCurrentPage(nextPage);
    onPageChange(nextPage);
  }

  const handlePreviousPage = () => {
    const previousPage = currentPage - 1;

    if (previousPage < 1) {
      return;
    }

    setCurrentPage(previousPage);
    onPageChange(previousPage);
  }

  const handleGoToPage = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    onPageChange(pageNumber);
  }

  return (
    <Container>
      { isTableLoading && <SpinnerContainer><Spinner /></SpinnerContainer>}
      <StyledTable
        variants={DASHBOARD_ANIMATION}
        initial="unMounted"
        animate="mounted"
        exit="unMounted"
        transition={{ duration: 1.0 }}
        showBottomBorder={showBottomBorder} >
        <thead>
          {getHeader()}
        </thead>
        <tbody>
          {getRowsData()}
        </tbody>
      </StyledTable>
      {
        numberOfPages > 0 &&
        <Pagination>
          <PaginationNextPrevButton onClick={handlePreviousPage} key="previousButton">
            <FiChevronLeft />
          </PaginationNextPrevButton>
          {generatePaginationButtons()}
          <PaginationNextPrevButton onClick={handleNextPage} key="nextButton">
            <FiChevronRight />
          </PaginationNextPrevButton>
        </Pagination>
      }

    </Container>
  );
}

export default Table;