import { MarketIndexPriceFlutuationResult } from "../models";
import api from "./api";

export const getMarketIndexPriceFlutuation = (index: string): Promise<MarketIndexPriceFlutuationResult> => {
    return api
        .get(`/api/v1/marketindex/${index}/flutuation`, { timeout: 5000 })
        .then(res => {
            return res.data.data;
        })
        .catch(err => err);
}