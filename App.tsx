
import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import AIAssistant from './components/AIAssistant';
import { FF_BUNDLES, SERVICES, MOCK_HISTORY, CURRENT_RAFFLE } from './constants';
import { AppRoute, DiamondBundle, ServiceItem } from './types';

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [pinCode, setPinCode] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const [currentRoute, setRoute] = useState<AppRoute>(AppRoute.DASHBOARD);
  const [balance, setBalance] = useState(1250.50);
  const [playerID, setPlayerID] = useState('');
  const [selectedServer, setSelectedServer] = useState<'EUROPA' | 'ÁFRICA' | 'BRASIL'>('EUROPA');
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [activeBundle, setActiveBundle] = useState<DiamondBundle | null>(null);
  const [isParticipating, setIsParticipating] = useState(false);
  const [isPWA, setIsPWA] = useState(false);
  
  // Estados para simulação de APK e Publicação
  const [isBuildingAPK, setIsBuildingAPK] = useState(false);
  const [buildProgress, setBuildProgress] = useState(0);
  const [buildStep, setBuildStep] = useState('');
  const [isPublished, setIsPublished] = useState(true);

  useEffect(() => {
    const savedAuth = localStorage.getItem('sao_wallet_auth');
    if (savedAuth) {
      setIsAuthenticated(true);
    }
    
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsPWA(true);
    }

    setTimeout(() => setIsLoading(false), 1200);
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (phoneNumber.length >= 7 && pinCode.length >= 4) {
      setIsLoading(true);
      setTimeout(() => {
        localStorage.setItem('sao_wallet_auth', 'true');
        localStorage.setItem('sao_wallet_phone', phoneNumber);
        setIsAuthenticated(true);
        setIsLoading(false);
      }, 1500);
    } else {
      alert("Por favor, insira um número válido e o código de acesso.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('sao_wallet_auth');
    setIsAuthenticated(false);
    setPhoneNumber('');
    setPinCode('');
  };

  const handleShare = async () => {
    const shareData = {
      title: 'São Wallet STP',
      text: 'Recarregue diamantes FF em São Tomé pelo melhor preço! Baixe o app agora.',
      url: window.location.href
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.log('Share failed', err);
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link do App copiado! Agora cole no WhatsApp ou Facebook para publicar para os seus amigos.');
    }
  };

  const startAPKBuild = () => {
    setIsBuildingAPK(true);
    setBuildProgress(0);
    const steps = [
      "Compilando módulos STP...",
      "Otimizando pacotes de Diamantes...",
      "Sincronizando Servidores Globais...",
      "Gerando ficheiro final...",
      "Pronto para instalar!"
    ];
    
    let currentStep = 0;
    const interval = setInterval(() => {
      setBuildProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setBuildStep("Pronto!");
          setTimeout(() => {
            setIsBuildingAPK(false);
            alert("App Gerado com sucesso! Agora clique nos 3 pontos do navegador e selecione 'Instalar Aplicação'.");
          }, 800);
          return 100;
        }
        if (prev % 25 === 0) {
          setBuildStep(steps[currentStep]);
          currentStep++;
        }
        return prev + 5;
      });
    }, 150);
  };

  const handleServiceClick = (service: ServiceItem) => {
    if (service.id === 's1') {
      setRoute(AppRoute.SERVICES);
    } else {
      alert("Este serviço estará disponível em breve!");
    }
  };

  const buyDiamonds = (bundle: DiamondBundle) => {
    if (!playerID || playerID.length < 5) {
      alert("Insira seu ID do Free Fire primeiro.");
      return;
    }
    if (balance < bundle.price) {
      alert("Saldo insuficiente.");
      return;
    }
    setActiveBundle(bundle);
    setShowConfirmModal(true);
  };

  const executePayment = () => {
    if (activeBundle) {
      setBalance(prev => prev - activeBundle.price);
      alert(`PAGAMENTO CONCLUÍDO! Diamantes enviados para ${selectedServer} (ID: ${playerID}).`);
      setShowConfirmModal(false);
      setActiveBundle(null);
    }
  };

  const handleParticipateRaffle = () => {
    if (balance < CURRENT_RAFFLE.entryPrice) {
      alert("Saldo insuficiente para participar no sorteio.");
      return;
    }
    setBalance(prev => prev - CURRENT_RAFFLE.entryPrice);
    setIsParticipating(true);
    alert(`Sucesso! Você agora está participando do sorteio "${CURRENT_RAFFLE.prizeName}". Boa sorte!`);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#020617] flex flex-col items-center justify-center">
        <div className="w-16 h-16 border-4 border-emerald-500/20 border-t-emerald-500 rounded-full animate-spin mb-6"></div>
        <div className="text-emerald-500 font-black tracking-tighter text-2xl animate-pulse italic">SÃO WALLET</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#020617] flex items-center justify-center p-6 overflow-hidden relative text-slate-200">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
          <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-emerald-500/10 blur-[120px] rounded-full"></div>
          <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-600/10 blur-[120px] rounded-full"></div>
        </div>

        <div className="w-full max-w-md glass-card rounded-[3rem] p-10 md:p-14 z-10 border border-slate-800 animate-in zoom-in-95 duration-500">
          <div className="text-center mb-12">
            <div className="w-20 h-20 bg-emerald-500 rounded-3xl flex items-center justify-center text-white shadow-2xl shadow-emerald-500/30 mx-auto mb-8 rotate-12 group hover:rotate-0 transition-transform duration-500">
               <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" /></svg>
            </div>
            <h1 className="text-4xl font-black text-white tracking-tighter mb-3 italic">SÃO<span className="text-emerald-500">WALLET</span></h1>
            <p className="text-slate-500 text-sm font-medium italic">A carteira digital oficial de STP</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-2">Telemóvel</label>
              <div className="relative">
                <span className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 font-bold border-r border-slate-800 pr-3">+239</span>
                <input 
                  type="tel" 
                  required
                  placeholder="9XX XXXX"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="w-full bg-slate-900/50 border border-slate-800 rounded-2xl py-4 pl-20 pr-5 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all font-bold tracking-widest"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-2">PIN</label>
              <input 
                type="password" 
                required
                placeholder="••••"
                value={pinCode}
                onChange={(e) => setPinCode(e.target.value)}
                className="w-full bg-slate-900/50 border border-slate-800 rounded-2xl py-4 px-6 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all text-center text-2xl tracking-[1em]"
              />
            </div>

            <button 
              type="submit"
              className="w-full bg-emerald-600 hover:bg-emerald-500 text-white py-5 rounded-2xl font-black text-lg shadow-xl shadow-emerald-900/20 transition-all active:scale-95 mt-4"
            >
              ENTRAR
            </button>
          </form>
          
          <div className="mt-8 flex justify-center gap-4 opacity-30 grayscale hover:grayscale-0 transition-all">
             <img src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" className="h-7" alt="Play Store" />
             <img src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge_US-UK_RGB_blk_092917.svg" className="h-7" alt="App Store" />
          </div>
        </div>
      </div>
    );
  }

  const renderContent = () => {
    switch (currentRoute) {
      case AppRoute.DASHBOARD:
        return (
          <div className="space-y-10 animate-in fade-in duration-700">
            <div 
              onClick={handleShare}
              className="bg-gradient-to-r from-blue-600 to-indigo-700 p-5 rounded-[2rem] flex items-center justify-between cursor-pointer hover:scale-[1.01] transition-all shadow-xl shadow-blue-900/20"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center text-white backdrop-blur-md">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" /></svg>
                </div>
                <div>
                  <p className="text-white font-black text-lg tracking-tighter leading-tight">Publicar App para Amigos</p>
                  <p className="text-blue-100 text-[10px] font-bold uppercase tracking-widest opacity-80">Partilhe no WhatsApp agora</p>
                </div>
              </div>
              <div className="bg-white text-blue-800 px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest">PARTILHAR</div>
            </div>

            <div 
              onClick={() => setRoute(AppRoute.RAFFLE)}
              className="bg-gradient-to-r from-amber-500 to-yellow-700 p-6 rounded-[2rem] cursor-pointer hover:scale-[1.01] transition-all flex items-center justify-between shadow-xl shadow-amber-900/20"
            >
              <div className="flex items-center gap-6">
                <div className="text-5xl animate-bounce">🎁</div>
                <div>
                  <h4 className="text-white font-black text-2xl tracking-tighter leading-tight uppercase italic">Sorteio Gemada</h4>
                  <p className="text-amber-100 text-sm font-bold opacity-90 uppercase tracking-widest">Apenas 10 STN para ganhar</p>
                </div>
              </div>
              <div className="bg-white/20 px-6 py-3 rounded-2xl font-black text-white text-xs border border-white/20">QUERO GANHAR</div>
            </div>

            <header className="flex flex-col lg:flex-row gap-6">
              <div className="flex-1 bg-gradient-to-br from-emerald-600 to-teal-800 rounded-[2.5rem] p-10 relative overflow-hidden shadow-2xl shadow-emerald-900/20">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 blur-[100px] -mr-32 -mt-32"></div>
                <div className="relative z-10">
                  <div className="flex justify-between items-start mb-8">
                    <div>
                      <span className="text-white/70 text-xs font-bold tracking-[0.2em] uppercase mb-2 block">Saldo em STN</span>
                      <h2 className="text-5xl font-black text-white tracking-tighter">
                        {balance.toLocaleString('pt-ST', { style: 'currency', currency: 'STN' })}
                      </h2>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <button className="bg-white text-emerald-800 px-8 py-4 rounded-2xl font-black text-sm shadow-xl hover:scale-105 transition-all">
                      CARREGAR SALDO
                    </button>
                  </div>
                </div>
              </div>
            </header>

            <section>
               <h3 className="text-2xl font-black text-white tracking-tight mb-8 italic">SHOPPING GARENA</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {SERVICES.map(service => (
                  <div 
                    key={service.id}
                    onClick={() => handleServiceClick(service)}
                    className="bg-slate-900/50 border border-slate-800 rounded-[2.5rem] p-8 hover:border-emerald-500/40 transition-all cursor-pointer group text-center shadow-lg"
                  >
                    <div className="text-5xl mb-6 group-hover:scale-110 transition-transform duration-500">{service.icon}</div>
                    <h4 className="text-white font-black text-base mb-1">{service.name}</h4>
                    <p className="text-[10px] text-slate-500 uppercase font-black tracking-[0.2em]">{service.category}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>
        );

      case AppRoute.DOWNLOAD:
        return (
          <div className="space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-700">
            <div className="text-center space-y-4">
               <h2 className="text-5xl font-black text-white tracking-tighter">PUBLICAÇÃO GLOBAL</h2>
               <p className="text-slate-500 max-w-xl mx-auto font-medium">O seu aplicativo está pronto e pode ser acessado em qualquer parte do mundo através do link oficial.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
               <div className="bg-slate-900/40 border border-slate-800 rounded-[3rem] p-10 flex flex-col items-center text-center">
                  <div className="w-40 h-40 bg-white p-4 rounded-3xl mb-8 shadow-2xl">
                     {/* Simulação de QR Code */}
                     <div className="w-full h-full bg-slate-950 flex items-center justify-center rounded-xl p-2">
                        <svg className="w-full h-full text-white" fill="currentColor" viewBox="0 0 24 24">
                           <path d="M3 3h8v8H3V3zm2 2v4h4V5H5zm8-2h8v8h-8V3zm2 2v4h4V5h-4zM3 13h8v8H3v-8zm2 2v4h4v-4H5zm13-2h3v2h-3v-2zm-3 0h2v3h-2v-3zm3 3h3v2h-3v-2zm-3 2h2v3h-2v-3zm3 3h3v2h-3v-2zm-3-10h2v2h-2v-2zm0 4h2v2h-2v-2z"/>
                        </svg>
                     </div>
                  </div>
                  <h4 className="text-white font-black text-xl mb-4">QR CODE DE INSTALAÇÃO</h4>
                  <p className="text-slate-500 text-sm mb-8 px-6">Mostre este código aos seus clientes em STP para eles baixarem o app na hora.</p>
                  <button className="w-full bg-slate-800 hover:bg-slate-700 text-white py-4 rounded-2xl font-bold transition-all">DESCARREGAR QR CODE</button>
               </div>

               <div className="bg-slate-900/40 border border-slate-800 rounded-[3rem] p-10">
                  <h4 className="text-white font-black text-xl mb-6 italic">STATUS DAS LOJAS</h4>
                  <div className="space-y-6">
                     <div className="flex items-center justify-between p-5 bg-slate-950 rounded-2xl border border-emerald-500/20">
                        <div className="flex items-center gap-4">
                           <div className="w-10 h-10 bg-emerald-500/10 rounded-xl flex items-center justify-center text-emerald-500">
                              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>
                           </div>
                           <span className="text-white font-bold text-sm">Versão Web/PWA</span>
                        </div>
                        <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest bg-emerald-500/10 px-3 py-1 rounded-full">PUBLICADO</span>
                     </div>

                     <div className="flex items-center justify-between p-5 bg-slate-950 rounded-2xl border border-blue-500/20">
                        <div className="flex items-center gap-4">
                           <div className="w-10 h-10 bg-blue-500/10 rounded-xl flex items-center justify-center text-blue-500">
                              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M17.523 15.3414C17.0673 15.3414 16.6974 14.9715 16.6974 14.5158C16.6974 14.0601 17.0673 13.6902 17.523 13.6902C17.9787 13.6902 18.3486 14.0601 18.3486 14.5158C18.3486 14.9715 17.9787 15.3414 17.523 15.3414ZM6.477 15.3414C6.02131 15.3414 5.6514 14.9715 5.6514 14.5158C5.6514 14.0601 6.02131 13.6902 6.477 13.6902C6.93269 13.6902 7.3026 14.0601 7.3026 14.5158C7.3026 14.9715 6.93269 15.3414 6.477 15.3414ZM17.9572 11.2312L19.7997 8.04L19.7924 8.0358C19.9272 7.8024 19.8474 7.503 19.614 7.3686C19.3806 7.2342 19.0812 7.314 18.9468 7.5474L17.0864 10.7698C15.6133 10.0988 13.9137 9.7212 12 9.7212C10.0863 9.7212 8.3867 10.0988 6.9136 10.7698L5.0532 7.5474C4.9188 7.314 4.6194 7.2342 4.386 7.3686C4.1526 7.503 4.0728 7.8024 4.2072 8.0358L4.2003 8.04L6.0428 11.2312C3.1206 12.822 1.1574 15.823 1.1574 19.3332H22.8426C22.8426 15.823 20.8794 12.822 17.9572 11.2312Z"/></svg>
                           </div>
                           <span className="text-white font-bold text-sm">Google Play APK</span>
                        </div>
                        <span className="text-[10px] font-black text-blue-500 uppercase tracking-widest bg-blue-500/10 px-3 py-1 rounded-full">DISPONÍVEL VÍA CHROME</span>
                     </div>

                     <div className="flex items-center justify-between p-5 bg-slate-950 rounded-2xl border border-slate-700/30">
                        <div className="flex items-center gap-4">
                           <div className="w-10 h-10 bg-slate-500/10 rounded-xl flex items-center justify-center text-slate-400">
                              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.1 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.31-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91 1.65.07 2.47.67 3.01 1.25-1.12.96-1.88 2.31-1.88 3.82 0 1.51.76 2.86 1.88 3.82zM13 3.5c.73-.89 1.22-2.11 1.08-3.33-1.04.04-2.3.69-3.05 1.56-.67.77-1.26 2.03-1.12 3.22 1.16.09 2.36-.56 3.09-1.45z"/></svg>
                           </div>
                           <span className="text-white font-bold text-sm">Apple App Store</span>
                        </div>
                        <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest bg-slate-500/10 px-3 py-1 rounded-full">DISPONÍVEL VÍA SAFARI</span>
                     </div>
                  </div>
               </div>
            </div>

            <div className="max-w-3xl mx-auto">
               <button 
                 onClick={handleShare}
                 className="w-full bg-emerald-600 hover:bg-emerald-500 text-white py-8 rounded-[2rem] font-black text-2xl shadow-[0_20px_60px_-15px_rgba(16,185,129,0.4)] transition-all flex items-center justify-center gap-6"
               >
                  <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" /></svg>
                  PUBLICAR NO WHATSAPP AGORA
               </button>
            </div>
          </div>
        );

      case AppRoute.SERVICES:
        return (
          <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <button onClick={() => setRoute(AppRoute.DASHBOARD)} className="p-3 bg-slate-900 rounded-2xl text-slate-400 hover:text-white border border-slate-800 transition-all">
                   <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                </button>
                <h2 className="text-3xl font-black text-white italic tracking-tighter">DIAMANTES GARENA</h2>
              </div>
            </div>

            <div className="max-w-2xl mx-auto space-y-6">
              <div className="bg-slate-900/60 border border-slate-800 rounded-[2.5rem] p-8">
                <label className="block text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] mb-6 text-center">Escolher Região do ID</label>
                <div className="grid grid-cols-3 gap-4">
                  {(['EUROPA', 'ÁFRICA', 'BRASIL'] as const).map(server => (
                    <button
                      key={server}
                      onClick={() => setSelectedServer(server)}
                      className={`py-5 rounded-2xl font-black text-xs transition-all border ${
                        selectedServer === server 
                          ? 'bg-emerald-600 border-emerald-400 text-white shadow-xl shadow-emerald-900/20' 
                          : 'bg-slate-950 border-slate-800 text-slate-500 hover:text-slate-300'
                      }`}
                    >
                      {server}
                    </button>
                  ))}
                </div>
              </div>

              <div className="bg-slate-900/60 border border-slate-800 rounded-[2.5rem] p-10">
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">ID Jogador</label>
                <input 
                  type="text" 
                  placeholder="Introduza o ID Garena" 
                  value={playerID}
                  onChange={(e) => setPlayerID(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-2xl py-6 px-8 text-white font-mono text-2xl focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all text-center tracking-wider"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {FF_BUNDLES.map(bundle => (
                <div 
                  key={bundle.id} 
                  className={`bg-slate-900/40 border ${bundle.isPromo ? 'border-emerald-500/50 shadow-2xl shadow-emerald-500/5' : 'border-slate-800'} rounded-[3rem] p-10 hover:border-emerald-500/30 transition-all relative overflow-hidden group`}
                >
                  <div className="text-6xl mb-8 transform group-hover:scale-110 transition-transform">{bundle.image}</div>
                  <h3 className="text-3xl font-black text-white mb-2 tracking-tighter">{bundle.amount.toLocaleString()} <span className="text-xs font-medium text-slate-500">DIMAS</span></h3>
                  <div className="flex items-center justify-between mt-10 pt-8 border-t border-slate-800/60">
                    <span className="text-3xl font-black text-white italic">{bundle.price} <span className="text-xs text-slate-500">STN</span></span>
                    <button 
                      onClick={() => buyDiamonds(bundle)}
                      className="bg-emerald-600 hover:bg-emerald-500 text-white px-10 py-4 rounded-[1.5rem] font-black transition-all shadow-xl active:scale-95 text-sm"
                    >
                      COMPRAR
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case AppRoute.RAFFLE:
        return (
          <div className="space-y-10 animate-in fade-in slide-in-from-bottom-10 duration-700">
            <h2 className="text-4xl font-black text-white italic tracking-tighter uppercase">Mega Sorteios STP</h2>
            <div className="bg-[#111827] border-2 border-amber-500/40 rounded-[4rem] p-16 text-center relative overflow-hidden max-w-4xl mx-auto shadow-3xl shadow-amber-900/10">
              <div className="absolute top-0 left-0 w-full h-3 bg-gradient-to-r from-amber-500 via-yellow-300 to-amber-500"></div>
              <div className="text-9xl mb-12">🏆</div>
              <h3 className="text-5xl font-black text-white mb-6 tracking-tighter italic">{CURRENT_RAFFLE.prizeName}</h3>
              <p className="text-slate-400 mb-12 max-w-md mx-auto leading-relaxed text-lg">Inscrição exclusiva para utilizadores de São Tomé e Príncipe.</p>
              
              <div className="grid grid-cols-2 gap-10 mb-16">
                <div className="bg-slate-900/80 p-8 rounded-[2rem] border border-slate-800">
                  <span className="text-xs font-black text-slate-500 uppercase tracking-widest block mb-3">Preço Bilhete</span>
                  <span className="text-4xl font-black text-amber-500">{CURRENT_RAFFLE.entryPrice} STN</span>
                </div>
                <div className="bg-slate-900/80 p-8 rounded-[2rem] border border-slate-800">
                  <span className="text-xs font-black text-slate-500 uppercase tracking-widest block mb-3">Vagas Preenchidas</span>
                  <span className="text-4xl font-black text-white">{CURRENT_RAFFLE.participants + (isParticipating ? 1 : 0)}</span>
                </div>
              </div>

              <button 
                onClick={handleParticipateRaffle}
                disabled={isParticipating}
                className={`w-full ${isParticipating ? 'bg-slate-800 text-slate-500 cursor-not-allowed' : 'bg-gradient-to-r from-amber-600 to-yellow-500 hover:scale-[1.02] shadow-2xl shadow-amber-900/40'} text-white py-8 rounded-[2rem] font-black text-2xl transition-all active:scale-95`}
              >
                {isParticipating ? 'PARTICIPAÇÃO CONFIRMADA' : 'ADQUIRIR ENTRADA AGORA'}
              </button>
            </div>
          </div>
        );

      case AppRoute.HISTORY:
        return (
          <div className="space-y-8 animate-in fade-in duration-500">
            <h2 className="text-3xl font-black text-white italic tracking-tighter">MEUS MOVIMENTOS</h2>
            <div className="space-y-4">
              {MOCK_HISTORY.map(tx => (
                <div key={tx.id} className="bg-slate-900/40 border border-slate-800 rounded-[2rem] p-8 flex items-center justify-between group hover:border-slate-600 transition-all">
                  <div className="flex items-center gap-6">
                    <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-2xl ${
                      tx.type === 'Sorteio' ? 'bg-amber-500/10 text-amber-500' : (tx.type === 'Recarga' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-blue-500/10 text-blue-400')
                    }`}>
                      {tx.type === 'Sorteio' ? '🎁' : (tx.type === 'Recarga' ? '➕' : '🛒')}
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-lg mb-1">{tx.description}</h4>
                      <p className="text-xs text-slate-500 font-medium">{tx.date} • {tx.type}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`font-black text-2xl ${tx.amount > 0 ? 'text-emerald-400' : 'text-white'}`}>
                      {tx.amount > 0 ? '+' : ''}{tx.amount.toLocaleString()} <span className="text-xs">STN</span>
                    </p>
                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{tx.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case AppRoute.ACCOUNT:
        return (
          <div className="space-y-10 animate-in fade-in duration-500 max-w-2xl text-slate-200">
            <h2 className="text-3xl font-black text-white italic tracking-tighter uppercase">Painel da Conta</h2>
            <div className="bg-slate-900/40 border border-slate-800 rounded-[3rem] overflow-hidden">
               <div className="p-12 border-b border-slate-800/60 flex items-center gap-8">
                  <div className="w-24 h-24 bg-gradient-to-tr from-emerald-500 to-teal-600 rounded-full flex items-center justify-center text-white text-4xl font-black shadow-2xl">
                    {localStorage.getItem('sao_wallet_phone')?.charAt(0)}
                  </div>
                  <div>
                    <h3 className="text-2xl font-black text-white tracking-tight">{localStorage.getItem('sao_wallet_phone')}</h3>
                    <p className="text-emerald-500 text-xs font-black uppercase tracking-widest mt-1">Status: Utilizador Global ✅</p>
                  </div>
               </div>
               <div className="p-12 space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                     <div className="bg-slate-950/50 p-6 rounded-3xl border border-slate-800">
                        <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest mb-1">Rank</p>
                        <p className="text-white font-black">Diamante</p>
                     </div>
                     <div className="bg-slate-950/50 p-6 rounded-3xl border border-slate-800">
                        <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest mb-1">Membro Global</p>
                        <p className="text-white font-black">Ativo</p>
                     </div>
                  </div>
                  <button 
                    onClick={handleLogout}
                    className="w-full bg-red-500/10 border border-red-500/20 text-red-500 py-5 rounded-[1.5rem] font-black hover:bg-red-500/20 transition-all text-sm uppercase tracking-widest"
                  >
                    SAIR DA CARTEIRA
                  </button>
               </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex bg-[#020617] text-slate-200">
      <Sidebar currentRoute={currentRoute} setRoute={setRoute} onLogout={handleLogout} />
      
      <main className="flex-1 ml-72 p-10 lg:p-14 xl:px-28 w-full overflow-y-auto h-screen">
        {renderContent()}
      </main>

      <AIAssistant />

      {/* Modal de Confirmação */}
      {showConfirmModal && activeBundle && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/95 backdrop-blur-xl animate-in fade-in duration-300">
          <div className="bg-[#020617] border border-slate-800 w-full max-w-md rounded-[3rem] p-12 shadow-[0_0_100px_rgba(16,185,129,0.15)]">
            <div className="w-24 h-24 bg-emerald-500/10 rounded-full flex items-center justify-center text-emerald-500 mx-auto mb-10 border border-emerald-500/20">
               <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12l2 2 4-4" /></svg>
            </div>
            <h3 className="text-3xl font-black text-white mb-2 text-center">Confirmar Recarga</h3>
            <p className="text-slate-500 text-sm mb-12 text-center italic">Pagamento seguro via São Wallet.</p>
            
            <div className="space-y-6 mb-12">
              <div className="flex justify-between items-center py-4 border-b border-slate-800/50">
                <span className="text-slate-500 text-sm font-bold uppercase tracking-widest">Servidor</span>
                <span className="text-emerald-400 font-black tracking-tighter">{selectedServer}</span>
              </div>
              <div className="flex justify-between items-center py-4 border-b border-slate-800/50">
                <span className="text-slate-500 text-sm font-bold uppercase tracking-widest">ID Garena</span>
                <span className="text-white font-mono font-bold text-lg">{playerID}</span>
              </div>
              <div className="flex justify-between items-center pt-8">
                <span className="text-slate-400 font-black text-lg">Total</span>
                <span className="text-emerald-400 font-black text-4xl">{activeBundle.price} <span className="text-sm">STN</span></span>
              </div>
            </div>

            <div className="flex gap-4">
              <button 
                onClick={() => setShowConfirmModal(false)}
                className="flex-1 bg-slate-900 text-slate-400 py-6 rounded-[1.5rem] font-black hover:bg-slate-800 transition-all border border-slate-800"
              >
                VOLTAR
              </button>
              <button 
                onClick={executePayment}
                className="flex-1 bg-emerald-600 text-white py-6 rounded-[1.5rem] font-black shadow-2xl shadow-emerald-600/30 hover:bg-emerald-500 active:scale-95 transition-all uppercase tracking-widest"
              >
                PAGAR
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
