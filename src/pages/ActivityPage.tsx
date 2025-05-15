import  { useState } from 'react';
import { ArrowLeft, Filter } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Timeline from '../components/Timeline';
import { categories, timelineEvents, getCategoryById } from '../data/mockData';
import { format } from 'date-fns';

export default function ActivityPage() {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>('all');
  
  // Get unique months from events
  const months = Array.from(new Set(
    timelineEvents.map(event => format(event.date, 'MMM yyyy'))
  ));

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <button
              onClick={() => navigate('/')}
              className="w-10 h-10 flex items-center justify-center rounded-full mr-3"
              style={{ backgroundColor: 'var(--bg-tertiary)' }}
              aria-label="Go back"
            >
              <ArrowLeft size={18} />
            </button>
            <h1 className="text-2xl font-bold">Activity</h1>
          </div>
        </div>
        
        {/* Filters */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 mb-6 shadow-sm" style={{ backgroundColor: 'var(--bg-primary)' }}>
          <div className="flex items-center mb-3 text-sm">
            <Filter size={16} className="mr-2 text-gray-500 dark:text-gray-400" />
            <span className="font-medium">Filter Activity</span>
          </div>
          
          <div className="flex flex-col md:flex-row gap-4">
            {/* Category filter */}
            <div className="flex-1">
              <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">Category</label>
              <select
                value={selectedCategory === null ? '' : selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value ? Number(e.target.value) : null)}
                className="w-full p-2 rounded-lg border text-sm"
                style={{ borderColor: 'var(--border-color)', backgroundColor: 'var(--bg-primary)' }}
              >
                <option value="">All Categories</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
            
            {/* Date filter */}
            <div className="flex-1">
              <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">Time Period</label>
              <select
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full p-2 rounded-lg border text-sm"
                style={{ borderColor: 'var(--border-color)', backgroundColor: 'var(--bg-primary)' }}
              >
                <option value="all">All Time</option>
                {months.map((month) => (
                  <option key={month} value={month}>
                    {month}
                  </option>
                ))}
              </select>
            </div>
          </div>
          
          {/* Applied filters display */}
          {selectedCategory && (
            <div className="mt-3 text-xs p-2 bg-blue-50 dark:bg-blue-900/30 rounded-lg text-blue-700 dark:text-blue-300">
              <div className="mt-1 text-sm">
                Filtered by: {getCategoryById(selectedCategory)?.name}
              </div>
            </div>
          )}
        </div>
        
        {/* Timeline */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm" style={{ backgroundColor: 'var(--bg-primary)' }}>
          <h2 className="text-lg font-semibold mb-4">Activity Timeline</h2>
          <Timeline filter={selectedCategory || undefined} />
        </div>
      </div>
    </div>
  );
}
 