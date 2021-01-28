import { action } from 'typesafe-actions';
import { Asset, AssetCompareTypes } from './types';


export const loadAsset = (id: number) => action(AssetCompareTypes.LOAD_ASSET_START, { id });

export const loadAssetSuccess = (data: Asset) => action(AssetCompareTypes.LOAD_ASSET_SUCCESS, { data });

export const loadAssetFailure = () => action(AssetCompareTypes.LOAD_ASSET_FAILURE);
