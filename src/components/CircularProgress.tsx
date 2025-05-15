import  React, { useEffect, useRef } from 'react';

interface CircularProgressProps {
  value: number;
  max?: number;
  size?: number;
  strokeWidth?: number;
  color?: string;
  className?: string;
  animationDuration?: number;
  children?: React.ReactNode;
}

export default function CircularProgress({
  value,
  max = 100,
  size = 40,
  strokeWidth = 3,
  color = '#3B82F6',
  className = '',
  animationDuration = 1000,
  children
}: CircularProgressProps) {
  const circleRef = useRef<SVGCircleElement>(null);
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const normalizedValue = value / max;
  const strokeDashoffset = circumference - normalizedValue * circumference;
  
  useEffect(() => {
    if (circleRef.current) {
      circleRef.current.style.transition = `stroke-dashoffset ${animationDuration}ms ease`;
      circleRef.current.style.strokeDashoffset = `${strokeDashoffset}`;
    }
  }, [strokeDashoffset, animationDuration]);

  return (
    <div className={`relative inline-flex items-center justify-center ${className}`}>
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="transform -rotate-90"
      >
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
          stroke="currentColor"
          className="text-gray-200 dark:text-gray-700"
          fill="transparent"
        />
        
        {/* Progress circle */}
        <circle
          ref={circleRef}
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
          stroke={color}
          fill="transparent"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={circumference}
        />
      </svg>
      
      {children && (
        <div className="absolute inset-0 flex items-center justify-center">
          {children}
        </div>
      )}
    </div>
  );
}
 