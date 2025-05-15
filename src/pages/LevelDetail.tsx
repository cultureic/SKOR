import  { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import { getLevelById, getTailwindBgColorLight, timelineEvents } from '../data/mockData';
import EmptyState from '../components/EmptyState';
import { extractColorFromTailwind } from '../components/ColorUtils';

type Params = {
  id: string;
};

export default function LevelDetail() {
  const { id } = useParams<Params>();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  
  // Get level details
  const levelId = parseInt(id || '0');
  const level = getLevelById(levelId);
  
  // Filter events for this level
  const levelEvents = timelineEvents.filter(event => event.level === levelId);
  
  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);
  
  if (isLoading) {
    return (
      <div className="container mx-auto px-4 pt-header pb-12">
        <div className="py-12">
          <EmptyState 
            type="loading" 
            message={`Loading data for Level ${levelId}...`}
          />
        </div>
      </div>
    );
  }
  
  if (!level) {
    return (
      <div className="container mx-auto px-4 pt-header pb-12">
        <div className="py-12">
          <EmptyState 
            type="error" 
            message={`Level ${levelId} not found.`}
            action={{
              label: 'Go Back',
              onClick: () => navigate('/')
            }}
          />
        </div>
      </div>
    );
  }
  
  // Extract color for styling
  const color = extractColorFromTailwind(level.color);
  const bgColorLight = getTailwindBgColorLight(level.color);
  
  return (
    <div className="container mx-auto px-4 pt-header pb-12">
      <div className="py-6">
        <div className="flex items-center mb-6">
          <button
            onClick={() => navigate(-1)}
            className="mr-3 w-10 h-10 flex items-center justify-center rounded-full"
            style={{ backgroundColor: 'var(--bg-tertiary)' }}
            aria-label="Go back"
          >
            <ArrowLeft size={16} />
          </button>
          <div>
            <div className="text-sm font-normal mb-1" style={{ color: 'var(--text-secondary)' }}>
              Dashboard &gt; Level {level.id}
            </div>
            <h1 className="text-2xl font-bold" style={{ color }}>
              {level.name}
            </h1>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <div className="p-6 rounded-xl mb-6" style={{ backgroundColor: 'var(--bg-secondary)' }}>
              <h2 className="text-xl font-bold mb-4">Overview</h2>
              
              <div className="flex justify-center mb-6">
                <div 
                  className="w-32 h-32 flex items-center justify-center rounded-full text-4xl font-bold"
                  style={{ 
                    backgroundColor: 'var(--bg-tertiary)',
                    color
                  }}
                >
                  {level.score}
                </div>
              </div>
              
              <p className="text-sm mb-4" style={{ color: 'var(--text-secondary)' }}>
                {level.description}
              </p>
              
              <div className="space-y-3">
                {level.metrics.map((metric, idx) => (
                  <div 
                    key={idx} 
                    className="flex justify-between items-center p-3 rounded-lg"
                    style={{ backgroundColor: 'var(--bg-tertiary)' }}
                  >
                    <span>{metric.name}</span>
                    <span className="font-bold">
                      {metric.value.toLocaleString()} <span className="text-xs font-normal" style={{ color: 'var(--text-secondary)' }}>{metric.unit}</span>
                    </span>
                  </div>
                ))}
              </div>
            </div>
            
            <div 
              className="p-6 rounded-xl"
              style={{ 
                backgroundColor: 'var(--bg-secondary)',
                borderLeft: `4px solid ${color}`
              }}
            >
              <h2 className="text-xl font-bold mb-4">Insights</h2>
              
              <ul className="space-y-3">
                <li className="flex items-start">
                  <div className="w-5 h-5 rounded-sm mr-2 flex-shrink-0 mt-0.5" style={{ backgroundColor: bgColorLight }}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke={color}>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span>You're in the top 25% of users in this category</span>
                </li>
                <li className="flex items-start">
                  <div className="w-5 h-5 rounded-sm mr-2 flex-shrink-0 mt-0.5" style={{ backgroundColor: bgColorLight }}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke={color}>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span>Your activity increased by 32% in the last 30 days</span>
                </li>
                <li className="flex items-start">
                  <div className="w-5 h-5 rounded-sm mr-2 flex-shrink-0 mt-0.5" style={{ backgroundColor: bgColorLight }}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke={color}>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span>Connected 3 of 5 possible data sources for this level</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="lg:col-span-2">
            <div 
              className="p-6 rounded-xl"
              style={{ backgroundColor: 'var(--bg-secondary)' }}
            >
              <h2 className="text-xl font-bold mb-4">{level.name} Events</h2>
              
              {levelEvents.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                        <th className="py-3 text-left font-medium" style={{ color: 'var(--text-secondary)' }}>Event</th>
                        <th className="py-3 text-left font-medium" style={{ color: 'var(--text-secondary)' }}>Source</th>
                        <th className="py-3 text-left font-medium" style={{ color: 'var(--text-secondary)' }}>Date</th>
                        <th className="py-3 text-left font-medium" style={{ color: 'var(--text-secondary)' }}>Value</th>
                        <th className="py-3 text-center font-medium" style={{ color: 'var(--text-secondary)' }}>Link</th>
                      </tr>
                    </thead>
                    <tbody>
                      {levelEvents.map((event) => (
                        <tr 
                          key={event.id}
                          style={{ borderBottom: '1px solid var(--border-color)' }}
                        >
                          <td className="py-3">
                            <div className="font-bold">{event.title}</div>
                            <div className="text-sm" style={{ color: 'var(--text-secondary)' }}>{event.description}</div>
                          </td>
                          <td className="py-3">{event.source}</td>
                          <td className="py-3">{new Date(event.date).toLocaleDateString()}</td>
                          <td className="py-3">{event.value || "-"}</td>
                          <td className="py-3 text-center">
                            {event.url && (
                              <a 
                                href={event.url} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="inline-flex items-center justify-center w-8 h-8 rounded-full"
                                style={{ backgroundColor: 'var(--bg-tertiary)' }}
                              >
                                <ExternalLink size={14} style={{ color }} />
                              </a>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <EmptyState 
                  type="empty" 
                  message={`No events found for ${level.name}.`}
                  action={{
                    label: 'Connect Sources',
                    onClick: () => navigate('/')
                  }}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
 