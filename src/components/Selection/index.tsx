import React, { SelectHTMLAttributes } from 'react';
import { Select, StyledOption } from './styles';

export interface Option {
    value: string;
    label: string;
}

interface SelectOptions extends SelectHTMLAttributes<HTMLSelectElement> {
    options: Array<Option>;
}

const Selection: React.FC<SelectOptions> = (props) => {

    return (
        <Select {...props}>
            {props.options.map((option, index) => <StyledOption key={index} value={option.value}>{option.label}</StyledOption>)}
        </Select>
    );
};

export default Selection;