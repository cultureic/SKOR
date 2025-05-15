export  function extractColorFromTailwind(colorValue: string): string {
  // Handle hex colors directly
  if (colorValue.startsWith('#')) {
    return colorValue;
  }
  
  // Map common tailwind colors to hex values
  const colorMap: Record<string, string> = {
    'text-blue-500': '#3B82F6',
    'text-green-500': '#10B981',
    'text-yellow-500': '#F59E0B',
    'text-pink-500': '#EC4899',
    'text-indigo-500': '#6366F1',
    'text-purple-500': '#8B5CF6',
    'text-red-500': '#EF4444',
    'text-gray-500': '#64748B',
    'text-sky-500': '#0EA5E9'
  };
  
  return colorMap[colorValue] || '#3B82F6'; // Default to blue if not found
}
 