import React, { useContext, useRef, useEffect } from 'react';
import classNames from 'classnames';
import { RadioProps } from './types';
import { RadioGroupContext } from './RadioGroup';
import './styles.scss';

const Radio: React.FC<RadioProps> = ({
  checked: checkedProp,
  disabled: disabledProp,
  onChange,
  className,
  label,
  name: nameProp,
  value,
  description,
  size = 'medium',
  variant = 'default',
  theme = 'light',
}) => {
  const group = useContext(RadioGroupContext);
  const rippleRef = useRef<HTMLSpanElement>(null);
  
  const isChecked = group.value !== undefined ? group.value === value : checkedProp;
  const isDisabled = group.disabled || disabledProp;
  const name = group.name || nameProp;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (isDisabled) return;
    
    if (group.onChange) {
      group.onChange(value!);
    } else {
      onChange?.(e.target.checked);
    }

    // 添加点击涟漪效果
    if (rippleRef.current) {
      rippleRef.current.classList.remove('radio__ripple--active');
      void rippleRef.current.offsetWidth; // 触发重排以重启动画
      rippleRef.current.classList.add('radio__ripple--active');
    }
  };

  const radioClasses = classNames(
    'radio',
    `radio--${variant}`,
    `radio--${size}`,
    `radio--${theme}`,
    className,
    {
      'radio--checked': isChecked,
      'radio--disabled': isDisabled,
    }
  );

  return (
    <label className={radioClasses}>
      <div className="radio__wrapper">
        <input
          type="radio"
          checked={isChecked}
          disabled={isDisabled}
          onChange={handleChange}
          className="radio__input"
          name={name}
          value={value}
        />
        <span className="radio__inner">
          <span className="radio__dot" />
          <span ref={rippleRef} className="radio__ripple" />
        </span>
      </div>
      {(label || description) && (
        <span className="radio__content">
          {label && <span className="radio__label">{label}</span>}
          {description && (
            <span className="radio__description">{description}</span>
          )}
        </span>
      )}
    </label>
  );
};

export default Radio; 