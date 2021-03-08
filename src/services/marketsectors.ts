import api from "./api";

export const getMarketSectorById = async (sectorId: number) => {
    return await api
        .get(`/api/v1/marketsectors/${sectorId}`)
        .then(res => res.data.data);
}

export const getMarketSectors = async () => {
    return await api
        .get(`/api/v1/marketsectors`)
        .then(res => res.data.data);
}