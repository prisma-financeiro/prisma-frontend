/* eslint-disable no-loop-func */
import { TickerHistoryResultPrice, TradingViewTableRow, SelectOptionType, FinancialReport, FinancialReportPeriodAccount } from "../../models";

interface TableData {
    columns: string[];
    rows: any[]
}

const INCOME_STATEMENT_ACUMULATED = "A";

export const formatIncomeStatementTable = (data: any[], type: string): TableData => {
    const columns: string[] = [];

    const result: TableData = { columns: ["#"], rows: [] };
    let account: string = '';
    let columnIndex: number = 0;
    let row: { [key: number]: any } = {};

    for (const incomeStatement of data) {
        let columnTitle: string;

        if (incomeStatement.period === INCOME_STATEMENT_ACUMULATED) {
            columnTitle = "Últ. 12M";
        } else {
            columnTitle = type === "a" ? incomeStatement.year : `${incomeStatement.period}${incomeStatement.year}`;
        }

        if (!columns.includes(columnTitle)) {
            columns.push(columnTitle);
        }

        if (account !== incomeStatement.account) {
            account = incomeStatement.account;
            columnIndex = 1;

            row = { 0: { type: 'string', data: incomeStatement.accountDescription } };

            result.rows.push(row);
        }

        if (columnIndex > 1) {
            const percentualDiference = calcPercentageDifference(
                row[columnIndex - 1].data,
                parseFloat(incomeStatement.amount)
            );

            row[columnIndex] = { type: 'percentual', data: percentualDiference };
            columnIndex++;
        }

        row[columnIndex] = { type: 'value', data: parseFloat(incomeStatement.amount) };
    }

    columns.forEach((item, index) => {
        result.columns.push(item);

        if (index < columns.length - 1) {
            result.columns.push("AH %");
        }
    });

    return result;
}

export const formatCashFlowTable = (data: FinancialReport[], type: string): TableData => {
    const result: TableData = { columns: [], rows: [] };
    
    result.columns = generateTableColumnHeader(data, type);
    result.rows = generateTableRows(data);
    return result;
}

const generateTableRows = (data: FinancialReport[]) => {
    const sortedData = data.sort().reverse();
    const rows: any[] = [];
    let column = 0;
    let row: { [key: number]: any } = {};

    let financialReportPeriodAccounts: FinancialReportPeriodAccount[] = [];

    for (const financialReport of sortedData) {
        financialReport.periods.forEach(financialReportPeriod => {
            financialReportPeriod.accounts.forEach(financialReportPeriodAccount => {
                !financialReportPeriodAccounts.find(item => item.account === financialReportPeriodAccount.account) &&
                    financialReportPeriodAccounts.push(financialReportPeriodAccount);
            });
        });
    }

    financialReportPeriodAccounts.sort();

    for (const periodAccount of financialReportPeriodAccounts) {
        let isFirstColumn: boolean = true;

        for (const financialReport of sortedData) {

            financialReport.periods.forEach(financialReportPeriod => {

                financialReportPeriod.accounts.forEach(financialReportPeriodAccount => {

                    if (periodAccount.account === financialReportPeriodAccount.account) {

                        if (isFirstColumn) {
                            isFirstColumn = false;
                            column = 1;

                            row = { 0: { type: 'string', data: financialReportPeriodAccount.accountDescription } };
                        }

                        if (column > 1) {
                            const percentualDiference = calcPercentageDifference(
                                row[column - 1].data,
                                financialReportPeriodAccount.amount
                            );

                            row[column] = { type: 'percentual', data: percentualDiference };
                            column++;
                        }

                        row[column] = { type: 'value', data: financialReportPeriodAccount.amount };
                        column++;
                    }

                });
            });
        }

        rows.push(row);
    }

    return rows;
}

const generateTableColumnHeader = (data: FinancialReport[], type: string) => {
    const sortedData = data.sort().reverse();
    const columns: string[] = ['#'];
    const sortedFinancialReportPeriods: string[] = [];

    for (const financialReport of sortedData) {
        financialReport.periods.sort().reverse().forEach((financialReportPeriod) => {
            if (financialReportPeriod.accounts.length > 0) {
                sortedFinancialReportPeriods.push(type === "a" ? `${financialReport.year}` : `${financialReportPeriod.period}${financialReport.year}`);
            }
        });
    };

    sortedFinancialReportPeriods.forEach((financialReportPeriod, index) => {
        columns.push(financialReportPeriod);
        if (index < sortedFinancialReportPeriods.length - 1) {
            columns.push("AH");
        }
    });

    return columns;
}

