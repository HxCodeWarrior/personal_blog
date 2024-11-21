import { ReactElement } from 'react';

export interface SubItem {
  title: string;
  icon: ReactElement;
  path: string;
}

export interface MenuItem {
  title: string;
  icon: ReactElement;
  subItems: SubItem[];
}

export interface MenuItemProps {
  item: MenuItem;
  index: number;
  isCollapsed: boolean;
  expandedItem: number | null;
  setExpandedItem: (index: number | null) => void;
  currentPath: string;
}

export interface SubMenuProps {
  isCollapsed: boolean;
  isExpanded: boolean;
  subItems: SubItem[];
  currentPath: string;
}