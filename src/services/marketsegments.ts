import api from "./api";

export const getMarketSegmentById = async (segmentId: number) => {
    return await api
        .get(`/api/v1/marketsegments/${segmentId}`)
        .then(res => res.data.data);
}

export const getMarketSegments = async () => {
    return await api
        .get(`/api/v1/marketsegments`)
        .then(res => res.data.data);
}