export interface CompanyInfo {
  id: number;
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
  segment: {
    id: number;
    subSectorId: number;
    description: string;
    companiesCount: number;
  },
  subsector: {
    id: number;
    sectorId: number;
    description: string;
    companiesCount: number;
  },
  sector: {
    id: number;
    description: string;
    companiesCount: number;
  }
}

export interface SearchResult {
  code: string;
  id: number;
  name: string;
  type: AssetType;
  image: string;
  tickerId: number;
}

export interface FavoriteAsset {
  id: number
  companyLogo: string,
  tickerCode: string,
  companyName: string,
  companyId: number,
  stockPrice: number,
  variationReal: number,
  variationPercentage: number,
  type: AssetType
}

export enum AssetType {
  Stock = 'stock',
  Fund = 'fund',
  Reit = 'reit',
  Crypto = 'crypto',
  Index = 'index'
}

export interface TickerHistoryResultHighestLowest {
  date: Date;
  price: number;
  variationValue: number;
  variationPercentage: number;
}

export interface TickerHistoryResultPrice {
  date: string;
  price: number;
  volume: number;
}

export interface TickerHistoryResult {
  variationValue: number;
  variationPercentage: number;
  highest: TickerHistoryResultHighestLowest;
  lowest: TickerHistoryResultHighestLowest;
  historicalPrices: TickerHistoryResultPrice[];
}

export interface TradingViewTableRow {
  time: string;
  value: number;
}

export interface MarketIndexPriceFlutuationResultTicker {
  currentPrice: number;
  priceFlutuationPercetage: number;
  ticker: string;
  assetId: number;
  name: string;
  logo: string;
}

export interface MarketIndexPriceFlutuationResult {
  lastRefresh: string;
  highestIncrease: MarketIndexPriceFlutuationResultTicker[];
  highestDrop: MarketIndexPriceFlutuationResultTicker[];
}
export interface SelectOptionType {
  label: string;
  value: string;
}

export interface IndicatorHistory {
  value: number;
  year: string;
}

export interface CompanyMarketIndicator {
  indicatorName: string;
  value: number;
  signal: string;
  history: IndicatorHistory[];
}

export type CompanyMarketIndicatorHistoryType = "yearly" | "quarterly";

export enum FinancialReportType {
  CASHFLOW = 'cashflow',
  INCOMESTATEMENT = 'incomeStatement',
  BALANCESHEET = 'balanceSheet',
}


interface FinancialReportPeriod {
  period: string,
  accounts: FinancialReportPeriodAccount[]
}

export interface FinancialReportPeriodAccount {
  account: string,
  accountDescription: string,
  amount: number
}

export interface FinancialReport {
  year: number;
  periods: FinancialReportPeriod[]
}

export interface ResponseError {
  status: number;
  code: string;
  message: string;
}


export interface UserAccount {
  id: string;
  name: string;
  email: string;
  emailVerified: boolean;
}

export interface Session {
  signedInAt: Date;
  expiresAt: Date;
  token: string;
}

export interface SignIn {
  auth: boolean;
  userAccount: UserAccount;
  session: Session;
}

export interface User {
  account: UserAccount
}