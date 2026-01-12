import { Brain, Database } from 'lucide-react';

const Header = () => {
  return (
    <header className="glass-card rounded-2xl p-6 mb-8">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="w-16 h-16 rounded-2xl overflow-hidden animate-pulse-glow">
              <img 
                src="/dtc-logo.png" 
                alt="Delhi Technical Campus Logo"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold gradient-text">
              Delhi Technical Campus
            </h1>
            <p className="text-slate-400 text-sm md:text-base mt-1">
              Allocated Emerging Area Electives (Minor Specialization) for CSE & CST 3rd Year
            </p>
          </div>
        </div>
        <div className="flex gap-3">
          <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-500/20 border border-indigo-500/30">
            <Brain className="w-5 h-5 text-indigo-400" />
            <span className="text-indigo-300 font-medium">AIML</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-pink-500/20 border border-pink-500/30">
            <Database className="w-5 h-5 text-pink-400" />
            <span className="text-pink-300 font-medium">DS</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
