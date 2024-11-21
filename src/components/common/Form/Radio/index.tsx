import React from 'react';
import classNames from 'classnames';
import './styles.scss';

export interface RadioProps {
  checked?: boolean;
  disabled?: boolean;
  onChange?: (checked: boolean) => void;
  className?: string;
  label?: string;
  name?: string;
  value?: string | number;
}

const Radio: React.FC<RadioProps> = ({
  checked = false,
  disabled = false,
  onChange,
  className,
  label,
  name,
  value,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!disabled && onChange) {
      onChange(e.target.checked);
    }
  };

  const radioClasses = classNames('custom-radio', className, {
    'custom-radio--checked': checked,
    'custom-radio--disabled': disabled,
  });

  return (
    <label className={radioClasses}>
      <input
        type="radio"
        checked={checked}
        disabled={disabled}
        onChange={handleChange}
        className="custom-radio__input"
        name={name}
        value={value}
      />
      <span className="custom-radio__inner">
        <span className="custom-radio__dot" />
      </span>
      {label && <span className="custom-radio__label">{label}</span>}
    </label>
  );
};

export default Radio; 