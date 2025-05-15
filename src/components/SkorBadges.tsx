import  { useState } from 'react';
import { Category } from '../types';

interface SkorBadgesProps {
  categories: Category[];
  layout?: 'grid' | 'scroll';
  maxDisplay?: number;
  showDetails?: boolean;
}

export default function SkorBadges({
  categories,
  layout = 'grid',
  maxDisplay = 9,
  showDetails = true
}: SkorBadgesProps) {
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  
  // Display all categories or limit based on maxDisplay
  const displayCategories = categories.slice(0, maxDisplay);
  
  return (
    <div className={layout === 'grid' 
      ? 'grid grid-cols-3 gap-2' 
      : 'flex overflow-x-auto pb-2 scrollbar-hide gap-2'
    }>
      {displayCategories.map(category => (
        <div 
          key={category.id}
          className={`
            relative rounded-xl text-center 
            ${layout === 'grid' ? '' : 'flex-shrink-0 w-24'}
            transition-all duration-200 hover:scale-105
          `}
          style={{ 
            background: `${category.color}15`,
            padding: layout === 'grid' ? '1rem' : '0.75rem'
          }}
          onMouseEnter={() => setHoveredId(category.id)}
          onMouseLeave={() => setHoveredId(null)}
        >
          <div className="text-2xl mb-1">{category.emoji}</div>
          
          {showDetails && (
            <>
              <div className="text-sm font-medium truncate mb-1" style={{ color: category.color }}>
                {category.name}
              </div>
              <div className="text-xl font-bold" style={{ color: category.color }}>
                {category.score}
              </div>
            </>
          )}
          
          {hoveredId === category.id && (
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-70 rounded-xl p-2">
              <div className="text-white text-xs">
                {category.description}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
 