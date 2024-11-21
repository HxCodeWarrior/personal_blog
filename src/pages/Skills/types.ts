export interface Skill {
  id: string;
  name: string;
  icon: React.ReactNode;
  description: string;
  proficiency: number;
  category: string;
  tags: string[];
} 