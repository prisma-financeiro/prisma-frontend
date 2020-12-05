import React from 'react';
import { Select } from './styles';

export interface Option {
    value: string;
    label: string;
}

interface SelectOptions {
    options: Array<Option>;
    selectOption: Function;
}

const Selection: React.FC<SelectOptions> = ({ options, selectOption }) => {

    return (
        <Select onChange={() => selectOption()}>
            {options.map(option => <option value={option.value}>{option.label}</option>)}
        </Select>
    );
};

export default Selection;