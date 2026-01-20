
import React, { useState, useEffect, useRef } from 'react';

const App: React.FC = () => {
  const [logoUrl, setLogoUrl] = useState('https://lh3.googleusercontent.com/d/1p0Cp9i1nKWc3Pil8GaYrcQJkuFfqZPPy');
  const [photoUrl, setPhotoUrl] = useState('https://lh3.googleusercontent.com/d/1fidSZNWFsVemqhu1ny1T-3rr269CkTX-');

  const personalityChartRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (personalityChartRef.current) {
      const ctx = personalityChartRef.current.getContext('2d');
      if (ctx) {
        new (window as any).Chart(ctx, {
          type: 'radar',
          data: {
            labels: ['Sábio', 'Protetor', 'Inovação', 'Empatia', 'Autoridade'],
            datasets: [{
              label: 'Arquétipo da Marca',
              data: [100, 95, 80, 90, 100],
              backgroundColor: 'rgba(26, 43, 68, 0.1)',
              borderColor: '#1A2B44',
              borderWidth: 3,
              pointBackgroundColor: '#C61F26',
              pointBorderColor: '#fff',
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: { r: { suggestedMin: 0, suggestedMax: 100, ticks: { display: false } } },
            plugins: { legend: { display: false } }
          }
        });
      }
    }
  }, []);

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setLogoUrl(URL.createObjectURL(file));
    }
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPhotoUrl(URL.createObjectURL(file));
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 overflow-x-hidden">
      {/* Hero Header */}
      <header className="bg-white pt-20 pb-32 border-b border-gray-100 relative text-center">
        <div className="container mx-auto px-6 flex flex-col items-center">
          <div className="mb-12 relative group cursor-pointer">
            <input type="file" id="logoIn" accept="image/*" className="hidden" onChange={handleLogoUpload} />
            <label htmlFor="logoIn" className="logo-display-area shadow-2xl hover:border-brand-red transition-all overflow-hidden group">
              <img src={logoUrl} className="max-w-[95%] max-h-[95%] object-contain scale-110" alt="Logo" />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white text-xs font-bold uppercase transition-opacity">Alterar Logo</div>
            </label>
          </div>
          <p className="text-brand-red font-bold tracking-[0.3em] uppercase mb-4 text-xs">Manual de Marca Estratégico</p>
          <h1 className="font-serif text-5xl md:text-7xl font-bold mb-6 text-brand-blue">Dr. Antônio Falcão</h1>
          <p className="text-xl md:text-2xl text-slate-400 font-light max-w-2xl italic leading-relaxed px-4">
            "Uma marca técnica e humana que pulsa longevidade."
          </p>
        </div>
      </header>

      <main className="container mx-auto px-6 -mt-16 pb-32 relative z-10 space-y-24">
        
        {/* Section 1: Soul */}
        <section className="bg-white rounded-[2.5rem] shadow-2xl overflow-hidden">
          <div className="bg-brand-blue p-10 text-white">
            <h2 className="font-serif text-3xl font-bold">1. Identidade Estratégica</h2>
            <p className="text-blue-200 opacity-70 mt-1">A alma do consultório.</p>
          </div>
          <div className="p-10 md:p-16">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-20 text-center md:text-left">
              <div className="space-y-4">
                <div className="w-12 h-12 bg-brand-blue/10 flex items-center justify-center rounded-xl text-brand-blue font-bold mx-auto md:mx-0">M</div>
                <h3 className="font-bold text-lg text-brand-blue">Missão</h3>
                <p className="text-slate-500 text-sm leading-relaxed">Proporcionar excelência em saúde cardiovascular, unindo precisão diagnóstica ao cuidado humanizado.</p>
              </div>
              <div className="space-y-4">
                <div className="w-12 h-12 bg-brand-red/10 flex items-center justify-center rounded-xl text-brand-red font-bold mx-auto md:mx-0">V</div>
                <h3 className="font-bold text-lg text-brand-blue">Visão</h3>
                <p className="text-slate-500 text-sm leading-relaxed">Ser a principal referência em cardiologia preventiva, reconhecido pela inovação e ética profissional.</p>
              </div>
              <div className="space-y-4">
                <div className="w-12 h-12 bg-slate-100 flex items-center justify-center rounded-xl text-slate-500 font-bold mx-auto md:mx-0">V</div>
                <h3 className="font-bold text-lg text-brand-blue">Valores</h3>
                <p className="text-slate-500 text-sm leading-relaxed">Precisão científica, acolhimento humano, ética médica e compromisso com a vida.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center border-t border-gray-100 pt-16">
              <div className="space-y-8">
                <h3 className="font-serif text-3xl font-bold text-brand-blue">Arquétipo & Voz</h3>
                <p className="text-slate-600 leading-relaxed">A marca é <strong>Sábia e Protetora</strong>. Transmite calma através do conhecimento e segurança através da técnica.</p>
                <div className="space-y-4">
                  <div className="p-5 bg-slate-50 rounded-2xl border-l-4 border-brand-red">
                    <p className="text-xs font-bold uppercase text-brand-blue mb-1">Tom de Voz</p>
                    <p className="text-sm text-slate-500">Didático, sem "mediquês", focado em educar e prevenir.</p>
                  </div>
                  <div className="p-5 bg-slate-50 rounded-2xl border-l-4 border-brand-blue">
                    <p className="text-xs font-bold uppercase text-brand-blue mb-1">Sentimento</p>
                    <p className="text-sm text-slate-500">Substituir a ansiedade pela confiança de estar nas mãos de um especialista.</p>
                  </div>
                </div>
              </div>
              <div className="bg-slate-50 p-8 rounded-3xl h-[400px]">
                <canvas ref={personalityChartRef}></canvas>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: Visuals */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="bg-white p-10 rounded-[2rem] shadow-xl border border-gray-100 h-fit lg:sticky lg:top-8">
            <h2 className="font-serif text-2xl font-bold text-brand-blue mb-8">2. Cores & Tipos</h2>
            <div className="space-y-6">
              {[
                { name: 'Azul Marinho', hex: '#1A2B44', label: 'Autoridade' },
                { name: 'Vermelho Vital', hex: '#C61F26', label: 'Vida' },
                { name: 'Cinza Técnico', hex: '#808285', label: 'Precisão' }
              ].map(c => (
                <div key={c.hex} className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-xl shadow-lg" style={{ backgroundColor: c.hex }}></div>
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase">{c.name}</p>
                    <p className="font-mono text-sm font-bold text-brand-blue">{c.hex}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-12 pt-8 border-t border-gray-100 space-y-6">
              <div>
                <p className="text-[10px] text-slate-400 font-bold uppercase mb-1">Primária (Títulos)</p>
                <p className="font-serif text-2xl text-brand-blue">Playfair Display</p>
              </div>
              <div>
                <p className="text-[10px] text-slate-400 font-bold uppercase mb-1">Secundária (Texto)</p>
                <p className="text-sm font-medium text-slate-600">Montserrat</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2 bg-white p-4 md:p-8 rounded-[2rem] shadow-xl border border-gray-100">
            <h2 className="font-serif text-3xl font-bold text-brand-blue mb-12 px-4 text-center">Aplicações Reais (Zoo Responsivo)</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Variante 1: Fundo Claro */}
              <div className="bg-white rounded-3xl flex flex-col items-center justify-center p-6 group cursor-pointer relative shadow-sm min-h-[400px] border border-slate-100 overflow-hidden">
                <img src={logoUrl} className="w-full h-full max-h-[280px] object-contain transition-transform duration-700 group-hover:scale-110" alt="Light logo" />
                <div className="absolute bottom-4 left-0 right-0 flex justify-center px-4">
                    <span className="text-[10px] font-bold uppercase text-slate-500 tracking-[0.3em] bg-white/95 px-5 py-2 rounded-full shadow-md border border-slate-100 whitespace-nowrap">Fundo Claro</span>
                </div>
              </div>
              
              {/* Variante 2: Fundo Escuro */}
              <div className="bg-brand-blue rounded-3xl flex flex-col items-center justify-center p-6 group cursor-pointer relative shadow-2xl min-h-[400px] overflow-hidden">
                <img src={logoUrl} className="w-full h-full max-h-[280px] object-contain brightness-0 invert transition-transform duration-700 group-hover:scale-110" alt="Dark logo" />
                <div className="absolute bottom-4 left-0 right-0 flex justify-center px-4">
                    <span className="text-[10px] font-bold uppercase text-blue-200 tracking-[0.3em] bg-brand-blue/90 px-5 py-2 rounded-full shadow-lg border border-blue-900 whitespace-nowrap backdrop-blur-sm">Fundo Escuro</span>
                </div>
              </div>
              
              {/* Variante 3: Preto e Branco */}
              <div className="bg-white border border-slate-200 rounded-3xl flex flex-col items-center justify-center p-6 group cursor-pointer relative shadow-sm min-h-[400px] overflow-hidden">
                <img src={logoUrl} className="w-full h-full max-h-[280px] object-contain grayscale brightness-0 transition-transform duration-700 group-hover:scale-110" alt="B&W logo" />
                <div className="absolute bottom-4 left-0 right-0 flex justify-center px-4">
                    <span className="text-[10px] font-bold uppercase text-slate-600 tracking-[0.3em] bg-white/95 px-5 py-2 rounded-full shadow-md border border-slate-200 whitespace-nowrap">Monocromático</span>
                </div>
              </div>

              {/* Variante 4: Fundo Vermelho Vital */}
              <div className="bg-brand-red rounded-3xl flex flex-col items-center justify-center p-6 group cursor-pointer relative shadow-2xl min-h-[400px] overflow-hidden">
                <img src={logoUrl} className="w-full h-full max-h-[280px] object-contain brightness-0 invert transition-transform duration-700 group-hover:scale-110" alt="Red background logo" />
                <div className="absolute bottom-4 left-0 right-0 flex justify-center px-4">
                    <span className="text-[10px] font-bold uppercase text-white tracking-[0.3em] bg-black/30 px-5 py-2 rounded-full shadow-lg backdrop-blur-sm whitespace-nowrap">Fundo Vermelho</span>
                </div>
              </div>

              {/* Variante 5: Marca d'água */}
              <div className="bg-slate-50 rounded-3xl flex flex-col items-center justify-center p-6 group cursor-pointer relative shadow-sm min-h-[400px] overflow-hidden">
                <img src={logoUrl} className="w-full h-full max-h-[280px] object-contain opacity-10 transition-transform duration-700 group-hover:opacity-20 group-hover:scale-110" alt="Watermark" />
                <div className="absolute bottom-4 left-0 right-0 flex justify-center px-4">
                    <span className="text-[10px] font-bold uppercase text-slate-400 tracking-[0.3em] bg-white/70 px-5 py-2 rounded-full shadow-sm whitespace-nowrap">Marca d'água</span>
                </div>
              </div>

              {/* Variante 6: Cinza Técnico */}
              <div className="bg-brand-gray rounded-3xl flex flex-col items-center justify-center p-6 group cursor-pointer relative shadow-xl min-h-[400px] overflow-hidden">
                <img src={logoUrl} className="w-full h-full max-h-[280px] object-contain brightness-0 invert transition-transform duration-700 group-hover:scale-110" alt="Gray tech logo" />
                <div className="absolute bottom-4 left-0 right-0 flex justify-center px-4">
                    <span className="text-[10px] font-bold uppercase text-slate-100 tracking-[0.3em] bg-black/20 px-5 py-2 rounded-full shadow-lg whitespace-nowrap">Cinza Técnico</span>
                </div>
              </div>
            </div>
            <div className="mt-12 text-xs text-slate-400 font-bold text-center uppercase tracking-[0.3em] border-t border-slate-50 pt-8">
              Aplicações Técnicas em Formatos Compactos
            </div>
          </div>
        </section>

        {/* Section 3: Photo Styling */}
        <section className="bg-white rounded-[2.5rem] shadow-xl p-10 md:p-16 border border-gray-100 overflow-hidden">
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className="space-y-6">
                <h2 className="font-serif text-3xl font-bold text-brand-blue">3. O Rosto da Marca</h2>
                <p className="text-slate-600 leading-relaxed">
                  A representação visual do Dr. Antônio Falcão deve seguir padrões visuais consistentes, garantindo uniformidade em todos os materiais institucionais e digitais.
                </p>
                <div className="p-8 bg-slate-50 rounded-[2rem] border-2 border-dashed border-slate-200">
                  <h4 className="text-sm font-bold text-brand-blue uppercase mb-3 tracking-widest">Diretriz Visual</h4>
                  <ul className="text-sm text-slate-500 space-y-3">
                    <li className="flex items-start gap-2"><span>•</span> <span>Iluminação clara e uniforme (High-Key)</span></li>
                    <li className="flex items-start gap-2"><span>•</span> <span>Fundo neutro e ambiente clínico profissional</span></li>
                    <li className="flex items-start gap-2"><span>•</span> <span>Expressão serena, postura confiante e empática</span></li>
                    <li className="flex items-start gap-2"><span>•</span> <span>Vestimenta médica impecável</span></li>
                  </ul>
                </div>
                <p className="text-xs text-slate-400 italic">Esses elementos asseguram uma comunicação visual alinhada aos valores da marca.</p>
              </div>
              <div className="flex justify-center w-full">
                 <div className="relative group">
                    <input type="file" id="photoIn" accept="image/*" className="hidden" onChange={handlePhotoUpload} />
                    <label htmlFor="photoIn" className="photo-upload-area shadow-2xl cursor-pointer block group overflow-hidden border-none rounded-[3rem]">
                        <img 
                          src={photoUrl} 
                          className="w-full h-auto group-hover:scale-105 transition-transform duration-1000" 
                          alt="Specialist" 
                        />
                        <div className="absolute inset-0 bg-brand-blue/60 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center text-white transition-opacity duration-500">
                           <div className="bg-white/20 p-6 rounded-full backdrop-blur-md mb-4 animate-pulse-soft">
                             <span className="text-4xl">📸</span>
                           </div>
                           <span className="font-bold uppercase text-sm tracking-[0.3em]">Atualizar Retrato Oficial</span>
                        </div>
                    </label>
                 </div>
              </div>
           </div>
        </section>

        {/* Footer */}
        <footer className="text-center py-20 bg-white rounded-[3rem] shadow-2xl border border-gray-100">
          <div className="mb-8 opacity-40 hover:opacity-100 transition-all duration-500 hover:scale-110 cursor-pointer">
            <img src={logoUrl} className="w-32 h-32 mx-auto object-contain" alt="Footer Logo" />
          </div>
          <p className="font-serif text-4xl font-bold text-brand-blue mb-2">Dr. Antônio Falcão</p>
          <p className="text-brand-red font-bold text-xs uppercase tracking-[0.5em]">Saúde Cardiovascular de Excelência</p>
          <div className="mt-20 pt-10 border-t border-gray-50 text-[11px] text-slate-300 font-bold tracking-[0.4em] px-6">
            © 2026 DR. ANTÔNIO FALCÃO • TODOS OS DIREITOS RESERVADOS • MANUAL DE MARCA v1.2
          </div>
        </footer>
      </main>

      {/* Scroll Top Helper Button */}
      <div className="fixed bottom-8 right-8 z-50">
        <button 
          onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}
          className="w-16 h-16 bg-brand-blue text-white shadow-2xl rounded-full flex items-center justify-center hover:bg-brand-red hover:scale-110 transition-all duration-300"
        >
          <span className="text-2xl">↑</span>
        </button>
      </div>
    </div>
  );
};

export default App;
