/**
 * Action types
 */
export enum AssetCompareTypes {
  ADD_ASSET_START = '@assetCompare/ADD_ASSET_START',
  ADD_ASSET_SUCCESS = '@assetCompare/ADD_ASSET_SUCCESS',
  ADD_ASSET_FAILURE = '@assetCompare/ADD_ASSET_FAILURE',
  
  LOAD_ASSET_START = '@assetCompare/LOAD_ASSET_START',
  LOAD_ASSET_SUCCESS = '@assetCompare/LOAD_ASSET_SUCCESS',
  LOAD_ASSET_FAILURE = '@assetCompare/LOAD_ASSET_FAILURE',
 }

 /**
  * Data types
  */
 export interface Asset {
   id: number
 }


  /**
   * State types
   */
   export interface AssetCompareState {
    readonly data: Asset | null,
    readonly loading: boolean,
    readonly error: boolean
  }

    