import React, { forwardRef, useEffect, useState } from 'react';
import Select from "react-select";

export const TiSelect = forwardRef(({
  placeholder = '',
  options = [],
  className = '',
  label = '',
  onChange,
  defaultInputValue,
  isClearable = true,
  value,
  isMulti = false,
  ...props
}, ref: any) => {
  const [currentValue, setCurrentValue] = useState(value);

  useEffect(() => {
    if (!isMulti) {
      let optionValue;
      if (typeof value != 'object') optionValue = options.find(option => ('value' in option) && option.value == value);
      else optionValue = options.find(option => ('value' in option) && option.value == value?.value);

      setCurrentValue(optionValue || null);
      if (JSON.stringify(value) !== JSON.stringify(optionValue)) onChange(optionValue);
    } else {
      setCurrentValue(value);
    }
  }, [value, options]);

  return (
    <div style={{ zIndex: 3 }} className={`min-w-[250px] lg:max-w-[250px] flex-1 ${className}`}>
      {label && (
        <label style={{ marginLeft: 5, fontSize: 12 }} className={"text-gray-800"}><strong>{label}</strong></label>
      )}

      <Select
        {...props}
        ref={ref}
        className={"shadow-md rounded-full bg-white"}
        placeholder={placeholder}
        styles={{
          control: (provided, state) => ({
            ...provided,
            cursor: 'pointer',
            borderColor: '#f5f5f5',
            borderRadius: '1rem',
            "&:hover": {
              borderColor: '#b96671'
            }
          }),
          valueContainer: (provided, state) => ({
            ...provided,
            borderColor: '#b96671'
          }),
          singleValue: (provided, state) => ({
            ...provided,
          }),
          option: (provided, state) => ({
            ...provided,
            cursor: 'pointer',
            backgroundColor: state.isSelected ? '#d71919' : '#fff',
            "&:hover": {
              color: '#fff',
              backgroundColor: state.isSelected ? '#91333f' : '#ffc3c3'
            }
          }),
          placeholder: (provided) => ({
            ...provided,
            color: '#80808080'
          })
        }}
        options={options}
        isClearable
        onChange={onChange}
        defaultValue={options.find(option => option.value === defaultInputValue)}
        noOptionsMessage={() => 'No hay opciones disponibles'}
        value={currentValue}
      />
    </div>
  );
});
