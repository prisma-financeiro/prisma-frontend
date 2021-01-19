import React, { useState, useEffect } from 'react';

import { company } from "../../../services";
import { formatSelectOptions, formatCashFlowTable } from '../utils';
import { formatCurrency } from '../../../utils';
import Table from '../../../components/Table';
import Select from '../../../components/Select';
import { FinancialReportType, SelectOptionType, FinancialReport } from '../../../models';

import { Container,
  TableScroll, 
  TableColumnHeader, 
  TableAccountName, 
  TableColumnPercentual, 
  TableColumnValue,
  SelectContainer } from './styles';

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

  const financialReportsOptions = [
    { value: "t", label: "Trimestre" },
    { value: "a", label: "Anual" },
  ];

  const [tableData, setTableData] = useState<TableContent | null>(null);
  const [selectPeriodOptions, setSelectPeriodOptions] = useState<SelectOptionType[]>([]);
  const [selectedPeriodType, setSelectedPeriodType] = useState<SelectOptionType>(financialReportsOptions[0]);
  const [selectedPeriodFrom, setSelectedPeriodFrom] = useState<SelectOptionType>();
  const [selectedPeriodTo, setSelectedPeriodTo] = useState<SelectOptionType>();

  useEffect(() => {
    switch (reportType) {
      case FinancialReportType.CASHFLOW:
        company.getCashFlowOptions(companyId)
          .then((data: any[]) => {
            if (data.length > 0) {
              const options = formatSelectOptions(data);
              setSelectPeriodOptions(options);
              setSelectedPeriodFrom(options[0]);
              setSelectedPeriodTo(options[0]);
            }
          });

        company.getCashFlowData(companyId, PeriodType.Quarter).then(data => {
          const formatedTable = formatCashFlowTable(data, PeriodType.Quarter);
          setTableData(buildTableComponents(formatedTable));
        })
        break;
      default:
        break;
    }
  }, [companyId, reportType]);

  const handleTypeSelectionChange = async (option: SelectOptionType) => {
    getTableData(companyId, option.value, selectedPeriodFrom?.value, selectedPeriodTo?.value);
    setSelectedPeriodType(option);
  }

  const handleSelectedPeriodFromChange = async (option: SelectOptionType) => {

    const newYearFrom = option;
    let newYearTo = selectedPeriodTo;

    if (selectedPeriodTo && newYearFrom.value > selectedPeriodTo?.value) {
        newYearTo = newYearFrom;
        setSelectedPeriodTo(newYearTo);
    }

    getTableData(companyId, selectedPeriodType.value, option.value, newYearTo?.value);
    setSelectedPeriodFrom(option);
  }

  const handleSelectedPeriodToChange = async (option: SelectOptionType) => {

    const selectedYear = option;
    let newYearFrom = selectedPeriodFrom;

    if (selectedPeriodFrom && selectedYear.value < selectedPeriodFrom.value) {
        newYearFrom = selectedYear;
        setSelectedPeriodFrom(newYearFrom);
    }
    getTableData(companyId, selectedPeriodType.value, newYearFrom?.value, option.value);
    setSelectedPeriodTo(option);
  }

  const getTableData = async (companyId: number, periodType: string, periodFrom?: string, periodTo?: string) => {
    let data: FinancialReport[];

    switch (reportType) {
      case FinancialReportType.CASHFLOW:
        data = await company.getCashFlowData(companyId, periodType, periodFrom, periodTo);

        if (hasData(data)) {
          const formatedTable = formatCashFlowTable(data, selectedPeriodType.value);
          setTableData(buildTableComponents(formatedTable));
        } else {
          setTableData(null);
        }
        break;
      default:
        break;
    }    
  }


const hasData = (data: FinancialReport[]): boolean => {
  let result = false;

  for (const years of data) {
    result = !!years.periods.find(period => {
      return period.accounts.length > 0
    })

    if(result) {
      return result
    }
  }

  return result;
}

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
            formatedRow[column] = <div> - </div>
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
    <SelectContainer>
        <Select
            key="type"
            options={financialReportsOptions}
            defaultValue={selectedPeriodType}
            onChange={handleTypeSelectionChange}
            isMulti={false}
            isClearable={false}
            isDisabled={false}
            isLoading={false}
            isSearchable={false}
        />
        <p>de</p>
        {selectPeriodOptions.length > 0 && selectedPeriodTo && selectedPeriodFrom && (
          <>
            <Select
                key="from"
                options={selectPeriodOptions as any}
                defaultValue={selectedPeriodFrom}
                onChange={handleSelectedPeriodFromChange}
                isMulti={false}
                isClearable={false}
                isDisabled={false}
                isLoading={false}
                isSearchable={false}
            />
            <p>até</p>
            <Select
                key="to"
                options={selectPeriodOptions as any}
                defaultValue={selectedPeriodTo}
                onChange={handleSelectedPeriodToChange}
                isMulti={false}
                isClearable={false}
                isDisabled={false}
                isLoading={false}
                isSearchable={false}
            />
          </>
        )}
    </SelectContainer>
      {tableData?.columns && tableData.rows ? (
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
  </Container>;
}

export default FinancialReportTable;