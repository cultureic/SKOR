import  { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Activity, Award, GitPullRequest, Share2, Users, 
  BookOpen, Heart, Shield
} from 'lucide-react';
import CircularProgress from './CircularProgress';
import { extractColorFromTailwind } from './ColorUtils';
import { Level } from '../types';

const LucideIcons: Record<string, React.FC<{ size?: number; color?: string }>> = {
  Activity,
  Award,
  GitPullRequest,
  Share2,
  Users,
  BookOpen,
  Heart,
  Shield
};

interface LevelCardProps {
  level: Level;
  index: number;
}

export default function LevelCard({ level, index }: LevelCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const Icon = LucideIcons[level.icon] || Users;
  
  // Extract color from Tailwind class
  const color = extractColorFromTailwind(level.color);
  
  return (
    <Link 
      to={`/category/${level.id}`}
      className={`flex items-center justify-between p-4 rounded-xl transition-all duration-300 border backdrop-blur-md ${
        isHovered ? 'transform scale-[1.03] shadow-lg' : ''
      }`}
      style={{ 
        backgroundColor: `${color}10`,
        borderColor: `${color}30`
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex items-center space-x-4">
        <div className="relative">
          <CircularProgress
            value={level.score}
            size={56}
            strokeWidth={4}
            color={color}
            className="transform transition-transform duration-300"
          >
            <div className="flex items-center justify-center w-full h-full">
              <span className="text-xl">{level.emoji}</span>
            </div>
          </CircularProgress>
        </div>
        
        <div>
          <h3 className="font-bold text-base flex items-center" style={{ color }}>
            {level.title}
          </h3>
          <p className="text-xs opacity-80 max-w-[180px] truncate">
            {level.subtitle}
          </p>
        </div>
      </div>
      
      <div className="flex flex-col items-end">
        <div className="text-2xl font-extrabold" style={{ color }}>
          {level.score}
        </div>
        <div className="text-xs opacity-70">
          /100
        </div>
      </div>
    </Link>
  );
}
 