
import React, { useState, useEffect, useRef } from 'react';
import { generateBrandContent } from './services/geminiService';

const App: React.FC = () => {
  const [logoUrl, setLogoUrl] = useState('https://lh3.googleusercontent.com/d/1p0Cp9i1nKWc3Pil8GaYrcQJkuFfqZPPy');
  const [photoUrl, setPhotoUrl] = useState('https://lh3.googleusercontent.com/d/1fidSZNWFsVemqhu1ny1T-3rr269CkTX-');
  const [logoError, setLogoError] = useState(false);
  const [photoError, setPhotoError] = useState(false);
  
  // Chat IA State
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatInput, setChatInput] = useState('');
  const [chatMessages, setChatMessages] = useState<{role: 'user' | 'ai', text: string}[]>([]);
  const [isTyping, setIsTyping] = useState(false);

  const personalityChartRef = useRef<HTMLCanvasElement | null>(null);
  const chartInstance = useRef<any>(null);

  useEffect(() => {
    if (personalityChartRef.current) {
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
            plugins: { legend: { display: false } }
          }
        });
      }
    }
  }, []);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>, setter: (url: string) => void, errorSetter: (val: boolean) => void) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setter(url);
      errorSetter(false);
    }
  };

  const handleSendMessage = async () => {
    if (!chatInput.trim()) return;
    const userMsg = chatInput;
    setChatInput('');
    setChatMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsTyping(true);

    const aiResponse = await generateBrandContent(userMsg);
    setChatMessages(prev => [...prev, { role: 'ai', text: aiResponse || "Não consegui responder agora." }]);
    setIsTyping(false);
  };

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen w-full bg-brand-light text-brand-blue font-sans selection:bg-brand-red selection:text-white">
      
      {/* Menu de Navegação Superior */}
      <nav className="fixed top-0 left-0 w-full bg-white/80 backdrop-blur-md z-[90] border-b border-slate-100 px-6 py-4 flex justify-between items-center shadow-sm">
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
          <div className="font-serif font-bold text-2xl text-brand-red">AF</div>
          <div className="h-4 w-px bg-slate-200 hidden sm:block"></div>
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] hidden sm:block">Dr. Antônio Falcão</span>
        </div>
        <div className="flex gap-8 md:gap-12 text-[10px] font-bold uppercase tracking-widest items-center">
          <button onClick={() => scrollToSection('dna')} className="hover:text-brand-red transition-colors">DNA</button>
          <button onClick={() => scrollToSection('cores')} className="hover:text-brand-red transition-colors">Cores</button>
          <button onClick={() => scrollToSection('presenca')} className="hover:text-brand-red transition-colors">Visual</button>
          <button onClick={() => scrollToSection('footer')} className="bg-brand-blue text-white px-5 py-2 rounded-full hover:bg-brand-red transition-all">Contato</button>
        </div>
      </nav>

      {/* Assistente de IA Flutuante */}
      <div className="fixed bottom-8 right-8 z-[100]">
        {isChatOpen && (
          <div className="absolute bottom-20 right-0 w-[90vw] md:w-96 bg-white rounded-3xl shadow-2xl border border-slate-100 flex flex-col overflow-hidden animate-slide-up">
            <div className="bg-brand-blue p-5 text-white flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="font-serif text-sm font-bold">Assistente de Marca</span>
              </div>
              <button onClick={() => setIsChatOpen(false)} className="opacity-60 hover:opacity-100">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
              </button>
            </div>
            <div className="h-96 overflow-y-auto p-5 space-y-4 bg-slate-50/50">
              {chatMessages.length === 0 && (
                <div className="text-center py-10">
                  <div className="w-12 h-12 bg-brand-red/10 rounded-full flex items-center justify-center mx-auto mb-4 text-brand-red">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                  </div>
                  <p className="text-[11px] text-slate-500 font-medium">Olá! Como posso ajudar com sua marca hoje?</p>
                </div>
              )}
              {chatMessages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] p-4 rounded-2xl text-[12px] leading-relaxed shadow-sm ${msg.role === 'user' ? 'bg-brand-blue text-white rounded-tr-none' : 'bg-white text-slate-700 rounded-tl-none border border-slate-100'}`}>
                    {msg.text}
                  </div>
                </div>
              ))}
              {isTyping && <div className="text-[10px] text-brand-red font-bold animate-pulse tracking-widest uppercase">Analisando...</div>}
            </div>
            <div className="p-4 bg-white border-t border-slate-100 flex gap-2">
              <input 
                type="text" 
                className="flex-1 bg-slate-100 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-brand-red/10 transition-all"
                placeholder="Dúvida sobre a marca..."
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
              />
              <button onClick={handleSendMessage} className="bg-brand-red text-white p-3 rounded-xl hover:bg-brand-blue transition-all shadow-lg shadow-brand-red/20">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
              </button>
            </div>
          </div>
        )}
        <button 
          onClick={() => setIsChatOpen(!isChatOpen)}
          className="w-16 h-16 bg-brand-red text-white rounded-full shadow-2xl shadow-brand-red/40 flex items-center justify-center hover:scale-110 active:scale-95 transition-all group"
        >
          <svg className="w-7 h-7 group-hover:rotate-12 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
        </button>
      </div>

      {/* Hero Section */}
      <section className="min-h-screen flex flex-col items-center justify-center p-6 pt-32 bg-white">
        <div className="mb-12 relative group w-full max-w-md animate-fade-in">
          <input type="file" id="logoInput" className="hidden" onChange={(e) => handleImageChange(e, setLogoUrl, setLogoError)} />
          <label htmlFor="logoInput" className="logo-display-area shadow-2xl cursor-pointer bg-white overflow-hidden border-none hover:shadow-brand-red/10 transition-all">
            {!logoError ? (
              <img src={logoUrl} onError={() => setLogoError(true)} className="w-[85%] h-[85%] object-contain" alt="Logo Principal" />
            ) : (
              <div className="text-center p-8">
                <p className="font-serif text-3xl font-bold text-brand-blue">Dr. Antônio Falcão</p>
              </div>
            )}
          </label>
        </div>
        <div className="text-center space-y-6 max-w-5xl px-4 animate-fade-in" style={{animationDelay: '0.2s'}}>
          <h1 className="font-serif text-6xl md:text-9xl font-bold leading-tight tracking-tight">Dr. Antônio Falcão</h1>
          <div className="h-px w-32 bg-brand-red mx-auto opacity-50"></div>
          <p className="text-brand-red font-bold tracking-[0.6em] uppercase text-xs md:text-sm">Manual de Marca Estratégico</p>
        </div>
        <div className="mt-24 animate-bounce cursor-pointer opacity-30 hover:opacity-100" onClick={() => scrollToSection('dna')}>
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 14l-7 7-7-7"></path></svg>
        </div>
      </section>

      {/* DNA Section */}
      <section id="dna" className="min-h-screen flex items-center justify-center p-8 md:p-32 bg-brand-light">
        <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="space-y-12">
            <div className="space-y-6">
              <span className="text-brand-red font-bold tracking-[0.3em] uppercase text-xs">01. Posicionamento</span>
              <h2 className="font-serif text-5xl md:text-8xl font-bold leading-tight">Arquétipo do Sábio</h2>
              <p className="text-slate-600 text-lg md:text-2xl font-light leading-relaxed max-w-xl">
                Uma marca alicerçada na autoridade clínica e no conhecimento profundo, transmitindo serenidade e proteção em cada detalhe.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {[
                { label: 'Tom de Voz', val: 'Analítico & Seguro' },
                { label: 'Valor Core', val: 'Rigor Técnico' },
                { label: 'Diferencial', val: 'Cuidado Sábio' },
                { label: 'Personalidade', val: 'Sóbria & Nobre' }
              ].map((item, i) => (
                <div key={i} className="p-8 bg-white rounded-[2rem] shadow-sm border-l-4 border-brand-red">
                  <p className="text-[10px] uppercase font-bold text-slate-400 mb-2 tracking-widest">{item.label}</p>
                  <p className="font-bold text-xl">{item.val}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-white p-12 rounded-[4rem] shadow-xl aspect-square flex items-center justify-center relative group">
            <canvas ref={personalityChartRef}></canvas>
          </div>
        </div>
      </section>

      {/* Cores Section */}
      <section id="cores" className="min-h-screen flex flex-col items-center justify-center p-8 md:p-32 bg-white">
        <div className="max-w-4xl w-full text-center mb-24">
          <span className="text-brand-red font-bold tracking-[0.3em] uppercase text-xs mb-6 block">02. Universo Visual</span>
          <h2 className="font-serif text-5xl md:text-8xl font-bold mb-8">Paleta de Poder</h2>
          <p className="text-slate-500 text-xl font-light">Equilíbrio entre a vitalidade do sangue e a profundidade do oceano.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 w-full max-w-7xl">
          {[
            { name: 'Azul Profundo', hex: '#1A2B44', bg: 'bg-[#1A2B44]', text: 'text-white' },
            { name: 'Vermelho Vital', hex: '#C61F26', bg: 'bg-[#C61F26]', text: 'text-white' },
            { name: 'Gelo Moderno', hex: '#F8FAFC', bg: 'bg-[#F8FAFC]', text: 'text-brand-blue', border: true }
          ].map((color, i) => (
            <div key={i} className="group">
              <div className={`w-full aspect-[3/4] rounded-[2.5rem] shadow-xl mb-8 transition-all duration-500 group-hover:-translate-y-4 ${color.bg} ${color.border ? 'border border-slate-100' : ''} flex flex-col items-center justify-center p-12 relative overflow-hidden`}>
                <img src={logoUrl} style={{ filter: color.name !== 'Gelo Moderno' ? 'brightness(0) invert(1)' : 'none' }} className="w-full h-full object-contain scale-125" alt="Preview Logo" />
                <div className={`absolute bottom-10 px-4 py-2 rounded-full text-[10px] font-bold tracking-widest ${color.text} bg-black/10 backdrop-blur-md`}>{color.hex}</div>
              </div>
              <h3 className="font-serif text-3xl font-bold mb-2">{color.name}</h3>
              <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">Primária de Sistema</p>
            </div>
          ))}
        </div>
      </section>

      {/* Presença Section */}
      <section id="presenca" className="min-h-screen flex items-center justify-center p-8 md:p-32 bg-brand-light">
        <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <div className="relative group w-full">
            <input type="file" id="photoInput" className="hidden" onChange={(e) => handleImageChange(e, setPhotoUrl, setPhotoError)} />
            <label htmlFor="photoInput" className="photo-upload-area shadow-2xl block overflow-hidden cursor-pointer bg-white border-none aspect-[4/5] rounded-[3rem] hover:scale-[1.02] transition-all">
              {!photoError ? (
                <img src={photoUrl} onError={() => setPhotoError(true)} className="w-full h-full object-cover" alt="Fotografia de Perfil" />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-slate-100 text-slate-400">Clique para carregar retrato</div>
              )}
            </label>
            <div className="absolute -bottom-6 -right-6 bg-brand-red text-white p-6 rounded-3xl shadow-xl hidden md:block">
              <p className="font-serif text-2xl font-bold italic">Rigor Visual</p>
            </div>
          </div>
          <div className="space-y-10 text-left">
            <span className="text-brand-red font-bold tracking-[0.3em] uppercase text-xs">03. Estilo de Imagem</span>
            <h2 className="font-serif text-5xl md:text-8xl font-bold">Linguagem Fotográfica</h2>
            <p className="text-slate-600 text-xl font-light leading-relaxed">
              Fotografia que privilegia o contraste suave, iluminação direcionada e ambientes que respiram modernidade clínica.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              {['Minimalismo', 'Contrastes', 'Humanização', 'Foco Clínico'].map((tag, i) => (
                <span key={i} className="px-8 py-4 bg-white rounded-2xl text-[10px] font-bold shadow-sm border border-slate-100 uppercase tracking-[0.2em]">{tag}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Footer / Contato */}
      <footer id="footer" className="py-32 px-10 text-center bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto flex flex-col items-center gap-12">
          <img src={logoUrl} className="h-24 opacity-30 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-1000" alt="Logo Footer" />
          <div className="space-y-4">
            <h2 className="font-serif text-5xl font-bold">Dr. Antônio Falcão</h2>
            <p className="text-brand-red font-bold tracking-[0.5em] uppercase text-xs">Estratégia de Marca • 2026</p>
          </div>
          <div className="h-px w-full max-w-sm bg-slate-100"></div>
          <div className="flex gap-12 text-[10px] font-bold text-slate-300 uppercase tracking-[0.3em]">
            <a href="#" className="hover:text-brand-red transition-colors">Instagram</a>
            <a href="#" className="hover:text-brand-red transition-colors">LinkedIn</a>
            <a href="#" className="hover:text-brand-red transition-colors">Website</a>
          </div>
          <p className="text-[10px] text-slate-300 font-medium pt-12">© 2026 Todos os direitos reservados. Design e Inteligência por BrandSábio.</p>
        </div>
      </footer>

      <style>{`
        @keyframes slideUp { from { opacity: 0; transform: translateY(40px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        .animate-slide-up { animation: slideUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .animate-fade-in { animation: fadeIn 1.2s ease-out forwards; }
        ::-webkit-scrollbar { width: 10px; }
        ::-webkit-scrollbar-track { background: #f8fafc; }
        ::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 20px; border: 3px solid #f8fafc; }
        ::-webkit-scrollbar-thumb:hover { background: #C61F26; }
      `}</style>
    </div>
  );
};

export default App;
