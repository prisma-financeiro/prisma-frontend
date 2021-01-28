import React from 'react';

import { Container } from './styles';

import { Asset } from '..';
import VerticalAsset from './VerticalAsset';
import VerticalHeader from './VerticalHeader';

interface AssetVerticalListProps {
  assetList: Asset[];
  onAssetRemove(assetId: number): void
}

const AssetVerticalList: React.FC<AssetVerticalListProps> = ({ assetList, onAssetRemove }) => {
  return (
    <Container>
      <VerticalHeader />
      { assetList.map(asset => <VerticalAsset asset={asset} onAssetRemove={(assetId) => onAssetRemove(assetId)}/>)}
    </Container>
  );
}

export default AssetVerticalList;