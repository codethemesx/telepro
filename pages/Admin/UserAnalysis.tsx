
import React, { useState } from 'react';
import { Search, Eye, AlertCircle, ShieldAlert } from 'lucide-react';

export default function UserAnalysis() {
  const [userId, setUserId] = useState('');

  return (
    <div className="max-w-3xl mx-auto space-y-8 py-10">
      <div className="text-center space-y-4">
        <div className="w-20 h-20 bg-amber-500/10 rounded-full flex items-center justify-center text-amber-500 mx-auto">
          <Eye size={40} />
        </div>
        <h2 className="text-3xl font-extrabold">Modo de Análise de Usuário</h2>
        <p className="text-slate-400">Entre diretamente na conta de qualquer usuário para verificar anúncios, transações e conformidade sem precisar de senha.</p>
      </div>

      <div className="bg-[#1e293b] p-8 rounded-3xl border border-slate-700 space-y-6">
        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-400 uppercase">ID ou E-mail do Usuário</label>
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={20} />
            <input 
              className="w-full bg-slate-800 border border-slate-700 rounded-xl pl-12 pr-4 py-4 focus:outline-none focus:border-blue-500 text-lg"
              placeholder="user@exemplo.com ou ID123..."
              value={userId}
              onChange={e => setUserId(e.target.value)}
            />
          </div>
        </div>
        
        <div className="bg-red-500/10 border border-red-500/20 p-4 rounded-xl flex items-start gap-3">
          <ShieldAlert className="text-red-500 shrink-0" size={20} />
          <div className="text-sm">
            <p className="font-bold text-red-500 uppercase mb-1">Aviso Crítico</p>
            <p className="text-red-500/80">Ao entrar no modo análise, o usuário verá um banner informativo no topo do painel dele avisando que a conta está sob verificação administrativa. O acesso será apenas para leitura e verificação.</p>
          </div>
        </div>

        <button 
          disabled={!userId}
          className={`w-full py-4 rounded-xl font-bold text-lg transition-all flex items-center justify-center gap-2 ${
            userId ? 'bg-blue-600 hover:bg-blue-700 shadow-xl shadow-blue-500/20' : 'bg-slate-700 text-slate-500 cursor-not-allowed'
          }`}
        >
          <Eye size={20} /> Iniciar Análise da Conta
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700">
          <h4 className="font-bold mb-2">Histórico de Análise</h4>
          <p className="text-slate-500 text-sm">Nenhum registro recente encontrado.</p>
        </div>
        <div className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700">
          <h4 className="font-bold mb-2">Relatórios Gerados</h4>
          <p className="text-slate-500 text-sm">Clique para ver logs de sistema.</p>
        </div>
      </div>
    </div>
  );
}
