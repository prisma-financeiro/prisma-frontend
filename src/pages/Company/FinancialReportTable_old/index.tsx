import React, { useEffect, useState } from 'react';
import Selection, { SelectOptions } from '../../../components/Selection';
import Table from '../../../components/Table';
import { formatCurrency } from '../../../utils';

import {
    TableColumnHeader,
    TableColumnValue,
    TableAccountName,
    TableColumnPercentual,
    AnimatedCard,
    TableScroll,
    SelectContainer
} from './styles';

export interface TableContent {
    columns: any[],
    rows: any[]
}

export interface SelectionOptions {
    type: string;
    yearFrom: string;
    yearTo: string;
}

interface FinancialReportTableOptions {
    data: TableContent;
    selectionOptions: SelectOptions;
    onPeriodSelectionChange: (options: SelectionOptions) => {};
    onTypeSelectionChange: (type: string) => {};
}

const FinancialReportTable2: React.FC<FinancialReportTableOptions> = ({ data, selectionOptions, onPeriodSelectionChange, onTypeSelectionChange }) => {

    const financialReportsOptions = [
        { value: "a", label: "Anual" },
        { value: "t", label: "Trimestre" },
    ];

    const firstTableColumnTitle = "#";

    const [tableData, setTableData] = useState<TableContent>();
    const [selectOptions, setselectOptions] = useState<SelectOptions>();
    const [type, setType] = useState<string>(financialReportsOptions[1].value);
    const [yearFrom, setYearFrom] = useState<string>("");
    const [yearTo, setYearTo] = useState<string>("");

    useEffect(() => {
        data &&
            setTableData(buildTableComponents(data));
    }, [data]);

    useEffect(() => {
        setselectOptions(selectionOptions);
        const lastAvailableYear = selectionOptions?.options[0]?.value;
        setYearFrom(lastAvailableYear);
        setYearTo(lastAvailableYear);
    }, [selectionOptions, type]);

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
                <TableColumnHeader alignLeft={item === firstTableColumnTitle}>
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

    const handleTypeClick = (event: any) => {
        const newType = event.target.value;
        setType(newType);

        onTypeSelectionChange(newType);
    }

    const handleYearFromClick = (event: any) => {
        const newYearFrom = event.target.value;
        let newYearTo = yearTo;

        setYearFrom(newYearFrom);

        if (newYearFrom > yearTo) {
            newYearTo = newYearFrom;
            setYearTo(newYearTo);
        }

        onPeriodSelectionChange({
            type: type,
            yearFrom: newYearFrom,
            yearTo: newYearTo
        })
    }

    const handleYearToClick = (event: any) => {
        const selectedYear = event.target.value;
        let newYearFrom = yearFrom;

        setYearTo(selectedYear);

        if (selectedYear < yearFrom) {
            newYearFrom = selectedYear;
            setYearFrom(newYearFrom);
        }

        onPeriodSelectionChange({
            type: type,
            yearFrom: newYearFrom,
            yearTo: selectedYear
        })
    }

    return (
        <>
            <SelectContainer>
                <Selection
                    key="type"
                    options={financialReportsOptions}
                    onChange={handleTypeClick}
                    value={type}
                />
                <p>de</p>
                <Selection
                    key="yearFrom"
                    options={selectOptions ? selectOptions.options : []}
                    onChange={handleYearFromClick}
                    value={yearFrom}
                />
                <p>até</p>
                <Selection
                    key="yearTo"
                    options={selectOptions ? selectOptions.options : []}
                    onChange={handleYearToClick}
                    value={yearTo}
                />
            </SelectContainer>
            {
                tableData &&
                    tableData.rows.length > 0 ?
                    <AnimatedCard>
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
                    </AnimatedCard>
                    :
                    <p>Sem informações</p>
            }
        </>
    )

}

export default FinancialReportTable2;