
import React, { useState } from 'react';
// Fix: Removed Category from lucide-react and added it to types import
import { Bot, Plus, ToggleLeft, ToggleRight, Trash2, ShieldCheck, ShieldAlert } from 'lucide-react';
import { TelegramBot, Category } from '../../types';

export default function BotManager() {
  const [bots, setBots] = useState<TelegramBot[]>([
    { id: '1', name: 'Bot Global 01', token: '672839210:AAH...', active: true, webhookEnabled: true, category: 'Geral' as any },
    { id: '2', name: 'Bot Adult 01', token: '912837482:BBG...', active: false, webhookEnabled: false, category: '🔞 +18' as any },
  ]);

  const [showAdd, setShowAdd] = useState(false);
  const [newBot, setNewBot] = useState({ name: '', token: '', category: 'Geral' as any });

  const toggleActive = (id: string) => {
    setBots(bots.map(b => b.id === id ? { ...b, active: !b.active } : b));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Gerenciador de Bots</h2>
        <button 
          onClick={() => setShowAdd(true)}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-xl font-bold transition-all shadow-lg shadow-blue-500/20"
        >
          <Plus size={20} /> Adicionar Novo Bot
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {bots.map(bot => (
          <div key={bot.id} className="bg-[#1e293b] p-6 rounded-3xl border border-slate-700 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`p-3 rounded-xl ${bot.active ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}>
                  <Bot size={24} />
                </div>
                <div>
                  <h4 className="font-bold">{bot.name}</h4>
                  <p className="text-xs text-slate-400 font-mono">{bot.token.substring(0, 15)}...</p>
                </div>
              </div>
              <button onClick={() => toggleActive(bot.id)} className={bot.active ? 'text-green-500' : 'text-slate-500'}>
                {bot.active ? <ToggleRight size={32} /> : <ToggleLeft size={32} />}
              </button>
            </div>
            
            <div className="flex gap-2">
              <span className="bg-slate-800 px-3 py-1 rounded-full text-xs font-bold">{bot.category}</span>
              <span className={`px-3 py-1 rounded-full text-xs font-bold ${bot.webhookEnabled ? 'bg-blue-500/10 text-blue-500' : 'bg-slate-800 text-slate-500'}`}>
                Webhook: {bot.webhookEnabled ? 'Ativo' : 'Off'}
              </span>
            </div>

            <div className="pt-4 flex gap-2">
              <button className="flex-1 bg-slate-800 hover:bg-slate-700 py-2 rounded-lg text-sm font-bold transition-colors">Configurar Webhook</button>
              <button className="p-2 text-red-500 hover:bg-red-500/10 rounded-lg"><Trash2 size={20} /></button>
            </div>
          </div>
        ))}
      </div>

      {showAdd && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="bg-[#1e293b] w-full max-w-md rounded-3xl border border-slate-700 p-8 space-y-6 shadow-2xl animate-in fade-in zoom-in duration-200">
            <h3 className="text-2xl font-bold">Adicionar Bot Telegram</h3>
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400 uppercase">Nome Identificador</label>
                <input 
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500"
                  placeholder="Ex: Bot Vendas 01"
                  value={newBot.name}
                  onChange={e => setNewBot({...newBot, name: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400 uppercase">Bot Token (via @BotFather)</label>
                <input 
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500"
                  placeholder="123456789:ABCDEF..."
                  value={newBot.token}
                  onChange={e => setNewBot({...newBot, token: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400 uppercase">Categoria</label>
                <select 
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500"
                  value={newBot.category}
                  onChange={e => setNewBot({...newBot, category: e.target.value as any})}
                >
                  <option value="Geral">Geral</option>
                  <option value="🔞 +18">🔞 +18</option>
                </select>
              </div>
            </div>
            <div className="flex gap-4 pt-4">
              <button onClick={() => setShowAdd(false)} className="flex-1 py-3 font-bold text-slate-400 hover:text-white transition-colors">Cancelar</button>
              <button onClick={() => {
                setBots([...bots, { ...newBot, id: Date.now().toString(), active: true, webhookEnabled: true }]);
                setShowAdd(false);
              }} className="flex-1 bg-blue-600 hover:bg-blue-700 py-3 rounded-xl font-bold shadow-lg shadow-blue-500/20">Adicionar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
