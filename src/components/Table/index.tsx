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

export interface TableHeader {
  value: string;
  label: string;
}

export interface TableProps {
  tableHeader: TableHeader[],
  tableData: any[],
  showBottomBorder: boolean
  numberOfRows?: number,
  numberOfPages?: number,
  isTableLoading?: boolean,
  showRowHover?: boolean,
  verticalHeader?: boolean
  onPageChange?: (nextPageNumber: number) => void
  onRowClick?: (rowInfo: any) => void
}

const DASHBOARD_ANIMATION = {
  unMounted: { opacity: 0 },
  mounted: {
    opacity: 1,
  },
};


const Table: React.FC<TableProps> = ({ tableHeader, tableData, numberOfRows = 0, numberOfPages = 0, showBottomBorder, isTableLoading = false, showRowHover = false, verticalHeader = false, onPageChange, onRowClick }) => {

  const [currentPage, setCurrentPage] = useState<number>(1);

  const getKeys = () => {
    return Object.keys(tableData[0]);
  }

  const getHeader = () => {
    return (
      <tr>
        {tableHeader.map((header, index) => {
          return (
            <th key={index}>
              {header.label}
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
        <tr key={index} onClick={() => onRowClick && onRowClick(row)}>
          { keys.map((key: any, index: number) => {
            return (
              <td key={String(row[key]).concat(String(index))}>
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
    onPageChange && onPageChange(nextPage);
  }

  const handlePreviousPage = () => {
    const previousPage = currentPage - 1;

    if (previousPage < 1) {
      return;
    }

    setCurrentPage(previousPage);
    onPageChange&& onPageChange(previousPage);
  }

  const handleGoToPage = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    onPageChange && onPageChange(pageNumber);
  }

  const getVerticalTableData = (header: TableHeader, headerIndex: number) => {
    return (
      <tr key={headerIndex}>
        <th key={headerIndex}>{header.label}</th>
        { tableData.map((item, itemIndex) => {
          return (
            <td key={itemIndex}>{item[header.value]}</td>
          )
        })}
      </tr>
    )
  }

  return (
    <Container>
      { isTableLoading && <SpinnerContainer><Spinner /></SpinnerContainer>}
      { verticalHeader ? (
        <StyledTable
          showBottomBorder={showBottomBorder} 
          showRowHover={showRowHover}>
            <tbody>
              {
                tableHeader.map((header, index) => {
                  return getVerticalTableData(header, index)
                })
              }
            </tbody>
        </StyledTable>
      ): (
          <StyledTable
          variants={DASHBOARD_ANIMATION}
          initial="unMounted"
          animate="mounted"
          exit="unMounted"
          transition={{ duration: 1.0 }}
          showBottomBorder={showBottomBorder} 
          showRowHover={showRowHover}>
          <thead>
            {getHeader()}
          </thead>
          <tbody>
            {getRowsData()}
          </tbody>
        </StyledTable>
      )}
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