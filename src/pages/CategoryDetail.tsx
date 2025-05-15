import  { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Info } from 'lucide-react';
import Timeline from '../components/Timeline';
import { getCategoryById } from '../data/mockData';
import CircularProgress from '../components/CircularProgress';

export default function CategoryDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [category, setCategory] = useState(id ? getCategoryById(parseInt(id)) : undefined);
  
  useEffect(() => {
    if (id) {
      setCategory(getCategoryById(parseInt(id)));
    }
  }, [id]);
  
  if (!category) {
    return (
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm text-center">
            <h2 className="text-xl font-semibold mb-2">Category not found</h2>
            <p className="text-gray-500 dark:text-gray-400 mb-4">The category you're looking for doesn't exist.</p>
            <button
              onClick={() => navigate('/')}
              className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
            >
              Go back to dashboard
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center mb-6">
          <button
            onClick={() => navigate(-1)}
            className="mr-3 w-10 h-10 flex items-center justify-center rounded-full"
            style={{ backgroundColor: 'var(--bg-tertiary)' }}
            aria-label="Go back"
          >
            <ArrowLeft size={16} />
          </button>
          <h1 className="text-2xl font-bold">{category.name}</h1>
        </div>
        
        {/* Category overview */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm mb-6" style={{ backgroundColor: 'var(--bg-primary)' }}>
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="text-lg font-medium mb-2">Your Score</div>
              <div className="text-4xl font-bold mb-4" style={{ color: category.color }}>
                {category.score}<span className="text-xl font-normal text-gray-500 dark:text-gray-400">/{category.maxScore}</span>
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-300 mb-4">{category.description}</div>
            </div>
            
            <div className="w-24 h-24">
              <CircularProgress
                value={category.score}
                max={category.maxScore}
                size={96}
                strokeWidth={8}
                color={category.color}
                className="mb-1"
              />
            </div>
          </div>
          
          {/* Tips */}
          <div 
            className="mt-4 p-4 rounded-lg text-sm"
            style={{ backgroundColor: `${category.color}10`, borderLeft: `4px solid ${category.color}` }}
          >
            <div className="flex items-start">
              <Info size={18} className="mr-2 flex-shrink-0" style={{ color: category.color }} />
              <div>
                <p className="font-medium mb-1" style={{ color: category.color }}>How to improve your {category.name} score:</p>
                <ul className="list-disc list-inside space-y-1 ml-1">
                  <li>Participate in more governance votes</li>
                  <li>Increase your transaction volume across multiple chains</li>
                  <li>Hold tokens for longer periods to demonstrate commitment</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        
        {/* Activity timeline */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm" style={{ backgroundColor: 'var(--bg-primary)' }}>
          <h2 className="text-lg font-semibold mb-4">{category.name} Activity</h2>
          <Timeline filter={category.id} />
        </div>
      </div>
    </div>
  );
}
 