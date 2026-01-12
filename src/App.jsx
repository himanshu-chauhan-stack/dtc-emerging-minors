import { useState, useEffect } from 'react';
import Header from './components/Header';
import SummaryCards from './components/SummaryCards';
import ElectivePieChart from './components/ElectivePieChart';
import SectionBarChart from './components/SectionBarChart';
import { GenderPieChart } from './components/GenderPieChart';
import { GenderElectiveChart } from './components/GenderElectiveChart';
import InsightsPanel from './components/InsightsPanel';
import DataGrid from './components/DataGrid';
import { useAnalytics } from './hooks/useAnalytics';

// Loading Screen Component
const LoadingScreen = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + Math.random() * 15 + 5;
      });
    }, 50);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex flex-col items-center justify-center z-50">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '0.5s' }} />
      </div>

      {/* Logo */}
      <div className="relative z-10 flex flex-col items-center">
        <img
          src="/dtc-logo.png"
          alt="DTC Logo"
          className="w-24 h-24 mb-6 animate-bounce"
        />
        
        <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
          Delhi Technical Campus
        </h1>
        
        <p className="text-slate-400 mb-8">Loading Student Analytics...</p>

        {/* Progress Bar */}
        <div className="w-64 h-2 bg-slate-700 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full transition-all duration-100 ease-out"
            style={{ width: `${Math.min(progress, 100)}%` }}
          />
        </div>

        {/* Loading dots */}
        <div className="flex gap-2 mt-6">
          <div className="w-3 h-3 bg-indigo-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
          <div className="w-3 h-3 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
          <div className="w-3 h-3 bg-pink-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
        </div>
      </div>
    </div>
  );
};

function App() {
  const [isLoading, setIsLoading] = useState(true);

  const {
    normalizedData,
    totalStudents,
    aimlStudents,
    dsStudents,
    maleStudents,
    femaleStudents,
    sectionData,
    mostPopulatedSection,
    pieData,
    genderPieData,
    genderElectiveData,
    insights
  } = useAnalytics();

  useEffect(() => {
    // Simulate loading time (500ms)
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      {/* Background decorations */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '3s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-500/5 rounded-full blur-3xl" />
      </div>

      {/* Main content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Header />

        <SummaryCards
          totalStudents={totalStudents}
          aimlStudents={aimlStudents}
          dsStudents={dsStudents}
          mostPopulatedSection={mostPopulatedSection}
          maleStudents={maleStudents}
          femaleStudents={femaleStudents}
        />

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <ElectivePieChart data={pieData} />
          <SectionBarChart data={sectionData} />
        </div>

        {/* Gender Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <GenderPieChart data={genderPieData} />
          <GenderElectiveChart data={genderElectiveData} />
        </div>

        <InsightsPanel insights={insights} />

        <DataGrid data={normalizedData} />

        {/* Footer */}
        <footer className="mt-12 text-center py-6 border-t border-slate-700/50">
          <p className="text-slate-500 text-sm">
            Made with ❤️ by Himanshu & Ritesh
          </p>
        </footer>
      </div>
    </div>
  );
}

export default App;
