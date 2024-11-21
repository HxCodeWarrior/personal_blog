import React, { useState, useCallback, useRef, useEffect, useMemo, createContext, useLayoutEffect } from 'react';
import classNames from 'classnames';
import { SelectProps, SelectOption, SelectContextType } from './types';
import { VirtualScroll } from './VirtualScroll';
import styles from './Select.module.scss';

export const SelectContext = createContext<SelectContextType>({});

const DEFAULT_OPTION_HEIGHT = 32;
const DEFAULT_MAX_HEIGHT = 256;

export const Select: React.FC<SelectProps> = ({
  value,
  defaultValue,
  options = [],
  placeholder = '请选择',
  disabled = false,
  loading = false,
  multiple = false,
  allowClear = false,
  showSearch = false,
  size = 'middle',
  status,
  maxTagCount,
  dropdownClassName,
  dropdownStyle,
  dropdownMatchSelectWidth = true,
  bordered = true,
  virtual = true,
  notFoundContent = '暂无数据',
  loadingContent,
  maxHeight = DEFAULT_MAX_HEIGHT,
  optionHeight = DEFAULT_OPTION_HEIGHT,
  filterOption,
  onChange,
  onSearch,
  onClear,
  onFocus,
  onBlur,
  onPopupScroll,
  onDropdownVisibleChange,
  onKeyDown,
  className,
  style,
}) => {
  // 状态管理
  const [isOpen, setIsOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [activeIndex, setActiveIndex] = useState(-1);
  const [dropdownWidth, setDropdownWidth] = useState<number>();
  const [selectedValue, setSelectedValue] = useState<Array<string | number>>(
    multiple ? (value || defaultValue || []) as Array<string | number> : [(value || defaultValue || '') as string | number]
  );

  // refs
  const selectRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // 处理选项分组
  const groupedOptions = useMemo(() => {
    const groups: { [key: string]: SelectOption[] } = {};
    const ungrouped: SelectOption[] = [];

    options.forEach(option => {
      if (option.groupLabel) {
        if (!groups[option.groupLabel]) {
          groups[option.groupLabel] = [];
        }
        groups[option.groupLabel].push(option);
      } else {
        ungrouped.push(option);
      }
    });

    return { groups, ungrouped };
  }, [options]);

  // 过滤选项
  const filteredOptions = useMemo(() => {
    if (!showSearch || !searchValue) return options;

    const filterFn = filterOption || ((input: string, option: SelectOption) => 
      String(option.label).toLowerCase().includes(input.toLowerCase())
    );

    return options.filter(option => filterFn(searchValue, option));
  }, [options, searchValue, showSearch, filterOption]);

  // 更新下拉框宽度
  useLayoutEffect(() => {
    if (isOpen && dropdownMatchSelectWidth && selectRef.current) {
      setDropdownWidth(selectRef.current.offsetWidth);
    }
  }, [isOpen, dropdownMatchSelectWidth]);

  // 处理键盘事件
  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLDivElement>) => {
    if (!isOpen && e.key === 'Enter') {
      setIsOpen(true);
      return;
    }

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setActiveIndex(prev => 
          prev < filteredOptions.length - 1 ? prev + 1 : 0
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setActiveIndex(prev => 
          prev > 0 ? prev - 1 : filteredOptions.length - 1
        );
        break;
      case 'Enter':
        if (activeIndex >= 0) {
          handleSelect(filteredOptions[activeIndex]);
        }
        break;
      case 'Escape':
        setIsOpen(false);
        break;
    }

    onKeyDown?.(e);
  }, [isOpen, filteredOptions, activeIndex, onKeyDown]);

  // 渲染选项
  const renderOption = (option: SelectOption, index: number) => (
    <div
      key={option.value}
      className={classNames(
        styles.option,
        {
          [styles.selected]: selectedValue.includes(option.value),
          [styles.disabled]: option.disabled,
          [styles.active]: index === activeIndex,
        }
      )}
      onClick={() => handleSelect(option)}
    >
      {multiple && (
        <span className={classNames(
          styles.checkmark,
          { [styles.checked]: selectedValue.includes(option.value) }
        )} />
      )}
      {option.icon && <span className={styles.icon}>{option.icon}</span>}
      {option.label}
    </div>
  );

  // 渲染分组选项
  const renderGroupedOptions = () => {
    const { groups, ungrouped } = groupedOptions;
    const items: React.ReactNode[] = [];

    // 渲染未分组选项
    ungrouped.forEach((option, index) => {
      items.push(renderOption(option, index));
    });

    // 渲染分组选项
    Object.entries(groups).forEach(([label, groupOptions]) => {
      items.push(
        <div key={label} className={styles.group}>
          <div className={styles.groupLabel}>{label}</div>
          <div className={styles.groupOptions}>
            {groupOptions.map((option, index) => 
              renderOption(option, ungrouped.length + index)
            )}
          </div>
        </div>
      );
    });

    return items;
  };

  // 渲染下拉列表内容
  const renderDropdownContent = () => {
    if (loading) {
      return (
        <div className={styles.loading}>
          <span className={styles.spinner} />
          {loadingContent || '加载中...'}
        </div>
      );
    }

    if (filteredOptions.length === 0) {
      return <div className={styles.empty}>{notFoundContent}</div>;
    }

    if (virtual) {
      return (
        <VirtualScroll
          height={maxHeight}
          itemHeight={optionHeight}
          itemCount={filteredOptions.length}
          onScroll={onPopupScroll}
          renderItem={index => renderOption(filteredOptions[index], index)}
        />
      );
    }

    return renderGroupedOptions();
  };

  // 处理点击外部关闭
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        selectRef.current &&
        !selectRef.current.contains(event.target as Node) &&
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // 处理选项选择
  const handleSelect = useCallback((option: SelectOption) => {
    if (option.disabled) return;

    let newValue: Array<string | number>;
    if (multiple) {
      newValue = selectedValue.includes(option.value)
        ? selectedValue.filter(v => v !== option.value)
        : [...selectedValue, option.value];
    } else {
      newValue = [option.value];
      setIsOpen(false);
    }

    setSelectedValue(newValue);
    onChange?.(multiple ? newValue : newValue[0], option);
  }, [multiple, selectedValue, onChange]);

  // 处理清除
  const handleClear = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedValue([]);
    onClear?.();
  }, [onClear]);

  // 渲染选中的标签
  const renderSelection = () => {
    if (selectedValue.length === 0) {
      return <span className={styles.placeholder}>{placeholder}</span>;
    }

    const selectedOptions = options.filter(option => 
      selectedValue.includes(option.value)
    );

    if (!multiple) {
      return selectedOptions[0]?.label;
    }

    const displayTags = maxTagCount !== undefined && selectedOptions.length > maxTagCount
      ? selectedOptions.slice(0, maxTagCount)
      : selectedOptions;

    return (
      <>
        {displayTags.map(option => (
          <span key={option.value} className={styles.tag}>
            {option.label}
            <span 
              className={styles.closeIcon}
              onClick={(e) => {
                e.stopPropagation();
                handleSelect(option);
              }}
            >
              ×
            </span>
          </span>
        ))}
        {maxTagCount !== undefined && selectedOptions.length > maxTagCount && (
          <span className={styles.tag}>+{selectedOptions.length - maxTagCount}</span>
        )}
      </>
    );
  };

  return (
    <SelectContext.Provider value={{ 
      value: selectedValue, 
      multiple, 
      onSelect: handleSelect,
      activeIndex 
    }}>
      <div
        ref={selectRef}
        className={classNames(
          styles.selectWrapper,
          styles[size],
          className
        )}
        style={style}
        onKeyDown={handleKeyDown}
        tabIndex={disabled ? -1 : 0}
      >
        <div
          ref={selectRef}
          className={classNames(
            styles.select,
            {
              [styles.focused]: isOpen,
              [styles.disabled]: disabled,
              [styles.borderless]: !bordered,
              [styles.error]: status === 'error',
              [styles.warning]: status === 'warning',
            }
          )}
          onClick={() => {
            if (!disabled) {
              setIsOpen(!isOpen);
              onDropdownVisibleChange?.(!isOpen);
            }
          }}
        >
          <div className={styles.selection}>
            {renderSelection()}
          </div>
          {allowClear && selectedValue.length > 0 && (
            <span
              className={styles.clearIcon}
              onClick={handleClear}
            >
              ×
            </span>
          )}
          <span className={classNames(styles.arrow, { [styles.open]: isOpen })}>
            ▼
          </span>
        </div>

        <div
          ref={dropdownRef}
          className={classNames(
            styles.dropdown,
            { [styles.visible]: isOpen },
            dropdownClassName
          )}
          style={{
            ...dropdownStyle,
            width: dropdownWidth,
            maxHeight
          }}
        >
          {showSearch && (
            <div className={styles.searchInput}>
              <input
                ref={searchInputRef}
                placeholder="搜索"
                value={searchValue}
                onChange={e => {
                  setSearchValue(e.target.value);
                  onSearch?.(e.target.value);
                }}
                onClick={e => e.stopPropagation()}
              />
            </div>
          )}
          
          <div className={styles.optionList}>
            {renderDropdownContent()}
          </div>
        </div>
      </div>
    </SelectContext.Provider>
  );
}; 