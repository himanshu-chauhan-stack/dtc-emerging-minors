import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="glass-card px-4 py-3 rounded-lg">
        <p className="font-semibold text-white mb-2">{label}</p>
        {payload.map((entry, index) => (
          <p key={index} className="text-sm" style={{ color: entry.color }}>
            {entry.name}: {entry.value} students
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export const GenderElectiveChart = ({ data }) => {
  return (
    <div className="glass-card rounded-2xl p-6">
      <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
        <span className="text-2xl">🎯</span>
        Gender-wise Elective Choice
      </h3>
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
            <XAxis 
              dataKey="name" 
              tick={{ fill: '#9ca3af' }}
              axisLine={{ stroke: 'rgba(255,255,255,0.2)' }}
            />
            <YAxis 
              tick={{ fill: '#9ca3af' }}
              axisLine={{ stroke: 'rgba(255,255,255,0.2)' }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend 
              formatter={(value) => <span className="text-gray-300">{value}</span>}
            />
            <Bar 
              dataKey="AIML" 
              fill="#818cf8" 
              radius={[4, 4, 0, 0]}
              name="AIML"
            />
            <Bar 
              dataKey="DS" 
              fill="#f472b6" 
              radius={[4, 4, 0, 0]}
              name="DS"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
