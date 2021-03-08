import { MarketIndexPriceFlutuationResult } from "../models";
import api from "./api";

export const getMarketIndexPriceFlutuation = async (index: string): Promise<MarketIndexPriceFlutuationResult> => {
    try {
        return await api.get(`/api/v1/marketindex/${index}/flutuation`, { timeout: 5000 })
            .then(res => res.data.data);
    } catch (error) {
        return Promise.reject(error);
    }
}