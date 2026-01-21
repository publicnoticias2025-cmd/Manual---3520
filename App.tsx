
import React, { useState, useEffect, useRef } from 'react';
import { supabase } from './supabaseClient';

const App: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [logoUrl, setLogoUrl] = useState('https://lh3.googleusercontent.com/d/1p0Cp9i1nKWc3Pil8GaYrcQJkuFfqZPPy');
  const [photoUrl, setPhotoUrl] = useState('https://lh3.googleusercontent.com/d/1fidSZNWFsVemqhu1ny1T-3rr269CkTX-');
  const [logoError, setLogoError] = useState(false);
  const [photoError, setPhotoError] = useState(false);
  
  // Form State
  const [formLoading, setFormLoading] = useState(false);
  const [formSuccess, setFormSuccess] = useState(false);
  const [orderData, setOrderData] = useState({
    names: '',
    email: '',
    address: '',
    product: 'Manual de Marca Estratégico',
    total_amount: 1500.00
  });

  const personalityChartRef = useRef<HTMLCanvasElement | null>(null);
  const chartInstance = useRef<any>(null);

  const totalSlides = 6;

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') nextSlide();
      if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') prevSlide();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentSlide]);

  useEffect(() => {
    if (currentSlide === 1 && personalityChartRef.current) {
      if (chartInstance.current) chartInstance.current.destroy();
      
      const ctx = personalityChartRef.current.getContext('2d');
      if (ctx) {
        chartInstance.current = new (window as any).Chart(ctx, {
          type: 'radar',
          data: {
            labels: ['Sábio', 'Protetor', 'Inovação', 'Empatia', 'Autoridade'],
            datasets: [{
              label: 'Arquétipo',
              data: [100, 95, 80, 90, 100],
              backgroundColor: 'rgba(198, 31, 38, 0.1)',
              borderColor: '#C61F26',
              borderWidth: 2,
              pointBackgroundColor: '#1A2B44',
            }]
          },
          options: {
            maintainAspectRatio: false,
            scales: { r: { min: 0, max: 100, ticks: { display: false } } },
            plugins: { legend: { display: false } },
            animation: { duration: 1500 }
          }
        });
      }
    }
  }, [currentSlide]);

  const nextSlide = () => setCurrentSlide((prev) => (prev < totalSlides - 1 ? prev + 1 : prev));
  const prevSlide = () => setCurrentSlide((prev) => (prev > 0 ? prev - 1 : prev));

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>, setter: (url: string) => void, errorSetter: (val: boolean) => void) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setter(url);
      errorSetter(false);
    }
  };

  const handleOrderSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormLoading(true);
    try {
      // Inserindo dados na tabela 'orders' com os campos exatos solicitados
      const { error } = await supabase
        .from('orders')
        .insert([{
          names: orderData.names,
          email: orderData.email,
          address: orderData.address,
          product: orderData.product,
          total_amount: orderData.total_amount
          // O campo 'date' é preenchido automaticamente pelo DEFAULT do banco
        }]);

      if (error) throw error;
      setFormSuccess(true);
      setOrderData({ names: '', email: '', address: '', product: 'Manual de Marca Estratégico', total_amount: 1500.00 });
    } catch (err: any) {
      alert('Erro ao processar pedido no banco: ' + err.message);
    } finally {
      setFormLoading(false);
    }
  };

  return (
    <div className="h-screen w-screen overflow-hidden bg-brand-light text-brand-blue font-sans relative">
      
      {/* Barra de Progresso Superior */}
      <div className="absolute top-0 left-0 w-full h-1 bg-slate-100 z-50">
        <div 
          className="h-full bg-brand-red transition-all duration-700 ease-in-out" 
          style={{ width: `${((currentSlide + 1) / totalSlides) * 100}%` }}
        />
      </div>

      {/* Navegação Desktop */}
      <div className="hidden md:flex absolute inset-y-0 left-4 items-center z-40">
        {currentSlide > 0 && (
          <button onClick={prevSlide} className="p-4 rounded-full bg-white/50 hover:bg-white shadow-lg transition-all text-brand-blue group">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
        )}
      </div>
      <div className="hidden md:flex absolute inset-y-0 right-4 items-center z-40">
        {currentSlide < totalSlides - 1 && (
          <button onClick={nextSlide} className="p-4 rounded-full bg-white/50 hover:bg-white shadow-lg transition-all text-brand-blue group">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        )}
      </div>

      {/* Navegação Mobile */}
      <div className="md:hidden absolute inset-0 z-30 flex">
        <div className="w-1/4 h-full" onClick={prevSlide}></div>
        <div className="w-1/2 h-full"></div>
        <div className="w-1/4 h-full" onClick={nextSlide}></div>
      </div>

      {/* Indicadores */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3 z-40">
        {Array.from({ length: totalSlides }).map((_, i) => (
          <button 
            key={i} 
            onClick={() => setCurrentSlide(i)}
            className={`h-1.5 rounded-full transition-all duration-500 ${currentSlide === i ? 'w-6 bg-brand-red' : 'w-1.5 bg-slate-300'}`}
          />
        ))}
      </div>

      {/* Slides */}
      <div className="h-full w-full relative overflow-y-auto md:overflow-hidden">
        
        {/* Slide 0: Capa */}
        {currentSlide === 0 && (
          <div className="h-full w-full flex flex-col items-center justify-center p-6 animate-fade-in">
            <div className="mb-8 md:mb-12 relative group w-full max-w-md">
              <input type="file" id="logoInput" className="hidden" onChange={(e) => handleImageChange(e, setLogoUrl, setLogoError)} />
              <label htmlFor="logoInput" className="logo-display-area shadow-2xl cursor-pointer bg-white overflow-hidden">
                {!logoError ? (
                  <img 
                    src={logoUrl} 
                    onError={() => setLogoError(true)} 
                    className="w-[85%] h-[85%] object-contain transition-all duration-700" 
                    alt="Logo Principal" 
                  />
                ) : (
                  <div className="text-center p-8">
                    <p className="font-serif text-2xl font-bold text-brand-blue">Dr. Antônio Falcão</p>
                    <p className="text-[10px] uppercase tracking-widest text-slate-400 mt-2">Toque para carregar imagem</p>
                  </div>
                )}
              </label>
            </div>
            <h1 className="font-serif text-4xl md:text-8xl font-bold mb-4 md:mb-6 text-center">Dr. Antônio Falcão</h1>
            <p className="text-brand-red font-bold tracking-[0.3em] md:tracking-[0.5em] uppercase text-[10px] md:text-sm animate-pulse">Manual de Marca Estratégico</p>
          </div>
        )}

        {/* Slide 1: DNA */}
        {currentSlide === 1 && (
          <div className="h-full w-full flex items-center justify-center p-4 md:p-20 animate-fade-in">
            <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-16 items-center">
              <div className="space-y-4 md:space-y-8 text-center lg:text-left">
                <span className="text-brand-red font-bold tracking-widest uppercase text-[10px] md:text-xs">01. Posicionamento</span>
                <h2 className="font-serif text-3xl md:text-6xl font-bold">Arquétipo do Sábio</h2>
                <p className="text-slate-600 text-sm md:text-lg leading-relaxed max-w-xl mx-auto lg:mx-0">
                  Autoridade técnica e cuidado protetor: a busca pelo conhecimento que salva vidas.
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-white rounded-2xl shadow-sm border-l-4 border-brand-red text-left">
                    <p className="text-[8px] uppercase font-bold text-slate-400 mb-1">Voz</p>
                    <p className="font-bold text-xs md:text-base">Sereno & Analítico</p>
                  </div>
                  <div className="p-4 bg-white rounded-2xl shadow-sm border-l-4 border-brand-red text-left">
                    <p className="text-[8px] uppercase font-bold text-slate-400 mb-1">Missão</p>
                    <p className="font-bold text-xs md:text-base">Precisão Técnica</p>
                  </div>
                </div>
              </div>
              <div className="bg-white p-4 md:p-8 rounded-[2rem] shadow-xl h-[300px] md:h-[450px] flex items-center justify-center">
                <canvas ref={personalityChartRef}></canvas>
              </div>
            </div>
          </div>
        )}

        {/* Slide 2: Cores */}
        {currentSlide === 2 && (
          <div className="h-full w-full flex flex-col items-center justify-center p-4 md:p-20 animate-fade-in">
            <div className="max-w-5xl w-full text-center mb-6 md:mb-12">
              <span className="text-brand-red font-bold tracking-widest uppercase text-[10px] md:text-xs mb-2 block">02. Identidade Visual</span>
              <h2 className="font-serif text-3xl md:text-6xl font-bold mb-2">Cromatismo Estratégico</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-8 w-full max-w-6xl pb-12 lg:pb-0 px-2">
              {[
                { name: 'Azul Profundo', hex: '#1A2B44', desc: 'Autoridade.', bg: 'bg-[#1A2B44]', logoInvert: true },
                { name: 'Vermelho Vital', hex: '#C61F26', desc: 'Vida.', bg: 'bg-[#C61F26]', logoInvert: true },
                { name: 'Gelo Moderno', hex: '#F8FAFC', desc: 'Clareza.', bg: 'bg-[#F8FAFC]', border: true, logoInvert: false }
              ].map((color, i) => (
                <div key={i} className="group flex flex-col items-center sm:items-start">
                  <div className={`w-full h-44 md:h-72 rounded-2xl shadow-lg mb-3 transition-transform group-hover:scale-105 ${color.bg} ${color.border ? 'border border-slate-200' : ''} flex flex-col items-center justify-center p-6 relative overflow-hidden`}>
                    {!logoError ? (
                      <img 
                        src={logoUrl} 
                        style={{ filter: color.logoInvert ? 'brightness(0) invert(1)' : 'none' }}
                        className="max-w-full max-h-full object-contain scale-[2.0] transition-transform duration-700" 
                        alt="Logo" 
                      />
                    ) : (
                      <span className={`font-serif font-bold text-2xl md:text-4xl ${color.logoInvert ? 'text-white' : 'text-brand-blue'}`}>AF</span>
                    )}
                    <p className={`font-bold text-[8px] tracking-widest ${color.logoInvert ? 'text-white/40' : 'text-brand-blue/20'} absolute bottom-4`}>{color.hex}</p>
                  </div>
                  <h3 className="font-serif text-lg md:text-2xl font-bold">{color.name}</h3>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Slide 3: Foto */}
        {currentSlide === 3 && (
          <div className="h-full w-full flex items-center justify-center p-4 md:p-20 animate-fade-in">
            <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-20 items-center">
              <div className="max-w-sm mx-auto lg:max-w-none relative group w-full">
                <input type="file" id="photoInput" className="hidden" onChange={(e) => handleImageChange(e, setPhotoUrl, setPhotoError)} />
                <label htmlFor="photoInput" className="photo-upload-area shadow-2xl block overflow-hidden cursor-pointer bg-white">
                  {!photoError ? (
                    <img src={photoUrl} onError={() => setPhotoError(true)} className="w-full h-full object-cover" alt="Retrato" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-slate-50 text-slate-400">Clique para carregar foto</div>
                  )}
                </label>
              </div>
              <div className="space-y-6 text-center lg:text-left">
                <span className="text-brand-red font-bold tracking-widest uppercase text-[10px] md:text-xs">03. Presença Visual</span>
                <h2 className="font-serif text-3xl md:text-6xl font-bold">Fotografia & Estilo</h2>
                <p className="text-slate-600 text-sm md:text-lg leading-relaxed">Rigor científico e calor humano através de iluminação natural e foco nítido.</p>
                <div className="flex flex-wrap justify-center lg:justify-start gap-4">
                  {['Olhar Direto', 'Ambientes Minimalistas'].map((text, i) => (
                    <span key={i} className="px-4 py-2 bg-white rounded-full text-xs font-bold shadow-sm border border-slate-100">{text}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Slide 4: Checkout/Order Form (Sincronizado com SQL) */}
        {currentSlide === 4 && (
          <div className="h-full w-full flex items-center justify-center p-4 md:p-20 animate-fade-in overflow-y-auto">
            <div className="max-w-4xl w-full bg-white rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col md:flex-row border border-slate-100 my-8">
              <div className="bg-brand-blue p-8 md:p-12 text-white md:w-2/5 flex flex-col justify-center">
                <span className="text-brand-red font-bold tracking-widest uppercase text-[10px] mb-4">Checkout</span>
                <h2 className="font-serif text-3xl md:text-4xl font-bold mb-6">Finalizar Pedido</h2>
                <p className="text-slate-300 text-sm leading-relaxed mb-8">Sua marca, estrategicamente desenhada, pronta para o mercado.</p>
                <div className="bg-white/10 p-4 rounded-2xl mb-8">
                  <p className="text-[10px] uppercase font-bold text-slate-400 mb-1">Total a pagar</p>
                  <p className="text-2xl font-bold">R$ {orderData.total_amount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
                </div>
                <ul className="space-y-4 text-xs font-medium">
                  <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 bg-brand-red rounded-full"></span> Entrega em 48h</li>
                  <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 bg-brand-red rounded-full"></span> Manual Digital PDF</li>
                </ul>
              </div>
              <div className="p-8 md:p-12 md:w-3/5">
                {formSuccess ? (
                  <div className="h-full flex flex-col items-center justify-center text-center animate-fade-in min-h-[400px]">
                    <div className="w-16 h-16 bg-green-50 text-green-500 rounded-full flex items-center justify-center mb-6">
                      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                    </div>
                    <h3 className="font-serif text-2xl font-bold mb-2">Pedido Registrado!</h3>
                    <p className="text-slate-500 text-sm">Os dados foram salvos com sucesso no seu banco de dados Supabase.</p>
                    <button onClick={() => setFormSuccess(false)} className="mt-8 text-brand-red text-xs font-bold uppercase tracking-widest border-b-2 border-brand-red/20 pb-1">Novo Checkout</button>
                  </div>
                ) : (
                  <form onSubmit={handleOrderSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-[10px] uppercase font-bold text-slate-400 mb-1 block">Nome Completo</label>
                        <input 
                          required
                          type="text" 
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-brand-red focus:ring-0 outline-none transition-all text-sm"
                          placeholder="Ex: Antônio Falcão"
                          value={orderData.names}
                          onChange={(e) => setOrderData({...orderData, names: e.target.value})}
                        />
                      </div>
                      <div>
                        <label className="text-[10px] uppercase font-bold text-slate-400 mb-1 block">Email</label>
                        <input 
                          required
                          type="email" 
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-brand-red focus:ring-0 outline-none transition-all text-sm"
                          placeholder="seu@email.com"
                          value={orderData.email}
                          onChange={(e) => setOrderData({...orderData, email: e.target.value})}
                        />
                      </div>
                    </div>
                    <div>
                      <label className="text-[10px] uppercase font-bold text-slate-400 mb-1 block">Endereço de Entrega</label>
                      <input 
                        required
                        type="text" 
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-brand-red focus:ring-0 outline-none transition-all text-sm"
                        placeholder="Rua, Número, Bairro, Cidade"
                        value={orderData.address}
                        onChange={(e) => setOrderData({...orderData, address: e.target.value})}
                      />
                    </div>
                    <div>
                      <label className="text-[10px] uppercase font-bold text-slate-400 mb-1 block">Produto / Serviço</label>
                      <select 
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-brand-red focus:ring-0 outline-none transition-all text-sm bg-white"
                        value={orderData.product}
                        onChange={(e) => setOrderData({...orderData, product: e.target.value})}
                      >
                        <option>Manual de Marca Estratégico</option>
                        <option>Pacote Identidade Visual VIP</option>
                        <option>Consultoria Médica de Marca</option>
                      </select>
                    </div>
                    <div className="pt-4">
                      <button 
                        type="submit" 
                        disabled={formLoading}
                        className="w-full bg-brand-red text-white font-bold py-4 rounded-xl text-xs uppercase tracking-widest shadow-xl shadow-brand-red/20 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:hover:scale-100"
                      >
                        {formLoading ? 'Processando...' : 'Finalizar e Salvar no Banco'}
                      </button>
                    </div>
                    <p className="text-[9px] text-center text-slate-400 uppercase tracking-tighter">Conectado via Supabase: vdbocuvobjisudikgzbg</p>
                  </form>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Slide 5: Encerramento */}
        {currentSlide === 5 && (
          <div className="h-full w-full flex flex-col items-center justify-center p-6 animate-fade-in text-center">
            <div className="mb-12 md:mb-20">
               {!logoError ? (
                  <img src={logoUrl} onError={() => setLogoError(true)} className="h-36 md:h-60 mx-auto transition-all duration-1000" alt="Logo Gigante" />
               ) : (
                  <div className="font-serif font-bold text-brand-red text-6xl md:text-9xl opacity-10">AF</div>
               )}
            </div>
            <h2 className="font-serif text-4xl md:text-7xl font-bold mb-4 md:mb-8">Dr. Antônio Falcão</h2>
            <blockquote className="max-w-2xl text-base md:text-2xl text-slate-400 italic font-serif leading-relaxed mb-10 px-6">
              "A medicina é a arte de cuidar, guiada pela ciência de proteger."
            </blockquote>
            <div className="h-px w-24 md:w-48 bg-brand-red/30 mb-10"></div>
            <p className="text-brand-red font-bold tracking-[0.4em] uppercase text-[10px] md:text-xs">Versão 1.0 • 2026</p>
          </div>
        )}

      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(15px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fadeIn 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .overflow-y-auto::-webkit-scrollbar {
          width: 0px;
          background: transparent;
        }
      `}</style>
    </div>
  );
};

export default App;
