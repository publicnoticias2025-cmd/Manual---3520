
import React, { useState, useEffect, useRef } from 'react';
import { generateBrandContent } from './services/geminiService';

const App: React.FC = () => {
  const [logoUrl, setLogoUrl] = useState('https://lh3.googleusercontent.com/d/1p0Cp9i1nKWc3Pil8GaYrcQJkuFfqZPPy');
  const [photoUrl, setPhotoUrl] = useState('https://lh3.googleusercontent.com/d/1w7HIwm3Y577ZdiiNj2Mv_La-9Yo5pso8');
  const [aiTopic, setAiTopic] = useState('');
  const [aiResponse, setAiResponse] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const personalityChartRef = useRef<HTMLCanvasElement>(null);
  const toneChartRef = useRef<HTMLCanvasElement>(null);

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

    if (toneChartRef.current) {
      const ctx = toneChartRef.current.getContext('2d');
      if (ctx) {
        new (window as any).Chart(ctx, {
          type: 'bar',
          data: {
            labels: ['Didático', 'Empático', 'Seguro', 'Inspiracional', 'Claro'],
            datasets: [{
              data: [95, 90, 100, 85, 92],
              backgroundColor: ['#C61F26', '#1A2B44', '#C61F26', '#1A2B44', '#C61F26'],
              borderRadius: 8,
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            indexAxis: 'y',
            scales: { x: { display: false, max: 100 }, y: { grid: { display: false }, ticks: { color: '#ffffff', font: { weight: 'bold' } } } },
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

  const handleAskAI = async () => {
    if (!aiTopic) return;
    setIsGenerating(true);
    const content = await generateBrandContent(aiTopic);
    setAiResponse(content || '');
    setIsGenerating(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 overflow-x-hidden">
      {/* Hero Header */}
      <header className="bg-white pt-20 pb-32 border-b border-gray-100 relative text-center">
        <div className="container mx-auto px-6 flex flex-col items-center">
          <div className="mb-12 relative group cursor-pointer">
            <input type="file" id="logoIn" accept="image/*" className="hidden" onChange={handleLogoUpload} />
            <label htmlFor="logoIn" className="logo-display-area shadow-2xl hover:border-brand-red transition-all overflow-hidden group">
              <img src={logoUrl} className="max-w-[85%] max-h-[85%] object-contain" alt="Logo" />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white text-xs font-bold uppercase transition-opacity">Alterar Logo</div>
            </label>
          </div>
          <p className="text-brand-red font-bold tracking-[0.3em] uppercase mb-4 text-xs">Manual de Marca Estratégico</p>
          <h1 className="font-serif text-5xl md:text-7xl font-bold mb-6 text-brand-blue">Dr. Antônio Falcão</h1>
          <p className="text-xl md:text-2xl text-slate-400 font-light max-w-2xl italic leading-relaxed">
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
          <div className="bg-white p-10 rounded-[2rem] shadow-xl border border-gray-100">
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

          <div className="lg:col-span-2 bg-white p-10 rounded-[2rem] shadow-xl border border-gray-100 overflow-hidden">
            <h2 className="font-serif text-2xl font-bold text-brand-blue mb-8">Aplicações Reais</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-[320px]">
              <div className="bg-slate-50 rounded-2xl flex flex-col items-center justify-center p-6 group cursor-pointer relative">
                <img src={logoUrl} className="max-w-[80%] max-h-[140px] object-contain transition group-hover:scale-105" alt="Light logo" />
                <span className="absolute bottom-4 text-[10px] font-bold uppercase text-slate-300">Fundo Claro</span>
              </div>
              <div className="bg-brand-blue rounded-2xl flex flex-col items-center justify-center p-6 group cursor-pointer relative shadow-inner">
                <img src={logoUrl} className="max-w-[80%] max-h-[140px] object-contain brightness-0 invert transition group-hover:scale-105" alt="Dark logo" />
                <span className="absolute bottom-4 text-[10px] font-bold uppercase text-blue-300">Fundo Escuro</span>
              </div>
            </div>
            <div className="mt-8 text-xs text-slate-400 italic">
              * Mantenha sempre um respiro equivalente à altura da letra "D" ao redor da marca.
            </div>
          </div>
        </section>

        {/* Section 3: AI Brand Assistant */}
        <section className="bg-brand-blue rounded-[3rem] p-12 md:p-20 text-white shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32 blur-3xl"></div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
            <div className="space-y-6">
              <h2 className="font-serif text-4xl font-bold">Assistente de Marca IA</h2>
              <p className="text-blue-200 text-lg font-light leading-relaxed">
                Gere conteúdo para redes sociais, artigos ou avisos que seguem exatamente o tom de voz "Sábio e Protetor" do Dr. Antônio.
              </p>
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Ex: Importância do check-up anual..."
                  className="w-full bg-white/10 border border-white/20 rounded-2xl p-4 text-white placeholder-blue-300 focus:ring-2 focus:ring-brand-red outline-none"
                  value={aiTopic}
                  onChange={(e) => setAiTopic(e.target.value)}
                />
                <button
                  onClick={handleAskAI}
                  disabled={isGenerating || !aiTopic}
                  className="w-full bg-brand-red hover:bg-red-700 disabled:bg-slate-600 text-white font-bold py-4 rounded-2xl transition-all shadow-lg flex items-center justify-center gap-3"
                >
                  {isGenerating ? 'Processando Estratégia...' : 'Gerar Conteúdo Estratégico'}
                  {!isGenerating && <span className="text-xl">✨</span>}
                </button>
              </div>
            </div>
            <div className="bg-white rounded-3xl p-8 h-[450px] overflow-y-auto shadow-2xl">
              {aiResponse ? (
                <div className="text-slate-800 space-y-4 whitespace-pre-line text-sm leading-relaxed">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-8 h-8 bg-brand-blue rounded-lg flex items-center justify-center text-white text-[10px] font-bold">AI</div>
                    <span className="font-bold text-brand-blue uppercase text-xs tracking-widest">Sugestão Estratégica</span>
                  </div>
                  {aiResponse}
                </div>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-slate-300 text-center p-6">
                  <div className="w-20 h-20 border-4 border-dashed border-slate-200 rounded-full flex items-center justify-center mb-4 opacity-50">
                    <span className="text-4xl">💡</span>
                  </div>
                  <p className="font-medium text-slate-400">Insira um tema e deixe a IA pensar como o Dr. Antônio Falcão.</p>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Section 4: Photo Styling */}
        <section className="bg-white rounded-[2.5rem] shadow-xl p-10 md:p-16 border border-gray-100">
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className="space-y-6">
                <h2 className="font-serif text-3xl font-bold text-brand-blue">O Rosto da Marca</h2>
                <p className="text-slate-600 leading-relaxed">
                  A fotografia deve seguir o estilo <strong>High-Key</strong>: iluminação clara, fundo limpo e tons suaves, transmitindo transparência e autoridade.
                </p>
                <div className="p-6 bg-slate-50 rounded-3xl border border-dashed border-slate-200">
                  <h4 className="text-xs font-bold text-brand-blue uppercase mb-2">Diretriz Visual</h4>
                  <p className="text-sm italic text-slate-500">"Dr. Antônio deve ser retratado com segurança e empatia, preferencialmente em ambiente clínico impecável."</p>
                </div>
              </div>
              <div className="relative group">
                 <input type="file" id="photoIn" accept="image/*" className="hidden" onChange={handlePhotoUpload} />
                 <label htmlFor="photoIn" className="photo-upload-area shadow-lg cursor-pointer block group overflow-hidden">
                    <img src={photoUrl} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt="Specialist" />
                    <div className="absolute inset-0 bg-brand-blue/60 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center text-white transition-opacity">
                       <span className="text-3xl mb-2">📷</span>
                       <span className="font-bold uppercase text-xs tracking-widest">Atualizar Retrato</span>
                    </div>
                 </label>
              </div>
           </div>
        </section>

        {/* Footer */}
        <footer className="text-center py-20 bg-white rounded-[3rem] shadow-2xl border border-gray-100">
          <div className="mb-8 opacity-40 hover:opacity-100 transition-opacity">
            <img src={logoUrl} className="w-24 h-24 mx-auto object-contain" alt="Footer Logo" />
          </div>
          <p className="font-serif text-3xl font-bold text-brand-blue mb-2">Dr. Antônio Falcão</p>
          <p className="text-brand-red font-bold text-[10px] uppercase tracking-[0.4em]">Saúde Cardiovascular de Excelência</p>
          <div className="mt-16 pt-8 border-t border-gray-50 text-[10px] text-slate-300 font-bold tracking-widest px-6">
            © 2026 DR. ANTÔNIO FALCÃO • TODOS OS DIREITOS RESERVADOS • MANUAL DE MARCA v1.0
          </div>
        </footer>
      </main>

      {/* Deploy Helper Button */}
      <div className="fixed bottom-8 right-8 z-50">
        <button 
          onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}
          className="w-12 h-12 bg-white shadow-xl rounded-full flex items-center justify-center text-brand-blue hover:bg-brand-blue hover:text-white transition-all border border-gray-100"
        >
          ↑
        </button>
      </div>
    </div>
  );
};

export default App;
