//**This component was created with react-select, for more information visit https://react-select.com/ */

import React from 'react';
import ReactSelect from 'react-select';
import useAppTheme from '../../contexts/theme';

import * as themes from '../../styles/themes';

export interface OptionType {
  label: string;
  value: string;
}

interface SelectProps {
  options: any[];
  placeholder?: string;
  isMulti: boolean;
  isClearable: boolean;
  isDisabled: boolean;
  isLoading: boolean;
  isSearchable: boolean;
  onChange: (option: OptionType) => void
}

const Select: React.FC<SelectProps> = ({ options, placeholder, isMulti, isClearable, isDisabled, isLoading, isSearchable, onChange }) => {

  const { currentTheme } = useAppTheme();
  const customStyles = {
    control: (provided: any, state: any) => ({
      ...provided,
      border: 'none',
      height: 40
    }),
  }


  return (
    <ReactSelect
      styles={customStyles}
      placeholder={placeholder}
      options={options}
      isMulti={isMulti}
      onChange={onChange}
      isClearable={isClearable}
      isDisabled={isDisabled}
      isLoading={isLoading}
      isSearchable={isSearchable}
      theme={theme => ({
        ...theme,
        borderRadius: 5,
        colors: {
          ...theme.colors,
          primary25: themes[currentTheme].colors.greyLowerOpacity, // hover effect on the options
          primary: themes[currentTheme].colors.primary, // Border color on focus and selected option
          neutral0: themes[currentTheme].colors.darkGrey, //background
          danger: themes[currentTheme].colors.danger, // remove selected option
          dangerLight: themes[currentTheme].colors.dangerLight, // remove selected option
          neutral90: themes[currentTheme].colors.greyLowerOpacity, //dont know
          primary75: themes[currentTheme].colors.greyLowerOpacity, // dont know
          primary50: themes[currentTheme].colors.darkGrey, // color onSelect the option
          neutral5: themes[currentTheme].colors.greyLowerOpacity, //disabled color
          neutral10: themes[currentTheme].colors.greyLowerOpacity, //badge color when multiselect
          neutral20: themes[currentTheme].colors.greyLowerOpacity, //border and icons
          neutral30: themes[currentTheme].colors.darkGrey, // border hover
          neutral40: themes[currentTheme].colors.primary, // hover on the icons
          neutral50: themes[currentTheme].colors.greyLowerOpacity, // placeholder color
          neutral60: themes[currentTheme].colors.grey, // icon color on focus
          neutral70: themes[currentTheme].colors.primary,
          neutral80: themes[currentTheme].colors.grey, //font-color of selected item
        },
      })}
    />
  );
}

export default Select;