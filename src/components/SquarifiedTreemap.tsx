import  { useState } from 'react';
import { Category } from '../types';

interface SquarifiedTreemapProps {
  categories: Category[];
}

export default function SquarifiedTreemap({ categories }: SquarifiedTreemapProps) {
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  
  // Calculate the total score for proportions
  const totalScore = categories.reduce((sum, category) => sum + category.score, 0);
  
  // Sort categories by score (descending)
  const sortedCategories = [...categories].sort((a, b) => b.score - a.score);
  
  // Calculate grid layout (simplified squarified treemap approach using CSS grid)
  // For a proper squarified treemap algorithm, use a library like d3
  const gridLayout = sortedCategories.map(category => {
    const relativeSize = category.score / totalScore;
    
    // Determine grid span based on relative size (simplified)
    let colSpan = 1;
    let rowSpan = 1;
    
    if (relativeSize > 0.2) {
      colSpan = 2;
      rowSpan = 2;
    } else if (relativeSize > 0.1) {
      colSpan = 2;
      rowSpan = 1;
    }
    
    const isHovered = hoveredId === category.id;
    
    return { category, colSpan, rowSpan, isHovered };
  });
  
  return (
    <div className="relative overflow-hidden rounded-xl" style={{ minHeight: '200px' }}>
      <div 
        className="grid grid-cols-4 gap-2 p-2" 
        style={{ 
          gridAutoRows: '1fr',
          backgroundColor: 'var(--bg-secondary)'
        }}
      >
        {gridLayout.map(({ category, colSpan, rowSpan, isHovered }) => (
          <div 
            key={category.id}
            className="relative flex items-center justify-center transition-all duration-300"
            style={{ 
              backgroundColor: category.color,
              gridColumn: `span ${colSpan}`,
              gridRow: `span ${rowSpan}`,
              transform: isHovered ? 'scale(1.05)' : 'scale(1)',
              zIndex: isHovered ? 10 : 1,
            }}
            onMouseEnter={() => setHoveredId(category.id)}
            onMouseLeave={() => setHoveredId(null)}
          >
            <div className="absolute inset-0 bg-black opacity-10" />
            
            <div className="relative z-10 text-white p-2 text-center">
              <div className="text-2xl mb-1">{category.emoji}</div>
              <div className="font-bold text-sm mb-0.5">{category.score}</div>
              <div className="text-xs opacity-80">{category.name}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
 