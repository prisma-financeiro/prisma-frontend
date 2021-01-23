import { CompanyMarketIndicator, IndicatorHistory, CompanyMarketIndicatorHistoryType, TickerHistoryResult, CompanyInfo, FinancialReport } from "../models";
import api from "./api";

export const getCompany = (id: number): Promise<CompanyInfo> => {
    return api
        .get(`api/v1/company/${id}`)
        .then(res => {
            const companyInfo: CompanyInfo = res.data.data;

            return {
                id: companyInfo.id,
                cnpj: companyInfo.cnpj,
                name: companyInfo.name,
                logo: companyInfo.logo,
                website: companyInfo.website,
                foundationDate: companyInfo.foundationDate,
                addressType: companyInfo.addressType,
                address: companyInfo.address,
                district: companyInfo.district,
                city: companyInfo.city,
                state: companyInfo.state,
                country: companyInfo.country,
                areaCode: companyInfo.areaCode,
                phoneNumber: companyInfo.phoneNumber,
                email: companyInfo.email,
                officerType: companyInfo.officerType,
                officerName: companyInfo.officerName,
                officerSince: companyInfo.officerSince,
                officerAddress: companyInfo.officerAddress,
                officerAddressComplement: companyInfo.officerAddressComplement,
                officerDistrict: companyInfo.officerDistrict,
                officerCity: companyInfo.officerCity,
                officerState: companyInfo.officerState,
                officerCountry: companyInfo.officerCountry,
                officerZipCode: companyInfo.officerZipCode,
                officerAreaCode: companyInfo.officerAreaCode,
                officerPhoneNumber: companyInfo.officerPhoneNumber,
                officerEmail: companyInfo.officerEmail,
                auditorCnpj: companyInfo.auditorCnpj,
                auditorName: companyInfo.auditorName,
                capitalAmount: companyInfo.capitalAmount,
                totalStockQuantity: companyInfo.totalStockQuantity,
                ordinaryStockQuantity: companyInfo.ordinaryStockQuantity,
                preferredStockQuantity: companyInfo.preferredStockQuantity,
                segment: companyInfo.segment,
                subsector: companyInfo.subsector,
                sector: companyInfo.sector,
            }
        });
}

export const getTickerPrice = (ticker: string) => {
    return api
        .get(`api/v1/ticker/${ticker}`)
        .then(res => res.data.data);
}

export const getTickerHistory = (ticker: string, days: number | null): Promise<TickerHistoryResult> => {
    return api
        .get(`/api/v1/ticker/${ticker}/history`, {
            params: {
                days
            }
        })
        .then(res => res.data.data);
}

export const getCompanyIndicator = async (companyId: number) => {
    return api
        .get(`api/v1/company/${companyId}/indicator`)
        .then(res => res.data.data);
}

export const getCompanyMarketIndicator = async (ticker: string, stockPrice: number): Promise<CompanyMarketIndicator[]> => {
    return api
        .get(`api/v1/stockpriceindicator/${ticker}`, {
            params: {
                price: stockPrice
            }
        })
        .then(res => res.data);
}


export const getCompanyMarketIndicatorHistory = async (ticker: string, indicatorName: string, type: CompanyMarketIndicatorHistoryType, limit?: number): Promise<IndicatorHistory[]> => {
    return api
        .get(`api/v1/stockpriceindicator/${ticker}/history`, {
            params: {
                indicator: indicatorName,
                type,
                limit
            }
        })
        .then(res => res.data.data);
}

export const getIncomeStatementData = async (companyId: number, type?: string, from?: string, to?: string) => {
    return api
        .get(`api/v1/company/${companyId}/incomestatement`, {
            params: {
                type,
                from,
                to
            }
        })
        .then(res => res.data.data);
}

export const getIncomeStatementOptions = async (companyId: number) => {
    return api
        .get(`api/v1/company/${companyId}/incomestatement/history`)
        .then(res => res.data.data);
}

export const getBalanceSheetData = async (companyId: number, type?: string, from?: string, to?: string) => {
    return api
        .get(`api/v1/company/${companyId}/balancesheet`, {
            params: {
                type,
                from,
                to
            }
        })
        .then(res => res.data.data);

}

export const getBalanceSheetOptions = async (companyId: number) => {
    return api
        .get(`api/v1/company/${companyId}/balancesheet/history`)
        .then(res => res.data.data);
}

export const getCashFlowData = async (companyId: number, type?: string, from?: string, to?: string): Promise<FinancialReport[]> => {
    return api
        .get(`api/v1/company/${companyId}/cashflow`, {
            params: {
                type,
                from,
                to
            }
        })
        .then(res => res.data.data);
}

export const getCashFlowOptions = async (companyId: number) => {
    return api
        .get(`api/v1/company/${companyId}/cashflow/history`)
        .then(res => res.data.data);
}

export const getYearIndicator = async (companyId: number, indicatorName: string) => {
    return api
        .get(`api/v1/company/${companyId}/yearindicator?indicator=${indicatorName}`)
        .then(res => res.data.data);
}


export const getQuarterIndicator = async (companyId: number, indicatorName: string) => {
    return api
        .get(`api/v1/company/${companyId}/quarterindicator?indicator=${indicatorName}`)
        .then(res => res.data.data);
}