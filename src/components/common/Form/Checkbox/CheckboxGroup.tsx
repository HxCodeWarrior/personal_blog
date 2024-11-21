import React, { createContext, useState, useEffect } from 'react';
import classNames from 'classnames';
import { CheckboxGroupProps, CheckboxGroupContextProps, CheckboxOptionType } from './types';
import { Checkbox } from './Checkbox';
import styles from './Checkbox.module.scss';

export const CheckboxGroupContext = createContext<CheckboxGroupContextProps | null>(null);

export const CheckboxGroup: React.FC<CheckboxGroupProps> = ({
  value,
  defaultValue = [],
  disabled = false,
  name,
  options = [],
  onChange,
  className,
  style,
  children,
}) => {
  const [innerValue, setInnerValue] = useState<Array<string | number>>(defaultValue);
  const [registeredValues, setRegisteredValues] = useState<Set<string | number>>(new Set());

  useEffect(() => {
    if (value !== undefined) {
      setInnerValue(value);
    }
  }, [value]);

  const registerValue = (val: string | number) => {
    setRegisteredValues(prev => new Set(prev).add(val));
  };

  const cancelValue = (val: string | number) => {
    setRegisteredValues(prev => {
      const next = new Set(prev);
      next.delete(val);
      return next;
    });
  };

  const toggleOption = (option: CheckboxOptionType) => {
    const optionValue = option.value;
    const newValue = innerValue.includes(optionValue)
      ? innerValue.filter(v => v !== optionValue)
      : [...innerValue, optionValue];

    if (value === undefined) {
      setInnerValue(newValue);
    }

    onChange?.(newValue);
  };

  const contextValue = {
    value: innerValue,
    disabled,
    name,
    registerValue,
    cancelValue,
    toggleOption,
  };

  const renderGroup = () => {
    if (options && options.length > 0) {
      return options.map(option => {
        if (typeof option === 'string') {
          return (
            <Checkbox
              key={option}
              disabled={disabled}
              value={option}
              checked={innerValue.includes(option)}
            >
              {option}
            </Checkbox>
          );
        }
        if (typeof option === 'number') {
          return (
            <Checkbox
              key={option.toString()}
              disabled={disabled}
              value={option}
              checked={innerValue.includes(option)}
            >
              {option}
            </Checkbox>
          );
        }
        return (
          <Checkbox
            key={option.value.toString()}
            disabled={option.disabled || disabled}
            value={option.value}
            checked={innerValue.includes(option.value)}
            className={option.className}
            style={option.style}
          >
            {option.label}
          </Checkbox>
        );
      });
    }
    return children;
  };

  return (
    <CheckboxGroupContext.Provider value={contextValue}>
      <div
        className={classNames(styles.group, className)}
        style={style}
      >
        {renderGroup()}
      </div>
    </CheckboxGroupContext.Provider>
  );
}; 