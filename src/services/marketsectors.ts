import api from "./api";

export const getMarketSectorById = (sectorId: number) => {
    return api
        .get(`/api/v1/marketsectors/${sectorId}`)
        .then(res => res.data.data);
}

export const getMarketSectors = () => {
    return api
        .get(`/api/v1/marketsectors`)
        .then(res => res.data.data);
}