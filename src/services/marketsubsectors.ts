import api from "./api";

export const getMarketSubSectorById = async (subSectorId: number) => {
    return await api
        .get(`/api/v1/marketsubsectors/${subSectorId}`)
        .then(res => res.data.data);
}

export const getMarketSubSectors = async () => {
    return await api
        .get(`/api/v1/marketsubsectors`)
        .then(res => res.data.data);
}