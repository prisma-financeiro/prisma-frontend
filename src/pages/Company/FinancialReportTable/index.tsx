import React, { useEffect, useState } from 'react';
import Selection, { SelectOptions } from '../../../components/Selection';
import Table from '../../../components/Table';
import { formatCurrencyCompact } from '../../../utils';

import {
    TableColumnHeader,
    TableColumnValue,
    TableAccountName,
    TableColumnPercentual,
    AnimatedCard,
    TableScroll,
    SelectContainer
} from './styles';

const financialReportsOptions = [
    { value: "ANUAL", label: "Anual" },
    { value: "TRIMESTRE", label: "Trimestre" },
];

const firstTableColumnIndex = "0";
const firstTableColumnTitle = "#";

export interface TableContent {
    columns: Array<any>,
    rows: Array<any>
}

export interface SelectionOptions {
    type: string;
    yearFrom: string;
    yearTo: string;
}

interface FinancialReportTableOptions {
    data: TableContent;
    selectionOptions: SelectOptions;
    defaultYearFrom: string;
    defaultYearTo: string;
    onPeriodSelectionChange: (options: SelectionOptions) => {};
    onTypeSelectionChange: (options: SelectionOptions) => {};
}

const FinancialReportTable: React.FC<FinancialReportTableOptions> = ({ data, selectionOptions, defaultYearFrom, defaultYearTo, onPeriodSelectionChange, onTypeSelectionChange }) => {
    const [tableData, setTableData] = useState<TableContent>(data);
    const [type, setType] = useState<string>(financialReportsOptions[0].value);
    const [yearFrom, setYearFrom] = useState<string>("");
    const [yearTo, setYearTo] = useState<string>("");

    useEffect(() => {
        defaultYearFrom &&
            setYearFrom(defaultYearFrom);
    }, [defaultYearFrom]);

    useEffect(() => {
        defaultYearTo &&
            setYearTo(defaultYearTo);
    }, [defaultYearTo]);

    useEffect(() => {
        data &&
            setTableData(buildTableComponents(data));
    }, [data]);

    useEffect(() => {
        if (type && yearFrom && yearTo) {
            onPeriodSelectionChange({
                type,
                yearFrom,
                yearTo
            })
        }
    }, [yearFrom, yearTo]);

    useEffect(() => {
        if (type && yearFrom && yearTo) {
            onTypeSelectionChange({
                type,
                yearFrom,
                yearTo
            });
        }
    }, [type]);

    const buildTableComponents = (data: any): TableContent => {
        if (!data) {
            return {
                rows: [],
                columns: []
            };
        }

        const formatedColumns: any[] = [];
        data.columns.map((item: any) => formatedColumns.push(item === firstTableColumnTitle ? item : (<TableColumnHeader >{String(item)}</TableColumnHeader>)));

        const formatedRows: any[] = [];
        data.rows.map((row: any) => {

            let formatedRow: any = {};
            for (const attr in row) {
                if (row.hasOwnProperty(attr)) {
                    const attrValue: any = row[attr];

                    if (attr === firstTableColumnIndex) {
                        formatedRow[attr] = <TableAccountName root={attrValue.root}>{attrValue.description} (R$)</TableAccountName>;
                    } else {
                        if (attrValue.type === 'value') {
                            formatedRow[attr] = (
                                <TableColumnValue>
                                    {formatCurrencyCompact(Number(attrValue.data))}
                                </TableColumnValue>
                            )
                        } else if (attrValue.type === 'percentual') {
                            const percentual = Number(attrValue.data);
                            formatedRow[attr] = (
                                <TableColumnPercentual
                                    percentual={percentual}
                                >
                                    {`${percentual} %`}
                                </TableColumnPercentual>
                            )
                        }
                    }
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
    }

    const handleYearFromClick = (event: any) => {
        const newYearFrom = event.target.value;
        let newYearTo = yearTo;

        setYearFrom(newYearFrom);

        if (newYearFrom > yearTo) {
            newYearTo = newYearFrom;
            setYearTo(newYearTo);
        }
    }

    const handleYearToClick = (event: any) => {
        const selectedYear = event.target.value;

        setYearTo(selectedYear);

        if (selectedYear < yearFrom) {
            setYearFrom(selectedYear);
        }
    }

    return (
        <>
            <SelectContainer>
                <Selection
                    key="type"
                    options={financialReportsOptions}
                    onChange={handleTypeClick}
                    // defaultValue={financialReportsOptions[0].value}
                    value={type}
                />
                <p>de</p>
                <Selection
                    key="yearFrom"
                    options={selectionOptions ? selectionOptions.options : [{ value: "", label: "" }]}
                    // defaultValue={selectionOptions ? selectionOptions.options[selectionOptions.options.length - 1].label : ""}
                    onChange={handleYearFromClick}
                    value={yearFrom}
                />
                <p>até</p>
                <Selection
                    key="yearTo"
                    options={selectionOptions ? selectionOptions.options : [{ value: "", label: "" }]}
                    // defaultValue={selectionOptions ? selectionOptions.options[0].label : ""}
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
                                tableHeader={tableData ? tableData.columns : [""]}
                                tableData={tableData ? tableData.rows : [""]}
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

export default FinancialReportTable;