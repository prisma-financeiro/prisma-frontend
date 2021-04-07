import { combineReducers, Reducer } from 'redux';

import favoriteReducer, { FavoritesState } from './favorites';
import applicationReducer, { ApplicationState } from './application';

export interface GlobalState {
  favoriteState: FavoritesState,
  applicationState: ApplicationState
}

export const reducers: Reducer<GlobalState> = combineReducers<GlobalState>({
  favoriteState: favoriteReducer,
  applicationState: applicationReducer
});