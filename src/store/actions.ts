import { FavoriteAsset } from "../models";

export const ADD_FAVORITE = "ADD_FAVORITE";
export const DELETE_FAVORITE = "DELETE_FAVORITE";
export const FETCH_FAVORITES = "FETCH_FAVORITES";

export type ActionTypes = 
| { type: typeof ADD_FAVORITE; 
    payload: {
      favorite: FavoriteAsset;
    }
  }
| { type: typeof DELETE_FAVORITE; 
    payload: {
      favoriteId: number;
    } 
  }
| { type: typeof FETCH_FAVORITES,
    payload: {
      favorites: FavoriteAsset[]
    } 
  }

export const addFavorite = (favorite: FavoriteAsset): ActionTypes => ({ type: ADD_FAVORITE, payload: { favorite } });

export const deleteFavorite = (favoriteId: number): ActionTypes => ({ 
  type: DELETE_FAVORITE, 
  payload: { favoriteId }
});

export const fetchFavorite = (favorites: FavoriteAsset[]): ActionTypes => ({ type: FETCH_FAVORITES, payload: { favorites } });