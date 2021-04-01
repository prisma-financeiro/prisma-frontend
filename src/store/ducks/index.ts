import { combineReducers, Reducer } from 'redux';

import favoriteReducer, { FavoritesState } from './favorites';

export interface ApplicationState {
  favoriteState: FavoritesState
}

export const reducers: Reducer<ApplicationState> = combineReducers<ApplicationState>({
  favoriteState: favoriteReducer
});