export const formatBalanceSheetTable = (data: any[], type: string): TableData => {
    const columns: string[] = [];
    const result: TableData = { columns: ["#", ...columns], rows: [] };
    let account: string = "";
    let columnIndex: number = 0;
    let row: any;

    for (const balanceSheet of data) {
        const columnTitle: string = type === "a" ? balanceSheet.year : `${balanceSheet.period}${balanceSheet.year}`;

        if (!columns.includes(columnTitle)) {
            columns.push(columnTitle);
        }

        if (account !== balanceSheet.account) {
            account = balanceSheet.account;
            columnIndex = 1;

            row = { 0: { type: 'string', data: balanceSheet.accountDescription, root: String(balanceSheet.account).split(".").length } };
            result.rows.push(row);
        }

        if (columnIndex > 1) {
            const percentualDiference = calcPercentageDifference(
                row[columnIndex - 1].data,
                parseFloat(balanceSheet.amount)
            );

            row[columnIndex] = { type: 'percentual', data: percentualDiference };
            columnIndex++;
        }

        row[columnIndex] = { type: 'value', data: parseFloat(balanceSheet.amount) };
        columnIndex++;
    }

    columns.forEach((item, index) => {
        result.columns.push(item);

        if (index < columns.length - 1) {
            result.columns.push("AH");
        }
    });

    return result;
}

// Calculo da diferenca em percentual para com o periodo anterior (analise horizontal)
const calcPercentageDifference = (lastValue: number, currentValue: number): number => {
    return parseFloat((((lastValue - currentValue) / lastValue) * 100).toFixed(2)) || 0;
}

export const formatSelectOptions = (data: number[]): SelectOptionType[] => {
    return data.map((item: any) => {
        return { value: String(item), label: String(item) }
    });
}

export const formatStockPriceHistory = (data: TickerHistoryResultPrice[]): TradingViewTableRow[] | null => {
    return data ? data.map((item: TickerHistoryResultPrice) => {
        return {
            time: item.date,
            value: item.price
        }
    }) : null;
}

export const formatStockVolumeHistory = (data: TickerHistoryResultPrice[]): TradingViewTableRow[] => {
    return data.map((item: TickerHistoryResultPrice) => {
        return {
            time: item.date,
            value: item.volume
        }
    })
}

export const indicatorList = {
    "cache": true,
    "content": {
        "valuation": [
            {
                "label": 'LPA',
                "value": "lucroPorAcao"
            },
            {
                "label": 'VPA',
                "value": "valorPatrimonialPorAcao"
            },
            {
                "label": 'P/L',
                "value": "precoAtualLucroPorAcao"
            },
            {
                "label": 'P/VP',
                "value": "precoAtualVpa"
            },
            {
                "label": 'Taxa Retorno Investimento',
                "value": "taxaRetornoInvestimento"
            },
            {
                "label": 'Price Sales Ratio',
                "value": "priceSalesRatio"
            },
        ],
        "endividamento": [
            {
                "label": "Liquidez Corrente",
                "value": "liquidezCorrente"
            },
            {
                "label": "Passivos/Ativos",
                "value": "passivosAtivos"
            },
            {
                "label": "PL/Ativos",
                "value": "patrimonioLiquidoAtivos"
            },
            {
                "label": "Dívida Liq./EBIT",
                "value": "dividaLiquidaEbit"
            },
            {
                "label": "Dívida Liq./EBITDA",
                "value": "dividaLiquidaEbitda"
            },
            {
                "label": "Dívida Liq./PL",
                "value": "dividaLiquidaPatrimonioLiquido"
            }
        ],
        "eficiencia": [
            {
                "label": "Margem Bruta",
                "value": "margemBruta"
            },
            {
                "label": "Margem Líquida",
                "value": "margemLiquida"
            },
            {
                "label": "Margem EBIT",
                "value": "margemEbit"
            },
            {
                "label": "Margem EBITDA",
                "value": "margemEbitda"
            }
        ],
        "rentabilidade": [
            {
                "label": "ROE",
                "value": "roe"
            },
            {
                "label": "ROA",
                "value": "roa"
            },
            {
                "label": "ROIC",
                "value": "roic"
            }
        ]
    }
}