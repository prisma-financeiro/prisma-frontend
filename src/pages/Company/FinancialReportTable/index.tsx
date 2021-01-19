import React, { useState, useEffect } from 'react';

import { company } from "../../../services";

import { Container,
  TableScroll, 
  TableColumnHeader, 
  TableAccountName, 
  TableColumnPercentual, 
  TableColumnValue,
  SelectContainer } from './styles';
import { FinancialReportType, SelectOptionType, FinancialReport } from '../../../models';
import { formatSelectOptions, formatCashFlowTable } from '../utils';
import Table from '../../../components/Table';
import { formatCurrency } from '../../../utils';
import Select from '../../../components/Select';

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
  const [selectPeriodOptions, setSelectPeriodOptions] = useState<SelectOptionType[]>([]);
  const [selectedPeriodType, setSelectedPeriodType] = useState<string>('');
  const [selectedPeriodFrom, setSelectedPeriodFrom] = useState<string>('');
  const [selectedPeriodTo, setSelectedPeriodTo] = useState<string>('');

  const financialReportsOptions = [
    { value: "t", label: "Trimestre" },
    { value: "a", label: "Anual" },
  ];

  useEffect(() => {
    switch (reportType) {
      case FinancialReportType.CASHFLOW:
        company.getCashFlowOptions(companyId)
          .then((data: any[]) => {
            if (data.length > 0) {
              const options = formatSelectOptions(data);
              setSelectPeriodOptions(options);
              setSelectedPeriodFrom(options[0].value);
              setSelectedPeriodTo(options[0].value);
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
    getTableData(companyId, option.value, selectedPeriodFrom, selectedPeriodTo);
    setSelectedPeriodType(option.value);
  }

  const handleSelectedPeriodFromChange = async (option: SelectOptionType) => {
    getTableData(companyId, selectedPeriodType, option.value, selectedPeriodTo);

    const newYearFrom = option.value;
    let newYearTo = selectedPeriodTo;

    setSelectedPeriodFrom(option.value);

    if (newYearFrom > selectedPeriodTo) {
        newYearTo = newYearFrom;
        setSelectedPeriodTo(newYearTo);
    }

  }

  const handleSelectedPeriodToChange = async (option: SelectOptionType) => {
    getTableData(companyId, selectedPeriodType, selectedPeriodFrom, option.value);

    const selectedYear = option.value;
    let newYearFrom = selectedPeriodFrom;

    setSelectedPeriodTo(selectedYear);

    if (selectedYear < selectedPeriodFrom) {
        newYearFrom = selectedYear;
        setSelectedPeriodFrom(newYearFrom);
    }

    setSelectedPeriodTo(option.value);
  }

  const getTableData = async (companyId: number, periodType: string, periodFrom?: string, periodTo?: string) => {
    const data = await company.getCashFlowData(companyId, periodType, periodFrom, periodTo);
    
    if (hasData(data)) {
      const formatedTable = formatCashFlowTable(data, selectedPeriodType);
      setTableData(buildTableComponents(formatedTable));
    } else {
      setTableData(null);
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
            defaultValue={financialReportsOptions[0]}
            onChange={handleTypeSelectionChange}
            isMulti={false}
            isClearable={false}
            isDisabled={false}
            isLoading={false}
            isSearchable={false}
        />
        <p>de</p>
        {selectPeriodOptions.length > 0 && (
          <>
            <Select
                key="from"
                options={selectPeriodOptions as any}
                defaultValue={selectPeriodOptions && selectPeriodOptions[0]}
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
                defaultValue={selectPeriodOptions[0]}
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