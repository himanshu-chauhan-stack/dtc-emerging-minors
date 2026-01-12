import { Users, Brain, Database, Trophy, UserCircle, UserCircle2 } from 'lucide-react';

const SummaryCards = ({ totalStudents, aimlStudents, dsStudents, mostPopulatedSection, maleStudents, femaleStudents }) => {
  const cards = [
    {
      title: 'Total Students',
      value: totalStudents,
      icon: Users,
      gradient: 'from-blue-500 to-cyan-500',
      bgGlow: 'bg-blue-500/20',
      iconColor: 'text-blue-400'
    },
    {
      title: 'AIML Students',
      value: aimlStudents,
      subtitle: `${((aimlStudents / totalStudents) * 100).toFixed(1)}%`,
      icon: Brain,
      gradient: 'from-indigo-500 to-purple-500',
      bgGlow: 'bg-indigo-500/20',
      iconColor: 'text-indigo-400'
    },
    {
      title: 'DS Students',
      value: dsStudents,
      subtitle: `${((dsStudents / totalStudents) * 100).toFixed(1)}%`,
      icon: Database,
      gradient: 'from-pink-500 to-rose-500',
      bgGlow: 'bg-pink-500/20',
      iconColor: 'text-pink-400'
    },
    {
      title: 'Male Students',
      value: maleStudents,
      subtitle: `${((maleStudents / totalStudents) * 100).toFixed(1)}%`,
      icon: UserCircle,
      gradient: 'from-sky-500 to-blue-500',
      bgGlow: 'bg-sky-500/20',
      iconColor: 'text-sky-400'
    },
    {
      title: 'Female Students',
      value: femaleStudents,
      subtitle: `${((femaleStudents / totalStudents) * 100).toFixed(1)}%`,
      icon: UserCircle2,
      gradient: 'from-fuchsia-500 to-pink-500',
      bgGlow: 'bg-fuchsia-500/20',
      iconColor: 'text-fuchsia-400'
    },
    {
      title: 'Most Populated',
      value: mostPopulatedSection.section,
      subtitle: `${mostPopulatedSection.total} students`,
      icon: Trophy,
      gradient: 'from-amber-500 to-orange-500',
      bgGlow: 'bg-amber-500/20',
      iconColor: 'text-amber-400'
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-8">
      {cards.map((card, index) => (
        <div
          key={index}
          className="glass-card rounded-2xl p-6 hover:scale-105 transition-all duration-300 group cursor-pointer"
        >
          <div className="flex items-start justify-between mb-4">
            <div className={`p-3 rounded-xl ${card.bgGlow} group-hover:scale-110 transition-transform`}>
              <card.icon className={`w-6 h-6 ${card.iconColor}`} />
            </div>
            <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${card.gradient} animate-pulse`} />
          </div>
          <h3 className="text-slate-400 text-sm font-medium mb-1">{card.title}</h3>
          <p className={`text-3xl font-bold bg-gradient-to-r ${card.gradient} bg-clip-text text-transparent`}>
            {card.value}
          </p>
          {card.subtitle && (
            <p className="text-slate-500 text-sm mt-1">{card.subtitle}</p>
          )}
        </div>
      ))}
    </div>
  );
};

export default SummaryCards;
