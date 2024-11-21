export interface NavRoute {
  label: string;
  path: string;
  icon?: string;
  children?: NavRoute[];
}

export const navigationRoutes: NavRoute[] = [
  {
    label: '首页',
    path: '/',
    icon: '🏠'
  },
  {
    label: '文章',
    path: '/pages/Articles',
    icon: '📝'
  },
  {
    label: '技能',
    path: '/pages/Skills',
    icon: '💡'
  },
  {
    label: '项目',
    path: '/pages/Projects',
    icon: '🚀'
  }
];

export type Route = typeof navigationRoutes[number]; 