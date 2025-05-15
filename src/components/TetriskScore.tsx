import  { useState } from 'react';
import { Category } from '../types';

interface TetriskScoreProps {
  categories: Category[];
  className?: string;
}

export default function TetriskScore({ categories, className = '' }: TetriskScoreProps) {
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  
  // Sum of all category scores
  const totalScore = categories.reduce((sum, category) => sum + category.score, 0);
  
  return (
    <div className={`relative h-16 rounded-lg overflow-hidden ${className}`}>
      {/* Score bars */}
      <div className="flex h-full w-full">
        {categories.map(category => {
          // Calculate relative width based on score proportion
          const relativeWidth = (category.score / totalScore) * 100;
          const isHovered = hoveredId === category.id;
          
          return (
            <div 
              key={category.id}
              className="relative flex items-center justify-center"
              style={{ 
                width: `${relativeWidth}%`,
                height: '100%', 
                backgroundColor: category.color,
              }}
              onMouseEnter={() => setHoveredId(category.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              {/* Show emoji in wider segments */}
              {relativeWidth > 8 && (
                <span className="text-white text-lg">{category.emoji}</span>
              )}
              
              {/* Tooltip on hover */}
              {isHovered && (
                <div className="absolute -top-16 left-1/2 transform -translate-x-1/2 bg-slate-900 text-white px-3 py-2 rounded-md text-xs whitespace-nowrap z-10">
                  <div className="font-bold mb-1">{category.name}</div>
                  <div>{category.score} points</div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
 