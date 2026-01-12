import { Lightbulb, TrendingUp, Zap } from 'lucide-react';

const InsightsPanel = ({ insights }) => {
  return (
    <div className="glass-card rounded-2xl p-6 mb-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 rounded-xl bg-gradient-to-br from-amber-500/20 to-orange-500/20 border border-amber-500/30">
          <Lightbulb className="w-6 h-6 text-amber-400" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-white">Master Mind Insights</h3>
          <p className="text-slate-400 text-sm">AI-powered analysis of elective allocation patterns</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {insights.map((insight, index) => (
          <div
            key={index}
            className="group p-4 rounded-xl bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700/50 hover:border-indigo-500/50 transition-all duration-300 hover:scale-[1.02]"
          >
            <div className="flex items-start gap-3">
              <span className="text-2xl">{insight.icon}</span>
              <p className="text-slate-300 text-sm leading-relaxed group-hover:text-white transition-colors">
                {insight.text}
              </p>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-6 p-4 rounded-xl bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10 border border-indigo-500/20">
        <div className="flex items-center gap-2 mb-2">
          <Zap className="w-5 h-5 text-indigo-400" />
          <span className="text-indigo-300 font-semibold">Quick Summary</span>
        </div>
        <p className="text-slate-300 text-sm">
          The data reveals distinct preferences across sections. While AIML shows stronger adoption in CSE B, 
          Data Science maintains a solid presence particularly in CST D. This distribution suggests targeted 
          resource allocation strategies for each section.
        </p>
      </div>
    </div>
  );
};

export default InsightsPanel;
