import  { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
 
import SkorGauge from '../components/SkorGauge';
import CategoryCard from '../components/CategoryCard';
 
import { levels, timelineEvents, calculateSkorIndex } from '../data/mockData';

export default function Dashboard() {
  const [expandedId, setExpandedId] = useState<number | null>(null);
  
  const handleToggleCategory = (id: number) => {
    setExpandedId(expandedId === id ? null : id);
  };
  
  const skorIndex = calculateSkorIndex();
  
  return (
    <div className="pt-header pb-16">
      <div className="container mx-auto px-4">
        <div className="my-6">
          <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
          <p className="text-lg" style={{ color: 'var(--text-secondary)' }}>
            Trace your Web3 footprint across 9 layers of activity.
          </p>
        </div>
        
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left column */}
          <div className="w-full lg:w-1/3">
            <div className="card p-6 mb-8 flex flex-col items-center">
              <h2 className="text-xl font-semibold mb-6 self-start">Skor Index</h2>
              
              <div className="fear-greed-gauge mb-6 flex flex-col items-center">
                <SkorGauge value={skorIndex} />
              </div>
              
              <div className="text-sm mb-4 text-center" style={{ color: 'var(--text-secondary)' }}>
                Your Skor Index is calculated as a weighted average across all 9 levels, reflecting your overall activity and impact in the Web3 ecosystem.
                Improve your score by connecting more data sources and increasing your engagement across different areas — from technical contributions to real-world impact.
              </div>
              
              <Link
                to="/profile"
                className="flex items-center text-sm hover:underline mt-2"
                style={{ color: '#3B82F6' }}
              >
                View complete profile
                <ArrowRight size={14} className="ml-1" />
              </Link>
            </div>
            
            <div className="card p-6">
              <h2 className="text-xl font-semibold mb-4">Connected Chains</h2>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between py-2 border-b" style={{ borderColor: 'var(--border-color)' }}>
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full mr-3 flex items-center justify-center" style={{ backgroundColor: 'rgba(59, 130, 246, 0.1)' }}>
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7.99992 0L7.84961 0.505827V10.9371L7.99992 11.0871L12.9999 8.01986L7.99992 0Z" fill="#3B82F6"/>
                        <path d="M8.00002 0L3 8.01986L8.00002 11.0872V5.93768V0Z" fill="#80AFFA"/>
                        <path d="M8.00005 12.0238L7.91602 12.1269V15.8752L8.00005 16.0001L13.0033 9.1582L8.00005 12.0238Z" fill="#3B82F6"/>
                        <path d="M8.00002 16L8.00002 12.0238L3 9.15823L8.00002 16Z" fill="#80AFFA"/>
                        <path d="M8 11.0871L12.9999 8.01993L8 5.93774V11.0871Z" fill="#0E4AAA"/>
                        <path d="M3 8.01993L8 11.0871V5.93774L3 8.01993Z" fill="#3B82F6"/>
                      </svg>
                    </div>
                    <div>
                      <div className="font-medium">Ethereum</div>
                      <div className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                        3 addresses
                      </div>
                    </div>
                  </div>
                  <button 
                    className="text-xs px-2 py-1 rounded"
                    style={{ backgroundColor: 'var(--bg-tertiary)' }}
                  >
                    Manage
                  </button>
                </div>
                
                <div className="flex items-center justify-between py-2 border-b" style={{ borderColor: 'var(--border-color)' }}>
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full mr-3 flex items-center justify-center" style={{ backgroundColor: 'rgba(75, 85, 99, 0.1)' }}>
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7.99992 0L7.84961 0.505827V10.9371L7.99992 11.0871L12.9999 8.01986L7.99992 0Z" fill="#4B5563"/>
                        <path d="M8.00002 0L3 8.01986L8.00002 11.0872V5.93768V0Z" fill="#9CA3AF"/>
                        <path d="M8.00005 12.0238L7.91602 12.1269V15.8752L8.00005 16.0001L13.0033 9.1582L8.00005 12.0238Z" fill="#4B5563"/>
                        <path d="M8.00002 16L8.00002 12.0238L3 9.15823L8.00002 16Z" fill="#9CA3AF"/>
                        <path d="M8 11.0871L12.9999 8.01993L8 5.93774V11.0871Z" fill="#1F2937"/>
                        <path d="M3 8.01993L8 11.0871V5.93774L3 8.01993Z" fill="#4B5563"/>
                      </svg>
                    </div>
                    <div>
                      <div className="font-medium">Arbitrum</div>
                      <div className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                        1 address
                      </div>
                    </div>
                  </div>
                  <button 
                    className="text-xs px-2 py-1 rounded"
                    style={{ backgroundColor: 'var(--bg-tertiary)' }}
                  >
                    Manage
                  </button>
                </div>
                
                <div className="flex items-center justify-between py-2">
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full mr-3 flex items-center justify-center" style={{ backgroundColor: 'rgba(16, 185, 129, 0.1)' }}>
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="8" cy="8" r="8" fill="#10B981"/>
                        <path d="M10.5 6L7 9.5L5.5 8" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <div>
                      <div className="font-medium">Solana</div>
                      <div className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                        2 addresses
                      </div>
                    </div>
                  </div>
                  <button 
                    className="text-xs px-2 py-1 rounded"
                    style={{ backgroundColor: 'var(--bg-tertiary)' }}
                  >
                    Manage
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          {/* Right column - Categories */}
          <div className="w-full lg:w-2/3">
            <div className="card p-6 mb-8">
              <div className="mb-6">
                <h2 className="text-xl font-semibold">Activity Categories</h2>
              </div>
              
              <div className="space-y-4">
                {levels.map((level, index) => (
                  <CategoryCard 
                    key={level.id} 
                    category={level} 
                    index={index + 1}
                    expandedId={expandedId}
                    onToggle={handleToggleCategory}
                  />
                ))}
              </div>
            </div>
            
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Recent Activity</h2>
              <Link
                to="/activity"
                className="flex items-center text-sm hover:underline"
                style={{ color: '#3B82F6' }}
              >
                View all
                <ArrowRight size={14} className="ml-1" />
              </Link>
            </div>
            
            <div className="card p-4">
              <div className="timeline-container max-h-[300px] overflow-y-auto">
                <div className="space-y-4">
                  {timelineEvents.slice(0, 3).map(event => {
                    const eventDate = new Date(event.date);
                    const formattedDate = eventDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
                    const formattedTime = eventDate.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
                    
                    // Color mapping for levels
                    const colorMap: Record<number, string> = {
                      1: '#3B82F6', 2: '#F59E0B', 3: '#10B981', 4: '#F43F5E',
                      5: '#F97316', 6: '#06B6D4', 7: '#EC4899', 8: '#6366F1', 9: '#8B5CF6'
                    };
                    
                    return (
                      <div key={event.id} className="timeline-item">
                        <div className="flex flex-col sm:flex-row sm:items-center">
                          <div className="sm:w-1/4 mb-1 sm:mb-0">
                            <div className="text-sm font-medium">{formattedDate}</div>
                            <div className="text-xs" style={{ color: 'var(--text-secondary)' }}>{formattedTime}</div>
                          </div>
                          
                          <div className="sm:w-3/4 rounded-lg p-3" style={{ 
                            backgroundColor: `${colorMap[event.levelId] || '#3B82F6'}10`,
                            borderLeft: `2px solid ${colorMap[event.levelId] || '#3B82F6'}`
                          }}>
                            <div className="flex justify-between items-start">
                              <div>
                                <div className="font-medium mb-1">{event.title}</div>
                                <div className="text-sm flex items-center" style={{ color: 'var(--text-secondary)' }}>
                                  <span className="mr-2">{event.source}</span>
                                  <span className="font-medium" style={{ color: colorMap[event.levelId] || '#3B82F6' }}>
                                    {event.value}
                                  </span>
                                </div>
                              </div>
                              
                              {event.link && (
                                <a 
                                  href={event.link}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-xs px-2 py-1 rounded"
                                  style={{ backgroundColor: 'var(--bg-tertiary)' }}
                                >
                                  View
                                </a>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
 