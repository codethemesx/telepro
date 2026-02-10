
import React from 'react';
import { User } from '../types';
import { Share2, Users, DollarSign, ArrowRight, MessageCircle, AlertTriangle } from 'lucide-react';

export default function Affiliate({ user }: { user: User }) {
  const canWithdraw = user.affiliateBalance >= 100;

  const handleWithdrawRequest = () => {
    const message = `Olá! Sou o afiliado ${user.name} (${user.id}) e gostaria de solicitar meu saque de R$ ${user.affiliateBalance.toFixed(2)}.`;
    window.open(`https://wa.me/5500000000000?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <div className="space-y-8">
      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-blue-600 to-indigo-700 p-8 rounded-3xl shadow-xl shadow-blue-500/20">
          <p className="text-blue-100 font-bold uppercase text-xs mb-2">Seu Link de Afiliado</p>
          <div className="flex items-center gap-2 bg-white/10 p-4 rounded-xl mb-6 backdrop-blur-md">
            <input 
              readOnly 
              value={`https://telepro.com/r/${user.referralCode}`} 
              className="bg-transparent border-none text-white w-full focus:outline-none text-sm font-medium" 
            />
            <button className="text-white hover:text-blue-200"><Share2 size={20} /></button>
          </div>
          <div className="flex justify-between items-end">
            <div>
              <p className="text-blue-100 text-sm font-medium">Comissão Atual</p>
              <h4 className="text-3xl font-extrabold text-white">20% recorrente</h4>
            </div>
          </div>
        </div>

        <div className="bg-[#1e293b] p-8 rounded-3xl border border-slate-700">
          <div className="w-12 h-12 bg-indigo-500/10 rounded-xl flex items-center justify-center text-indigo-500 mb-6">
            <Users size={24} />
          </div>
          <p className="text-slate-400 font-bold uppercase text-xs mb-1">Referidos Ativos</p>
          <h4 className="text-4xl font-extrabold">{user.referralCount}</h4>
          <p className="text-indigo-400 text-sm mt-2 flex items-center gap-1 font-bold">
            +3 este mês <ArrowRight size={14} />
          </p>
        </div>

        <div className="bg-[#1e293b] p-8 rounded-3xl border border-slate-700 flex flex-col justify-between">
          <div>
            <div className="w-12 h-12 bg-emerald-500/10 rounded-xl flex items-center justify-center text-emerald-500 mb-6">
              <DollarSign size={24} />
            </div>
            <p className="text-slate-400 font-bold uppercase text-xs mb-1">Saldo Disponível</p>
            <h4 className="text-4xl font-extrabold">R$ {user.affiliateBalance.toFixed(2)}</h4>
          </div>

          <button 
            disabled={!canWithdraw}
            onClick={handleWithdrawRequest}
            className={`mt-4 w-full py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all ${
              canWithdraw 
              ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg shadow-emerald-500/20' 
              : 'bg-slate-700 text-slate-400 cursor-not-allowed'
            }`}
          >
            <MessageCircle size={20} />
            Solicitar Saque
          </button>
          {!canWithdraw && (
            <p className="text-[10px] text-slate-500 text-center mt-2">Mínimo para saque: R$ 100,00</p>
          )}
        </div>
      </div>

      <div className="bg-[#1e293b] rounded-3xl border border-slate-700 overflow-hidden">
        <div className="p-8 border-b border-slate-700">
          <h3 className="text-xl font-bold">Como funciona?</h3>
        </div>
        <div className="p-8 grid md:grid-cols-3 gap-8">
          <div className="space-y-4">
            <div className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center font-bold text-blue-500">1</div>
            <h4 className="font-bold text-lg">Compartilhe seu link</h4>
            <p className="text-slate-400 text-sm">Divulgue seu link único em grupos, redes sociais ou para seus contatos.</p>
          </div>
          <div className="space-y-4">
            <div className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center font-bold text-blue-500">2</div>
            <h4 className="font-bold text-lg">Eles assinam um plano</h4>
            <p className="text-slate-400 text-sm">Sempre que alguém assinar via seu link, você ganha 20% do valor da assinatura.</p>
          </div>
          <div className="space-y-4">
            <div className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center font-bold text-blue-500">3</div>
            <h4 className="font-bold text-lg">Receba via PIX</h4>
            <p className="text-slate-400 text-sm">Ao atingir R$ 100,00, você pode solicitar o saque direto para sua conta.</p>
          </div>
        </div>
      </div>
      
      <div className="bg-amber-500/10 border border-amber-500/20 p-6 rounded-3xl flex gap-4 items-start">
        <AlertTriangle className="text-amber-500 shrink-0" />
        <div>
          <h4 className="font-bold text-amber-500">Atenção ao Prazo</h4>
          <p className="text-sm text-amber-500/80">Após a solicitação de saque, nossa equipe financeira irá enviar um e-mail de verificação. Você deve clicar no botão de confirmação para que o pagamento seja processado em até 3 dias úteis.</p>
        </div>
      </div>
    </div>
  );
}
