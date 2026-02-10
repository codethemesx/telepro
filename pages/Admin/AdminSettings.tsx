
import React, { useState } from 'react';
import { CreditCard, Bell, Save, ShieldCheck, Mail } from 'lucide-react';

export default function AdminSettings() {
  const [syncPayConfig, setSyncPayConfig] = useState({
    apiKey: 'sk_live_**************************',
    secretKey: 'whsec_*************************',
    enabled: true
  });

  const [announcement, setAnnouncement] = useState({
    title: '',
    message: '',
    target: 'all' // all, individual
  });

  return (
    <div className="grid lg:grid-cols-2 gap-8">
      {/* Payment Gateway */}
      <div className="bg-[#1e293b] p-8 rounded-3xl border border-slate-700 space-y-6">
        <div className="flex items-center gap-3 text-blue-500">
          <CreditCard size={28} />
          <h3 className="text-2xl font-bold text-white">Configurar SyncPay (PIX)</h3>
        </div>
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-400 uppercase">API Key Pública</label>
            <input 
              type="password"
              className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500"
              value={syncPayConfig.apiKey}
              onChange={e => setSyncPayConfig({...syncPayConfig, apiKey: e.target.value})}
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-400 uppercase">Webhook Secret</label>
            <input 
              type="password"
              className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500"
              value={syncPayConfig.secretKey}
              onChange={e => setSyncPayConfig({...syncPayConfig, secretKey: e.target.value})}
            />
          </div>
          <div className="flex items-center gap-2">
            <input 
              type="checkbox" 
              checked={syncPayConfig.enabled} 
              onChange={e => setSyncPayConfig({...syncPayConfig, enabled: e.target.checked})}
              className="w-5 h-5 accent-blue-600"
            />
            <span className="font-medium">Ativar Gateway de Pagamento</span>
          </div>
        </div>
        <button className="flex items-center justify-center gap-2 w-full bg-blue-600 hover:bg-blue-700 py-4 rounded-xl font-bold shadow-lg shadow-blue-500/20">
          <Save size={20} /> Salvar Configurações PIX
        </button>
      </div>

      {/* Announcements */}
      <div className="bg-[#1e293b] p-8 rounded-3xl border border-slate-700 space-y-6">
        <div className="flex items-center gap-3 text-indigo-500">
          <Bell size={28} />
          <h3 className="text-2xl font-bold text-white">Enviar Avisos / Spam</h3>
        </div>
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-400 uppercase">Título do Aviso</label>
            <input 
              className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500"
              placeholder="Ex: Novo recurso disponível!"
              value={announcement.title}
              onChange={e => setAnnouncement({...announcement, title: e.target.value})}
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-400 uppercase">Mensagem</label>
            <textarea 
              rows={4}
              className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500 resize-none"
              placeholder="Sua mensagem aqui..."
              value={announcement.message}
              onChange={e => setAnnouncement({...announcement, message: e.target.value})}
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-400 uppercase">Público Alvo</label>
            <select 
              className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500"
              value={announcement.target}
              onChange={e => setAnnouncement({...announcement, target: e.target.value})}
            >
              <option value="all">Todos os Usuários da Plataforma</option>
              <option value="premium">Apenas Usuários Premium</option>
              <option value="free">Apenas Usuários Free</option>
            </select>
          </div>
        </div>
        <button className="flex items-center justify-center gap-2 w-full bg-indigo-600 hover:bg-indigo-700 py-4 rounded-xl font-bold shadow-lg shadow-indigo-500/20">
          <Bell size={20} /> Disparar Comunicado
        </button>
      </div>
    </div>
  );
}
