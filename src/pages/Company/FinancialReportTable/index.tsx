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

interface TableContent {
    columns: Array<any>,
    rows: Array<any>
}

interface FinancialReportTableOptions {
    getData: (type: string, yearFrom: string, yearTo: string) => Promise<TableContent>;
    getSelectionOptions: (type: string) => Promise<Array<any>>;
}

const FinancialReportTable: React.FC<FinancialReportTableOptions> = ({ getData, getSelectionOptions }) => {
    const [isTableLoading, setIsTableLoading] = useState(true);
    const [yearList, setYearList] = useState<SelectOptions>();
    const [data, setData] = useState<TableContent>();
    const [type, setType] = useState<string>(financialReportsOptions[0].value);
    const [yearFrom, setYearFrom] = useState<string>("");
    const [yearTo, setYearTo] = useState<string>("");

    useEffect(() => {
        setIsTableLoading(true);
        if (type && yearFrom && yearTo) {
            getData(type, yearFrom, yearTo)
                .then(data => {
                    if (data.rows.length > 0) {
                        const tableData = buildTableComponents(data);
                        setData(tableData);
                        setIsTableLoading(false);
                    }
                });
        }

    }, [type, yearFrom, yearTo]);

    useEffect(() => {

        getSelectionOptions(type)
            .then(list => {

                let selectOptions: SelectOptions = { options: [] };
                list.map((item: any) => {
                    selectOptions.options.push({ value: item.year, label: item.year });
                })

                setYearList(selectOptions);
                setYearFrom(selectOptions.options[selectOptions.options.length - 1].value);
                setYearTo(selectOptions.options[0].value);
            });

    }, [type]);

    const buildTableComponents = (data: any) => {
        if (!data) {
            return;
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

    const handleYearFromClick = (event: any) => {
        const year = event.target.value;

        setYearFrom(year);

        if (year > yearTo) {
            setYearTo(year);
        }
    }

    const handleYearToClick = (event: any) => {
        const year = event.target.value;

        setYearTo(year);

        if (year < yearFrom) {
            setYearFrom(year);
        }
    }

    return (
        <>
            <SelectContainer>
                <Selection
                    options={financialReportsOptions}
                    onChange={(event) => setType(event.target.value)}
                    defaultValue={financialReportsOptions[0].value}
                    value={type}
                />
                <p>de</p>
                <Selection
                    options={yearList ? yearList.options : []}
                    defaultValue={yearList ? yearList.options[yearList.options.length - 1].label : ""}
                    onChange={handleYearFromClick}
                    value={yearFrom}
                />
                <p>até</p>
                <Selection
                    options={yearList ? yearList.options : []}
                    onChange={handleYearToClick}
                    value={yearTo}
                />
            </SelectContainer>
            <AnimatedCard>
                <TableScroll>
                    <Table
                        tableHeader={data ? data.columns : [""]}
                        tableData={data ? data.rows : [""]}
                        numberOfRows={0}
                        numberOfPages={0}
                        showBottomBorder={true}
                        onPageChange={() => { }}
                        isTableLoading={false} />
                </TableScroll>
            </AnimatedCard>
        </>
    )
}

export default FinancialReportTable;