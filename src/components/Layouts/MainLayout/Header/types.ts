export interface NavItem {
  title: string;
  path: string;
  icon: JSX.Element;
}

export interface UserProfile {
  name: string;
  email: string;
  avatar: string;
  role: string;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  timestamp: Date;
  read: boolean;
}
