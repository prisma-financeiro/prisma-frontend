import { TickerHistoryResultPrice, TradingViewTableRow } from "../../models";

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
        columnIndex++;
    }

    columns.forEach((item, index) => {
        result.columns.push(item);

        if (index < columns.length - 1) {
            result.columns.push("AH %");
        }
    });

    return result;
}

export const formatCashFlowTable = (data: any[], type: string): TableData => {

    const columns: string[] = [];

    const result: TableData = { columns: ["#"], rows: [] };
    let account: string = "";
    let columnIndex: number = 0;
    let row: any;

    for (const incomeStatement of data) {
        const year: string = type === "a" ? incomeStatement.year : `${incomeStatement.period}${incomeStatement.year}`;
        if (!columns.includes(year)) {
            columns.push(year);
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

            row = { 0: { type: 'string', data: balanceSheet.accountDescription, root: String(balanceSheet.account).split(".").length }};
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

export const formatSelectOptions = (data: number[]) => {
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