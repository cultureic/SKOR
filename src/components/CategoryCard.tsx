import  { useState } from 'react';
import { Link } from 'react-router-dom';
import CircularProgress from './CircularProgress';
import { Category } from '../types';

interface CategoryCardProps {
  category: Category;
  className?: string;
}

export default function CategoryCard({ category, className = '' }: CategoryCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <Link 
      to={`/activity?category=${category.id}`}
      className={`flex items-center justify-between p-4 rounded-xl transition-all duration-300 ${className}`}
      style={{ 
        backgroundColor: `${category.color}10`,
        border: `1px solid ${category.color}30`
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex items-center space-x-4">
        <div className="relative">
          <CircularProgress
            value={category.score}
            size={56}
            strokeWidth={4}
            color={category.color}
            className="transform transition-transform duration-300"
          >
            <div className="flex items-center justify-center w-full h-full">
              <span className="text-xl">{category.emoji}</span>
            </div>
          </CircularProgress>
        </div>
        
        <div>
          <h3 className="font-bold text-base" style={{ color: category.color }}>
            {category.name}
          </h3>
          <p className="text-xs opacity-80 max-w-[180px]">
            {category.description.split('.')[0]}
          </p>
        </div>
      </div>
      
      <div className="flex flex-col items-end">
        <div className="text-2xl font-extrabold" style={{ color: category.color }}>
          {category.score}
        </div>
        <div className="text-xs opacity-70">
          /100
        </div>
      </div>
    </Link>
  );
}
 