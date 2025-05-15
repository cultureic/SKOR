import  { useNavigate } from 'react-router-dom';
import { ArrowLeft, Download, Award, TrendingUp, Calendar, AlertTriangle } from 'lucide-react';
import { categories } from '../data/mockData';

export default function ReportPage() {
  const navigate = useNavigate();

  // Calculate total score
  const totalScore = Math.round(categories.reduce((sum, category) => sum + category.score, 0) / categories.length);
  
  // Sort categories by score to find strongest and weakest
  const sortedCategories = [...categories].sort((a, b) => b.score - a.score);
  const strongestCategory = sortedCategories[0];
  const weakestCategory = sortedCategories[sortedCategories.length - 1];

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center mb-6">
          <button
            onClick={() => navigate('/')}
            className="mr-3 w-10 h-10 flex items-center justify-center rounded-full"
            style={{ backgroundColor: 'var(--bg-tertiary)' }}
            aria-label="Go back"
          >
            <ArrowLeft size={16} />
          </button>
          <h1 className="text-2xl font-bold">Skor Report</h1>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm mb-6" style={{ backgroundColor: 'var(--bg-primary)' }}>
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-xl font-semibold">Alex Johnson's Web3 Report</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">Generated on {new Date().toLocaleDateString()}</p>
            </div>
            <button
              className="flex items-center px-3 py-1.5 text-sm font-medium bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
            >
              <Download size={16} className="mr-2" />
              Export PDF
            </button>
          </div>
          
          {/* Score overview */}
          <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4 mb-6">
            <div className="text-center">
              <div className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Overall Skor</div>
              <div className="text-4xl font-bold mb-2">{totalScore}</div>
              <div className="text-sm text-gray-600 dark:text-gray-300">
                Your score ranks in the top 25% of all users
              </div>
            </div>
          </div>
          
          {/* Key insights */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold mb-4">Key Insights</h3>
            
            {/* Strongest area */}
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: `${strongestCategory.color}20`, color: strongestCategory.color }}>
                <Award size={20} />
              </div>
              <div className="flex-1">
                <h4 className="font-medium mb-1">Strongest Area: {strongestCategory.name}</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Your score of {strongestCategory.score} is impressive. You excel at contributing code and participating in open source projects.
                </p>
              </div>
            </div>
            
            {/* Growth opportunity */}
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: `${weakestCategory.color}20`, color: weakestCategory.color }}>
                <TrendingUp size={20} />
              </div>
              <div className="flex-1">
                <h4 className="font-medium mb-1">Growth Opportunity: {weakestCategory.name}</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  With a score of {weakestCategory.score}, this area has the most room for improvement. Consider participating in more quests and collecting badges.
                </p>
              </div>
            </div>
            
            {/* Activity trend */}
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-full flex items-center justify-center bg-blue-100 dark:bg-blue-900 text-blue-500 dark:text-blue-400">
                <Calendar size={20} />
              </div>
              <div className="flex-1">
                <h4 className="font-medium mb-1">Activity Trend</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Your activity has increased by 32% in the last 30 days, with the most engagement on Ethereum and Arbitrum networks.
                </p>
              </div>
            </div>
            
            {/* Security alert */}
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-full flex items-center justify-center bg-yellow-100 dark:bg-yellow-900 text-yellow-500 dark:text-yellow-400">
                <AlertTriangle size={20} />
              </div>
              <div className="flex-1">
                <h4 className="font-medium mb-1">Security Recommendation</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Your Responsible Privacy score could be improved. Consider implementing key rotation and using privacy-preserving transactions.
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Detailed category breakdown */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm" style={{ backgroundColor: 'var(--bg-primary)' }}>
          <h3 className="text-lg font-semibold mb-4">Category Breakdown</h3>
          
          <div className="space-y-4">
            {categories.map(category => (
              <div key={category.id} className="flex items-center">
                <div className="w-10 text-sm font-medium">{category.id}</div>
                <div className="flex-1">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="font-medium">{category.name}</span>
                    <span className="font-medium">{category.score}/{category.maxScore}</span>
                  </div>
                  <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div 
                      className="h-full rounded-full" 
                      style={{ 
                        width: `${(category.score / category.maxScore) * 100}%`,
                        backgroundColor: category.color
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-6 text-sm text-gray-500 dark:text-gray-400">
            <p>
              This report is based on on-chain activity across multiple networks, dApp usage, contribution metrics, and social impact measurements. For more detailed insights on specific categories, visit the respective category pages from your dashboard.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
 