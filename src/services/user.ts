import api from "./api";
import { UserAccount, AssetType } from "../models";

export const getUserAccount = (userId: string): Promise<UserAccount> => {
  return api.get(`/user/${userId}`);
};

export const getUserFavorites = (userId: string) => {
  return api.get(`/user/${userId}/favorites`);
};

export const setUserFavorite = (userId: string, assetId: number, assetType: AssetType, tickerCode?: string) => {
  return api.post(`/user/${userId}/favorites`, {
    assetId,
    assetType,
    tickerCode
  });
}

export const deleteUserFavorite = (userId: string, assetId: number, tickerCode?: string) => {
  return api.delete(`/user/${userId}/favorites`, {
    data: {
      assetId,
      tickerCode
    }
  });
}