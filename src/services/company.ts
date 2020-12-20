import api from "./api";

export interface CompanyInfo {
    cnpj: string;
    name: string;
    logo: string;
    website: string;
    foundationDate: string;
    addressType: string;
    address: string;
    district: string;
    city: string;
    state: string;
    country: string;
    areaCode: string;
    phoneNumber: number;
    email: string;
    officerType: string;
    officerName: string;
    officerSince: string;
    officerAddress: string;
    officerAddressComplement: string;
    officerDistrict: string;
    officerCity: string;
    officerState: string;
    officerCountry: string;
    officerZipCode: string;
    officerAreaCode: string;
    officerPhoneNumber: number;
    officerEmail: string;
    auditorCnpj: string;
    auditorName: string;
    capitalAmount: number;
    ordinaryStockQuantity: number,
    preferredStockQuantity: number,
    totalStockQuantity: number;
    segment: any;
}

export const getCompany = (id: number) => {
    return api
        .get(`api/v1/company/${id}`)
        .then(res => {
            const companyInfo: CompanyInfo = res.data.data;
            return {
                cnpj: companyInfo.cnpj,
                name: companyInfo.name,
                logo: 'https://media.glassdoor.com/sqll/382606/magazine-luiza-squarelogo-1564520166281.png',
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
            }
        }).catch(err => console.log(err));
}

export const getTickerPrice = (ticker: string) => {
    return api
        .get(`api/v1/ticker/${ticker}`)
        .then(res => res.data.data);
}


export const getCompanyIndicator = async (companyId: number) => {
    return api
        .get(`api/v1/company/${companyId}/indicator`)
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

export const getCashFlowData = async (companyId: number, type: string, yearFrom?: string, yearTo?: string) => {
    return api
        .get(`api/v1/company/${companyId}/cashflow`, {
            params: {
                type,
                yearFrom,
                yearTo
            }
        })
        .then(res => res.data.data);

}

export const getCashFlowOptions = async (companyId: number, type: string) => {
    return api
        .get(`api/v1/company/${companyId}/cashflow/history`, {
            params: {
                type
            }
        })
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