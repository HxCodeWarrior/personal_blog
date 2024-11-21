import React, { forwardRef, useState, useCallback, useEffect, useMemo } from 'react';
import classNames from 'classnames';
import { InputProps } from './types';
import styles from './Input.module.scss';

export const Input = forwardRef<HTMLInputElement, InputProps>(({
  size = 'middle',
  status,
  prefix,
  suffix,
  allowClear = false,
  bordered = true,
  disabled = false,
  maxLength,
  showCount = false,
  onChange,
  onClear,
  onPressEnter,
  className,
  value,
  defaultValue,
  placeholder,
  autoFocus,
  readOnly,
  addonBefore,
  addonAfter,
  onCompositionStart,
  onCompositionEnd,
  ...rest
}, ref) => {
  // 状态管理
  const [focused, setFocused] = useState(false);
  const [isComposing, setIsComposing] = useState(false);
  const [innerValue, setInnerValue] = useState(value?.toString() || defaultValue?.toString() || '');

  // 同步外部value
  useEffect(() => {
    if (value !== undefined) {
      setInnerValue(value.toString());
    }
  }, [value]);

  // 处理自动聚焦
  useEffect(() => {
    if (autoFocus && ref && 'current' in ref && ref.current) {
      ref.current.focus();
    }
  }, [autoFocus, ref]);

  // 计算字符数和是否超出限制
  const { currentLength, isOverflow } = useMemo(() => ({
    currentLength: innerValue.length,
    isOverflow: maxLength ? innerValue.length > maxLength : false
  }), [innerValue, maxLength]);

  // 处理输入变化
  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    if (!isComposing && maxLength && newValue.length > maxLength) return;
    
    setInnerValue(newValue);
    onChange?.(e);
  }, [isComposing, maxLength, onChange]);

  // 处理清除
  const handleClear = useCallback((e: React.MouseEvent<HTMLSpanElement>) => {
    e.stopPropagation();
    const newValue = '';
    setInnerValue(newValue);
    onClear?.();
    
    const inputElement = ref as React.MutableRefObject<HTMLInputElement>;
    if (inputElement?.current) {
      const event = new Event('input', { bubbles: true });
      Object.defineProperty(event, 'target', { value: { value: newValue } });
      inputElement.current.dispatchEvent(event);
      inputElement.current.focus();
    }
  }, [onClear, ref]);

  // 处理键盘事件
  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !isComposing) {
      onPressEnter?.(e);
    }
    rest.onKeyDown?.(e);
  }, [isComposing, onPressEnter, rest]);

  // 处理输入法事件
  const handleCompositionStart = useCallback((e: React.CompositionEvent<HTMLInputElement>) => {
    setIsComposing(true);
    onCompositionStart?.(e);
  }, [onCompositionStart]);

  const handleCompositionEnd = useCallback((e: React.CompositionEvent<HTMLInputElement>) => {
    setIsComposing(false);
    onCompositionEnd?.(e);
  }, [onCompositionEnd]);

  // 渲染前缀
  const renderPrefix = () => {
    if (!prefix && !addonBefore) return null;
    return (
      <>
        {addonBefore && <span className={styles.addon}>{addonBefore}</span>}
        {prefix && <span className={styles.prefix}>{prefix}</span>}
      </>
    );
  };

  // 渲染后缀
  const renderSuffix = () => {
    if (!suffix && !showCount && !allowClear && !addonAfter) return null;
    
    return (
      <>
        <span className={styles.suffix}>
          {allowClear && innerValue && !disabled && !readOnly && (
            <span 
              className={styles.clearIcon}
              onClick={handleClear}
              role="button"
              tabIndex={-1}
            >
              ×
            </span>
          )}
          {showCount && (
            <span className={classNames(styles.count, {
              [styles.overflow]: isOverflow
            })}>
              {`${currentLength}${maxLength ? `/${maxLength}` : ''}`}
            </span>
          )}
          {suffix}
        </span>
        {addonAfter && <span className={styles.addon}>{addonAfter}</span>}
      </>
    );
  };

  return (
    <div
      className={classNames(
        styles.inputWrapper,
        styles[size],
        {
          [styles.focused]: focused,
          [styles.disabled]: disabled,
          [styles.borderless]: !bordered,
          [styles.readOnly]: readOnly,
          [styles.error]: status === 'error',
          [styles.warning]: status === 'warning',
          [styles.withPrefix]: prefix || addonBefore,
          [styles.withSuffix]: suffix || showCount || allowClear || addonAfter,
          [styles.overflow]: isOverflow,
        },
        className
      )}
    >
      {renderPrefix()}
      <input
        ref={ref}
        className={styles.input}
        disabled={disabled}
        readOnly={readOnly}
        value={innerValue}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        onCompositionStart={handleCompositionStart}
        onCompositionEnd={handleCompositionEnd}
        onFocus={(e) => {
          setFocused(true);
          rest.onFocus?.(e);
        }}
        onBlur={(e) => {
          setFocused(false);
          rest.onBlur?.(e);
        }}
        placeholder={placeholder}
        {...rest}
      />
      {renderSuffix()}
    </div>
  );
});

Input.displayName = 'Input';
