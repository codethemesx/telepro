
import React from 'react';
import { CheckCircle2, Megaphone, Zap, ShieldCheck, Users, BarChart } from 'lucide-react';

export default function LandingPage({ onLogin }: { onLogin: () => void }) {
  return (
    <div className="bg-[#0f172a] text-white selection:bg-blue-500">
      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 bg-[#0f172a]/80 backdrop-blur-md border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2 text-2xl font-bold">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">T</div>
            <span>TeleAds<span className="text-blue-500">Pro</span></span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-slate-300 font-medium">
            <a href="#features" className="hover:text-white transition-colors">Recursos</a>
            <a href="#plans" className="hover:text-white transition-colors">Planos</a>
            <a href="#benefits" className="hover:text-white transition-colors">Vantagens</a>
          </div>
          <div className="flex gap-4">
            <button onClick={onLogin} className="px-6 py-2 rounded-lg font-semibold hover:bg-slate-800 transition-colors">Entrar</button>
            <button onClick={onLogin} className="bg-blue-600 px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-shadow hover:shadow-[0_0_20px_rgba(37,99,235,0.4)]">Registrar-se</button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="pt-40 pb-24 px-4">
        <div className="max-w-5xl mx-auto text-center space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-400 font-medium animate-bounce">
            <Zap size={16} />
            <span>A plataforma #1 para anúncios no Telegram</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight">
            Anuncie em Massa no <span className="text-blue-500">Telegram</span> com Bots Inteligentes
          </h1>
          <p className="text-xl text-slate-400 max-w-3xl mx-auto">
            Alcance milhares de pessoas em segundos. Nossa rede de bots automatizados garante que sua oferta seja vista em centenas de comunidades qualificadas.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
            <button onClick={onLogin} className="bg-blue-600 px-8 py-4 rounded-xl text-xl font-bold hover:bg-blue-700 transition-all transform hover:scale-105 shadow-xl shadow-blue-500/20">
              Começar a Anunciar Agora
            </button>
            <button className="bg-slate-800 px-8 py-4 rounded-xl text-xl font-bold hover:bg-slate-700 transition-all">
              Ver Demonstração
            </button>
          </div>
          <div className="flex items-center justify-center gap-8 pt-12 text-slate-500 grayscale opacity-60">
            <span className="font-bold text-2xl italic">SyncPay</span>
            <span className="font-bold text-2xl italic">Telegram</span>
            <span className="font-bold text-2xl italic">MetaAds</span>
          </div>
        </div>
      </header>

      {/* Features Grid */}
      <section id="features" className="py-24 bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Recursos Poderosos</h2>
            <p className="text-slate-400">Tudo o que você precisa para uma campanha de sucesso.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Megaphone, title: 'Multi-Formato', desc: 'Vídeos de até 1m, Imagens e GIFs com descrições persuasivas.' },
              { icon: Zap, title: 'Automação Total', desc: 'Anúncios disparados automaticamente em intervalos de até 3 minutos.' },
              { icon: ShieldCheck, title: 'Links Mascarados', desc: 'Sistema Cloaker integrado para evitar bloqueios e banimentos.' },
              { icon: BarChart, title: 'Análise de Tráfego', desc: 'Saiba exatamente de onde vem seus cliques com nosso dashboard real-time.' },
              { icon: Users, title: 'Afiliados', desc: 'Lucre recomendando nossa plataforma com 20% de comissão recorrente.' },
              { icon: CheckCircle2, title: 'Segmentação', desc: 'Escolha entre categorias +18 ou Geral para máxima conversão.' },
            ].map((f, i) => (
              <div key={i} className="p-8 bg-[#1e293b] rounded-2xl border border-slate-700 hover:border-blue-500/50 transition-all group">
                <div className="w-14 h-14 bg-blue-500/10 rounded-xl flex items-center justify-center text-blue-500 mb-6 group-hover:scale-110 transition-transform">
                  <f.icon size={32} />
                </div>
                <h3 className="text-xl font-bold mb-3">{f.title}</h3>
                <p className="text-slate-400 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="max-w-5xl mx-auto px-4 text-center bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl p-16 shadow-2xl shadow-blue-500/20">
          <h2 className="text-4xl font-extrabold mb-6">Pronto para escalar suas vendas?</h2>
          <p className="text-xl text-blue-100 mb-10">Junte-se a mais de 2.000 anunciantes que já confiam na TeleAds Pro para suas campanhas no Telegram.</p>
          <button onClick={onLogin} className="bg-white text-blue-600 px-10 py-4 rounded-xl text-xl font-bold hover:bg-blue-50 transition-transform hover:scale-105">
            Criar Minha Conta Grátis
          </button>
        </div>
      </section>

      <footer className="py-12 border-t border-slate-800 text-slate-500 text-center">
        <p>&copy; 2024 TeleAds Pro. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
}
