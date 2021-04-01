import { createStore } from "redux";

import { Store } from "./types";
import { ActionTypes } from "./actions";
import { FavoriteAsset } from "../models";

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

function favoriteReducer(state: Store = {
  user: {
    account: {} as any,
    customization : {
      favorites: []
    }
  }
}, action: ActionTypes) {
  switch(action.type) {
    case "FETCH_FAVORITES":
      return {
        ...state,
        user: {
          account: {
            ...state.user.account
          },
          customization: {
            favorites: fetchFavorites(action.payload.favorites)
          }
        }
      }
    case "ADD_FAVORITE":
      return {
        user: {
          account: {
            ...state.user.account
          },
          customization: {
            favorites: addFavorite(action.payload.favorite, state.user.customization.favorites)
          }
        }
      }
    case "DELETE_FAVORITE":
      return {
        user: {
          account: {
            ...state.user.account
          },
          customization: {
            favorites: deleteFavorite(action.payload.favoriteId, state.user.customization.favorites)
          }
        }
      }
    default: 
      return state;
  }
}

const store = createStore(favoriteReducer);

export default store;