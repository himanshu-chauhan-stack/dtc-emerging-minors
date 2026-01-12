import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

const SectionBarChart = ({ data }) => {
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const total = payload.reduce((sum, entry) => sum + entry.value, 0);
      return (
        <div className="glass-card px-4 py-3 rounded-xl">
          <p className="text-white font-bold text-lg mb-2">{label}</p>
          {payload.map((entry, index) => (
            <div key={index} className="flex items-center gap-2 mb-1">
              <div 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: entry.color }}
              />
              <span className="text-slate-300">{entry.name}:</span>
              <span className="text-white font-bold">{entry.value}</span>
              <span className="text-slate-400 text-sm">
                ({((entry.value / total) * 100).toFixed(1)}%)
              </span>
            </div>
          ))}
          <div className="border-t border-slate-600 mt-2 pt-2">
            <span className="text-slate-400">Total:</span>
            <span className="text-white font-bold ml-2">{total}</span>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="glass-card rounded-2xl p-6 h-full">
      <h3 className="text-xl font-bold text-white mb-2">Section-wise Elective Breakdown</h3>
      <p className="text-slate-400 text-sm mb-4">Stacked comparison of AIML vs DS per section</p>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} barCategoryGap="20%">
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
            <XAxis 
              dataKey="section" 
              stroke="#94a3b8"
              tick={{ fill: '#94a3b8', fontSize: 12 }}
              axisLine={{ stroke: 'rgba(255,255,255,0.1)' }}
            />
            <YAxis 
              stroke="#94a3b8"
              tick={{ fill: '#94a3b8', fontSize: 12 }}
              axisLine={{ stroke: 'rgba(255,255,255,0.1)' }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend
              verticalAlign="top"
              height={36}
              formatter={(value) => <span className="text-slate-300">{value}</span>}
            />
            <Bar 
              dataKey="AIML" 
              stackId="a" 
              fill="#818cf8"
              radius={[0, 0, 0, 0]}
              className="hover:opacity-80 transition-opacity"
            />
            <Bar 
              dataKey="DS" 
              stackId="a" 
              fill="#f472b6"
              radius={[4, 4, 0, 0]}
              className="hover:opacity-80 transition-opacity"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default SectionBarChart;
