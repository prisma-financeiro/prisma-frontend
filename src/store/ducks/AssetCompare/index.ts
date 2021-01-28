import { Reducer } from 'redux';
import { AssetCompareState, AssetCompareTypes } from './types';

const INITIAL_STATE: AssetCompareState = {
  data: null,
  error: false,
  loading: false
}

const reducer: Reducer<AssetCompareState> = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case AssetCompareTypes.LOAD_ASSET_START:
      return { ...state, loading: true};
    case AssetCompareTypes.LOAD_ASSET_SUCCESS:
      return { ...state, loading: false, error: false, data: {id: action.payload.data} };
    case AssetCompareTypes.LOAD_ASSET_FAILURE:
      return { ...state, loading: false, error: true, data: null };
    default:
      return state;
  }
}

export default reducer;