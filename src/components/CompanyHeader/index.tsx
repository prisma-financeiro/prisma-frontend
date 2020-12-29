import React from 'react';

import {
    Header,
    CompanyLogo,
    Title
} from './styles';

interface CompanyHeaderProps {
    companyLogo: string;
    tickerCode: string;
    companyName: string;
    id?: number;
    onClick?: (id: number, tickerCode: string) => void;
}

const CompanyHeader: React.FC<CompanyHeaderProps> = ({ companyLogo, tickerCode, companyName, id, onClick }) => {

    const handleClick = (event: any) => {
        onClick && id && onClick(id, tickerCode);
    }

    return (
        <Header isClickble={onClick ? true : false} onClick={(event) => handleClick(event)}>
            <CompanyLogo src={companyLogo} />
            <Title>
                <h2>{tickerCode}</h2>
                <p>{companyName}</p>
            </Title>
        </Header>
    );
}

export default CompanyHeader;