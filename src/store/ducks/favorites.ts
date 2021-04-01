import { ThunkAction } from "redux-thunk";
import { Action } from "redux";

import { user as UserService } from "../../services";
import { FavoriteAsset } from "../../models";

export const ADD_FAVORITE = "ADD_FAVORITE";
export const DELETE_FAVORITE = "DELETE_FAVORITE";
export const SET_FAVORITES = "SET_FAVORITES";

export interface FavoritesStore {
  favorites: FavoriteAsset[]
}

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
| { type: typeof SET_FAVORITES,
    payload: {
      favorites: FavoriteAsset[]
    } 
  }

const deleteFavorite = (favoriteId: number, favorites: FavoriteAsset[]): FavoriteAsset[] => {
  return [...favorites.filter(favorite => favorite.id !== favoriteId)];
}

const addFavorite = (favorite: FavoriteAsset, favorites: FavoriteAsset[]): FavoriteAsset[] => {
  favorites.push(favorite);
  return [...favorites];
}

const fetchFavorites = (favorites: FavoriteAsset[]): FavoriteAsset[] => {
  return [...favorites];
}

export default function favoriteReducer(state: FavoritesStore = {
  favorites: []
}, action: ActionTypes) {
  switch(action.type) {
    case "SET_FAVORITES":
      return {
        ...state,
        favorites: fetchFavorites(action.payload.favorites)
      }
    case "ADD_FAVORITE":
      return {
        favorites: addFavorite(action.payload.favorite, state.favorites)
      }
    case "DELETE_FAVORITE":
      return {
        favorites: deleteFavorite(action.payload.favoriteId, state.favorites)
      }
    default: 
      return state;
  }
}


export const Creators = {
  addFavorite: (favorite: FavoriteAsset): ActionTypes => ({ 
    type: ADD_FAVORITE, 
    payload: { favorite } 
  }),
  
  deleteFavorite: (favoriteId: number): ActionTypes => ({ 
    type: DELETE_FAVORITE, 
    payload: { favoriteId }
  }),
  
  setFavorites: (favorites: FavoriteAsset[]): ActionTypes => ({ 
    type: SET_FAVORITES, 
    payload: { favorites} 
  }),
  
  handleFetchFavorites: (): ThunkAction<void, FavoritesStore, unknown, Action<string>> => async (dispatch) => {
    const favorites = await UserService.getUserFavorites();
    dispatch(Creators.setFavorites(favorites));
  },
  
  handleAddFavorite: (tickerId: number): ThunkAction<void, FavoritesStore, unknown, Action<string>> => async (dispatch) => {
    const favorite = await UserService.addUserFavorite(tickerId);
    dispatch(Creators.addFavorite(favorite));
  },
  
  handleDeleteFavorite: (favoriteId: number): ThunkAction<void, FavoritesStore, unknown, Action<string>> => async (dispatch) => {
    await UserService.deleteUserFavorite(favoriteId);
    dispatch(Creators.deleteFavorite(favoriteId));
  },
}