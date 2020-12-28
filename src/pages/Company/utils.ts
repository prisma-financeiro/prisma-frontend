interface TableData {
    columns: string[];
    rows: any[]
}

export interface StockPriceHistory {
    time: string;
    value: number;
}

interface StockVolumeHistory {
    time: string;
    value: number;
}

export const formatIncomeStatementTable = (data: any[], type: string): TableData => {

    const columns: Array<string> = [];

    const result: TableData = { columns: ["#"], rows: [] };
    let account: string = "";
    let columnIndex: number = -1;
    let row: any;

    for (const incomeStatement of data) {
        const year: string = type === "a" ? incomeStatement.year : `${incomeStatement.period}${incomeStatement.year}`;
        if (!columns.includes(year)) {
            columns.push(year);
        }

        if (account !== incomeStatement.account) {
            account = incomeStatement.account;
            columnIndex = 1;

            row = { [0]: { description: incomeStatement.accountDescription } };

            result.rows.push(row);
        }

        // Calculor da diferenca em percentual para com o periodo anterior (analise horizontal)
        if (columnIndex > 1) {
            const lastValue = row[columnIndex - 1].data;
            const currentValue = parseFloat(incomeStatement.amount);
            const percentualDiference = parseFloat((((lastValue - currentValue) / lastValue) * 100).toFixed(2));

            row[columnIndex] = { type: 'percentual', data: percentualDiference };
            columnIndex++;
        }
        row[columnIndex] = { type: 'value', data: parseFloat(incomeStatement.amount) };

        columnIndex++;
    }

    columns.map((item, index) => {
        result.columns.push(String(item));

        if (index < columns.length - 1) {
            result.columns.push("AH %");
        }
    });

    return result;
}


export const formatCashFlowTable = (data: any[], type: string): TableData => {

    const columns: Array<string> = [];

    const result: TableData = { columns: ["#"], rows: [] };
    let account: string = "";
    let columnIndex: number = -1;
    let row: any;

    for (const incomeStatement of data) {
        const year: string = type === "a" ? incomeStatement.year : `${incomeStatement.period}${incomeStatement.year}`;
        if (!columns.includes(year)) {
            columns.push(year);
        }

        if (account !== incomeStatement.account) {
            account = incomeStatement.account;
            columnIndex = 1;

            row = { [0]: { description: incomeStatement.accountDescription } };

            result.rows.push(row);
        }

        // Calculor da diferenca em percentual para com o periodo anterior (analise horizontal)
        if (columnIndex > 1) {
            const lastValue = row[columnIndex - 1].data;
            const currentValue = parseFloat(incomeStatement.amount);
            const percentualDiference = parseFloat((((lastValue - currentValue) / lastValue) * 100).toFixed(2));

            row[columnIndex] = { type: 'percentual', data: percentualDiference };
            columnIndex++;
        }
        row[columnIndex] = { type: 'value', data: parseFloat(incomeStatement.amount) };

        columnIndex++;
    }

    columns.map((item, index) => {
        result.columns.push(String(item));

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
    let columnIndex: number = -1;
    let row: any;

    for (const balanceSheet of data) {
        const year: string = type === "a" ? balanceSheet.year : `${balanceSheet.period}${balanceSheet.year}`;
        if (!columns.includes(year)) {
            columns.push(year);
        }

        if (account !== balanceSheet.account) {
            account = balanceSheet.account;
            columnIndex = 1;

            row = { [0]: { description: balanceSheet.accountDescription, root: String(balanceSheet.account).split(".").length } };

            result.rows.push(row);
        }

        // Calculor da diferenca em percentual para com o periodo anterior (analise horizontal)
        if (columnIndex > 1) {
            const lastValue = row[columnIndex - 1].data;
            const currentValue = parseFloat(balanceSheet.amount);
            const percentualDiference = parseFloat((((lastValue - currentValue) / lastValue) * 100).toFixed(2));

            row[columnIndex] = { type: 'percentual', data: percentualDiference };
            columnIndex++;
        }
        row[columnIndex] = { type: 'value', data: parseFloat(balanceSheet.amount) };

        columnIndex++;

    }

    columns.map((item, index) => {
        result.columns.push(String(item));

        if (index < columns.length - 1) {
            result.columns.push("AH");
        }
    });

    return result;
}

export const formatSelectOptions = (data: number[]) => {
    return data.map((item: any) => {
        return { value: String(item), label: String(item) }
    });
}

export const formatStockPriceHistory = (data: any[]) => {
    return data.map(item => {
        return {
            time: item.date,
            value: item.price
        }
    });
}

export const formatStockVolumeHistory = (data: any[]): StockVolumeHistory[] => {
    return data.map(item => {
        return {
            time: item.date,
            value: item.volume
        }
    })
}