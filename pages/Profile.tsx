
import React from 'react';
import { User, PlanType } from '../types';
import { User as UserIcon, Mail, Calendar, Shield, CreditCard, Key } from 'lucide-react';
import { PLANS } from '../constants';

export default function Profile({ user }: { user: User }) {
  const planInfo = PLANS[user.plan];

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="bg-[#1e293b] rounded-3xl border border-slate-700 overflow-hidden">
        <div className="h-32 bg-gradient-to-r from-blue-600 to-indigo-700"></div>
        <div className="px-8 pb-8">
          <div className="relative -mt-12 flex items-end justify-between mb-8">
            <div className="w-24 h-24 rounded-3xl bg-blue-600 border-4 border-[#0f172a] flex items-center justify-center text-4xl font-bold shadow-xl">
              {user.name.charAt(0)}
            </div>
            <button className="bg-slate-800 hover:bg-slate-700 px-6 py-2 rounded-xl font-bold text-sm transition-all border border-slate-700">
              Editar Perfil
            </button>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-bold">{user.name}</h3>
                <p className="text-slate-400 flex items-center gap-2 mt-1">
                  <Mail size={16} /> {user.email}
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3 p-4 bg-slate-800/50 rounded-2xl border border-slate-700">
                  <Calendar className="text-blue-500" size={20} />
                  <div>
                    <p className="text-[10px] text-slate-500 font-bold uppercase">Membro desde</p>
                    <p className="font-bold">{new Date(user.createdAt).toLocaleDateString('pt-BR')}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 bg-slate-800/50 rounded-2xl border border-slate-700">
                  <Shield className="text-emerald-500" size={20} />
                  <div>
                    <p className="text-[10px] text-slate-500 font-bold uppercase">Status da Conta</p>
                    <p className="font-bold text-emerald-500">Verificada</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-slate-800/30 p-6 rounded-3xl border border-slate-700 space-y-6">
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-lg">Assinatura Atual</h4>
                <span className="bg-blue-500/10 text-blue-500 px-3 py-1 rounded-full text-xs font-bold uppercase">
                  {user.plan}
                </span>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">Plano</span>
                  <span className="font-bold">{planInfo.name}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">Valor Mensal</span>
                  <span className="font-bold">R$ {planInfo.price.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">Próxima Cobrança</span>
                  <span className="font-bold">15/06/2024</span>
                </div>
              </div>

              <button className="w-full flex items-center justify-center gap-2 bg-slate-700 hover:bg-slate-600 py-3 rounded-xl font-bold transition-all">
                <CreditCard size={18} /> Gerenciar Pagamento
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-[#1e293b] p-8 rounded-3xl border border-slate-700 space-y-6">
        <h3 className="text-xl font-bold flex items-center gap-2">
          <Key className="text-amber-500" size={24} /> Segurança
        </h3>
        <div className="grid md:grid-cols-2 gap-4">
          <button className="flex items-center justify-between p-4 bg-slate-800 hover:bg-slate-700 rounded-2xl border border-slate-700 transition-all text-left">
            <div>
              <p className="font-bold">Alterar Senha</p>
              <p className="text-xs text-slate-500">Última alteração há 3 meses</p>
            </div>
            <Key size={20} className="text-slate-500" />
          </button>
          <button className="flex items-center justify-between p-4 bg-slate-800 hover:bg-slate-700 rounded-2xl border border-slate-700 transition-all text-left">
            <div>
              <p className="font-bold">Autenticação 2FA</p>
              <p className="text-xs text-slate-500 text-red-500 font-bold">Desativado</p>
            </div>
            <Shield size={20} className="text-slate-500" />
          </button>
        </div>
      </div>
    </div>
  );
}
