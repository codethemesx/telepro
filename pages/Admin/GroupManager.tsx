
import React, { useState } from 'react';
import { MessageSquare, Plus, Search, Trash2, Link as LinkIcon, ExternalLink, Filter } from 'lucide-react';
import { TelegramGroup, Category } from '../../types';

export default function GroupManager() {
  const [groups, setGroups] = useState<TelegramGroup[]>([
    { id: '1', name: 'VIP Vendas Brasil', inviteLink: 'https://t.me/+Abc123', groupId: '-10012345678', botId: '1', category: Category.GENERAL },
    { id: '2', name: 'Hot Cinema 🔞', inviteLink: 'https://t.me/+Xyz789', groupId: '-10098765432', botId: '2', category: Category.ADULT },
  ]);

  const [showAdd, setShowAdd] = useState(false);
  const [newGroup, setNewGroup] = useState({ name: '', inviteLink: '', groupId: '', botId: '', category: Category.GENERAL });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Gestão de Comunidades</h2>
        <button 
          onClick={() => setShowAdd(true)}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-xl font-bold transition-all shadow-lg shadow-blue-500/20"
        >
          <Plus size={20} /> Novo Grupo/Canal
        </button>
      </div>

      <div className="bg-[#1e293b] rounded-3xl border border-slate-700 overflow-hidden">
        <div className="p-6 border-b border-slate-700 flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
            <input 
              placeholder="Buscar grupo por nome ou ID..."
              className="w-full bg-slate-800 border border-slate-700 rounded-xl pl-10 pr-4 py-2 text-sm focus:outline-none focus:border-blue-500"
            />
          </div>
          <button className="flex items-center gap-2 text-slate-400 hover:text-white px-4 py-2 rounded-lg border border-slate-700 text-sm font-medium">
            <Filter size={16} /> Filtrar por Categoria
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-slate-500 text-xs font-bold uppercase tracking-wider bg-slate-800/50">
                <th className="px-6 py-4">Nome da Comunidade</th>
                <th className="px-6 py-4">ID Telegram</th>
                <th className="px-6 py-4">Bot Responsável</th>
                <th className="px-6 py-4">Categoria</th>
                <th className="px-6 py-4">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700">
              {groups.map(group => (
                <tr key={group.id} className="hover:bg-slate-800/30 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-blue-500/10 rounded flex items-center justify-center text-blue-500">
                        <MessageSquare size={16} />
                      </div>
                      <span className="font-medium">{group.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-xs font-mono text-slate-400">{group.groupId}</td>
                  <td className="px-6 py-4">
                    <span className="text-sm">Bot #{group.botId}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-md text-[10px] font-bold uppercase ${
                      group.category === Category.ADULT ? 'bg-red-500/10 text-red-500' : 'bg-blue-500/10 text-blue-500'
                    }`}>
                      {group.category}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <a href={group.inviteLink} target="_blank" className="p-2 text-slate-400 hover:text-blue-500 hover:bg-blue-500/10 rounded-lg transition-all">
                        <ExternalLink size={18} />
                      </a>
                      <button className="p-2 text-red-500 hover:bg-red-500/10 rounded-lg transition-all">
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showAdd && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="bg-[#1e293b] w-full max-w-lg rounded-3xl border border-slate-700 p-8 space-y-6 shadow-2xl animate-in fade-in zoom-in duration-200">
            <h3 className="text-2xl font-bold">Cadastrar Comunidade</h3>
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400 uppercase">Nome Amigável</label>
                <input 
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500"
                  placeholder="Ex: Grupo de Ofertas VIP"
                  value={newGroup.name}
                  onChange={e => setNewGroup({...newGroup, name: e.target.value})}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase">ID do Grupo (-100...)</label>
                  <input 
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500"
                    placeholder="-10012345678"
                    value={newGroup.groupId}
                    onChange={e => setNewGroup({...newGroup, groupId: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase">Categoria</label>
                  <select 
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500"
                    value={newGroup.category}
                    onChange={e => setNewGroup({...newGroup, category: e.target.value as Category})}
                  >
                    <option value={Category.GENERAL}>{Category.GENERAL}</option>
                    <option value={Category.ADULT}>{Category.ADULT}</option>
                  </select>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400 uppercase">Link de Convite</label>
                <input 
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500"
                  placeholder="https://t.me/..."
                  value={newGroup.inviteLink}
                  onChange={e => setNewGroup({...newGroup, inviteLink: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400 uppercase">Bot Responsável</label>
                <select 
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500"
                  value={newGroup.botId}
                  onChange={e => setNewGroup({...newGroup, botId: e.target.value})}
                >
                  <option value="">Selecione um Bot</option>
                  <option value="1">Bot Global 01</option>
                  <option value="2">Bot Adult 01</option>
                </select>
              </div>
            </div>
            <div className="flex gap-4 pt-4">
              <button onClick={() => setShowAdd(false)} className="flex-1 py-3 font-bold text-slate-400 hover:text-white transition-colors">Cancelar</button>
              <button onClick={() => {
                setGroups([...groups, { ...newGroup, id: Date.now().toString() }]);
                setShowAdd(false);
              }} className="flex-1 bg-blue-600 hover:bg-blue-700 py-3 rounded-xl font-bold">Salvar Grupo</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
