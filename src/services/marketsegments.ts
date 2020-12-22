import api from "./api";

export const getMarketSegmentById = (segmentId: number) => {
    return api
        .get(`/api/v1/marketsegments/${segmentId}`)
        .then(res => res.data.data);
}

export const getMarketSegments = () => {
    return api
        .get(`/api/v1/marketsegments`)
        .then(res => res.data.data);
}