import api from "./api";

export const getMarketSubSectorById = (subSectorId: number) => {
    return api
        .get(`/api/v1/marketsubsectors/${subSectorId}`)
        .then(res => res.data.data);
}

export const getMarketSubSectors = () => {
    return api
        .get(`/api/v1/marketsubsectors`)
        .then(res => res.data.data);
}