import React from 'react';

import {
    Header,
    Title
} from './styles';
import Logo from '../Logo';

interface CompanyHeaderProps {
    companyLogo: string;
    tickerCode: string;
    companyName: string;
    assetId?: number;
    onClick?: (assetId: number, tickerCode: string) => void;
}

const CompanyHeader: React.FC<CompanyHeaderProps> = ({ companyLogo, tickerCode, companyName, assetId, onClick }) => {

    const handleClick = () => {
        onClick && assetId && onClick(assetId, tickerCode);
    }

    return (
        <Header isClickable={!!onClick} onClick={() => handleClick()}>
            <Logo imageUrl={companyLogo} />
            <Title>
                <h2>{tickerCode}</h2>
                <p>{companyName}</p>
            </Title>
        </Header>
    );
}

export default CompanyHeader;