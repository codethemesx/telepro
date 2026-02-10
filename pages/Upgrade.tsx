
import React from 'react';
import { Check, Zap, Shield, Crown, Star } from 'lucide-react';
import { PlanType } from '../types';
import { PLANS } from '../constants';

export default function Upgrade({ currentPlan }: { currentPlan: PlanType }) {
  const planList = [
    { type: PlanType.FREE, icon: Star, color: 'slate' },
    { type: PlanType.BASIC, icon: Zap, color: 'blue' },
    { type: PlanType.PRO, icon: Shield, color: 'indigo' },
    { type: PlanType.ELITE, icon: Crown, color: 'amber' },
  ];

  return (
    <div className="space-y-12 pb-20">
      <div className="text-center space-y-4 max-w-2xl mx-auto">
        <h2 className="text-4xl font-extrabold">Escolha o plano ideal para seu negócio</h2>
        <p className="text-slate-400">Escala seus resultados automatizando seus anúncios nas maiores comunidades do Telegram.</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {planList.map((item) => {
          const info = PLANS[item.type];
          const isCurrent = currentPlan === item.type;
          
          return (
            <div 
              key={item.type} 
              className={`relative bg-[#1e293b] rounded-3xl border transition-all duration-300 flex flex-col ${
                isCurrent ? 'border-blue-500 ring-4 ring-blue-500/10' : 'border-slate-700 hover:border-slate-500'
              }`}
            >
              {item.type === PlanType.ELITE && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-amber-500 text-black px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest shadow-lg">
                  Mais Popular
                </div>
              )}

              <div className="p-8 space-y-6 flex-1">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                  item.color === 'blue' ? 'bg-blue-500/10 text-blue-500' : 
                  item.color === 'indigo' ? 'bg-indigo-500/10 text-indigo-500' : 
                  item.color === 'amber' ? 'bg-amber-500/10 text-amber-500' : 
                  'bg-slate-500/10 text-slate-500'
                }`}>
                  <item.icon size={24} />
                </div>

                <div>
                  <h3 className="text-2xl font-bold">{info.name}</h3>
                  <div className="mt-2 flex items-baseline gap-1">
                    <span className="text-3xl font-extrabold">R$ {info.price.toFixed(2).replace('.', ',')}</span>
                    <span className="text-slate-500 text-sm font-medium">/mês</span>
                  </div>
                </div>

                <ul className="space-y-4 pt-6">
                  <Feature text={`${info.slots} Slots de anúncios`} />
                  <Feature text={`Post em ${info.groups} grupos`} />
                  <Feature text={`A cada ${info.interval} minutos`} />
                  <Feature text={`${info.buttonsPerAd} Botoes por anúncio`} />
                  {item.type === PlanType.ELITE && <Feature text="Fixação de anúncio inclusa" bold />}
                  {item.type === PlanType.FREE && <Feature text="Botão 'Quero Anunciar' obrigatório" dimmed />}
                  {item.type !== PlanType.FREE && <Feature text="Sem botões obrigatórios" />}
                  <Feature text="Links mascarados (Cloaker)" />
                </ul>
              </div>

              <div className="p-8 pt-0">
                <button 
                  disabled={isCurrent}
                  className={`w-full py-4 rounded-xl font-bold transition-all ${
                    isCurrent 
                    ? 'bg-slate-700 text-slate-400 cursor-not-allowed' 
                    : item.type === PlanType.ELITE 
                      ? 'bg-amber-500 hover:bg-amber-600 text-black shadow-lg shadow-amber-500/20' 
                      : 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-500/20'
                  }`}
                >
                  {isCurrent ? 'Plano Atual' : 'Contratar Agora'}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

const Feature = ({ text, bold = false, dimmed = false }: { text: string; bold?: boolean; dimmed?: boolean }) => (
  <li className={`flex items-start gap-3 text-sm ${dimmed ? 'text-slate-500' : 'text-slate-300'} ${bold ? 'font-bold text-white' : ''}`}>
    <div className={`mt-0.5 shrink-0 ${dimmed ? 'text-slate-600' : 'text-green-500'}`}>
      <Check size={16} />
    </div>
    {text}
  </li>
);
