import  { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { timelineEvents, getCategoryById } from '../data/mockData';
import { format } from 'date-fns';

interface TimelineProps {
  limit?: number;
  filter?: number;
}

export default function Timeline({ limit = 5, filter }: TimelineProps) {
  const [showMoreEvents, setShowMoreEvents] = useState(false);
  
  // Filter events if a category filter is provided
  const filteredEvents = filter 
    ? timelineEvents.filter(event => event.category === filter)
    : timelineEvents;
  
  // Get events to display based on limit and showMoreEvents flag
  const eventsToDisplay = showMoreEvents 
    ? filteredEvents 
    : filteredEvents.slice(0, limit);
  
  if (filteredEvents.length === 0) {
    return (
      <div className="text-center py-10 text-gray-500 dark:text-gray-400">
        No activity found in this category.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {eventsToDisplay.map((event, index) => {
        const category = getCategoryById(event.category);
        
        return (
          <div 
            key={event.id}
            className="flex gap-4 relative"
          >
            {/* Timeline line */}
            {index < eventsToDisplay.length - 1 && (
              <div className="absolute left-[16px] top-[32px] bottom-0 w-0.5 bg-gray-200 dark:bg-gray-700" />
            )}
            
            {/* Event indicator */}
            <div 
              className="w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center relative z-10"
              style={{ backgroundColor: `${category?.color}20`, color: category?.color }}
            >
              <span className="text-xs font-medium">{category?.id}</span>
            </div>
            
            {/* Event content */}
            <div className="flex-1 pb-6">
              <div className="flex justify-between mb-1 text-sm">
                <span className="font-medium">{event.title}</span>
                <span className="text-gray-500 dark:text-gray-400">{format(event.date, 'MMM d')}</span>
              </div>
              
              <div className="flex justify-between text-xs">
                <span 
                  className="px-2 py-0.5 rounded-full"
                  style={{ backgroundColor: `${category?.color}20`, color: category?.color }}
                >
                  {event.source}
                </span>
                
                <span className="text-gray-500 dark:text-gray-400">
                  +{event.value} points
                </span>
              </div>
              
              {event.link && (
                <a 
                  href={event.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-blue-500 hover:underline mt-1 inline-block"
                >
                  View details →
                </a>
              )}
            </div>
          </div>
        );
      })}
      
      {filteredEvents.length > limit && (
        <div className="text-center pb-4">
          <button
            onClick={() => setShowMoreEvents(!showMoreEvents)}
            className="text-sm text-blue-500 hover:text-blue-600 flex items-center justify-center mx-auto"
          >
            {showMoreEvents ? (
              <>
                Show fewer <ChevronUp size={16} className="ml-1" />
              </>
            ) : (
              <>
                Show more <ChevronDown size={16} className="ml-1" />
              </>
            )}
          </button>
        </div>
      )}
    </div>
  );
}
 