import  { useEffect, useState } from 'react';

interface SkorGaugeProps {
  value: number;
  size?: number;
  className?: string;
}

export default function SkorGauge({ value, size = 200, className = '' }: SkorGaugeProps) {
  const [mounted, setMounted] = useState(false);
  
  // Normalize value between 0 and 100
  const normalizedValue = Math.min(Math.max(value, 0), 100);
  
  // Calculate the angle for the filled portion
  const angle = (normalizedValue / 100) * 360;
  
  useEffect(() => {
    setMounted(true);
  }, []);
  
  // Generate radiating lines
  const generateLines = () => {
    const lines = [];
    const totalLines = 40;
    const centerX = size / 2;
    const centerY = size / 2;
    const innerRadius = size * 0.28;
    const outerRadius = size * 0.46;
    
    for (let i = 0; i < totalLines; i++) {
      const lineAngle = (i / totalLines) * 360;
      const lineRadians = (lineAngle * Math.PI) / 180;
      
      const x1 = centerX + innerRadius * Math.cos(lineRadians);
      const y1 = centerY + innerRadius * Math.sin(lineRadians);
      const x2 = centerX + outerRadius * Math.cos(lineRadians);
      const y2 = centerY + outerRadius * Math.sin(lineRadians);
      
      // If the line is beyond the angle, make it faded
      const opacity = lineAngle <= angle ? 1 : 0.1;
      
      lines.push(
        <line
          key={i}
          x1={x1}
          y1={y1}
          x2={x2}
          y2={y2}
          stroke="currentColor"
          strokeWidth={2}
          className="text-yellow-400 dark:text-yellow-500"
          opacity={opacity}
          strokeLinecap="round"
        />
      );
    }
    
    return lines;
  };
  
  return (
    <div className={`relative ${className}`}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="transform -rotate-90">
        {/* Radiating lines */}
        {generateLines()}
        
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={size * 0.38}
          fill="transparent"
          stroke="currentColor"
          strokeWidth={size * 0.02}
          className="text-gray-200 dark:text-gray-700"
        />
        
        {/* Progress arc */}
        <path
          d={`
            M ${size / 2}, ${size / 2}
            L ${size / 2}, ${size * 0.1}
            A ${size * 0.4}, ${size * 0.4} 0 ${angle > 180 ? 1 : 0} 1 ${
            size / 2 + Math.sin((angle * Math.PI) / 180) * size * 0.4
          }, ${size / 2 - Math.cos((angle * Math.PI) / 180) * size * 0.4}
            Z
          `}
          fill="rgba(245, 158, 11, 0.7)"
          transform={`rotate(90, ${size / 2}, ${size / 2})`}
          style={{
            opacity: mounted ? 1 : 0,
            transition: 'opacity 0.5s ease-in-out'
          }}
        />
      </svg>
      
      <div 
        className="absolute inset-0 flex items-center justify-center text-3xl font-bold"
        style={{ fontSize: size * 0.15 }}
      >
        {normalizedValue}
      </div>
    </div>
  );
}
 