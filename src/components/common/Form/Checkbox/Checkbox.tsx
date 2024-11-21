import React, { forwardRef, useContext, useEffect, useCallback, useMemo } from 'react';
import classNames from 'classnames';
import { CheckboxProps } from './types';
import { CheckboxGroupContext } from './CheckboxGroup';
import styles from './Checkbox.module.scss';

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(({
  checked,
  defaultChecked = false,
  disabled,
  indeterminate = false,
  value,
  onChange,
  className,
  style,
  children,
  name,
  id,
  autoFocus,
  'aria-label': ariaLabel,
}, ref) => {
  const [innerChecked, setInnerChecked] = React.useState(defaultChecked);
  const groupContext = useContext(CheckboxGroupContext);
  const checkboxRef = React.useRef<HTMLLabelElement>(null);

  // 同步外部checked值
  useEffect(() => {
    if (checked !== undefined) {
      setInnerChecked(checked);
    }
  }, [checked]);

  // 注册到Group
  useEffect(() => {
    if (value !== undefined && groupContext) {
      groupContext.registerValue(value);
      return () => {
        groupContext.cancelValue(value);
      };
    }
  }, [value, groupContext]);

  // 自动聚焦
  useEffect(() => {
    if (autoFocus && checkboxRef.current) {
      checkboxRef.current.focus();
    }
  }, [autoFocus]);

  // 处理变更
  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (disabled) return;

    const newChecked = e.target.checked;
    if (checked === undefined) {
      setInnerChecked(newChecked);
    }

    if (groupContext && value !== undefined) {
      groupContext.toggleOption({ label: children, value });
    } else {
      onChange?.(newChecked, e);
    }
  }, [disabled, checked, groupContext, value, children, onChange]);

  // 处理键盘事件
  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLLabelElement>) => {
    if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault();
      const input = e.currentTarget.querySelector('input');
      input?.click();
    }
  }, []);

  // 计算选中状态
  const computedChecked = useMemo(() => 
    groupContext ? groupContext.value?.includes(value!) : innerChecked,
    [groupContext, value, innerChecked]
  );

  // 计算禁用状态
  const computedDisabled = useMemo(() => 
    groupContext ? groupContext.disabled || disabled : disabled,
    [groupContext, disabled]
  );

  return (
    <label
      ref={checkboxRef}
      className={classNames(
        styles.checkbox,
        {
          [styles.disabled]: computedDisabled,
          [styles.checked]: computedChecked,
          [styles.indeterminate]: indeterminate,
        },
        className
      )}
      style={style}
      onKeyDown={handleKeyDown}
      tabIndex={computedDisabled ? -1 : 0}
      role="checkbox"
      aria-checked={indeterminate ? 'mixed' : computedChecked}
      aria-disabled={computedDisabled}
      aria-label={ariaLabel}
    >
      <span className={styles.wrapper}>
        <input
          ref={ref}
          type="checkbox"
          className={styles.input}
          checked={computedChecked}
          disabled={computedDisabled}
          onChange={handleChange}
          name={groupContext?.name || name}
          id={id}
          value={value}
          aria-hidden="true"
          tabIndex={-1}
        />
        <span className={styles.inner} />
      </span>
      {children && (
        <span 
          className={styles.label}
          onClick={e => e.stopPropagation()}
        >
          {children}
        </span>
      )}
    </label>
  );
});

Checkbox.displayName = 'Checkbox'; 