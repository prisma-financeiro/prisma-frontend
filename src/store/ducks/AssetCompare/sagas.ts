import { call, put, all, takeLatest } from 'redux-saga/effects';

import { loadAssetSuccess, loadAssetFailure } from '../AssetCompare/actions';
import api from '../../../services/api';
import { AssetCompareTypes } from './types';

export function* load({ payload }: any) {
  console.log('dentro do saga com payload: ', payload.id);
  try {
    const response = yield call(api.get, `api/v1/company/${payload.id}`);
    yield put(loadAssetSuccess(response.data.id));
  } catch (err) {
    yield put(loadAssetFailure());
  }
}

export default all([
  takeLatest(AssetCompareTypes.LOAD_ASSET_START, load),
]);