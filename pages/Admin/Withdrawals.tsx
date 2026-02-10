
import React, { useState } from 'react';
import { Wallet, CheckCircle2, Clock, AlertTriangle, ArrowUpRight, DollarSign } from 'lucide-react';
import { WithdrawalRequest } from '../../types';

export default function Withdrawals() {
  const [requests, setRequests] = useState<WithdrawalRequest[]>([
    { id: '1', userId: 'user-1', userName: 'João Silva', amount: 150.0, status: 'PENDING', createdAt: '2024-05-20T10:00:00Z' },
    { id: '2', userId: 'user-3', userName: 'Carlos Tech', amount: 240.0, status: 'VERIFIED', createdAt: '2024-05-19T15:30:00Z' },
    { id: '3', userId: 'user-5', userName: 'Brenda M.', amount: 110.0, status: 'PAID', createdAt: '2024-05-18T09:00:00Z' },
  ]);

  const updateStatus = (id: string, newStatus: WithdrawalRequest['status']) => {
    setRequests(requests.map(r => r.id === id ? { ...r, status: newStatus } : r));
  };

  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-3 gap-6">
        <StatSmall title="Pendente" value="R$ 150,00" icon={Clock} color="amber" />
        <StatSmall title="Verificado" value="R$ 240,00" icon={CheckCircle2} color="blue" />
        <StatSmall title="Pago (Total)" value="R$ 1.850,00" icon={DollarSign} color="emerald" />
      </div>

      <div className="bg-[#1e293b] rounded-3xl border border-slate-700 overflow-hidden">
        <div className="p-8 border-b border-slate-700">
          <h3 className="text-xl font-bold">Solicitações de Saque</h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-slate-500 text-xs font-bold uppercase tracking-wider bg-slate-800/50">
                <th className="px-8 py-4">Afiliado</th>
                <th className="px-8 py-4">Valor</th>
                <th className="px-8 py-4">Data</th>
                <th className="px-8 py-4">Status</th>
                <th className="px-8 py-4 text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700">
              {requests.map(req => (
                <tr key={req.id} className="hover:bg-slate-800/30 transition-colors">
                  <td className="px-8 py-6">
                    <div className="font-bold">{req.userName}</div>
                    <div className="text-xs text-slate-500">ID: {req.userId}</div>
                  </td>
                  <td className="px-8 py-6 font-extrabold text-white text-lg">R$ {req.amount.toFixed(2)}</td>
                  <td className="px-8 py-6 text-sm text-slate-400">{new Date(req.createdAt).toLocaleDateString('pt-BR')}</td>
                  <td className="px-8 py-6">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase ${
                      req.status === 'PAID' ? 'bg-emerald-500/10 text-emerald-500' :
                      req.status === 'VERIFIED' ? 'bg-blue-500/10 text-blue-500' : 'bg-amber-500/10 text-amber-500'
                    }`}>
                      {req.status === 'PAID' ? 'Pago' : req.status === 'VERIFIED' ? 'Verificado' : 'Pendente'}
                    </span>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <div className="flex justify-end gap-2">
                      {req.status === 'PENDING' && (
                        <button 
                          onClick={() => updateStatus(req.id, 'VERIFIED')}
                          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-xs font-bold transition-all"
                        >
                          Marcar Verificado
                        </button>
                      )}
                      {req.status === 'VERIFIED' && (
                        <button 
                          onClick={() => updateStatus(req.id, 'PAID')}
                          className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 rounded-lg text-xs font-bold transition-all"
                        >
                          Confirmar Pagamento
                        </button>
                      )}
                      {req.status === 'PAID' && (
                        <span className="text-emerald-500 p-2"><CheckCircle2 size={20} /></span>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

const StatSmall = ({ title, value, icon: Icon, color }: any) => {
  const colors: any = {
    amber: 'bg-amber-500/10 text-amber-500',
    blue: 'bg-blue-500/10 text-blue-500',
    emerald: 'bg-emerald-500/10 text-emerald-500',
  };
  return (
    <div className="bg-[#1e293b] p-6 rounded-3xl border border-slate-700 flex items-center gap-4">
      <div className={`p-4 rounded-2xl ${colors[color]}`}>
        <Icon size={24} />
      </div>
      <div>
        <p className="text-xs font-bold text-slate-500 uppercase">{title}</p>
        <p className="text-2xl font-black">{value}</p>
      </div>
    </div>
  );
};
