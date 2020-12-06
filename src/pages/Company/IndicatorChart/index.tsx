import React, { useState } from 'react';

import { Container, SelectContainer } from './styles';
import BarChart from '../../../components/BarChart';
import Selection, { Option } from '../../../components/Selection';

interface IndicatorChartOptions {
    data: Array<any>;
    indicatorSelectionOptions: Array<Option>;
    displayOptions: Array<Option>;
}

const IndicatorChart: React.FC<IndicatorChartOptions> = ({ data, indicatorSelectionOptions, displayOptions }) => {

    return (
        <Container>
            <SelectContainer>
                <Selection
                    options={indicatorSelectionOptions}
                    onChange={() => alert("select")} />
                <Selection
                    options={displayOptions}
                    onChange={() => alert("select")} />
            </SelectContainer>
            <BarChart
                data={data.map((indicator: any) => { return { value: indicator.value } })} />
        </Container>
    );
};

export default IndicatorChart;
