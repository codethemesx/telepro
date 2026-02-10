
import React from 'react';
import { User, PlanType } from '../types';
import { PLANS } from '../constants';
import { TrendingUp, Users, Megaphone, Zap } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';

const data = [
  { name: 'Seg', clicks: 400, views: 2400 },
  { name: 'Ter', clicks: 300, views: 1398 },
  { name: 'Qua', clicks: 600, views: 9800 },
  { name: 'Qui', clicks: 800, views: 3908 },
  { name: 'Sex', clicks: 500, views: 4800 },
  { name: 'Sáb', clicks: 900, views: 3800 },
  { name: 'Dom', clicks: 1200, views: 4300 },
];

export default function Dashboard({ user }: { user: User }) {
  const planInfo = PLANS[user.plan];

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Cliques Totais" value="4.2k" icon={TrendingUp} trend="+12.5%" color="blue" />
        <StatCard title="Impressões" value="128k" icon={Users} trend="+8.2%" color="indigo" />
        <StatCard title="Anúncios Ativos" value="2 / 3" icon={Megaphone} trend="Slot Grátis" color="emerald" />
        <StatCard title="Saldo Afiliado" value={`R$ ${user.affiliateBalance.toFixed(2)}`} icon={Zap} trend="Pendente" color="amber" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-[#1e293b] p-6 rounded-2xl border border-slate-700">
          <h3 className="text-xl font-bold mb-6">Performance Semanal</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorClicks" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563eb" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                <XAxis dataKey="name" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', color: '#fff' }}
                  itemStyle={{ color: '#2563eb' }}
                />
                <Area type="monotone" dataKey="clicks" stroke="#2563eb" fillOpacity={1} fill="url(#colorClicks)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-[#1e293b] p-6 rounded-2xl border border-slate-700 flex flex-col justify-between">
          <div>
            <h3 className="text-xl font-bold mb-2">Seu Plano: {planInfo.name}</h3>
            <p className="text-slate-400 text-sm mb-6">Status da assinatura: <span className="text-green-500 font-medium">Ativa</span></p>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-slate-800/50 rounded-lg">
                <span className="text-slate-300">Slots de Anúncios</span>
                <span className="font-bold">{planInfo.slots}</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-slate-800/50 rounded-lg">
                <span className="text-slate-300">Grupos Segmentados</span>
                <span className="font-bold">{planInfo.groups}</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-slate-800/50 rounded-lg">
                <span className="text-slate-300">Intervalo de Post</span>
                <span className="font-bold">{planInfo.interval} min</span>
              </div>
            </div>
          </div>

          {user.plan === PlanType.FREE && (
            <button className="mt-8 w-full bg-blue-600 hover:bg-blue-700 py-3 rounded-xl font-bold transition-all shadow-lg shadow-blue-500/20">
              Fazer Upgrade Agora
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

const StatCard = ({ title, value, icon: Icon, trend, color }: any) => {
  const colors: any = {
    blue: 'text-blue-500 bg-blue-500/10',
    indigo: 'text-indigo-500 bg-indigo-500/10',
    emerald: 'text-emerald-500 bg-emerald-500/10',
    amber: 'text-amber-500 bg-amber-500/10',
  };
  
  return (
    <div className="bg-[#1e293b] p-6 rounded-2xl border border-slate-700">
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-xl ${colors[color]}`}>
          <Icon size={24} />
        </div>
        <span className="text-xs font-medium text-slate-400 px-2 py-1 bg-slate-800 rounded-full">{trend}</span>
      </div>
      <h4 className="text-slate-400 text-sm font-medium">{title}</h4>
      <p className="text-2xl font-bold mt-1">{value}</p>
    </div>
  );
};
