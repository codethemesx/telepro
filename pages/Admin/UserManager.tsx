
import React, { useState } from 'react';
import { Users, Search, Trash2, Key, Shield, UserPlus, MoreVertical, MessageSquare } from 'lucide-react';
import { User, UserRole, PlanType } from '../../types';

export default function UserManager() {
  const [users, setUsers] = useState<User[]>([
    { id: '1', name: 'João Silva', email: 'joao@exemplo.com', role: UserRole.ADMIN, plan: PlanType.ELITE, isAffiliate: true, affiliateBalance: 150.0, referralCount: 12, referralCode: 'JOAO123', createdAt: '2023-10-01' },
    { id: '2', name: 'Maria Souza', email: 'maria@test.com', role: UserRole.USER, plan: PlanType.FREE, isAffiliate: false, affiliateBalance: 0, referralCount: 0, referralCode: 'MARI999', createdAt: '2024-01-15' },
  ]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Gerenciamento de Usuários</h2>
        <div className="flex gap-2">
          <button className="bg-slate-800 hover:bg-slate-700 px-6 py-3 rounded-xl font-bold transition-all border border-slate-700 flex items-center gap-2">
            <MessageSquare size={20} /> Spam Global
          </button>
          <button className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-xl font-bold transition-all shadow-lg shadow-blue-500/20 flex items-center gap-2">
            <UserPlus size={20} /> Novo Admin
          </button>
        </div>
      </div>

      <div className="bg-[#1e293b] rounded-3xl border border-slate-700 overflow-hidden">
        <div className="p-6 border-b border-slate-700">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
            <input 
              placeholder="Buscar por nome, e-mail ou ID..."
              className="w-full bg-slate-800 border border-slate-700 rounded-xl pl-10 pr-4 py-2 text-sm focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-slate-500 text-xs font-bold uppercase tracking-wider bg-slate-800/50">
                <th className="px-6 py-4">Usuário</th>
                <th className="px-6 py-4">Plano</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Saldo Afiliado</th>
                <th className="px-6 py-4 text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700">
              {users.map(user => (
                <tr key={user.id} className="hover:bg-slate-800/30 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center font-bold text-blue-500 border border-slate-700">
                        {user.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-bold">{user.name}</p>
                        <p className="text-xs text-slate-500">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-md text-[10px] font-bold uppercase ${
                      user.plan === PlanType.ELITE ? 'bg-amber-500/10 text-amber-500' : 
                      user.plan === PlanType.FREE ? 'bg-slate-500/10 text-slate-500' : 'bg-blue-500/10 text-blue-500'
                    }`}>
                      {user.plan}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      {/* Fix: Removed title prop from Shield and Users icons as it's not a valid prop for Lucide icons */}
                      {user.role === UserRole.ADMIN && <Shield size={14} className="text-blue-500" />}
                      {user.isAffiliate && <Users size={14} className="text-indigo-500" />}
                      <span className="text-xs font-medium text-slate-300">
                        {user.role === UserRole.ADMIN ? 'Administrador' : 'Usuário'}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 font-bold text-green-500">R$ {user.affiliateBalance.toFixed(2)}</td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <button className="p-2 text-slate-400 hover:text-white hover:bg-slate-700 rounded-lg transition-all" title="Resetar Senha">
                        <Key size={18} />
                      </button>
                      <button className="p-2 text-red-500 hover:bg-red-500/10 rounded-lg transition-all" title="Deletar Usuário">
                        <Trash2 size={18} />
                      </button>
                      <button className="p-2 text-slate-400 hover:text-white hover:bg-slate-700 rounded-lg transition-all">
                        <MoreVertical size={18} />
                      </button>
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
