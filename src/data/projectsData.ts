export interface Member {
  id: string;
  name: string;
  avatar: string;
  role?: string;
  email?: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  progress: number;
  status: 'active' | 'pending' | 'completed' | 'cancelled';
  members: Member[];
  dueDate: string;
  startDate?: string;
  priority?: 'low' | 'medium' | 'high';
  tags?: string[];
  budget?: number;
  files?: Array<{
    id: string;
    name: string;
    url: string;
    type: string;
  }>;
}

// 模拟项目数据
export const projectsData: Project[] = [
  {
    id: '1',
    title: 'Project Alpha',
    description: 'A revolutionary new project focusing on AI-driven solutions for modern businesses.',
    progress: 75,
    status: 'active',
    priority: 'high',
    members: [
      { id: '1', name: 'John Doe', avatar: '/avatars/1.jpg', role: 'Project Lead', email: 'john@example.com' },
      { id: '2', name: 'Jane Smith', avatar: '/avatars/2.jpg', role: 'Developer', email: 'jane@example.com' },
      { id: '3', name: 'Mike Johnson', avatar: '/avatars/3.jpg', role: 'Designer', email: 'mike@example.com' },
    ],
    startDate: '2024-01-01',
    dueDate: '2024-12-31',
    tags: ['AI', 'Machine Learning', 'Innovation'],
    budget: 150000,
  },
  {
    id: '2',
    title: 'Beta Platform',
    description: 'Building a next-generation platform for digital collaboration and team productivity.',
    progress: 45,
    status: 'pending',
    priority: 'medium',
    members: [
      { id: '4', name: 'Sarah Wilson', avatar: '/avatars/4.jpg', role: 'Product Manager', email: 'sarah@example.com' },
      { id: '5', name: 'Tom Brown', avatar: '/avatars/5.jpg', role: 'Backend Developer', email: 'tom@example.com' },
    ],
    startDate: '2024-02-15',
    dueDate: '2024-09-30',
    tags: ['Collaboration', 'SaaS', 'Productivity'],
    budget: 95000,
  },
  {
    id: '3',
    title: 'Gamma Analytics',
    description: 'Advanced analytics dashboard with real-time data visualization and reporting capabilities.',
    progress: 90,
    status: 'completed',
    priority: 'high',
    members: [
      { id: '6', name: 'Emily Davis', avatar: '/avatars/6.jpg', role: 'Data Scientist', email: 'emily@example.com' },
      { id: '7', name: 'David Lee', avatar: '/avatars/7.jpg', role: 'Frontend Developer', email: 'david@example.com' },
      { id: '8', name: 'Lisa Chen', avatar: '/avatars/8.jpg', role: 'UX Designer', email: 'lisa@example.com' },
    ],
    startDate: '2023-11-01',
    dueDate: '2024-06-30',
    tags: ['Analytics', 'Dashboard', 'Data Visualization'],
    budget: 120000,
  },
  {
    id: '4',
    title: 'Delta Mobile',
    description: 'Cross-platform mobile application for seamless user experience across devices.',
    progress: 30,
    status: 'active',
    priority: 'medium',
    members: [
      { id: '9', name: 'Ryan Taylor', avatar: '/avatars/9.jpg', role: 'Mobile Developer', email: 'ryan@example.com' },
      { id: '10', name: 'Anna Wang', avatar: '/avatars/10.jpg', role: 'QA Engineer', email: 'anna@example.com' },
    ],
    startDate: '2024-03-01',
    dueDate: '2024-11-30',
    tags: ['Mobile', 'Cross-platform', 'React Native'],
    budget: 85000,
  },
  {
    id: '5',
    title: 'Epsilon Security',
    description: 'Enterprise-grade security solution with advanced threat detection and prevention.',
    progress: 60,
    status: 'active',
    priority: 'high',
    members: [
      { id: '11', name: 'Mark Wilson', avatar: '/avatars/11.jpg', role: 'Security Expert', email: 'mark@example.com' },
      { id: '12', name: 'Sophie Martin', avatar: '/avatars/12.jpg', role: 'System Architect', email: 'sophie@example.com' },
    ],
    startDate: '2024-01-15',
    dueDate: '2024-10-31',
    tags: ['Security', 'Enterprise', 'Cybersecurity'],
    budget: 200000,
  },
];

// 获取项目列表的模拟 API 函数
export const fetchProjects = async (): Promise<Project[]> => {
  // 模拟 API 延迟
  await new Promise(resolve => setTimeout(resolve, 1000));
  return projectsData;
};

// 获取单个项目的模拟 API 函数
export const fetchProjectById = async (id: string): Promise<Project | undefined> => {
  await new Promise(resolve => setTimeout(resolve, 500));
  return projectsData.find(project => project.id === id);
};

// 创建新项目的模拟 API 函数
export const createProject = async (project: Omit<Project, 'id'>): Promise<Project> => {
  await new Promise(resolve => setTimeout(resolve, 800));
  const newProject = {
    ...project,
    id: Math.random().toString(36).substr(2, 9),
  };
  return newProject;
};

// 更新项目的模拟 API 函数
export const updateProject = async (id: string, updates: Partial<Project>): Promise<Project> => {
  await new Promise(resolve => setTimeout(resolve, 800));
  const projectIndex = projectsData.findIndex(p => p.id === id);
  if (projectIndex === -1) {
    throw new Error('Project not found');
  }
  const updatedProject = {
    ...projectsData[projectIndex],
    ...updates,
  };
  return updatedProject;
};

// 删除项目的模拟 API 函数
export const deleteProject = async (id: string): Promise<void> => {
  await new Promise(resolve => setTimeout(resolve, 500));
  const projectIndex = projectsData.findIndex(p => p.id === id);
  if (projectIndex === -1) {
    throw new Error('Project not found');
  }
  // 在实际应用中，这里会调用后端 API 删除项目
}; 