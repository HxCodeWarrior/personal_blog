import { ReactNode } from 'react';

export interface Skill {
  id: string;
  name: string;
  icon: ReactNode;
  description: string;
  proficiency: number;
  category: string;
  tags: string[];
}

export interface SkillCategory {
  id: string;
  name: string;
  description?: string;
}

export interface SkillFilterProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
} 