import Card from '../../base/Card';
import type { CardProps as MuiCardProps } from '@mui/material/Card';

// 从默认导出的 Card 组件中提取 Props 类型
type BaseCardProps = React.ComponentProps<typeof Card>;

export interface UserInfo {
  avatar: string;
  name: string;
  role: string;
  department?: string;
  email: string;
  phone?: string;
  location?: string;
  skills?: string[];
  socialLinks?: {
    linkedin?: string;
    github?: string;
    twitter?: string;
  };
}

export interface InfoCardProps extends BaseCardProps {
  userInfo: UserInfo;
  onEdit?: () => void;
  onConnect?: () => void;
} 