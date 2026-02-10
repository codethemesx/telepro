
import React, { useState } from 'react';
// Added X to the lucide-react imports
import { Plus, Megaphone, Trash2, Edit2, Link as LinkIcon, ExternalLink, AlertCircle, X } from 'lucide-react';
import { User, Ad, AdStatus, Category, PlanType } from '../types';
import { PLANS, MASK_DOMAIN } from '../constants';

export default function AdsManager({ user }: { user: User }) {
  const [ads, setAds] = useState<Ad[]>([]);
  const [showModal, setShowModal] = useState(false);
  const planInfo = PLANS[user.plan];

  const canAddMore = ads.length < planInfo.slots;

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    mediaUrl: '',
    mediaType: 'image' as const,
    category: Category.GENERAL,
    buttons: [{ label: '', url: '' }]
  });

  const handleAddButton = () => {
    if (formData.buttons.length < planInfo.buttonsPerAd) {
      setFormData({ ...formData, buttons: [...formData.buttons, { label: '', url: '' }] });
    }
  };

  const handleRemoveButton = (index: number) => {
    const newButtons = formData.buttons.filter((_, i) => i !== index);
    setFormData({ ...formData, buttons: newButtons });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Check for links in description
    const hasLinkInDesc = /https?:\/\/[^\s]+/.test(formData.description);
    const status = hasLinkInDesc ? AdStatus.PENDING : AdStatus.ACTIVE;

    const newAd: Ad = {
      id: Math.random().toString(36).substr(2, 9),
      userId: user.id,
      ...formData,
      status,
      stats: { clicks: 0, impressions: 0, sources: {} },
      createdAt: new Date().toISOString(),
    };

    setAds([...ads, newAd]);
    setShowModal(false);
    setFormData({
      title: '',
      description: '',
      mediaUrl: '',
      mediaType: 'image',
      category: Category.GENERAL,
      buttons: [{ label: '', url: '' }]
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Seus Anúncios</h2>
          <p className="text-slate-400">Gerencie e monitore suas campanhas ativas.</p>
        </div>
        <button 
          onClick={() => canAddMore && setShowModal(true)}
          disabled={!canAddMore}
          className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all ${
            canAddMore ? 'bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-500/20' : 'bg-slate-700 cursor-not-allowed text-slate-400'
          }`}
        >
          <Plus size={20} />
          Novo Anúncio
        </button>
      </div>

      {!canAddMore && (
        <div className="bg-amber-500/10 border border-amber-500/20 p-4 rounded-xl flex items-center gap-3 text-amber-500">
          <AlertCircle size={20} />
          <p className="text-sm font-medium">Você atingiu o limite de slots do plano {user.plan}. Faça upgrade para adicionar mais.</p>
        </div>
      )}

      {ads.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 bg-[#1e293b] rounded-3xl border-2 border-dashed border-slate-700">
          <div className="w-20 h-20 bg-slate-800 rounded-full flex items-center justify-center text-slate-500 mb-6">
            <Megaphone size={40} />
          </div>
          <h3 className="text-xl font-bold mb-2">Nenhum anúncio criado</h3>
          <p className="text-slate-400 max-w-sm text-center">Comece a impulsionar seu negócio agora mesmo no Telegram criando seu primeiro anúncio.</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
          {ads.map(ad => (
            <div key={ad.id} className="bg-[#1e293b] rounded-2xl border border-slate-700 overflow-hidden group">
              <div className="relative h-48 bg-slate-800 overflow-hidden">
                {ad.mediaUrl ? (
                  <img src={ad.mediaUrl} alt={ad.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-slate-600">
                    <Megaphone size={48} />
                  </div>
                )}
                <div className="absolute top-4 right-4 flex gap-2">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase shadow-lg ${
                    ad.status === AdStatus.ACTIVE ? 'bg-green-500' : 
                    ad.status === AdStatus.PENDING ? 'bg-amber-500' : 'bg-red-500'
                  }`}>
                    {ad.status === AdStatus.ACTIVE ? 'Ativo' : ad.status === AdStatus.PENDING ? 'Pendente' : 'Inativo'}
                  </span>
                  <span className="bg-slate-900/80 px-3 py-1 rounded-full text-xs font-bold uppercase backdrop-blur-sm">
                    {ad.category}
                  </span>
                </div>
              </div>
              <div className="p-6 space-y-4">
                <div>
                  <h4 className="font-bold text-lg truncate">{ad.title}</h4>
                  <p className="text-slate-400 text-sm line-clamp-2">{ad.description}</p>
                </div>
                
                <div className="flex items-center gap-4 py-3 border-y border-slate-700">
                  <div className="flex-1 text-center">
                    <p className="text-xs text-slate-500 font-bold uppercase">Cliques</p>
                    <p className="text-xl font-bold">{ad.stats.clicks}</p>
                  </div>
                  <div className="w-px h-8 bg-slate-700"></div>
                  <div className="flex-1 text-center">
                    <p className="text-xs text-slate-500 font-bold uppercase">CTR</p>
                    <p className="text-xl font-bold">1.2%</p>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button className="flex-1 bg-slate-700 hover:bg-slate-600 p-2 rounded-lg transition-colors flex items-center justify-center gap-2">
                    <Edit2 size={16} /> Editar
                  </button>
                  <button 
                    onClick={() => setAds(ads.filter(a => a.id !== ad.id))}
                    className="p-2 bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white rounded-lg transition-all"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* New Ad Modal */}
      {showModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="bg-[#1e293b] w-full max-w-2xl rounded-3xl border border-slate-700 shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="p-8 border-b border-slate-700 flex items-center justify-between">
              <h3 className="text-2xl font-bold">Criar Novo Anúncio</h3>
              <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-white"><X size={24} /></button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-8 space-y-6 max-h-[70vh] overflow-y-auto">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-400 uppercase">Título do Anúncio</label>
                  <input 
                    required
                    type="text" 
                    placeholder="Ex: Super Oferta 50% OFF"
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500"
                    value={formData.title}
                    onChange={e => setFormData({ ...formData, title: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-400 uppercase">Categoria</label>
                  <select 
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500"
                    value={formData.category}
                    onChange={e => setFormData({ ...formData, category: e.target.value as Category })}
                  >
                    <option value={Category.GENERAL}>{Category.GENERAL}</option>
                    <option value={Category.ADULT}>{Category.ADULT}</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-400 uppercase">Descrição da Oferta</label>
                <textarea 
                  required
                  rows={4}
                  placeholder="Descreva seu product ou serviço aqui..."
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500 resize-none"
                  value={formData.description}
                  onChange={e => setFormData({ ...formData, description: e.target.value })}
                />
                <p className="text-xs text-slate-500">Atenção: Se houver links na descrição, o anúncio ficará com status PENDENTE.</p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-400 uppercase">URL da Mídia (Img/Video/GIF)</label>
                  <input 
                    required
                    type="url" 
                    placeholder="https://..."
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500"
                    value={formData.mediaUrl}
                    onChange={e => setFormData({ ...formData, mediaUrl: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-400 uppercase">Tipo de Mídia</label>
                  <select 
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500"
                    value={formData.mediaType}
                    onChange={e => setFormData({ ...formData, mediaType: e.target.value as any })}
                  >
                    <option value="image">Imagem</option>
                    <option value="video">Vídeo (Max 1m)</option>
                    <option value="gif">GIF</option>
                  </select>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-bold text-slate-400 uppercase">Botões de Redirecionamento</label>
                  <span className="text-xs text-slate-500">{formData.buttons.length} / {planInfo.buttonsPerAd} botões</span>
                </div>
                
                {formData.buttons.map((btn, idx) => (
                  <div key={idx} className="flex gap-4 items-start bg-slate-800/50 p-4 rounded-xl border border-slate-700">
                    <div className="flex-1 space-y-4">
                      <input 
                        required
                        placeholder="Texto do Botão"
                        className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm focus:outline-none"
                        value={btn.label}
                        onChange={e => {
                          const newBtns = [...formData.buttons];
                          newBtns[idx].label = e.target.value;
                          setFormData({ ...formData, buttons: newBtns });
                        }}
                      />
                      <input 
                        required
                        type="url"
                        placeholder="Link de Destino (Será Mascarado)"
                        className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm focus:outline-none"
                        value={btn.url}
                        onChange={e => {
                          const newBtns = [...formData.buttons];
                          newBtns[idx].url = e.target.value;
                          setFormData({ ...formData, buttons: newBtns });
                        }}
                      />
                      <p className="text-[10px] text-blue-400 flex items-center gap-1">
                        <LinkIcon size={10} /> Link final: {MASK_DOMAIN}XXXXX
                      </p>
                    </div>
                    {idx > 0 && (
                      <button type="button" onClick={() => handleRemoveButton(idx)} className="text-red-500 p-2"><Trash2 size={16} /></button>
                    )}
                  </div>
                ))}

                {formData.buttons.length < planInfo.buttonsPerAd && (
                  <button 
                    type="button" 
                    onClick={handleAddButton}
                    className="w-full border-2 border-dashed border-slate-700 p-4 rounded-xl text-slate-400 hover:text-white hover:border-slate-500 transition-all text-sm font-bold"
                  >
                    + Adicionar Botão
                  </button>
                )}

                {planInfo.forcedButton && (
                  <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-xl">
                    <p className="text-xs font-bold text-blue-400 uppercase mb-1">Botão Forçado (Plano Grátis)</p>
                    <div className="bg-blue-600/20 border border-blue-500/30 p-2 rounded text-center text-xs font-bold">
                      QUERO ANUNCIAR TAMBÉM 🚀
                    </div>
                  </div>
                )}
              </div>

              <div className="pt-4">
                <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 py-4 rounded-xl font-bold text-lg shadow-xl shadow-blue-500/20 transition-all">
                  Criar Anúncio e Iniciar Disparos
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
