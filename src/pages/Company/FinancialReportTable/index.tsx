import React, { useState, useEffect } from 'react';

import { company } from "../../../services";

import { Container, Card, TableScroll, TableColumnHeader, TableAccountName, TableColumnPercentual, TableColumnValue } from './styles';
import { FinancialReportType, SelectOptionType } from '../../../models';
import { formatSelectOptions, formatCashFlowTable } from '../utils';
import Table from '../../../components/Table';
import { formatCurrency } from '../../../utils';

interface FinancialReportTableProps {
  companyId: number;
  reportType: FinancialReportType;
}

interface TableContent {
  columns: any[],
  rows: any[]
}

enum PeriodType {
  Year = "a",
  Quarter = "t"
}

const FinancialReportTable: React.FC<FinancialReportTableProps> = ({ companyId, reportType }) => {

  const [tableData, setTableData] = useState<TableContent | null>(null);
  const [selectOptions, setSelectOptions] = useState<SelectOptionType[]>();

  useEffect(() => {
    switch (reportType) {
      case FinancialReportType.CASHFLOW:
        company.getCashFlowOptions(companyId)
          .then((data: any[]) => {
            if (data.length > 0) {
              const options = formatSelectOptions(data);
              setSelectOptions(options);
            }
          });

        company.getCashFlowData(companyId, PeriodType.Quarter, "2019", "2020")
          .then((data) => {
            const formatedTable = formatCashFlowTable(data, PeriodType.Quarter);
            console.log(formatedTable);
            setTableData(buildTableComponents(formatedTable));
          });
        break;
      default:
        break;
    }
  }, [companyId, reportType]);


  const buildTableComponents = (data: TableContent): TableContent => {
    if (!data) {
      return {
        rows: [],
        columns: []
      };
    }

    const formatedColumns: JSX.Element[] = [];
    data.columns.forEach((item: string) => {
      formatedColumns.push((
        <TableColumnHeader alignLeft={item === '#'}>
          {item}
        </TableColumnHeader>
      ))
    });

    const formatedRows: JSX.Element[] = [];
    data.rows.map((row: any) => {
      let formatedRow: any = {};
      for (const column in row) {

        const value: any = row[column];

        switch (value.type) {
          case 'string':
            formatedRow[column] = <TableAccountName root={value.root}>{value.data}</TableAccountName>;
            break;
          case 'value':
            formatedRow[column] = <TableColumnValue>{`${formatCurrency(Number(value.data))} MI`}</TableColumnValue>;
            break;
          case 'percentual':
            const percentual = Number(value.data);
            formatedRow[column] = (
              <TableColumnPercentual percentual={percentual}>
                {`${percentual} %`}
              </TableColumnPercentual>
            )
            break;
          default:
            break;
        }
      }
      return formatedRows.push(formatedRow);
    });

    return {
      columns: formatedColumns,
      rows: formatedRows
    }
  }

  return <Container>
    <Card>
      {tableData ? (
        <TableScroll>
          <Table
            tableHeader={tableData.columns}
            tableData={tableData.rows}
            numberOfRows={0}
            numberOfPages={0}
            showBottomBorder={true}
            onPageChange={() => { }}
            isTableLoading={false} />
        </TableScroll>
      ) : (
          <p>Sem informacoes</p>
        )}
    </Card>
  </Container>;
}

export default FinancialReportTable;