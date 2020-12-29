import React, { useState } from 'react';

import { Container, PeriodItem } from './styles';

interface Period {
  label: string;
  value: number | null;
  selected: boolean;
}

interface PeriodSelectorProps {
  onPeriodChange: (periodValue: number | null) => void;
}

const PeriodSelector: React.FC<PeriodSelectorProps> = ({ onPeriodChange }) => {

  const periods: Period[] = [
    {label: '5 Dias', value: 5, selected: true},
    {label: '30 Dias', value: 30, selected: false},
    {label: '6 Meses', value: 180, selected: false},
    {label: '1 Ano', value: 365, selected: false},
    {label: '5 Anos', value: 1825, selected: false},
    {label: 'Máx', value: null, selected: false},
  ]

  const [selectedPeriod, setSelectedPeriod] = useState<Period[]>(periods);

  const handleSelection = (selectedIndex: number) => {
    const updatedPeriods: Period[] = [];
    selectedPeriod.forEach((periodItem, index) => {
      updatedPeriods.push({
        label: periodItem.label, 
        value: periodItem.value, 
        selected: index === selectedIndex
      });
    });

    setSelectedPeriod(updatedPeriods);
    onPeriodChange(updatedPeriods.filter(period => period.selected)[0].value);
  }

  return (
    <Container>
      {periods.map((period, index) => {
        return (
          <PeriodItem
            whileTap={{ scale: 1.1 }}
            key={index} 
            isPeriodSelected={selectedPeriod[index].selected} 
            onClick={() => handleSelection(index)}
          >
              {period.label}
          </PeriodItem>
        );
      })}
    </Container>
  );
}

export default PeriodSelector;