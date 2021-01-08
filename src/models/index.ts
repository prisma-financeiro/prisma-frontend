export interface SearchResult {
  code: string;
  id: number;
  name: string;
  type: AssetType;
  image: string;
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
