
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, PieChart, Pie } from 'recharts';
import { Globe, Users, Target } from 'lucide-react';

const sourceData = [
  { name: 'Grupo VIP Brasil', clicks: 2400, color: '#3b82f6' },
  { name: 'Comunidade Crypto', clicks: 1398, color: '#6366f1' },
  { name: 'Ofertas Diárias', clicks: 9800, color: '#8b5cf6' },
  { name: 'Mundo das Importações', clicks: 3908, color: '#ec4899' },
  { name: 'Canais Adultos (+18)', clicks: 4800, color: '#f43f5e' },
];

const deviceData = [
  { name: 'Android', value: 65 },
  { name: 'iOS', value: 25 },
  { name: 'Desktop', value: 10 },
];

export default function TrafficAnalytics() {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-[#1e293b] p-8 rounded-3xl border border-slate-700">
          <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
            <Globe className="text-blue-500" /> Cliques por Comunidade
          </h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={sourceData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" horizontal={false} />
                <XAxis type="number" stroke="#94a3b8" />
                <YAxis dataKey="name" type="category" stroke="#94a3b8" width={150} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', color: '#fff' }}
                />
                <Bar dataKey="clicks" radius={[0, 4, 4, 0]}>
                  {sourceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-[#1e293b] p-8 rounded-3xl border border-slate-700">
          <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
            <Target className="text-indigo-500" /> Origem de Dispositivo
          </h3>
          <div className="h-[300px] flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={deviceData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  <Cell fill="#3b82f6" />
                  <Cell fill="#6366f1" />
                  <Cell fill="#94a3b8" />
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute flex flex-col items-center">
              <span className="text-2xl font-bold">100%</span>
              <span className="text-xs text-slate-500 uppercase">Tráfego</span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-[#1e293b] rounded-3xl border border-slate-700 overflow-hidden">
        <div className="p-8 border-b border-slate-700">
          <h3 className="text-xl font-bold">Detalhamento de Origem</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-slate-500 text-xs font-bold uppercase tracking-wider bg-slate-800/50">
                <th className="px-8 py-4">Comunidade</th>
                <th className="px-8 py-4">Categoria</th>
                <th className="px-8 py-4">Cliques Únicos</th>
                <th className="px-8 py-4">Conversão Est.</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700">
              {sourceData.map((source, i) => (
                <tr key={i} className="hover:bg-slate-800/30 transition-colors">
                  <td className="px-8 py-6 font-medium">{source.name}</td>
                  <td className="px-8 py-6">
                    <span className={`px-2 py-1 rounded-md text-[10px] font-bold uppercase ${
                      source.name.includes('+18') ? 'bg-red-500/10 text-red-500' : 'bg-blue-500/10 text-blue-500'
                    }`}>
                      {source.name.includes('+18') ? 'ADULT' : 'GENERAL'}
                    </span>
                  </td>
                  <td className="px-8 py-6 font-bold">{source.clicks.toLocaleString()}</td>
                  <td className="px-8 py-6 text-green-500 font-bold">{(Math.random() * 5 + 1).toFixed(2)}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
