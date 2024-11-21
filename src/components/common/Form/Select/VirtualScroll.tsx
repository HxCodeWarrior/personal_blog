import React, { useRef, useState, useEffect } from 'react';
import { VirtualScrollProps } from './types';
import styles from './Select.module.scss';

export const VirtualScroll: React.FC<VirtualScrollProps> = ({
  height,
  itemHeight,
  itemCount,
  renderItem,
  onScroll
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollTop, setScrollTop] = useState(0);

  const totalHeight = itemCount * itemHeight;
  const visibleCount = Math.ceil(height / itemHeight);
  const startIndex = Math.floor(scrollTop / itemHeight);
  const endIndex = Math.min(startIndex + visibleCount + 1, itemCount);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    setScrollTop(e.currentTarget.scrollTop);
    onScroll?.(e);
  };

  const items = [];
  for (let i = startIndex; i < endIndex; i++) {
    items.push(
      <div
        key={i}
        style={{
          position: 'absolute',
          top: i * itemHeight,
          height: itemHeight,
          width: '100%'
        }}
      >
        {renderItem(i)}
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={styles.virtualScroll}
      style={{ height, overflow: 'auto' }}
      onScroll={handleScroll}
    >
      <div style={{ height: totalHeight, position: 'relative' }}>
        {items}
      </div>
    </div>
  );
}; 