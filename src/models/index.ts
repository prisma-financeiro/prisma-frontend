export interface SearchResult {
  code: string;
  id: number;
  name: string;
  type: SearchResultType;
  image: string;
}

export enum SearchResultType {
  Stock = 'stock',
  Fund = 'fund',
  Reit = 'reit',
  Index = 'index',
  Crypto = 'crypto'
}