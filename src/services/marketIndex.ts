import { MarketIndexPriceFlutuationResult } from "../models";
import api from "./api";

export const getMarketIndexPriceFlutuation = (index: string): Promise<MarketIndexPriceFlutuationResult> => {
    return api
        .get(`/api/v1/marketindex/${index}/flutuation`)
        .then(res => res.data.data);
}