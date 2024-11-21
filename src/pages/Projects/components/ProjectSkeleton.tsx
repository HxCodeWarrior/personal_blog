'use client'
import React from 'react';
import CardSkeleton from '@/components/cards/base/CardSkeleton';

const ProjectSkeleton: React.FC = () => {
  return (
    <CardSkeleton
      hasSubtitle
      contentLines={3}
      hasFooter
      animation="pulse"
    />
  );
};

export default ProjectSkeleton; 