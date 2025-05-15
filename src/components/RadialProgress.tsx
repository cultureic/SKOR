import  React from 'react';

interface RadialProgressProps {
  value: number;
  max?: number;
  size?: number;
  thickness?: number;
  color?: string;
  className?: string;
  label?: React.ReactNode;
  fearAndGreedStyle?: boolean;
}

export default function RadialProgress({ 
  value, 
  max = 100, 
  size = 200, 
  thickness = 16, 
  color = 'text-blue-500',
  className = '',
  label,
  fearAndGreedStyle = false
}: RadialProgressProps) {
  // Normalize value
  const normalizedValue = Math.min(Math.max(value, 0), max);
  const percentage = (normalizedValue / max) * 100;
  
  // Calculate dimensions
  const radius = (size - thickness) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;
  
  // Center position
  const center = size / 2;
  
  // For fear and greed style (gradient)
  const gradientId = `progress-gradient-${Math.random().toString(36).substring(2, 11)}`;
  
  // Extract color from Tailwind class
  let actualColor = '#3B82F6';
  if (color.includes('blue')) actualColor = '#3B82F6';
  else if (color.includes('amber')) actualColor = '#F59E0B';
  else if (color.includes('emerald')) actualColor = '#10B981';
  else if (color.includes('rose')) actualColor = '#F43F5E';
  else if (color.includes('orange')) actualColor = '#F97316';
  else if (color.includes('cyan')) actualColor = '#06B6D4';
  else if (color.includes('pink')) actualColor = '#EC4899';
  else if (color.includes('indigo')) actualColor = '#6366F1';
  else if (color.includes('violet')) actualColor = '#8B5CF6';
  else actualColor = color;
  
  return (
    <div className={`relative ${className}`} style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {fearAndGreedStyle && (
          <defs>
            <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#ff4d4d" />
              <stop offset="25%" stopColor="#ffff4d" />
              <stop offset="50%" stopColor="#4dff4d" />
              <stop offset="75%" stopColor="#4d4dff" />
              <stop offset="100%" stopColor="#ff4dff" />
            </linearGradient>
          </defs>
        )}
        
        {/* Background circle */}
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="transparent"
          strokeWidth={thickness}
          stroke="rgba(255, 255, 255, 0.1)"
        />
        
        {/* Progress circle */}
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="transparent"
          strokeWidth={thickness}
          stroke={fearAndGreedStyle ? `url(#${gradientId})` : actualColor}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          transform={`rotate(-90 ${center} ${center})`}
          style={{
            transition: 'stroke-dashoffset 0.5s ease-in-out',
            filter: fearAndGreedStyle ? 'drop-shadow(0 0 5px rgba(255, 255, 255, 0.5))' : `drop-shadow(0 0 3px ${actualColor})`
          }}
        />
        
        {/* Value display */}
        <text
          x={center}
          y={center}
          textAnchor="middle"
          dominantBaseline="middle"
          className="text-3xl font-bold fill-current"
          style={{ fill: fearAndGreedStyle ? 'white' : actualColor }}
        >
          {value}
        </text>
        
        {/* Label */}
        {label && (
          <text
            x={center}
            y={center + 24}
            textAnchor="middle"
            dominantBaseline="middle"
            className="text-sm fill-current"
            style={{ fill: 'var(--text-secondary)' }}
          >
            {label}
          </text>
        )}
      </svg>
    </div>
  );
}
 