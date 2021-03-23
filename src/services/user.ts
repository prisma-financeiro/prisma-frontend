import api from "./api";
import { UserAccount, FavoriteAsset } from "../models";

export const getUserAccount = (userId: string): Promise<UserAccount> => {
  return api.get(`/user/${userId}`).then(res => res.data);
};

export const getUserFavorites = (): Promise<FavoriteAsset[]> => {
  return api.get(`/api/v1/favorites`).then(res => res.data);
};

export const addUserFavorite = (tickerId: number): Promise<FavoriteAsset> => {
  return api.post(`/api/v1/favorites`, {
    tickerId: tickerId
  }).then(res => res.data);
}

export const deleteUserFavorite = (favoriteId: number) => {
  return api.delete(`/api/v1/favorites`, {
    data: {
      favoriteId
    }
  });
}