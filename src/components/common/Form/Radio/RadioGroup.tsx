import React, { createContext } from 'react';
import classNames from 'classnames';
import type { RadioGroupContextType, RadioGroupProps } from './types';
import './styles.scss';

export const RadioGroupContext = createContext<RadioGroupContextType>({
  name: '',
  value: undefined,
  onChange: () => {},
});

export const RadioGroup: React.FC<RadioGroupProps> = ({
  children,
  value,
  defaultValue,
  name,
  onChange,
  disabled,
  className,
  direction = 'horizontal',
}) => {
  const handleChange = (newValue: string | number) => {
    onChange?.(newValue);
  };

  const groupClasses = classNames(
    'radio-group',
    `radio-group--${direction}`,
    className,
    {
      'radio-group--disabled': disabled,
    }
  );

  return (
    <RadioGroupContext.Provider
      value={{
        name,
        value: value ?? defaultValue,
        onChange: handleChange,
        disabled,
      }}
    >
      <div className={groupClasses} role="radiogroup">
        {children}
      </div>
    </RadioGroupContext.Provider>
  );
}; 