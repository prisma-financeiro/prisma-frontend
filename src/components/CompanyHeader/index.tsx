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
}

const CompanyHeader: React.FC<CompanyHeaderProps> = ({ companyLogo, tickerCode, companyName }) => {

    return (
        <Header>
            <CompanyLogo src={companyLogo} />
            <Title>
                <h1>{tickerCode}</h1>
                <p>{companyName}</p>
            </Title>
        </Header>
    );
}

export default CompanyHeader;