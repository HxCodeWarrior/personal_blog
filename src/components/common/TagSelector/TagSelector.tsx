import React from 'react';
import { Select, Tag } from 'antd';
import { TagOutlined } from '@ant-design/icons';
import styles from './TagSelector.module.scss';

const { Option } = Select;

interface TagOption {
  value: string;
  label: string;
  color: string;
}

const tagOptions: TagOption[] = [
  { value: 'technology', label: '技术', color: '#2196F3' },
  { value: 'design', label: '设计', color: '#9C27B0' },
  { value: 'lifestyle', label: '生活方式', color: '#4CAF50' },
  { value: 'travel', label: '旅行', color: '#FF9800' },
  { value: 'food', label: '美食', color: '#F44336' },
  { value: 'health', label: '健康', color: '#00BCD4' },
  { value: 'business', label: '商业', color: '#795548' },
  { value: 'science', label: '科学', color: '#607D8B' },
];

interface TagSelectorProps {
  value?: string[];
  onChange?: (value: string[]) => void;
}

const TagSelector: React.FC<TagSelectorProps> = ({ value, onChange }) => {
  return (
    <Select
      mode="multiple"
      placeholder="选择文章标签"
      value={value}
      onChange={onChange}
      className={styles.tagSelector}
      maxTagCount={5}
      suffixIcon={<TagOutlined />}
    >
      {tagOptions.map(option => (
        <Option key={option.value} value={option.value}>
          <Tag color={option.color}>{option.label}</Tag>
        </Option>
      ))}
    </Select>
  );
};

export default TagSelector; 