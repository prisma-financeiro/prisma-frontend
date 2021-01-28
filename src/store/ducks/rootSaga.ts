import assetCompareSagas from './AssetCompare/sagas';
import { all } from 'redux-saga/effects';

export default function* rootSaga() {
  return yield all([
    assetCompareSagas,
  ])
}